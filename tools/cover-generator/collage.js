// Ebaqdesign collage covers — an element kit on top of cover.js.
//
// A collage = a grid ground + a seeded arrangement of brand elements:
//   hero    the big blue-grid cut-out with torn edges (bust, slab, circle, arrow, burst, or a supplied PNG shape)
//   logo    brand marks, bare in one ink colour or on a cut paper chip
//   photo   B/W halftone / photocopy images: cut-outs stay cut out, rectangles become torn clippings
//   title   optional: label-maker strips, a torn sheet, or bare type (covers work without a title too)
//   note    post-it notes with a short line of text
//   label   the category on a label-maker strip
//   extras  tape, a marker scribble, a white tear in the hero
// Colours come only from the brand palette. The seed (the post slug) fixes the whole arrangement,
// and spec.tweaks[id] = { dx, dy, rot, scale, hidden } nudges single elements (the UI writes these).

import {
  COLORS, TITLE_FONT, MONO_FONT, hashSeed, mulberry32, pick, range, weighted, coverTitle,
  makeCanvas, srcSize, tint, hasTransparentCorners, drawMat, setTitleFont, fitTitle, drawFooter, addGrain,
} from './cover.js'

export const TONES = {
  white: { bg: '#FFFFFF', ink: '#000000' },
  gray: { bg: '#E5E5E5', ink: '#000000' },
  almond: { bg: '#F9EECE', ink: '#000000' },
  lavender: { bg: '#CCEFFC', ink: '#000000' },
  sand: { bg: '#FED440', ink: '#000000' },
  rose: { bg: '#F9E0E9', ink: '#000000' },
  mint: { bg: '#D7E9E3', ink: '#000000' },
  green: { bg: '#6CB181', ink: '#000000' },
  red: { bg: '#C8344B', ink: '#FFFFFF' },
  black: { bg: '#000000', ink: '#FFFFFF' },
  blue: { bg: '#00AFEC', ink: '#000000' },
  'blue-grid': { bg: '#00AFEC', ink: '#000000', line: 'rgba(255,255,255,0.5)' },
  'white-grid': { bg: '#FFFFFF', ink: '#000000', line: 'rgba(0,175,236,0.55)' },
  'black-grid': { bg: '#000000', ink: '#FFFFFF', line: 'rgba(255,255,255,0.22)' },
}
const GROUND = {
  white: { bg: '#FFFFFF', line: 'rgba(0,0,0,0.09)', step: 0.6, ink: '#000000', hero: 'blue-grid' },
  blue: { bg: '#00AFEC', line: 'rgba(255,255,255,0.5)', step: 0.8, ink: '#000000', hero: 'white-grid' },
  black: { bg: '#000000', line: 'rgba(255,255,255,0.14)', step: 0.6, ink: '#FFFFFF', hero: 'blue-grid' },
}
export const HEROES = ['bust', 'slab', 'circle', 'arrow', 'burst']
export const TITLE_STYLES = ['none', 'strips', 'sheet', 'bare']
export const TREATMENTS = ['grain', 'halftone', 'copy', 'mono', 'duotone', 'tint']
// Secondary palette (Figma colour board): three full colours and their pale partners.
export const FULL = ['green', 'red', 'sand'], PALE = ['lavender', 'mint', 'rose', 'almond']
export const STYLES = ['cutout', 'blocks', 'overlap']

// tweaks[id].v counts double-clicks on a piece: every random stream that belongs to that piece gets a new seed,
// so its rips, dot pattern or scribble change while the rest of the cover stays put.
let variants = {}
const variantOf = (id) => { for (const k in variants) if (id.startsWith(k) && !/\d/.test(id[k.length] ?? '')) return variants[k]; return 0 }
const rng = (seed, id) => { const v = variantOf(String(id)); return mulberry32(hashSeed(seed + '|' + id + (v ? '|v' + v : ''))) }
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

// ---------- paper ----------
// Subdivides a polygon and pushes the points around, so straight edges look torn by hand.
function edgePts(r, [x0, y0], [x1, y1], u, amount = 1) {
  const out = []
  const len = Math.hypot(x1 - x0, y1 - y0)
  if (len < 0.01) return out
  const n = Math.max(1, Math.round(len / (u * 0.16)))
  const nx = -(y1 - y0) / len, ny = (x1 - x0) / len
  const ph = [r() * 6.28, r() * 6.28], fr = [range(r, 0.6, 1.8), range(r, 3, 7)]
  for (let k = 0; k < n; k++) {
    const t = k / n
    let d = u * 0.16 * Math.sin(t * 6.28 * fr[0] + ph[0]) + u * 0.06 * Math.sin(t * 6.28 * fr[1] + ph[1]) + (r() - 0.5) * u * 0.14
    if (r() < 0.05) d += (r() - 0.5) * u * 0.45
    d *= amount * Math.min(1, 4 * t * (1 - t) + 0.35)
    out.push([x0 + (x1 - x0) * t + nx * d, y0 + (y1 - y0) * t + ny * d])
  }
  return out
}
function tear(r, pts, u, amount = 1) {
  return pts.flatMap((p, i) => edgePts(r, p, pts[(i + 1) % pts.length], u, amount))
}
function toPath(pts) {
  const p = new Path2D()
  pts.forEach(([x, y], i) => (i ? p.lineTo(x, y) : p.moveTo(x, y)))
  p.closePath()
  return p
}
// A rectangular scrap centred on 0,0. edges = [top, right, bottom, left]: true tears that side, false cuts it.
function scrapPath(r, w, h, u, edges) {
  const k = () => (r() - 0.5) * u * 0.1
  const c = [[-w / 2 + k(), -h / 2 + k()], [w / 2 + k(), -h / 2 + k()], [w / 2 + k(), h / 2 + k()], [-w / 2 + k(), h / 2 + k()]]
  let pts = []
  for (let i = 0; i < 4; i++) {
    pts = pts.concat(edges[i] ? edgePts(r, c[i], c[(i + 1) % 4], u) : [c[i]])
  }
  return toPath(pts)
}
function gridLines(ctx, line, step, box, lw) {
  ctx.strokeStyle = line; ctx.lineWidth = lw
  for (let x = Math.ceil(box.x / step) * step; x <= box.x + box.w; x += step) { ctx.beginPath(); ctx.moveTo(x, box.y); ctx.lineTo(x, box.y + box.h); ctx.stroke() }
  for (let y = Math.ceil(box.y / step) * step; y <= box.y + box.h; y += step) { ctx.beginPath(); ctx.moveTo(box.x, y); ctx.lineTo(box.x + box.w, y); ctx.stroke() }
}
function speckle(ctx, r, u, w, h, color = 'rgba(0,0,0,0.06)') {
  const n = Math.round((w * h) / (u * u) * 5)
  ctx.fillStyle = color
  for (let i = 0; i < n; i++) { const s = range(r, 0.6, 2) * (u / 60); ctx.fillRect((r() - 0.5) * w, (r() - 0.5) * h, s, s) }
}
// Fills a path with a paper tone (plus its grid), a soft shadow, paper speckle and the white torn rim.
function paper(ctx, r, u, path, tone, w, h, { shadow = true, rim = true, paint } = {}) {
  const t = TONES[tone] ?? TONES.white
  ctx.save()
  if (shadow) { ctx.shadowColor = 'rgba(0,0,0,0.26)'; ctx.shadowBlur = u * 0.3; ctx.shadowOffsetX = u * 0.04; ctx.shadowOffsetY = u * 0.09 }
  ctx.fillStyle = t.bg; ctx.fill(path)
  ctx.restore()
  ctx.save()
  ctx.clip(path)
  if (t.line) gridLines(ctx, t.line, u * 0.8, { x: -w / 2 - u, y: -h / 2 - u, w: w + u * 2, h: h + u * 2 }, Math.max(1, u / 30))
  speckle(ctx, r, u, w, h, t.ink === '#FFFFFF' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)')
  paint?.(t)
  ctx.restore()
  if (rim && tone !== 'white') { ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = u * 0.05; ctx.stroke(path); ctx.restore() }
}
function tape(ctx, r, u, x, y, w, rot) {
  const h = u * 0.62
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  ctx.shadowColor = 'rgba(0,0,0,0.18)'; ctx.shadowBlur = u * 0.12; ctx.shadowOffsetY = u * 0.03
  ctx.fillStyle = 'rgba(249,238,206,0.82)'
  ctx.beginPath()
  const z = 5
  ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(w / 2, -h / 2)
  for (let i = 1; i <= z; i++) ctx.lineTo(w / 2 + (i % 2 ? u * 0.07 : 0), -h / 2 + (h * i) / z)
  ctx.lineTo(-w / 2, h / 2)
  for (let i = z - 1; i >= 0; i--) ctx.lineTo(-w / 2 - (i % 2 ? u * 0.07 : 0), -h / 2 + (h * i) / z)
  ctx.closePath(); ctx.fill()
  ctx.restore()
}

