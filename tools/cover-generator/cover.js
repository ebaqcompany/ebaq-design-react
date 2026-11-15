// Ebaqdesign "Cutting Mat" cover system — one deterministic renderer shared by the
// interactive generator (index.html) and the batch script (scripts/generate-blog-covers.mjs).
//
// Every cover = a cutting-mat grid ground + one seeded layout + the title in Roboto Condensed 600.
// The seed (the post slug by default) picks ground, layout, edge shapes and motifs, so the same
// post always renders the same cover, while the whole blog rotates through controlled variations.
// Palette is locked to the brand: #00AFEC, black, white, with lavender #CCEFFC only as a paper tone.

import { renderCollage } from './collage.js'

export const COLORS = { blue: '#00AFEC', black: '#000000', white: '#FFFFFF', lavender: '#CCEFFC' }

export const GROUNDS = {
  blue: { bg: COLORS.blue, minor: 'rgba(255,255,255,0.22)', major: 'rgba(255,255,255,0.55)', tick: 'rgba(255,255,255,0.85)', ink: COLORS.black },
  black: { bg: COLORS.black, minor: 'rgba(255,255,255,0.11)', major: 'rgba(0,175,236,0.6)', tick: 'rgba(255,255,255,0.55)', ink: COLORS.white },
  white: { bg: COLORS.white, minor: 'rgba(0,0,0,0.075)', major: 'rgba(0,175,236,0.5)', tick: 'rgba(0,0,0,0.5)', ink: COLORS.black },
}

export const LAYOUTS = ['plain', 'torn', 'split', 'silhouette']
export const MOTIFS = ['scribble', 'dots', 'circles', 'rings']

export const TITLE_FONT = '"Roboto Condensed", "Arial Narrow", sans-serif'
export const MONO_FONT = '"Roboto Mono", ui-monospace, monospace'

// ---------- seeded randomness ----------
export function hashSeed(str) {
  let h1 = 0xdeadbeef ^ 0, h2 = 0x41c6ce57 ^ 0
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  return h1 >>> 0
}
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
export const pick = (r, arr) => arr[Math.floor(r() * arr.length)]
export const range = (r, a, b) => a + r() * (b - a)
export function weighted(r, entries) {
  const total = entries.reduce((s, [, w]) => s + w, 0)
  let x = r() * total
  for (const [v, w] of entries) { if ((x -= w) <= 0) return v }
  return entries[entries.length - 1][0]
}

