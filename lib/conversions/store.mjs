const RETENTION_SECONDS = 90 * 86400;
const PREFIX = 'ebaq:conversions:v1:';

export async function createSqliteStore(filename) {
  const { DatabaseSync } = await import('node:sqlite');
  const { mkdirSync } = await import('node:fs');
  const { dirname } = await import('node:path');
  mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS events(id TEXT PRIMARY KEY, at INTEGER NOT NULL, data TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS limits(id TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);`);
  return {
    async put(event) {
      db.prepare('DELETE FROM events WHERE at < ?').run(Date.now() - RETENTION_SECONDS * 1000);
      return db.prepare('INSERT OR IGNORE INTO events VALUES(?,?,?)').run(event.id, event.at, JSON.stringify(event)).changes > 0;
    },
    async get(id) {
      const row = db.prepare('SELECT data FROM events WHERE id=? AND at>=?').get(id, Date.now() - RETENTION_SECONDS * 1000);
      return row ? JSON.parse(row.data) : null;
    },
    async list(since) {
      return db.prepare('SELECT data FROM events WHERE at>=? ORDER BY at,id').all(since).map(row => JSON.parse(row.data));
    },
    async allow(key, limit = 20) {
      const now = Date.now();
      db.prepare('DELETE FROM limits WHERE expires<?').run(now);
      const row = db.prepare(`INSERT INTO limits VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET count=count+1 RETURNING count`).get(key, now + 60000);
      return row.count <= limit;
    },
    close() { db.close(); },
  };
}

export function createRedisStore(url, token, fetcher = fetch) {
  if (!url?.startsWith('https://') || !token) throw new Error('Persistent conversion store is not configured');
  const command = async (...args) => {
    const response = await fetcher(url, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(args), signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error('Conversion store request failed');
    const body = await response.json();
    if (body.error) throw new Error('Conversion store command failed');
    return body.result;
  };
  return {
    async put(event) {
      return Boolean(await command('EVAL', `
        if redis.call('SET',KEYS[1],ARGV[1],'NX','EX',ARGV[3]) then
          redis.call('ZADD',KEYS[2],ARGV[2],ARGV[4])
          redis.call('ZREMRANGEBYSCORE',KEYS[2],'-inf',ARGV[5])
          redis.call('EXPIRE',KEYS[2],ARGV[3])
          return 1
        end
        return 0`, 2, PREFIX + event.id, PREFIX + 'index', JSON.stringify(event), event.at,
        RETENTION_SECONDS, event.id, Date.now() - RETENTION_SECONDS * 1000));
    },
    async get(id) {
      const value = await command('GET', PREFIX + id);
      return value ? JSON.parse(value) : null;
    },
    async list(since) {
      const ids = await command('ZRANGEBYSCORE', PREFIX + 'index', since, '+inf');
      const records = [];
      for (let i = 0; i < ids.length; i += 250) {
        const values = await command('MGET', ...ids.slice(i, i + 250).map(id => PREFIX + id));
        records.push(...values.filter(Boolean).map(value => JSON.parse(value)));
      }
      return records;
    },
    async allow(key, limit = 20) {
      const count = await command('EVAL', `local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],60) end; return n`, 1, PREFIX + 'limit:' + key);
      return count <= limit;
    },
  };
}

let storePromise;
export function getStore() {
  return storePromise ??= process.env.CONVERSION_SQLITE_PATH && !process.env.VERCEL
    ? createSqliteStore(process.env.CONVERSION_SQLITE_PATH)
    : Promise.resolve(createRedisStore(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
      process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN));
}