// ---------- image treatments ----------
const cache = new WeakMap()
// halftone: print dots · copy: noisy 1-bit photocopy · mono / duotone: continuous tone.
// Cut-outs (transparent corners) keep their outline and get a paper backing so they read as printed scraps.
function treat(img, mode, w, h, u, seed, { ink = '#000000', paperTone = '#FFFFFF', fit = 'cover' } = {}) {
  w = Math.max(4, Math.round(w)); h = Math.max(4, Math.round(h))
  const key = [mode, w, h, seed, ink, paperTone, fit].join('|')
  let m = cache.get(img); if (!m) cache.set(img, (m = new Map()))
  if (m.has(key)) return m.get(key)
  const r = rng(seed, 'treat')
  const { w: iw, h: ih } = srcSize(img)
  const draw = (c, cw, ch) => {
    const s = fit === 'cover' ? Math.max(cw / iw, ch / ih) : Math.min(cw / iw, ch / ih)
    c.getContext('2d', { willReadFrequently: true }).drawImage(img, (cw - iw * s) / 2, (ch - ih * s) / 2, iw * s, ih * s)
  }
  const out = makeCanvas(w, h); const o = out.getContext('2d')
  if (mode === 'color') { draw(out, w, h); m.set(key, out); return out }
  const [ir, ig, ib] = hex(ink), [pr, pg, pb] = hex(paperTone)
  const read = (c) => {
    const x = c.getContext('2d', { willReadFrequently: true })
    const id = x.getImageData(0, 0, c.width, c.height); const d = id.data
    const L = new Float32Array(c.width * c.height); let sum = 0, n = 0
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const a = d[i + 3] / 255
      L[p] = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) * a + 255 * (1 - a)
      if (a > 0.4) { sum += L[p]; n++ }
    }
    const mean = sum / Math.max(1, n)
    for (let p = 0; p < L.length; p++) L[p] = clamp((L[p] - mean) * (mode === 'grain' || mode === 'tint' ? 1.08 : 1.35) + mean, 0, 255)
    return { x, id, d, L, mean }
  }
  if (mode === 'copy') {
    const g = Math.max(1, u * 0.035)
    const c = makeCanvas(w / g, h / g); draw(c, c.width, c.height)
    const { x, id, d, L, mean } = read(c)
    const level = clamp(mean * 0.92, 80, 165)
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const on = L[p] + (r() - 0.5) * 120 < level
      d[i] = on ? ir : pr; d[i + 1] = on ? ig : pg; d[i + 2] = on ? ib : pb
      d[i + 3] = d[i + 3] > 100 ? 255 : 0
    }
    x.putImageData(id, 0, 0)
    o.imageSmoothingEnabled = false
    o.drawImage(c, 0, 0, w, h)
  } else if (mode === 'halftone') {
    const c = makeCanvas(w, h); draw(c, w, h)
    const { d, L } = read(c)
    o.drawImage(tint(c, paperTone, w, h), 0, 0)
    o.fillStyle = ink
    const cell = Math.max(3, u * 0.105)
    for (let row = 0, y = cell / 2; y < h; y += cell * 0.866, row++) {
      for (let xx = (row % 2 ? cell : cell / 2); xx < w; xx += cell) {
        const p = Math.floor(y) * w + Math.floor(xx)
        if (d[p * 4 + 3] < 100) continue
        const rad = cell * 0.74 * Math.sqrt(1 - L[p] / 255)
        if (rad < cell * 0.07) continue
        o.beginPath(); o.arc(xx, y, rad, 0, 6.2832); o.fill()
      }
    }
  } else {
    const c = makeCanvas(w, h); draw(c, w, h)
    const { x, id, d, L } = read(c)
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const t = L[p] / 255
      if (mode === 'duotone') {
        const [a, b, k] = t < 0.55 ? [[0, 0, 0], [0, 175, 236], t / 0.55] : [[0, 175, 236], [204, 239, 252], (t - 0.55) / 0.45]
        d[i] = a[0] + (b[0] - a[0]) * k; d[i + 1] = a[1] + (b[1] - a[1]) * k; d[i + 2] = a[2] + (b[2] - a[2]) * k
      } else if (mode === 'tint') {
        const k = clamp(0.4 + 0.6 * t + (r() - 0.5) * 0.14, 0, 1)
        d[i] = 0; d[i + 1] = 175 * k; d[i + 2] = 236 * k
      } else { d[i] = d[i + 1] = d[i + 2] = L[p] + (r() - 0.5) * (mode === 'grain' ? 64 : 26) }
    }
    x.putImageData(id, 0, 0)
    o.drawImage(c, 0, 0)
  }
  m.set(key, out)
  return out
}

// ---------- hero cut-out ----------
function heroPoints(kind, r, s) {
  const pts = []
  const arc = (cx, cy, rx, ry, a0, a1, n = 28) => { for (let i = 0; i <= n; i++) { const a = a0 + ((a1 - a0) * i) / n; pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]) } }
  if (kind === 'circle') arc(0, 0, s * 0.42, s * 0.42, 0, Math.PI * 2, 48)
  else if (kind === 'slab') {
    const k = range(r, 0.16, 0.3)
    pts.push([-s * 0.3 + s * k, -s * 0.56], [s * 0.34 + s * k, -s * 0.56], [s * 0.3 - s * k, s * 0.56], [-s * 0.34 - s * k, s * 0.56])
  } else if (kind === 'arrow') {
    pts.push([-s * 0.5, -s * 0.14], [s * 0.08, -s * 0.14], [s * 0.08, -s * 0.36], [s * 0.5, 0], [s * 0.08, s * 0.36], [s * 0.08, s * 0.14], [-s * 0.5, s * 0.14])
  } else if (kind === 'burst') {
    const n = 14
    for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, rad = s * (i % 2 ? 0.34 : 0.46); pts.push([Math.cos(a) * rad, Math.sin(a) * rad]) }
  } else {
    // bust: head, neck and shoulders rising from the bottom edge, as one outline
    const hr = s * 0.17, hy = -s * 0.2, hx = range(r, -0.2, 0.2) * hr, top = s * 0.14, sw = s * 0.62
    pts.push([-sw / 2, s * 0.56], [-sw / 2, top + s * 0.1], [-sw * 0.42, top + s * 0.02], [-sw * 0.24, top - s * 0.02], [-hr * 0.45, top - s * 0.05], [-hr * 0.42, hy + hr * 0.8])
    arc(hx, hy, hr * 0.88, hr * 1.08, Math.PI * 0.72, Math.PI * 2.28, 30)
    pts.push([hr * 0.42, hy + hr * 0.8], [hr * 0.45, top - s * 0.05], [sw * 0.24, top - s * 0.02], [sw * 0.42, top + s * 0.02], [sw / 2, top + s * 0.1], [sw / 2, s * 0.56])
  }
  return pts
}
function drawHero(ctx, r, u, o) {
  const { s, kind, tone, shape, hole } = o
  const t = TONES[tone]
  if (shape) {
    // a supplied silhouette PNG: tint it, then lay the grid over it
    const { w, h } = srcSize(shape); const k = s / h
    const c = makeCanvas(w * k, s); const x = c.getContext('2d')
    x.drawImage(shape, 0, 0, c.width, c.height)
    x.globalCompositeOperation = 'source-in'; x.fillStyle = t.bg; x.fillRect(0, 0, c.width, c.height)
    x.globalCompositeOperation = 'source-atop'
    gridLines(x, t.line ?? 'rgba(0,0,0,0)', u * 0.8, { x: 0, y: 0, w: c.width, h: c.height }, Math.max(1, u / 30))
    ctx.drawImage(c, -c.width / 2, -s / 2)
    return
  }
  const path = toPath(tear(r, heroPoints(kind, r, s), u, kind === 'burst' ? 0.5 : 1))
  paper(ctx, r, u, path, tone, s * 1.2, s * 1.2, { shadow: false, rim: false })
  if (hole) {
    const hs = s * range(r, 0.12, 0.17)
    const blob = []
    for (let i = 0; i < 9; i++) { const a = (i / 9) * 6.28, rad = hs * range(r, 0.55, 1.25); blob.push([Math.cos(a) * rad * 0.6, Math.sin(a) * rad]) }
    ctx.save(); ctx.translate(s * range(r, -0.08, 0.12), s * range(r, 0.12, 0.3)); ctx.rotate(range(r, -0.6, 0.6))
    ctx.fillStyle = tone === 'white-grid' ? COLORS.black : COLORS.white
    ctx.fill(toPath(tear(r, blob, u, 0.8)))
    ctx.restore()
  }
}