// ---------- spec resolution ----------
// Covers drop SEO bracket tails like "[2026 Guide]" or "[Designer Gallery]"; the article H1 keeps them.
export function coverTitle(t) {
  return t.replace(/\s*\[[^\]]*\]\s*/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

// ---------- spec resolution ----------
// Resolves every "auto" in a spec into a concrete choice, using only the seed + available assets.
export function resolveSpec(spec, assets = {}) {
  const r = mulberry32(hashSeed(String(spec.seed ?? spec.title ?? 'ebaq')))
  const hasImages = (assets.images?.length ?? 0) > 0
  const hasLogos = (assets.logos?.length ?? 0) > 0
  const hasShape = !!assets.shape
  let layout = spec.layout && spec.layout !== 'auto' ? spec.layout : null
  if (!layout) {
    if (hasShape) layout = 'silhouette'
    else if (hasImages) layout = weighted(r, [['split', 3], ['silhouette', 1]])
    else layout = weighted(r, [['plain', 3], ['torn', 4], ['split', 3]])
  } else r()
  let ground = spec.ground && spec.ground !== 'auto' ? spec.ground : null
  const groundRoll = weighted(r, [['blue', 5], ['white', 3], ['black', 3]])
  if (!ground) {
    ground = groundRoll
    if (layout === 'torn' && ground === 'white') ground = r() < 0.6 ? 'blue' : 'black'
    if (layout === 'silhouette') ground = 'white'
  }
  const motifRoll = pick(r, MOTIFS)
  const motif = spec.motif && spec.motif !== 'auto' ? spec.motif : motifRoll
  const panelRoll = r() < 0.65 ? 'white' : 'lavender'
  const panel = spec.panel && spec.panel !== 'auto' ? spec.panel : (ground === 'black' ? 'white' : panelRoll)
  return {
    title: coverTitle(spec.title ?? ''),
    category: spec.category ?? '',
    seed: String(spec.seed ?? spec.title ?? 'ebaq'),
    layout, ground, motif, panel,
    imageMode: spec.imageMode && spec.imageMode !== 'auto' ? spec.imageMode : (layout === 'silhouette' ? 'mono' : pick(r, ['duotone', 'mono', 'halftone'])),
    kicker: spec.kicker ?? true,
    footer: spec.footer ?? true,
    grain: spec.grain ?? true,
    titleScale: Number(spec.titleScale ?? 1),
    hasLogos,
  }
}

// ---------- helpers ----------
export function makeCanvas(w, h) {
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(Math.max(1, Math.round(w)), Math.max(1, Math.round(h)))
  const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c
}
export function srcSize(img) {
  return { w: img.naturalWidth || img.videoWidth || img.width, h: img.naturalHeight || img.videoHeight || img.height }
}
// Paints a single-colour version of any image with alpha (logos, the mark, silhouettes).
export function tint(img, color, w, h) {
  const c = makeCanvas(w, h); const x = c.getContext('2d')
  x.drawImage(img, 0, 0, w, h)
  x.globalCompositeOperation = 'source-in'
  x.fillStyle = color; x.fillRect(0, 0, w, h)
  return c
}
export function hasTransparentCorners(img) {
  const { w, h } = srcSize(img)
  const c = makeCanvas(32, 32 * h / w || 32); const x = c.getContext('2d')
  x.drawImage(img, 0, 0, c.width, c.height)
  const d = x.getImageData(0, 0, c.width, c.height).data
  const at = (px, py) => d[(py * c.width + px) * 4 + 3]
  return at(0, 0) < 20 && at(c.width - 1, 0) < 20 && at(0, c.height - 1) < 20
}
// Converts a photo into the brand's image treatment: mono (contrasty B/W), duotone (black → blue → lavender)
// or halftone dots. "cover" crops to fill the box; "contain" keeps cut-outs whole.
export function treatImage(img, mode, w, h, fit = 'cover', ink = COLORS.black, unit = 40) {
  const { w: iw, h: ih } = srcSize(img)
  const s = fit === 'cover' ? Math.max(w / iw, h / ih) : Math.min(w / iw, h / ih)
  const dw = iw * s, dh = ih * s
  const c = makeCanvas(w, h); const x = c.getContext('2d')
  x.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
  const id = x.getImageData(0, 0, c.width, c.height); const d = id.data
  const lum = new Float32Array(c.width * c.height)
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    let L = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]
    L = Math.min(255, Math.max(0, (L - 128) * 1.4 + 128))
    lum[p] = L
    if (mode === 'duotone') {
      const t = L / 255
      const [a, b, k] = t < 0.55 ? [[0, 0, 0], [0, 175, 236], t / 0.55] : [[0, 175, 236], [204, 239, 252], (t - 0.55) / 0.45]
      d[i] = a[0] + (b[0] - a[0]) * k; d[i + 1] = a[1] + (b[1] - a[1]) * k; d[i + 2] = a[2] + (b[2] - a[2]) * k
    } else { d[i] = d[i + 1] = d[i + 2] = L }
  }
  if (mode !== 'halftone') { x.putImageData(id, 0, 0); return c }
  const out = makeCanvas(w, h); const o = out.getContext('2d')
  const cell = Math.max(5, unit * 0.2)
  o.fillStyle = ink === COLORS.black ? COLORS.white : COLORS.black
  o.fillRect(0, 0, w, h)
  o.fillStyle = ink
  for (let y = cell / 2; y < c.height; y += cell) {
    for (let xx = cell / 2; xx < c.width; xx += cell) {
      const p = Math.floor(y) * c.width + Math.floor(xx)
      if (d[p * 4 + 3] < 40) continue
      const r = (cell / 2) * Math.sqrt(1 - lum[p] / 255) * 1.15
      if (r < 0.4) continue
      o.beginPath(); o.arc(xx, y, r, 0, Math.PI * 2); o.fill()
    }
  }
  return out
}

