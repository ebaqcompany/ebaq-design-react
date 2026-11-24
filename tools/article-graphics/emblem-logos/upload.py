# Posts each file in logos-up to one Figma upload URL (ids in urls.txt), named by slug.
import os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
page = sys.argv[1]
files = sorted(os.listdir('logos-up'))
ids = open('urls.txt').read().split()
def up(pair):
    f, i = pair
    s, ext = f.rsplit('.', 1)
    t = 'image/svg+xml' if ext == 'svg' else 'image/png'
    r = subprocess.run(['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', '-F', f'file=@logos-up/{f};type={t};filename={s}',
                        f'https://mcp.figma.com/mcp/upload/{i}/submit?scaleMode=FILL&currentPageId={page}'], capture_output=True, text=True)
    return s, r.stdout
with ThreadPoolExecutor(8) as ex:
    for s, c in ex.map(up, zip(files, ids)): print(s, c)