// ---------- text pieces ----------
function inkWear(ctx, r, u, w, h, color) {
  const n = Math.round((w * h) / (u * u) * 16)
  ctx.fillStyle = color
  for (let i = 0; i < n; i++) { const s = range(r, 0.5, 1.7) * (u / 60); ctx.fillRect((r() - 0.5) * w, (r() - 0.5) * h, s, s) }
}
function mono(ctx, size, spacing = 0.12) {
  ctx.font = `500 ${size}px ${MONO_FONT}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${(spacing * size).toFixed(2)}px`
}

// ---------- composition ----------
// Returns the resolved spec and the element list (z-sorted, tweaks applied). Each element draws around 0,0.
export function composeCollage(ctx, raw, assets, W, H) {
  const u = H / 18
  const seed = String(raw.seed ?? raw.title ?? 'ebaq')
  variants = Object.fromEntries(Object.entries(raw.tweaks ?? {}).filter(([, t]) => t?.v).map(([k, t]) => [k, t.v]))
  const r = rng(seed, 'compose')
  const photos = assets.images ?? [], logos = assets.logos ?? []
  const notes = (raw.notes ?? []).filter(Boolean)
  const auto = (v) => v == null || v === 'auto'
  // fixed number of rolls, so overriding one option never reshuffles the others
  const roll = {
    ground: weighted(r, logos.length && !photos.length ? [['white', 5], ['blue', 2], ['black', 1]] : [['white', 4], ['blue', 3], ['black', 2]]),
    hero: weighted(r, [['bust', 3], ['slab', 3], ['circle', 2], ['arrow', 1], ['burst', 2]]),
    side: r() < 0.5 ? 'left' : 'right',
    strips: r() < 0.6, sheetTone: r() < 0.5, hole: r() < 0.6, scribble: r() < 0.6, heroX: range(r, -1, 1), tilt: range(r, -1, 1),
  }
  const title = coverTitle(raw.title ?? '')
  const style = STYLES.includes(raw.style) ? raw.style : 'overlap'
  const titleStyle = !title || style === 'blocks' ? 'none' : auto(raw.titleStyle) ? (style === 'overlap' ? 'strips' : 'none') : raw.titleStyle
  const n = photos.length + logos.length
  const spec = {
    layout: 'collage', title, category: raw.category ?? '', seed,
    ground: raw.ground === 'deals' ? 'black' : auto(raw.ground) ? 'blue' : raw.ground,
    deals: raw.ground === 'deals',
    hero: auto(raw.hero) ? (style === 'overlap' ? 'auto' : roll.hero) : raw.hero,
    titleStyle,
    titlePos: titleStyle === 'none' ? 'none' : auto(raw.titlePos) ? (style === 'cutout' && (n === 0 || n > 6) ? 'center' : roll.side) : raw.titlePos,
    style, plain: raw.plain ?? false, secondary: (raw.secondary ?? (raw.accent2 && raw.accent2 !== 'none' ? [raw.accent2] : [])).filter((t) => TONES[t]), colors: raw.colors ?? null, cols: raw.cols ?? null,
    treat: auto(raw.imageMode) ? (style === 'cutout' ? 'halftone' : 'color') : raw.imageMode,
    logoStyle: auto(raw.logoStyle) ? 'bare' : raw.logoStyle,
    noteTone: auto(raw.noteTone) ? 'lavender' : raw.noteTone,
    mat: raw.mat ?? false, decor: raw.decor ?? true, kicker: raw.kicker ?? titleStyle !== 'none',
    footer: raw.footer ?? titleStyle !== 'none', grain: raw.grain ?? true, titleScale: Number(raw.titleScale ?? 1),
    notes, noteCount: Math.max(0, Math.min(3, Number(raw.noteCount ?? 0))), tweaks: raw.tweaks ?? {}, place: raw.place ?? {},
  }
  const g = GROUND[spec.ground]
  const els = []
  const add = (e) => els.push({ rot: 0, scale: 1, z: 0, ...e })

  // --- where the title goes, and the region left for logos and photos ---
  let tr = null, ir = { x: W * 0.04, y: H * 0.07, w: W * 0.92, h: H * 0.86 }
  if (style === 'blocks') { composeBlocks({ spec, add, seed, u, W, H, photos, logos, g }); return finish() }
  if (spec.titlePos === 'left') { tr = { x: W * 0.055, y: H * 0.16, w: W * 0.44, h: H * 0.66 }; ir = { x: W * 0.53, y: H * 0.06, w: W * 0.44, h: H * 0.88 } }
  else if (spec.titlePos === 'right') { tr = { x: W * 0.505, y: H * 0.16, w: W * 0.44, h: H * 0.66 }; ir = { x: W * 0.03, y: H * 0.06, w: W * 0.44, h: H * 0.88 } }
  else if (spec.titlePos === 'center') tr = { x: W * 0.2, y: H * 0.22, w: W * 0.6, h: H * 0.56 }

  // the overlap stack moves aside and shrinks a little when a title sits next to it
  const beside = spec.titlePos === 'left' || spec.titlePos === 'right'
  if (style === 'overlap') composeOverlap({ spec, add, seed, u, W, H, photos, logos, g, shape: assets.shape, ox: beside ? ir.x + ir.w / 2 : W / 2, s: beside ? 0.74 : 1 })

  // --- hero cut-out ---
  if (style === 'cutout' && spec.hero !== 'none' && spec.decor) {
    const tall = assets.shape || spec.hero === 'bust' || spec.hero === 'slab'
    const hs = spec.titlePos === 'none' ? H * (tall ? 1.02 : 0.84) : H * 0.8
    const onBottom = assets.shape || spec.hero === 'bust'
    const cx = spec.titlePos === 'center' ? W * (roll.side === 'left' ? 0.13 : 0.87) : ir.x + ir.w / 2 + roll.heroX * ir.w * 0.07
    add({
      id: 'hero', type: 'hero', z: spec.titlePos === 'none' ? 3 : 1, cx, cy: onBottom ? H - hs * 0.5 + (assets.shape ? 0 : hs * 0.06) : H * 0.52,
      rot: onBottom ? 0 : roll.tilt * 0.12, w: assets.shape ? (hs * srcSize(assets.shape).w) / srcSize(assets.shape).h : hs * (tall ? 0.66 : 0.9), h: hs * (tall ? 1 : 0.9),
      draw: (c) => drawHero(c, rng(seed, 'hero'), u, { s: hs, kind: spec.hero, tone: g.hero, shape: assets.shape, hole: roll.hole && !assets.shape }),
    })
  }

  // --- logos and photos on a jittered grid (or a ring around a centred title) ---
  const role = (img, name) => !!img.roles?.includes(name)
  const items = [...photos.map((img, i) => ({ kind: 'photo', img, i })), ...logos.map((img, i) => ({ kind: 'logo', img, i }))].filter((it) => !role(it.img, 'bottom'))
  if (style === 'cutout') photos.forEach((img, i) => {
    if (!role(img, 'bottom')) return
    const { w: iw, h: ih } = srcSize(img), h = (W * ih) / iw, id = `photo-${i}`
    add({ id, type: 'photo', z: 2.5, cx: W / 2, cy: H - h / 2, w: W, h, draw: (c) => c.drawImage(role(img, 'raw') && !spec.tweaks[id]?.treatment ? img : treat(img, spec.tweaks[id]?.treatment ?? spec.treat, W, h, u, seed + id, { fit: 'contain' }), -W / 2, -h / 2, W, h) })
  })
  if (n && style === 'cutout') {
    const ring = spec.titlePos === 'center'
    const ra = ir.w / ir.h
    const cols = Math.max(1, Math.round(Math.sqrt(n * ra))), rows = Math.ceil(n / cols)
    const cw = ir.w / cols, ch = ir.h / rows
    const cells = []
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) cells.push([i, j])
    for (let i = cells.length - 1; i > 0; i--) { const k = Math.floor(r() * (i + 1)); [cells[i], cells[k]] = [cells[k], cells[i]] }
    const start = r() * 6.28
    items.forEach((it, idx) => {
      const id = `${it.kind}-${it.i}`
      const er = rng(seed, id)
      let cx, cy, bw, bh
      if (ring) {
        const a = start + ((idx + range(er, -0.2, 0.2)) / n) * 6.2832
        cx = W / 2 + Math.cos(a) * W * 0.41; cy = H / 2 + Math.sin(a) * H * 0.4
        bw = W * 0.2; bh = H * 0.3
      } else {
        const [ci, cj] = cells[idx]
        cx = ir.x + (ci + 0.5 + range(er, -0.14, 0.14)) * cw; cy = ir.y + (cj + 0.5 + range(er, -0.14, 0.14)) * ch
        bw = cw; bh = ch
        const hero = els.find((e) => e.id === 'hero')
        if (hero && spec.titlePos === 'none' && Math.abs(cx - hero.cx) < hero.w * 0.42) cx = hero.cx + (cx < hero.cx ? -1 : 1) * hero.w * range(er, 0.42, 0.56)
      }
      const { w: iw, h: ih } = srcSize(it.img)
      if (it.kind === 'logo') {
        const chip = spec.logoStyle === 'chip'
        const k = Math.min((bw * (chip ? 0.66 : 0.88)) / iw, (bh * (chip ? 0.4 : 0.52)) / ih, (H * 0.24) / ih)
        const lw = iw * k, lh = ih * k, pad = Math.min(bw, bh) * 0.11
        const tone = spec.ground === 'white' && er() < 0.35 ? 'black' : 'white'
        add({
          id, type: 'logo', z: chip ? 5 : 2, cx, cy, rot: range(er, -1, 1) * (chip ? 0.1 : 0.035), w: lw + (chip ? pad * 2 : 0), h: lh + (chip ? pad * 2 : 0),
          draw: (c) => {
            if (chip) paper(c, rng(seed, id + 'p'), u, scrapPath(rng(seed, id + 's'), lw + pad * 2, lh + pad * 2, u, [false, false, false, false]), tone, lw + pad * 2, lh + pad * 2)
            c.drawImage(tint(it.img, chip ? TONES[tone].ink : g.ink, lw, lh), -lw / 2, -lh / 2, lw, lh)
          },
        })
      } else {
        const raw = role(it.img, 'raw'), blue = role(it.img, 'blue')
        const cut = hasTransparentCorners(it.img) || raw || blue
        const a = cut ? iw / ih : clamp(iw / ih, 0.72, 1.5)
        const k = (n === 1 ? 0.86 : 1.12) * (cut ? 1.15 : 1)
        let pw = bw * k, ph = pw / a
        if (ph > bh * k) { ph = bh * k; pw = ph * a }
        const edges = [er() < 0.35, er() < 0.5, er() < 0.7, er() < 0.4]
        const taped = !cut && er() < 0.55, tapeRot = range(er, -0.25, 0.25)
        add({
          id, type: 'photo', z: 4, cx, cy, rot: range(er, -1, 1) * 0.09, w: pw, h: ph,
          draw: (c) => {
            if (blue) return drawHero(c, rng(seed, id), u, { s: ph, tone: g.hero, shape: it.img })
            if (raw) return c.drawImage(it.img, -pw / 2, -ph / 2, pw, ph)
            const img = treat(it.img, spec.treat, pw, ph, u, seed + id, { fit: cut ? 'contain' : 'cover' })
            if (cut) { c.drawImage(img, -pw / 2, -ph / 2); return }
            paper(c, rng(seed, id + 'p'), u, scrapPath(rng(seed, id + 's'), pw, ph, u, edges), 'white', pw, ph, { paint: () => c.drawImage(img, -pw / 2, -ph / 2) })
            if (taped && spec.decor) tape(c, rng(seed, id + 't'), u, 0, -ph / 2 + u * 0.05, u * 2.2, tapeRot)
          },
        })
      }
    })
  }

  // --- title ---
  if (tr) {
    const centered = spec.titlePos === 'center'
    const style = spec.titleStyle
    const tone = style === 'sheet' ? (spec.ground === 'white' ? (roll.sheetTone ? 'almond' : 'blue') : roll.sheetTone ? 'white' : 'almond')
      : style === 'strips' ? (spec.ground === 'black' ? 'white' : 'black') : null
    const ink = tone ? TONES[tone].ink : g.ink
    const padIn = style === 'sheet' ? u * 1.1 : 0
    const pitch = style === 'strips' ? 1.2 : 1
    const t = fitTitle(ctx, title, tr.w * (style === 'bare' ? 1 : 0.9) - padIn * 2, tr.h * 0.86 - padIn * 2, { maxLines: 4, maxSize: H * 0.15 * spec.titleScale, lh: pitch })
    setTitleFont(ctx, t.size)
    const widths = t.lines.map((l) => ctx.measureText(l).width)
    const tw = Math.max(...widths), th = t.lines.length * t.size * pitch
    const bw = tw + (style === 'strips' ? t.size * 0.6 : padIn * 2), bh = th + padIn * 2
    const cx = centered ? tr.x + tr.w / 2 : tr.x + bw / 2, cy = tr.y + tr.h / 2 + (spec.kicker && spec.category ? u * 0.4 : 0)
    const tRng = rng(seed, 'title')
    const jit = t.lines.map(() => [range(tRng, -1, 1), range(tRng, -1, 1), tRng() < 0.3])
    const sheetEdges = [tRng() < 0.3, tRng() < 0.6, tRng() < 0.6, tRng() < 0.3]
    add({
      id: 'title', type: 'title', z: 7, cx, cy, rot: style === 'sheet' ? roll.tilt * 0.035 : 0, w: bw, h: bh,
      draw: (c) => {
        const line = (text, x, y, color) => { setTitleFont(c, t.size); c.textAlign = centered ? 'center' : 'left'; c.textBaseline = 'alphabetic'; c.fillStyle = color; c.fillText(text, x, y) }
        const x0 = centered ? 0 : -bw / 2
        if (style === 'sheet') {
          paper(c, rng(seed, 'sheet'), u, scrapPath(rng(seed, 'sheet-s'), bw, bh, u, sheetEdges), tone, bw, bh, {
            paint: () => { t.lines.forEach((l, i) => line(l, centered ? 0 : x0 + padIn, -th / 2 + (i + 0.8) * t.size, ink)); inkWear(c, rng(seed, 'wear'), u, bw, bh, TONES[tone].bg) },
          })
          if (spec.decor) tape(c, rng(seed, 'sheet-t'), u, range(rng(seed, 'sheet-tx'), -0.3, 0.3) * bw, -bh / 2, u * 2.6, range(rng(seed, 'sheet-tr'), -0.12, 0.12))
        } else if (style === 'strips') {
          t.lines.forEach((l, i) => {
            const sw = widths[i] + t.size * 0.6, sh = t.size * 1.26
            const sx = (centered ? 0 : x0 + sw / 2) + jit[i][0] * t.size * 0.1, sy = -th / 2 + (i + 0.5) * t.size * pitch
            c.save(); c.translate(sx, sy); c.rotate(jit[i][1] * 0.022)
            paper(c, rng(seed, 'strip' + i), u, scrapPath(rng(seed, 'strip-s' + i), sw, sh, u, [false, jit[i][2], false, false]), tone, sw, sh, {
              rim: false, paint: () => { line(l, centered ? 0 : -sw / 2 + t.size * 0.3, t.size * 0.35, ink); inkWear(c, rng(seed, 'wear' + i), u, sw, sh, TONES[tone].bg) },
            })
            c.restore()
          })
        } else t.lines.forEach((l, i) => line(l, x0, -th / 2 + (i + 0.8) * t.size, ink))
      },
    })
    if (spec.kicker && spec.category) {
      const size = u * 0.42
      mono(ctx, size)
      const text = spec.category.toUpperCase()
      const lw = ctx.measureText(text).width + u * 0.8, lh = u * 0.98
      const lt = spec.ground === 'black' || tone === 'black' ? 'white' : 'black'
      add({
        id: 'label', type: 'label', z: 8, follow: 'title', cx: centered ? cx : cx - bw / 2 + lw / 2 + (style === 'sheet' ? u * 0.6 : 0), cy: cy - bh / 2 - (style === 'sheet' ? 0 : u * 0.85),
        rot: -0.025, w: lw, h: lh,
        draw: (c) => paper(c, rng(seed, 'label'), u, scrapPath(rng(seed, 'label-s'), lw, lh, u, [false, false, false, false]), lt, lw, lh, {
          rim: false, paint: (tt) => { mono(c, size); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = tt.ink; c.fillText(text, u * 0.03, u * 0.03) },
        }),
      })
    }
  }

  // --- post-it notes ---
  const activeNotes = notes.slice(0, 3)
  while (activeNotes.length < spec.noteCount) activeNotes.push('')
  const noteOrder = [[W * 0.84, H * 0.22], [W * 0.16, H * 0.78], [W * 0.84, H * 0.78], [W * 0.16, H * 0.22]]
  const nr = rng(seed, 'note-spots')
  for (let i = noteOrder.length - 1; i > 0; i--) { const k = Math.floor(nr() * (i + 1)); [noteOrder[i], noteOrder[k]] = [noteOrder[k], noteOrder[i]] }
  activeNotes.forEach((text, i) => {
    const er = rng(seed, 'note' + i)
    const s = u * 3.7
    const spots = tr && spec.titlePos !== 'center'
      ? [[tr.x + tr.w * (spec.titlePos === 'left' ? 0.88 : 0.12), H * 0.15], [tr.x + tr.w * (spec.titlePos === 'left' ? 0.84 : 0.16), H * 0.76], [ir.x + ir.w / 2, H * 0.5]]
      : noteOrder
    const [bx, by] = spots[i]
    const cx = tr && spec.titlePos !== 'center' ? bx : clamp(bx + range(er, -0.04, 0.04) * W, s / 2 + W * 0.04, W - s / 2 - W * 0.04)
    const cy = tr && spec.titlePos !== 'center' ? by : clamp(by + range(er, -0.04, 0.04) * H, s / 2 + H * 0.05, H - s / 2 - H * 0.05)
    add({
      id: `note-${i}`, type: 'note', z: 6, cx, cy, rot: range(er, -1, 1) * 0.12, w: s, h: s,
      draw: (c) => {
        const pr = rng(seed, 'note-p' + i)
        paper(c, pr, u, scrapPath(rng(seed, 'note-s' + i), s, s, u, [false, false, false, false]), spec.noteTone, s, s, {
          rim: false, paint: (tt) => {
            c.fillStyle = 'rgba(0,0,0,0.05)'; c.fillRect(-s / 2, -s / 2, s, s * 0.16)
            const trimmed = String(text).trim()
            if (!trimmed) return
            const words = trimmed.split(/\s+/)
            let size = u * 0.72, lines = []
            for (; size > u * 0.3; size -= 1) {
              mono(c, size, 0)
              lines = []; let ln = ''
              for (const wd of words) { const tst = ln ? ln + ' ' + wd : wd; if (c.measureText(tst).width <= s * 0.78 || !ln) ln = tst; else { lines.push(ln); ln = wd } }
              lines.push(ln)
              if (lines.length * size * 1.25 <= s * 0.66 && lines.every((l) => c.measureText(l).width <= s * 0.8)) break
            }
            c.fillStyle = tt.ink; c.textAlign = 'left'; c.textBaseline = 'alphabetic'
            lines.forEach((l, k) => c.fillText(l, -s * 0.39, -s * 0.2 + (k + 0.8) * size * 1.25))
          },
        })
      },
    })
  })

  // --- marker scribble around one logo ---
  if (style === 'cutout' && spec.decor && roll.scribble && logos.length) {
    const target = els.find((e) => e.id === `logo-${Math.floor(r() * logos.length)}`)
    if (target) add({
      id: 'scribble', type: 'scribble', z: 9, follow: target.id, cx: target.cx, cy: target.cy, rot: target.rot, w: target.w * 1.3, h: target.h * 1.7,
      draw: (c) => {
        const er = rng(seed, 'scribble')
        const rx = target.w * 0.62, ry = Math.max(target.h * 0.85, u * 0.9), st = er() * 6.28, ph = er() * 6.28
        c.strokeStyle = spec.ground === 'blue' ? COLORS.black : COLORS.blue; c.lineWidth = u * 0.1; c.lineCap = 'round'; c.lineJoin = 'round'
        c.beginPath()
        for (let i = 0; i <= 140; i++) {
          const a = st + (i / 140) * 6.2832 * 2.1, k = 1 + (i / 140) * 0.09 + 0.03 * Math.sin(a * 3 + ph)
          const px = Math.cos(a) * rx * k, py = Math.sin(a) * ry * (2 - k)
          i ? c.lineTo(px, py) : c.moveTo(px, py)
        }
        c.stroke()
      },
    })
  }

  return finish()

  function finish() {
    // User-added marks remain independent editable elements in every layout.
    for (const mark of raw.extras ?? []) {
      if (!mark.id || !['arrow', 'curve', 'loops', 'zigzag', 'star', 'cross'].includes(mark.kind)) continue
      const w = H * 0.22, h = H * 0.18
      add({ id: mark.id, type: 'scribble', z: 10, cx: W * 0.5, cy: H * 0.5, w, h,
        draw: (c) => {
          const color = spec.ground === 'black' ? '#FFFFFF' : '#000000'
          if (['loops', 'zigzag', 'star'].includes(mark.kind)) return scribble(c, rng(seed, mark.id), mark.kind, w, h, color, H * 0.012)
          c.save(); c.strokeStyle = color; c.lineWidth = H * 0.012; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath()
          if (mark.kind === 'cross') { c.moveTo(-w*.3,-h*.4); c.lineTo(w*.3,h*.4); c.moveTo(w*.3,-h*.4); c.lineTo(-w*.3,h*.4) }
          else if (mark.kind === 'arrow') { c.moveTo(-w*.42,h*.3); c.lineTo(w*.38,-h*.3); c.moveTo(w*.1,-h*.35); c.lineTo(w*.38,-h*.3); c.lineTo(w*.32,-h*.02) }
          else { c.moveTo(w*.34,h*.1); c.bezierCurveTo(w*.05,h*.52,-w*.46,h*.3,-w*.36,-h*.08); c.bezierCurveTo(-w*.28,-h*.42,w*.16,-h*.48,w*.36,-h*.23); c.moveTo(w*.08,-h*.24); c.lineTo(w*.36,-h*.23); c.lineTo(w*.27,-h*.47) }
          c.stroke(); c.restore()
        } })
    }
    // --- apply the per-element tweaks, then order by depth ---
    for (const e of els) {
      const p = spec.place[e.id]; if (!p) continue
      if (p.x != null) e.cx = p.x * W
      if (p.y != null) e.cy = p.y * H
      if (p.w != null) e.scale = (p.w * W) / e.w
      if (p.rot != null) e.rot = p.rot
      if (p.z != null) e.z = p.z
    }
    const tw = spec.tweaks
    for (const e of els) {
      for (const t of [e.follow && !tw[e.id]?.own ? tw[e.follow] : null, tw[e.id]]) {
        if (!t) continue
        e.cx += (t.dx ?? 0) * H; e.cy += (t.dy ?? 0) * H; e.rot += t.rot ?? 0
        if (t === tw[e.id]) { e.scale *= t.scale ?? 1; e.hidden = !!t.hidden; if (t.z != null) e.z = t.z }
      }
    }
    els.sort((a, b) => a.z - b.z)
  return { spec, els, u, g, tr }
  }
}