// ---------- the mat ----------
export function drawMat(ctx, rect, groundKey, unit, r, { ruler = true, diagonal = true } = {}) {
  const g = GROUNDS[groundKey]
  const { x, y, w, h } = rect
  ctx.save()
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  ctx.fillStyle = g.bg; ctx.fillRect(x, y, w, h)
  const lw = Math.max(1, unit / 45)
  // grid aligned to the canvas origin so adjacent mats line up
  const startX = Math.floor(x / unit) * unit, startY = Math.floor(y / unit) * unit
  for (let gx = startX, i = Math.round(startX / unit); gx <= x + w; gx += unit, i++) {
    ctx.strokeStyle = i % 5 === 0 ? g.major : g.minor; ctx.lineWidth = i % 5 === 0 ? lw * 1.4 : lw
    ctx.beginPath(); ctx.moveTo(gx + 0.5, y); ctx.lineTo(gx + 0.5, y + h); ctx.stroke()
  }
  for (let gy = startY, i = Math.round(startY / unit); gy <= y + h; gy += unit, i++) {
    ctx.strokeStyle = i % 5 === 0 ? g.major : g.minor; ctx.lineWidth = i % 5 === 0 ? lw * 1.4 : lw
    ctx.beginPath(); ctx.moveTo(x, gy + 0.5); ctx.lineTo(x + w, gy + 0.5); ctx.stroke()
  }
  if (diagonal) {
    // the cutting-mat 45°/60° guide lines
    ctx.strokeStyle = g.major; ctx.lineWidth = lw * 1.2
    const corner = Math.floor(r() * 4)
    const cx = corner % 2 ? x + w : x, cy = corner > 1 ? y + h : y
    const sx = corner % 2 ? -1 : 1, sy = corner > 1 ? -1 : 1
    const L = Math.max(w, h) * 1.6
    for (const ang of [45, 60]) {
      const a = (ang * Math.PI) / 180
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + sx * Math.cos(a) * L, cy + sy * Math.sin(a) * L); ctx.stroke()
    }
    ctx.beginPath(); ctx.arc(cx, cy, unit * 5, 0, Math.PI * 2); ctx.stroke()
  }
  if (ruler) {
    ctx.strokeStyle = g.tick; ctx.fillStyle = g.tick; ctx.lineWidth = lw
    ctx.font = `500 ${Math.round(unit * 0.26)}px ${MONO_FONT}`
    ctx.textBaseline = 'top'
    for (let gx = startX, i = Math.round(startX / unit); gx <= x + w; gx += unit / 2, i += 0.5) {
      const major = Number.isInteger(i) && i % 5 === 0
      const len = major ? unit * 0.42 : Number.isInteger(i) ? unit * 0.24 : unit * 0.12
      ctx.beginPath(); ctx.moveTo(gx + 0.5, y); ctx.lineTo(gx + 0.5, y + len); ctx.stroke()
      if (major && i > 0) ctx.fillText(String(i), gx + unit * 0.08, y + unit * 0.2)
    }
    for (let gy = startY, i = Math.round(startY / unit); gy <= y + h; gy += unit / 2, i += 0.5) {
      const major = Number.isInteger(i) && i % 5 === 0
      const len = major ? unit * 0.42 : Number.isInteger(i) ? unit * 0.24 : unit * 0.12
      ctx.beginPath(); ctx.moveTo(x, gy + 0.5); ctx.lineTo(x + len, gy + 0.5); ctx.stroke()
    }
  }
  ctx.restore()
}

// ---------- motifs (hand-drawn feeling, brand colours only) ----------
function drawMotif(ctx, kind, rect, ink, unit, r) {
  const { x, y, w, h } = rect
  const cx = x + w / 2, cy = y + h / 2, R = Math.min(w, h) * 0.38
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  if (kind === 'scribble') {
    // loopy single-line scribble, like a pen doodle
    const k = [1, 2, 3, 5].map(() => ({ ax: range(r, 0.2, 1), ay: range(r, 0.2, 1), px: range(r, 0, 6.28), py: range(r, 0, 6.28) }))
    const loops = Math.floor(range(r, 3, 6))
    ctx.strokeStyle = ink; ctx.lineWidth = unit * 0.13; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.beginPath()
    const N = 900
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * Math.PI * 2 * loops * 0.5
      let dx = 0, dy = 0
      k.forEach((c, j) => { const f = [1, 2, 3, 5][j]; dx += c.ax * Math.cos(f * t * 0.6 + c.px) / (j + 1); dy += c.ay * Math.sin(f * t + c.py) / (j + 1) })
      const drift = (i / N - 0.5) * w * 0.55
      const px = cx + drift + dx * R * 0.55, py = cy + dy * R * 0.9
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
    }
    ctx.stroke()
  } else if (kind === 'dots') {
    const n = 5, gap = Math.min(w, h) * 0.7 / n
    const pal = [COLORS.blue, ink, COLORS.lavender, COLORS.blue, ink]
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      ctx.fillStyle = pal[Math.floor(r() * pal.length)]
      ctx.beginPath(); ctx.arc(cx + (i - (n - 1) / 2) * gap, cy + (j - (n - 1) / 2) * gap, gap * 0.34, 0, Math.PI * 2); ctx.fill()
    }
  } else if (kind === 'circles') {
    const rr = R * 0.62
    const centers = [[-0.45, -0.3], [0.45, -0.3], [-0.45, 0.4], [0.45, 0.4]]
    centers.forEach(([dx, dy], i) => {
      ctx.globalAlpha = 0.75
      ctx.fillStyle = i % 2 ? ink : COLORS.blue
      ctx.beginPath(); ctx.arc(cx + dx * rr * 1.3, cy + dy * rr * 1.3, rr, 0, Math.PI * 2); ctx.fill()
    })
    ctx.globalAlpha = 1
  } else if (kind === 'rings') {
    ctx.strokeStyle = ink; ctx.lineWidth = unit * 0.36
    const start = range(r, 0, Math.PI * 2)
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath(); ctx.arc(cx, cy, (R / 4) * i, start, start + Math.PI * 1.6); ctx.stroke()
    }
  }
  ctx.restore()
}

// ---------- torn paper ----------
function tornEdge(r, baseX, y0, y1, unit, amp) {
  const pts = []
  const ph = [range(r, 0, 6.28), range(r, 0, 6.28), range(r, 0, 6.28)]
  const fr = [range(r, 0.6, 1.4), range(r, 2, 3.5), range(r, 5, 8)]
  const tilt = range(r, -1, 1) * amp
  const step = unit * 0.16
  for (let y = y0; y <= y1 + step; y += step) {
    const t = (y - y0) / (y1 - y0)
    let dx = amp * (Math.sin(t * Math.PI * 2 * fr[0] + ph[0]) + 0.45 * Math.sin(t * Math.PI * 2 * fr[1] + ph[1]) + 0.2 * Math.sin(t * Math.PI * 2 * fr[2] + ph[2]))
    dx += (t - 0.5) * tilt
    dx += (r() - 0.5) * unit * 0.22
    if (r() < 0.04) dx += (r() - 0.5) * unit * 0.7
    pts.push([baseX + dx, y])
  }
  return pts
}
function tornPanelPath(r, x0, x1, H, unit) {
  const amp = unit * 0.9
  const left = tornEdge(r, x0, -unit, H + unit, unit, amp)
  const right = tornEdge(r, x1, -unit, H + unit, unit, amp).reverse()
  const p = new Path2D()
  left.forEach(([x, y], i) => (i ? p.lineTo(x, y) : p.moveTo(x, y)))
  right.forEach(([x, y]) => p.lineTo(x, y))
  p.closePath()
  return p
}
function paperTexture(ctx, rect, r, unit) {
  ctx.save()
  const n = Math.round((rect.w * rect.h) / (unit * unit) * 6)
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = r() < 0.5 ? 'rgba(0,0,0,0.05)' : 'rgba(0,120,170,0.05)'
    const s = range(r, 0.5, 2.2) * (unit / 40)
    ctx.fillRect(rect.x + r() * rect.w, rect.y + r() * rect.h, s, s)
  }
  ctx.restore()
}