// ---------- block styles: flat shapes, textures, grainy photos and marker scribbles ----------
// An exact rectangle centred on 0,0; edges = [top, right, bottom, left], true rips that side.
function rectPath(r, w, h, u, edges) {
  if (typeof edges === 'function') edges = edges()
  const c = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]]
  let pts = []
  for (let i = 0; i < 4; i++) pts = pts.concat(edges[i] ? edgePts(r, c[i], c[(i + 1) % 4], u, 0.9) : [c[i]])
  return toPath(pts)
}
const rips = (r, chance) => [r() < chance, r() < chance, r() < chance, r() < chance]
function blockTones(spec) {
  const base = spec.colors ?? { white: ['blue', 'black', 'lavender'], blue: ['white', 'black', 'lavender'], black: ['blue', 'white', 'lavender'] }[spec.ground]
  return [...new Set([...base, ...spec.secondary])]
}
function flat(ctx, r, u, path, tone, w, h, paint) { paper(ctx, r, u, path, tone, w, h, { shadow: false, rim: false, paint }) }
function texture(ctx, r, kind, w, h, ink) {
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip()
  const s = Math.min(w, h)
  if (kind === 'stipple') {
    const step = s * 0.05
    ctx.fillStyle = ink
    for (let y = -h / 2; y < h / 2; y += step) for (let x = -w / 2; x < w / 2; x += step) {
      ctx.beginPath(); ctx.arc(x + r() * step, y + r() * step, s * 0.0085, 0, 6.2832); ctx.fill()
    }
  } else if (kind === 'noise') {
    ctx.fillStyle = ink === '#FFFFFF' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)'; ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.fillStyle = ink === '#FFFFFF' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.22)'
    const n = Math.round((w * h) / (s * s) * 2600), d = Math.max(1, s * 0.006)
    for (let i = 0; i < n; i++) ctx.fillRect((r() - 0.5) * w, (r() - 0.5) * h, d, d)
  } else if (kind === 'lines') {
    const n = 5 + Math.floor(r() * 3), lw = Math.max(1, s * 0.007)
    ctx.strokeStyle = ink; ctx.lineWidth = lw
    const cw = (w - lw) / Math.round((n * w) / s), ch = (h - lw) / n
    for (let x = -w / 2 + lw / 2; x <= w / 2; x += cw) { ctx.beginPath(); ctx.moveTo(x, -h / 2); ctx.lineTo(x, h / 2); ctx.stroke() }
    for (let y = -h / 2 + lw / 2; y <= h / 2; y += ch) { ctx.beginPath(); ctx.moveTo(-w / 2, y); ctx.lineTo(w / 2, y); ctx.stroke() }
  } else if (kind === 'ledger') {
    ctx.strokeStyle = ink; ctx.lineWidth = Math.max(1, s * 0.005)
    for (let y = -h / 2 + s * 0.09; y < h / 2; y += s * 0.11) { ctx.beginPath(); ctx.moveTo(-w / 2, y); ctx.lineTo(w / 2, y); ctx.stroke() }
    for (const x of [-w / 2 + w * 0.1, -w / 2 + w * 0.22, -w / 2 + w * 0.46]) { ctx.beginPath(); ctx.moveTo(x, -h / 2); ctx.lineTo(x, h / 2); ctx.stroke() }
  }
  ctx.restore()
}
// Marker scribbles: loops ending in an arrow, a zigzag hatch, an asterisk.
export const SCRIBBLES = ['loops', 'zigzag', 'star']
function scribble(ctx, r, kind, w, h, color, lw) {
  ctx.save()
  ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath()
  if (kind === 'loops') {
    const k = 2 + Math.floor(r() * 2) * 0.5 + 0.25, lean = range(r, 0.25, 0.45)
    let last = [0, 0]
    for (let i = 0; i <= 160; i++) {
      const t = i / 160, a = t * 6.2832 * k
      const y = -h * 0.32 * Math.cos(a) * (0.75 + 0.25 * t), x = -w * 0.46 + w * 0.62 * t - w * 0.11 * Math.sin(a) - y * lean
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); last = [x, y]
    }
    const tip = [w * 0.47, -h * 0.5]
    ctx.quadraticCurveTo(last[0] + w * 0.12, last[1] + h * 0.1, tip[0], tip[1])
    ctx.moveTo(tip[0] - w * 0.1, tip[1] + h * 0.04); ctx.lineTo(tip[0], tip[1]); ctx.lineTo(tip[0] + w * 0.015, tip[1] + h * 0.26)
  } else if (kind === 'zigzag') {
    const n = 6 + Math.floor(r() * 3)
    for (let i = 0; i <= n; i++) {
      const t = i / n, side = i % 2 ? 1 : -1
      const x = side * w * range(r, 0.36, 0.5), y = -h * 0.3 + h * 0.6 * t - side * h * 0.16 + range(r, -1, 1) * h * 0.03
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
  } else {
    const n = 4, s = Math.min(w, h), off = r() * 3.14
    for (let i = 0; i < n; i++) {
      const a = off + (i / n) * Math.PI + range(r, -0.12, 0.12), l0 = s * range(r, 0.36, 0.5), l1 = s * range(r, 0.36, 0.5)
      ctx.moveTo(-Math.cos(a) * l0, -Math.sin(a) * l0)
      ctx.quadraticCurveTo(range(r, -1, 1) * s * 0.04, range(r, -1, 1) * s * 0.04, Math.cos(a) * l1, Math.sin(a) * l1)
    }
  }
  ctx.stroke()
  ctx.restore()
}
function photoBlock(seed, id, img, mode, w, h, u, edges) {
  return (c) => flat(c, rng(seed, id + 'p'), u, rectPath(rng(seed, id + 's'), w, h, u, edges), 'white', w, h, () => c.drawImage(treat(img, mode, w, h, u, seed + id), -w / 2, -h / 2))
}