// ---------- typography ----------
export function setTitleFont(ctx, size) {
  ctx.font = `600 ${size}px ${TITLE_FONT}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${(-0.012 * size).toFixed(2)}px`
}
function wrap(ctx, words, maxW) {
  const lines = []; let line = ''
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (ctx.measureText(test).width <= maxW || !line) line = test
    else { lines.push(line); line = w }
  }
  if (line) lines.push(line)
  return lines
}
export function fitTitle(ctx, text, maxW, maxH, { maxLines = 3, maxSize = 200, minSize = 18, lh = 0.98 } = {}) {
  const words = text.trim().split(/\s+/)
  const fits = (s) => {
    setTitleFont(ctx, s)
    const lines = wrap(ctx, words, maxW)
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width))
    return lines.length <= maxLines && widest <= maxW && lines.length * s * lh <= maxH ? lines : null
  }
  let lo = minSize, hi = maxSize, best = minSize
  while (hi - lo > 0.5) { const mid = (lo + hi) / 2; if (fits(mid)) { best = mid; lo = mid } else hi = mid }
  setTitleFont(ctx, best)
  let lines = wrap(ctx, words, maxW)
  // balance the rag: narrow the measure while the line count holds
  let a = maxW * 0.45, b = maxW
  while (b - a > 2) { const m = (a + b) / 2; if (wrap(ctx, words, m).length === lines.length) b = m; else a = m }
  lines = wrap(ctx, words, b)
  return { size: best, lines, lh }
}
function drawTitleBlock(ctx, spec, box, ink, unit, { align = 'center', maxLines = 3 } = {}) {
  const kickerSize = Math.round(unit * 0.44)
  const gap = unit * 0.5
  const kickerH = spec.kicker && spec.category ? kickerSize + gap : 0
  const maxSize = (box.h * 0.36) * spec.titleScale
  const t = fitTitle(ctx, spec.title, box.w, box.h - kickerH, { maxSize, maxLines })
  const blockH = kickerH + t.lines.length * t.size * t.lh
  let y = box.y + (box.h - blockH) / 2
  const x = align === 'center' ? box.x + box.w / 2 : box.x
  ctx.save()
  ctx.textAlign = align; ctx.fillStyle = ink
  if (kickerH) {
    ctx.font = `500 ${kickerSize}px ${MONO_FONT}`
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${(0.14 * kickerSize).toFixed(2)}px`
    ctx.textBaseline = 'top'
    ctx.fillText(spec.category.toUpperCase(), x, y)
    y += kickerH
  }
  setTitleFont(ctx, t.size)
  ctx.textBaseline = 'alphabetic'
  t.lines.forEach((line, i) => ctx.fillText(line, x, y + (i + 0.8) * t.size * t.lh))
  ctx.restore()
  return t
}
export function drawFooter(ctx, spec, assets, rect, ink, unit) {
  if (!spec.footer) return
  const s = unit * 0.62
  const yMid = rect.y + rect.h / 2
  ctx.save()
  if (assets.mark) {
    const m = tint(assets.mark, ink, s, s)
    ctx.drawImage(m, rect.x, yMid - s / 2, s, s)
  }
  ctx.fillStyle = ink
  ctx.font = `600 ${Math.round(unit * 0.5)}px ${TITLE_FONT}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  ctx.fillText('ebaqdesign', rect.x + (assets.mark ? s * 1.3 : 0), yMid + unit * 0.02)
  ctx.font = `500 ${Math.round(unit * 0.3)}px ${MONO_FONT}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${(unit * 0.04).toFixed(2)}px`
  ctx.textAlign = 'right'
  ctx.fillText('EBAQDESIGN.COM/BLOG', rect.x + rect.w, yMid)
  ctx.restore()
}
function drawLogoRow(ctx, logos, rect, ink) {
  if (!logos?.length) return
  const n = Math.min(logos.length, 5)
  const slot = rect.w / n
  logos.slice(0, n).forEach((img, i) => {
    const { w, h } = srcSize(img)
    const s = Math.min((slot * 0.72) / w, rect.h / h)
    const dw = w * s, dh = h * s
    ctx.drawImage(tint(img, ink, dw, dh), rect.x + slot * i + (slot - dw) / 2, rect.y + (rect.h - dh) / 2, dw, dh)
  })
}

// ---------- layouts ----------
function layoutPlain(ctx, W, H, spec, assets, unit, r) {
  const g = GROUNDS[spec.ground]
  drawMat(ctx, { x: 0, y: 0, w: W, h: H }, spec.ground, unit, r)
  const logosH = assets.logos?.length ? unit * 1.8 : 0
  const box = { x: W * 0.12, y: H * 0.16, w: W * 0.76, h: H * 0.6 - logosH }
  const t = drawTitleBlock(ctx, spec, box, g.ink, unit)
  if (logosH) drawLogoRow(ctx, assets.logos, { x: W * 0.2, y: box.y + box.h + unit * 0.4, w: W * 0.6, h: logosH }, g.ink)
  drawFooter(ctx, spec, assets, { x: unit * 1.2, y: H - unit * 1.9, w: W - unit * 2.4, h: unit }, g.ink, unit)
  return t
}
function layoutTorn(ctx, W, H, spec, assets, unit, r) {
  drawMat(ctx, { x: 0, y: 0, w: W, h: H }, spec.ground, unit, r)
  const pw = W * range(r, 0.64, 0.74)
  const x0 = (W - pw) / 2 + range(r, -1, 1) * W * 0.03
  const path = tornPanelPath(r, x0, x0 + pw, H, unit)
  const paper = spec.panel === 'lavender' ? COLORS.lavender : COLORS.white
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.28)'; ctx.shadowBlur = unit * 0.5; ctx.shadowOffsetX = unit * 0.08; ctx.shadowOffsetY = unit * 0.1
  ctx.fillStyle = paper; ctx.fill(path)
  ctx.restore()
  ctx.save()
  ctx.strokeStyle = 'rgba(255,255,255,0.95)'; ctx.lineWidth = unit * 0.14; ctx.stroke(path) // torn fibre rim
  ctx.clip(path)
  paperTexture(ctx, { x: x0 - unit, y: 0, w: pw + unit * 2, h: H }, r, unit)
  const pad = unit * 1.3
  const logosH = assets.logos?.length ? unit * 1.6 : 0
  const box = { x: x0 + pad, y: H * 0.1, w: pw - pad * 2, h: H * 0.7 - logosH }
  const t = drawTitleBlock(ctx, spec, box, COLORS.black, unit, { maxLines: 4 })
  if (logosH) drawLogoRow(ctx, assets.logos, { x: box.x, y: box.y + box.h + unit * 0.3, w: box.w, h: logosH }, COLORS.black)
  drawFooter(ctx, spec, assets, { x: x0 + pad, y: H - unit * 1.9, w: pw - pad * 2, h: unit }, COLORS.black, unit)
  ctx.restore()
  return t
}
function labelBox(ctx, spec, assets, W, H, unit, cy = H / 2, { cx = W / 2, lw = W * 0.6 } = {}) {
  // a white "sticker" that carries the title + footer on busy layouts
  ctx.save(); setTitleFont(ctx, 10); ctx.restore()
  const pad = unit * 0.9
  const logosH = assets.logos?.length ? unit * 1.1 : 0
  const footerH = spec.footer ? unit * 1.2 : 0
  const inner = { x: cx - lw / 2 + pad, w: lw - pad * 2 }
  const maxTitleH = H * 0.42
  // measure first, then size the label to its content
  const t = fitTitle(ctx, spec.title, inner.w, maxTitleH - (spec.kicker ? unit * 0.94 : 0), { maxSize: H * 0.13 * spec.titleScale })
  const titleH = t.lines.length * t.size * t.lh + (spec.kicker && spec.category ? unit * 0.94 : 0)
  const lh = pad * 2 + titleH + logosH + footerH
  const ly = cy - lh / 2
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.22)'; ctx.shadowBlur = unit * 0.45; ctx.shadowOffsetY = unit * 0.1
  ctx.fillStyle = COLORS.white; ctx.fillRect(cx - lw / 2, ly, lw, lh)
  ctx.restore()
  drawTitleBlock(ctx, spec, { x: inner.x, y: ly + pad, w: inner.w, h: titleH }, COLORS.black, unit)
  if (logosH) drawLogoRow(ctx, assets.logos, { x: inner.x, y: ly + pad + titleH + unit * 0.15, w: inner.w, h: logosH * 0.8 }, COLORS.black)
  if (footerH) {
    ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = Math.max(1, unit / 40)
    const fy = ly + lh - pad - footerH * 0.55
    ctx.beginPath(); ctx.moveTo(inner.x, fy - unit * 0.55); ctx.lineTo(inner.x + inner.w, fy - unit * 0.55); ctx.stroke(); ctx.restore()
    drawFooter(ctx, spec, assets, { x: inner.x, y: fy - unit * 0.3, w: inner.w, h: unit * 0.6 }, COLORS.black, unit * 0.85)
  }
  return t
}
function layoutSplit(ctx, W, H, spec, assets, unit, r) {
  const a = Math.round((W * range(r, 0.42, 0.58)) / unit) * unit
  const splitRight = r() < 0.55
  const cells = [{ x: 0, y: 0, w: a, h: H }]
  if (splitRight) {
    const b = Math.round((H * range(r, 0.4, 0.6)) / unit) * unit
    cells.push({ x: a, y: 0, w: W - a, h: b }, { x: a, y: b, w: W - a, h: H - b })
  } else cells.push({ x: a, y: 0, w: W - a, h: H })
  if (r() < 0.5) cells.reverse()
  const others = ['blue', 'white', 'black'].filter((gk) => gk !== spec.ground)
  const grounds = [spec.ground, pick(r, others), spec.ground === 'blue' ? 'black' : 'blue']
  const images = assets.images ?? []
  cells.forEach((cell, i) => {
    const gk = grounds[i % grounds.length]
    drawMat(ctx, cell, gk, unit, r, { ruler: i === 0, diagonal: r() < 0.5 })
    if (i === 0 && images[0]) {
      const fit = hasTransparentCorners(images[0]) ? 'contain' : 'cover'
      const treated = treatImage(images[0], spec.imageMode, cell.w, cell.h, fit, GROUNDS[gk].ink, unit)
      ctx.drawImage(treated, cell.x, cell.y)
    } else if (i === 1 && images[1]) {
      const fit = hasTransparentCorners(images[1]) ? 'contain' : 'cover'
      ctx.drawImage(treatImage(images[1], spec.imageMode, cell.w, cell.h, fit, GROUNDS[gk].ink, unit), cell.x, cell.y)
    } else if (i === (images.length ? 1 : 0) || (i === 2 && r() < 0.5)) {
      // keep the motif on the cell's outer side, clear of the centred label
      const outerLeft = cell.x + cell.w / 2 < W / 2
      const mw = Math.min(cell.w, W * 0.26)
      const area = { x: outerLeft ? cell.x : cell.x + cell.w - mw, y: cell.y, w: mw, h: cell.h }
      drawMotif(ctx, i === 2 ? pick(r, MOTIFS) : spec.motif, area, GROUNDS[gk].ink, unit, r)
    }
  })
  return labelBox(ctx, spec, { ...assets }, W, H, unit)
}
function bustPath(r, cx, H, scale) {
  // a generic head-and-shoulders silhouette rising from the bottom edge (stand-in until a real cut-out is supplied)
  const hr = H * 0.17 * scale
  const tilt = range(r, -0.12, 0.12)
  const hx = cx + range(r, -0.3, 0.3) * hr, hy = H * 0.36
  const sw = H * 0.62 * scale, top = H * 0.7
  const p = new Path2D()
  p.ellipse(hx, hy, hr * 0.86, hr * 1.06, tilt, 0, Math.PI * 2)
  p.moveTo(cx - sw / 2, H + 10)
  p.bezierCurveTo(cx - sw / 2, top + H * 0.06, cx - sw * 0.34, top - H * 0.04, cx - hr * 0.42, top - H * 0.06)
  p.lineTo(cx - hr * 0.42, hy + hr * 0.7)
  p.lineTo(cx + hr * 0.42, hy + hr * 0.7)
  p.lineTo(cx + hr * 0.42, top - H * 0.06)
  p.bezierCurveTo(cx + sw * 0.34, top - H * 0.04, cx + sw / 2, top + H * 0.06, cx + sw / 2, H + 10)
  p.closePath()
  return p
}
function layoutSilhouette(ctx, W, H, spec, assets, unit, r) {
  drawMat(ctx, { x: 0, y: 0, w: W, h: H }, 'white', unit, r, { diagonal: false })
  const left = r() < 0.5 // which side the cut-out stands on; the title label takes the other side
  const cx = W * (left ? range(r, 0.22, 0.3) : range(r, 0.7, 0.78))
  // collage: images (B/W cut-outs or crops) and logos (black) on a shuffled 4×3 grid
  const slots = []
  const cols = 4, rows = 3
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) slots.push({ x: (W / cols) * i, y: (H / rows) * j, w: W / cols, h: H / rows })
  slots.sort(() => r() - 0.5)
  const images = assets.images ?? [], logos = assets.logos ?? []
  images.slice(0, 4).forEach((img, i) => {
    const s = slots[i]
    const cut = hasTransparentCorners(img)
    const k = cut ? 1.6 : 1.25
    const box = { w: s.w * k, h: s.h * k }
    const treated = treatImage(img, 'mono', box.w, box.h, cut ? 'contain' : 'cover', COLORS.black, unit)
    ctx.drawImage(treated, s.x + (s.w - box.w) / 2, s.y + (s.h - box.h) / 2)
  })
  logos.slice(0, slots.length - images.length).forEach((img, i) => {
    const s = slots[images.length + i]
    const { w, h } = srcSize(img)
    const sc = Math.min((s.w * range(r, 0.6, 0.85)) / w, (s.h * 0.55) / h)
    ctx.drawImage(tint(img, COLORS.black, w * sc, h * sc), s.x + (s.w - w * sc) / 2 + range(r, -1, 1) * unit * 0.6, s.y + (s.h - h * sc) / 2 + range(r, -1, 1) * unit * 0.6)
  })
  // the blue grid cut-out
  const sh = makeCanvas(W, H); const sx = sh.getContext('2d')
  if (assets.shape) {
    const { w, h } = srcSize(assets.shape)
    const s = (H * 0.98) / h
    sx.drawImage(assets.shape, cx - (w * s) / 2, H - h * s, w * s, h * s)
    sx.globalCompositeOperation = 'source-in'
    sx.fillStyle = COLORS.blue; sx.fillRect(0, 0, W, H)
  } else {
    sx.fillStyle = COLORS.blue
    sx.fill(bustPath(r, cx, H, range(r, 1, 1.15)))
  }
  sx.globalCompositeOperation = 'source-atop'
  sx.strokeStyle = 'rgba(0,0,0,0.38)'; sx.lineWidth = Math.max(1, unit / 30)
  for (let gx = 0; gx <= W; gx += unit) { sx.beginPath(); sx.moveTo(gx + 0.5, 0); sx.lineTo(gx + 0.5, H); sx.stroke() }
  for (let gy = 0; gy <= H; gy += unit) { sx.beginPath(); sx.moveTo(0, gy + 0.5); sx.lineTo(W, gy + 0.5); sx.stroke() }
  ctx.drawImage(sh, 0, 0)
  if (spec.titleOnSilhouette === false) return null
  return labelBox(ctx, spec, { ...assets, logos: [] }, W, H, unit, H * 0.5, { cx: left ? W * 0.7 : W * 0.3, lw: W * 0.5 })
}

export function addGrain(ctx, W, H, r, amount = 10) {
  const id = ctx.getImageData(0, 0, W, H); const d = id.data
  let s = Math.floor(r() * 1e9)
  for (let i = 0; i < d.length; i += 4) {
    s = (s * 1664525 + 1013904223) >>> 0
    const n = ((s >>> 24) / 255 - 0.5) * amount
    d[i] += n; d[i + 1] += n; d[i + 2] += n
  }
  ctx.putImageData(id, 0, 0)
}

// ---------- entry point ----------
// spec: { title, category, seed, layout, ground, motif, panel, imageMode, kicker, footer, grain, titleScale }
// assets: { mark, images: [], logos: [], shape } — any CanvasImageSource (HTMLImageElement, ImageBitmap…)
export function renderCover(canvas, rawSpec, assets = {}, size = { w: 1920, h: 1080 }) {
  if (rawSpec.layout === 'collage') return renderCollage(canvas, rawSpec, assets, size)
  canvas.width = size.w; canvas.height = size.h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const spec = { ...resolveSpec(rawSpec, assets), titleOnSilhouette: rawSpec.titleOnSilhouette }
  // one random stream per layout draw, so 16:9 and OG crops share the same composition
  const r = mulberry32(hashSeed(spec.seed + '|draw'))
  // unit is tied to height so the 1200×630 OG and the 1920×1080 cover share proportions
  const unit = size.h / 18
  const W = size.w, H = size.h
  const fns = { plain: layoutPlain, torn: layoutTorn, split: layoutSplit, silhouette: layoutSilhouette }
  const title = (fns[spec.layout] ?? layoutPlain)(ctx, W, H, spec, assets, unit, r)
  if (spec.grain) addGrain(ctx, W, H, r, 9)
  return { spec, title }
}