// A modular grid of square cells: each cell holds a shape or a texture, photos and bars span cells.
function composeBlocks({ spec, add, seed, u, W, H, photos, logos, g }) {
  const r = rng(seed, 'blocks')
  const tones = blockTones(spec), ink = g.ink
  const rows = 3, cols = spec.cols ?? pick(r, [5, 6, 6, 7])
  const m = Math.min(H * 0.27, (W * 0.92) / cols)
  const x0 = (W - cols * m) / 2, y0 = (H - rows * m) / 2
  const occ = new Map()
  const free = (i, j, w = 1, h = 1) => { for (let a = 0; a < w; a++) for (let b = 0; b < h; b++) if (i + a >= cols || j + b >= rows || i < 0 || j < 0 || occ.has(`${i + a},${j + b}`)) return false; return true }
  const place = (id, type, i, j, w, h, z, draw) => {
    for (let a = 0; a < w; a++) for (let b = 0; b < h; b++) occ.set(`${i + a},${j + b}`, type)
    add({ id, type, z, cx: x0 + (i + w / 2) * m, cy: y0 + (j + h / 2) * m, w: w * m, h: h * m, draw })
  }
  const side = (i, j, w, h) => {
    const clear = (cells) => cells.every(([a, b]) => a < 0 || b < 0 || a >= cols || b >= rows || !occ.has(`${a},${b}`))
    const xs = [...Array(w).keys()].map((a) => i + a), ys = [...Array(h).keys()].map((b) => j + b)
    return [clear(xs.map((a) => [a, j - 1])), clear(ys.map((b) => [i + w, b])), clear(xs.map((a) => [a, j + h])), clear(ys.map((b) => [i - 1, b]))]
  }
  const ripped = (er, chance, i, j, w, h) => { const e = rips(er, spec.decor ? chance : 0); return () => e.map((v, k) => v && side(i, j, w, h)[k]) }
  const find = (w, h) => { for (let k = 0; k < 40; k++) { const i = Math.floor(r() * (cols - w + 1)), j = Math.floor(r() * (rows - h + 1)); if (free(i, j, w, h)) return [i, j] } return null }

  photos.slice(0, 3).forEach((img, n) => {
    const { w: iw, h: ih } = srcSize(img)
    const spans = iw / ih < 0.9 ? [[1, 2], [2, 2]] : photos.length === 1 ? [[3, 2], [3, 1], [2, 2]] : [[2, 1], [3, 1], [2, 1]]
    let [w, h] = pick(r, spans), at = find(w, h)
    if (!at) { [w, h] = [1, 1]; at = find(1, 1) }
    if (!at) return
    const id = `photo-${n}`
    place(id, 'photo', at[0], at[1], w, h, 3, photoBlock(seed, id, img, spec.treat, w * m, h * m, u, ripped(rng(seed, id + 'e'), 0.45, at[0], at[1], w, h)))
  })
  logos.slice(0, 6).forEach((img, n) => {
    const { w: iw, h: ih } = srcSize(img)
    const w = iw / ih > 2.2 ? 2 : 1
    const near = (cw) => { let best = null; for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { if (!free(i, j, cw, 1)) continue; const dd = Math.hypot(i + cw / 2 - cols / 2, (j + 0.5 - rows / 2) * 1.4) + r() * 1.5; if (!best || dd < best[2]) best = [i, j, dd] } return best }
    const at = near(w) ?? near(1); if (!at) return
    const bw = (free(at[0], at[1], w, 1) ? w : 1) * m
    const k = Math.min((bw * 0.74) / iw, (m * 0.5) / ih)
    place(`logo-${n}`, 'logo', at[0], at[1], bw / m, 1, 4, (c) => c.drawImage(tint(img, ink, iw * k, ih * k), (-iw * k) / 2, (-ih * k) / 2, iw * k, ih * k))
  })

  // fill outwards from the middle, leaving some cells empty
  const cells = []
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) cells.push([i, j, Math.hypot(i - (cols - 1) / 2, (j - (rows - 1) / 2) * 1.4) + r() * 1.6])
  cells.sort((a, b) => a[2] - b[2])
  const target = Math.round(cols * rows * range(r, 0.62, 0.76))
  const kinds = [['circle', 5], ['square', 2], ['bar', 2.5], ['stipple', 2], ['noise', 2], ['lines', 1.5], ['grid', 1.8], ['half', 1.2], ['quarter', 1.2], ['triangle', 0.7]]
  let last = '', n = 0
  for (const [i, j] of cells) {
    if (occ.size >= target) break
    if (!free(i, j)) continue
    let kind = weighted(r, kinds); if (kind === last) kind = weighted(r, kinds)
    last = kind
    const id = `shape-${n++}`, er = rng(seed, id), tone = pick(er, tones), turn = Math.floor(er() * 4)
    if (kind === 'bar') {
      const across = er() < 0.75
      const [w, h] = across ? [2, 1] : [1, 2]
      if (free(i, j, w, h)) { const e = ripped(er, 0.45, i, j, w, h); place(id, 'shape', i, j, w, h, 2, (c) => flat(c, rng(seed, id + 'p'), u, rectPath(rng(seed, id + 's'), w * m, h * m, u, e), tone, w * m, h * m)); continue }
      kind = 'square'
    }
    const e = ripped(er, kind === 'square' ? 0.45 : 0, i, j, 1, 1)
    place(id, 'shape', i, j, 1, 1, 2, (c) => {
      const pr = rng(seed, id + 'p')
      if (kind === 'square') flat(c, pr, u, rectPath(rng(seed, id + 's'), m, m, u, e), tone, m, m)
      else if (kind === 'grid') flat(c, pr, u, rectPath(pr, m, m, u, [false, false, false, false]), g.hero, m, m)
      else if (kind === 'circle' || kind === 'half' || kind === 'quarter' || kind === 'triangle') {
        const p = new Path2D()
        c.rotate((turn * Math.PI) / 2)
        if (kind === 'circle') p.arc(0, 0, m / 2, 0, 6.2832)
        else if (kind === 'half') { p.arc(0, m / 2, m / 2, Math.PI, 0); p.closePath() }
        else if (kind === 'quarter') { p.moveTo(-m / 2, m / 2); p.arc(-m / 2, m / 2, m, -Math.PI / 2, 0); p.closePath() }
        else { p.moveTo(-m / 2, m / 2); p.lineTo(-m / 2, -m / 2); p.lineTo(m / 2, m / 2); p.closePath() }
        flat(c, pr, u, p, tone, m, m)
      } else texture(c, pr, kind, m, m, ink)
    })
  }

  // scribbles sit across two neighbouring blocks, on top of everything
  if (spec.decor) {
    const taken = [...occ.keys()].map((k) => k.split(',').map(Number))
    const order = [...SCRIBBLES].sort(() => r() - 0.5)
    const count = spec.scribbles ?? (r() < 0.6 ? 2 : 1)
    for (let k = 0; k < Math.min(count, 3); k++) {
      const kind = order[k], er = rng(seed, 'scribble' + k)
      const [i, j] = taken[Math.floor(er() * taken.length)]
      const wide = kind !== 'star'
      const cx = x0 + (i + (wide ? (i < cols - 1 ? 1 : 0) : 0.5 + (er() < 0.5 ? 0.5 : 0))) * m, cy = y0 + (j + 0.5 + (wide ? 0 : er() < 0.5 ? 0.5 : 0)) * m
      const w = wide ? m * 1.75 : m * 1.15, h = wide ? m * 0.78 : m * 1.15
      add({ id: `scribble-${k}`, type: 'scribble', z: 9, cx, cy, rot: kind === 'zigzag' ? range(er, -0.3, -0.05) : range(er, -0.12, 0.12), w, h,
        draw: (c) => scribble(c, rng(seed, 'scribble-d' + k), kind, w, h, ink, m * 0.042) })
    }
  }
}