// ---------- asset loading (browser) ----------
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image(); img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img); img.onerror = () => reject(new Error('Could not load ' + src))
    img.src = src
  })
}
// "webflow" → Simple Icons (CC0 brand marks); anything with a slash or extension is treated as a path/URL.
export function logoUrl(ref) {
  if (/[/.]/.test(ref)) return ref
  return `https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/${encodeURIComponent(ref.trim().toLowerCase())}.svg`
}
// "path#x,y,w,h" crops a source image (fractions of its width/height), e.g. a portrait out of a slide.
export async function loadCropped(ref) {
  // trailing @raw / @bottom / @blue are roles the collage reads; they are not part of the path
  const roles = []
  let rest = String(ref).trim()
  for (let m; (m = rest.match(/@(raw|bottom|blue)$/)); rest = rest.slice(0, m.index)) roles.push(m[1])
  const [src, frag] = rest.split('#')
  const img = await loadImage(src)
  img.roles = roles
  const c = (frag ?? '').split(',').map(Number)
  if (c.length !== 4 || c.some((n) => !Number.isFinite(n))) return img
  const { w, h } = srcSize(img)
  const out = makeCanvas(w * c[2], h * c[3])
  out.getContext('2d').drawImage(img, -w * c[0], -h * c[1], w, h)
  out.roles = roles
  return out
}
export async function loadAssets({ mark = '/public/ebaq-mark-one-color.svg', images = [], logos = [], shape = null } = {}) {
  const safe = (p) => p.catch((e) => { console.warn(e.message); return null })
  const [m, imgs, lgs, sh] = await Promise.all([
    mark ? safe(loadImage(mark)) : null,
    Promise.all(images.map((s) => safe(loadCropped(s)))),
    Promise.all(logos.map((s) => safe(loadImage(logoUrl(s))))),
    shape ? safe(loadImage(shape)) : null,
  ])
  return { mark: m, images: imgs.filter(Boolean), logos: lgs.filter(Boolean), shape: sh }
}