// The overlap collage: a loose stack of big rectangles (a grainy photo, a colour block or blue-grid shape, a ruled
// paper sheet, a strip) plus a circle, a dot cluster, a scribble, logos and any cut-out art.
// ox = centre of the stack, s = its scale. The seed picks one of several arrangements and then loosens it,
// so Shuffle changes the whole layout, not just the details.
const STACKS = [
  { paper: [0.36, 0.7, 0.34, 0.36], strip: [0.67, 0.53, 0.11, 0.74], a: [0.36, 0.4, 0.36, 0.5], b: [0.6, 0.52, 0.3, 0.58] },
  { paper: [0.67, 0.68, 0.36, 0.34], strip: [0.5, 0.2, 0.62, 0.12], a: [0.46, 0.38, 0.48, 0.42], b: [0.31, 0.6, 0.24, 0.52] },
  { paper: [0.72, 0.42, 0.3, 0.4], strip: [0.5, 0.85, 0.7, 0.1], a: [0.31, 0.42, 0.34, 0.46], b: [0.5, 0.5, 0.32, 0.66] },
  { paper: [0.35, 0.26, 0.4, 0.26], strip: [0.2, 0.5, 0.09, 0.72], a: [0.66, 0.48, 0.28, 0.68], b: [0.39, 0.57, 0.34, 0.5] },
  { paper: [0.5, 0.74, 0.56, 0.28], strip: [0.78, 0.4, 0.1, 0.62], a: [0.36, 0.38, 0.3, 0.52], b: [0.62, 0.44, 0.34, 0.44] },
]
const CORNERS = [[0.2, 0.82], [0.8, 0.82], [0.19, 0.2], [0.81, 0.2]]
const PHOTO_SPOTS = [
  [0.2, 0.28], [0.8, 0.72], [0.22, 0.74], [0.78, 0.26],
  [0.5, 0.22], [0.5, 0.78], [0.16, 0.5], [0.84, 0.5],
]
function composeOverlap({ spec, add, seed, u, W, H, photos, logos, g, shape, ox, s }) {
  const r = rng(seed, 'overlap')
  const ink = g.ink
  const mix = (list) => { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const k = Math.floor(r() * (i + 1)); [a[i], a[k]] = [a[k], a[i]] } return a }
  const fulls = mix(spec.secondary.filter((t) => FULL.includes(t))), pales = mix(spec.secondary.filter((t) => PALE.includes(t)))
  const flip = r() < 0.5 ? 1 : -1, flipY = r() < 0.3 ? -1 : 1
  const X = (f) => ox + (f - 0.5) * W * s * flip, Y = (f) => H / 2 + (f - 0.5) * H * s * flipY
  const stack = pick(r, STACKS)
  // loosen a slot: nudge its position and stretch its size
  const slot = ([fx, fy, fw, fh]) => [fx + range(r, -0.05, 0.05), fy + range(r, -0.05, 0.05), fw * range(r, 0.86, 1.16), fh * range(r, 0.86, 1.16)]
  const sheet = (id, type, z, [fx, fy, fw, fh], tone, paint, chance = 0.3) => {
    const w = fw * W * s, h = fh * H * s, e = rips(rng(seed, id + 'e'), spec.decor ? (variantOf(id) ? 0.6 : chance) : 0)
    add({ id, type, z, cx: X(fx), cy: Y(fy), rot: 0, w, h,
      draw: (c) => flat(c, rng(seed, id + 'p'), u, rectPath(rng(seed, id + 's'), w, h, u, e), tone, w, h, paint ? (t) => paint(c, w, h, t) : undefined) })
  }
  const pa = slot(stack.a), pb = slot(stack.b), swap = r() < 0.4
  const paperTone = pales[0] ?? 'lavender'
  if (!spec.deals) {
    sheet('sheet-paper', 'shape', 1, slot(stack.paper), paperTone, (c, w, h) => texture(c, rng(seed, 'ledger'), 'ledger', w, h, paperTone === 'lavender' ? 'rgba(0,175,236,0.7)' : 'rgba(0,0,0,0.22)'), 0.45)
    sheet('sheet-strip', 'shape', 1, slot(stack.strip), fulls[0] ?? pales[1] ?? g.hero, null, 0.45)
    sheet('sheet-noise', 'shape', swap ? 4 : 3, pa, spec.ground === 'black' ? 'black-grid' : 'white', (c, w, h) => texture(c, rng(seed, 'noise'), 'noise', w, h, ink))

    // Only render the blue-grid hero silhouette when a Silhouette PNG is supplied.
    if (shape) {
      const hs = H * s * 0.92
      add({ id: 'hero', type: 'hero', z: 4.5, cx: X(pb[0]), cy: H / 2 + (H * s) / 2 - hs / 2, rot: 0,
        w: (hs * srcSize(shape).w) / srcSize(shape).h, h: hs,
        draw: (c) => drawHero(c, rng(seed, 'hero'), u, { s: hs, kind: 'shape', tone: g.hero, shape, hole: false }) })
    }
  }

  // Every added image keeps its natural aspect ratio without masking or replacing existing collage elements.
  const role = (img, name) => !!img.roles?.includes(name)
  const corners = mix(CORNERS)
  const spotRng = mulberry32(hashSeed(seed + '|photo-spots'))
  const photoSpots = [...PHOTO_SPOTS]
  for (let i = photoSpots.length - 1; i > 0; i--) { const k = Math.floor(spotRng() * (i + 1)); [photoSpots[i], photoSpots[k]] = [photoSpots[k], photoSpots[i]] }
  const drawPhoto = (img, id, w, h, defaultMode) => (c) => {
    const mode = spec.tweaks[id]?.treatment ?? defaultMode
    if (mode === 'color') c.drawImage(img, -w / 2, -h / 2, w, h)
    else c.drawImage(treat(img, mode, w, h, u, seed + id, { fit: 'contain' }), -w / 2, -h / 2, w, h)
  }
  photos.forEach((img, i) => {
    const id = `photo-${i}`, { w: iw, h: ih } = srcSize(img)
    if (role(img, 'bottom')) {
      const h = (W * ih) / iw
      return add({ id, type: 'photo', z: 2.5, cx: W / 2, cy: H - h / 2, w: W, h, draw: drawPhoto(img, id, W, h, role(img, 'raw') ? 'color' : spec.treat) })
    }
    if (role(img, 'blue')) {
      const k = Math.min((W * 0.26 * s) / iw, (H * 0.5 * s) / ih), w = iw * k, h = ih * k
      const [fx, fy] = corners[i % corners.length]
      return add({ id, type: 'photo', z: 5, cx: X(fx), cy: Y(fy), rot: 0, w, h, draw: (c) => drawHero(c, rng(seed, id), u, { s: h, tone: g.hero, shape: img }) })
    }
    if (role(img, 'raw')) {
      const k = Math.min((W * 0.26 * s) / iw, (H * 0.5 * s) / ih), w = iw * k, h = ih * k
      const [fx, fy] = corners[i % corners.length]
      return add({ id, type: 'photo', z: 2.2, cx: X(fx), cy: Y(fy), rot: 0, w, h, draw: drawPhoto(img, id, w, h, 'color') })
    }
    const k = Math.min((W * 0.3 * s) / iw, (H * 0.48 * s) / ih), w = iw * k, h = ih * k
    const pr = mulberry32(hashSeed(seed + '|photo-pos|' + i))
    const [bx, by] = i < photoSpots.length ? photoSpots[i] : [range(pr, 0.16, 0.84), range(pr, 0.2, 0.8)]
    const fx = i < photoSpots.length ? bx + range(pr, -0.06, 0.06) : bx
    const fy = i < photoSpots.length ? by + range(pr, -0.06, 0.06) : by
    const padX = w / 2 + W * 0.03, padY = h / 2 + H * 0.04
    const cx = clamp(X(fx), padX, W - padX), cy = clamp(Y(fy), padY, H - padY)
    add({ id, type: 'photo', z: 5 + i * 0.01, cx, cy, rot: 0, w, h, draw: drawPhoto(img, id, w, h, spec.treat) })
  })

  if (!spec.deals) {
    // one flat circle in a secondary colour, tucked against the stack
    const dotTones = [...new Set([fulls[1], fulls[0], ...pales.slice().reverse(), ...fulls])].filter(Boolean)
    const dot = dotTones[variantOf('circle') % Math.max(1, dotTones.length)]
    const [dotsAt, circleAt] = mix(CORNERS)
    if (dot) {
      const d = H * range(r, 0.15, 0.24) * s
      add({ id: 'circle', type: 'shape', z: 5, cx: X(circleAt[0]), cy: Y(circleAt[1]), w: d, h: d,
        draw: (c) => { const p = new Path2D(); p.arc(0, 0, d / 2, 0, 6.2832); flat(c, rng(seed, 'circle'), u, p, dot, d, d) } })
    }
    // a cluster of dots on a loose grid
    const d = H * 0.062 * s, dr = rng(seed, 'dots')
    const spots = []
    for (let a = 0; a < 5; a++) for (let b = 0; b < 3; b++) if (dr() < 0.42) spots.push([a, b])
    add({ id: 'dots', type: 'shape', z: 6, cx: X(dotsAt[0]), cy: Y(dotsAt[1]), w: d * 5.2, h: d * 3.2,
      draw: (c) => { c.fillStyle = ink; for (const [a, b] of spots) { c.beginPath(); c.arc((a - 2) * d * 1.04, (b - 1) * d * 1.04, d / 2, 0, 6.2832); c.fill() } } })
  }

  const count = Math.min(logos.length, 12), rows = Math.ceil(count / 2)
  logos.slice(0, count).forEach((img, n) => {
    const { w: iw, h: ih } = srcSize(img)
    const k = s < 1 ? Math.min((W * 0.075) / iw, (H * 0.075) / ih) : Math.min((W * 0.13) / iw, (H * Math.min(0.11, 0.5 / rows)) / ih)
    // beside a title the logos line up under the stack; on their own they flank it
    const row = Math.floor(n / 2)
    const [lx, ly] = s < 1 ? [ox + (n - (count - 1) / 2) * Math.min(W * 0.1, (W * 0.4) / count), H * 0.9] : [X(n % 2 ? 0.92 : 0.08), Y(rows > 1 ? 0.14 + (row * 0.72) / (rows - 1) : 0.5)]
    add({ id: `logo-${n}`, type: 'logo', z: 7, cx: lx, cy: ly, w: iw * k, h: ih * k, draw: (c) => c.drawImage(tint(img, ink, iw * k, ih * k), (-iw * k) / 2, (-ih * k) / 2, iw * k, ih * k) })
  })
  if (spec.decor && !spec.deals) {
    const sk = pick(variantOf('scribble-0') ? rng(seed, 'scribble-0k') : r, SCRIBBLES), w = W * range(r, 0.2, 0.28) * s, h = H * 0.3 * s
    const on = r() < 0.6 ? pb : pa
    add({ id: 'scribble-0', type: 'scribble', z: 9, cx: X(on[0] + range(r, -0.06, 0.06)), cy: Y(on[1] + range(r, -0.16, 0.16)), rot: sk === 'zigzag' ? range(r, -0.35, -0.05) : range(r, -0.18, 0.18), w, h,
      draw: (c) => scribble(c, rng(seed, 'scribble-0d'), sk, w, sk === 'star' ? w : h, ink, H * 0.011 * s) })
  }
}

export function renderCollage(canvas, raw, assets = {}, size = { w: 1920, h: 1080 }) {
  canvas.width = size.w; canvas.height = size.h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const W = size.w, H = size.h
  const { spec, els, u, g, tr } = composeCollage(ctx, raw, assets, W, H)
  if (raw.ground === 'deals') {
    ctx.fillStyle = g.bg
    ctx.fillRect(0, 0, W, H)
    const row = H / 5
    ctx.save()
    ctx.font = `600 ${row * 1.05}px "Roboto Condensed", sans-serif`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = GROUND.blue.bg
    const pitch = ctx.measureText('DEALS').width + row * 0.2
    for (let i = 0; i < 6; i++) {
      for (let x = -pitch * (i % 2 ? 0.55 : 0.12); x < W; x += pitch) {
        ctx.fillText('DEALS', x, row * (i + 0.2))
      }
    }
    ctx.restore()
  } else if (spec.mat) drawMat(ctx, { x: 0, y: 0, w: W, h: H }, spec.ground, u, rng(spec.seed, 'mat'))
  else {
    ctx.fillStyle = g.bg; ctx.fillRect(0, 0, W, H)
    const step = u * g.step
    ctx.save(); ctx.translate((W % step) / 2, (H % step) / 2)
    if (!spec.plain) gridLines(ctx, g.line, step, { x: -step, y: -step, w: W + step * 2, h: H + step * 2 }, Math.max(1, u / 45))
    ctx.restore()
  }
  for (const e of els) {
    if (e.hidden) continue
    ctx.save(); ctx.translate(e.cx, e.cy); ctx.rotate(e.rot); ctx.scale(e.scale, e.scale)
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
    e.draw(ctx)
    ctx.restore()
  }
  if (spec.footer) {
    const fr = tr && spec.titlePos !== 'center' ? { x: tr.x, w: tr.w } : { x: u * 1.2, w: W - u * 2.4 }
    drawFooter(ctx, spec, assets, { x: fr.x, y: H - u * 1.75, w: fr.w, h: u }, g.ink, u)
  }
  if (spec.grain) addGrain(ctx, W, H, rng(spec.seed, 'grain'), 26)
  return { spec, elements: els.map(({ id, type, cx, cy, rot, scale, w, h, hidden }) => ({ id, type, cx, cy, rot, scale, w, h, hidden })) }
}
