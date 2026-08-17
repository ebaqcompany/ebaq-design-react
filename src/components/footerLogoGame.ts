import { gsap } from "gsap";

type BodyState = "source" | "falling" | "dragging" | "snapping" | "attached" | "sleeping";

type PiecePose = {
  rotation: number;
  mirrored: boolean;
};

type Body = {
  index: number;
  element: SVGGraphicsElement;
  state: BodyState;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  angularVelocity: number;
  scaleX: number;
  scaleY: number;
  baseWidth: number;
  baseHeight: number;
  sourcePose: PiecePose;
  targetIndex: number | null;
  bounceCount: number;
  floorFrames: number;
};

type Target = {
  index: number;
  guide: SVGGraphicsElement;
  clip: SVGClipPathElement;
  pose: PiecePose;
  width: number;
  height: number;
  occupiedBy: Body | null;
};

type SetupOptions = {
  root: HTMLDivElement;
  footer: HTMLElement;
  src: string;
  autoStartDelay?: number;
  wordmarkColor?: string;
};

const SVG_NS = "http://www.w3.org/2000/svg";
const PIECE_POSES: PiecePose[] = [
  { rotation: 0, mirrored: false },
  { rotation: 180, mirrored: false },
  { rotation: 0, mirrored: false },
  { rotation: 0, mirrored: false },
  { rotation: 0, mirrored: true },
  { rotation: -90, mirrored: false },
];
const relativePose = (source: PiecePose, target: PiecePose) => {
  const matrix = (pose: PiecePose) => {
    const radians = pose.rotation * Math.PI / 180;
    const cosine = Math.cos(radians);
    const sine = Math.sin(radians);
    const mirror = pose.mirrored ? -1 : 1;
    return {
      a: cosine * mirror,
      b: -sine,
      c: sine * mirror,
      d: cosine,
    };
  };
  const from = matrix(source);
  const to = matrix(target);
  const a = to.a * from.a + to.b * from.b;
  const b = to.a * from.c + to.b * from.d;
  const c = to.c * from.a + to.d * from.b;
  const d = to.c * from.c + to.d * from.d;
  return {
    rotation: Math.atan2(c, a) * 180 / Math.PI,
    reflected: a * d - b * c < 0,
  };
};

export const setupFooterLogoGame = ({ root, footer, src, autoStartDelay, wordmarkColor = "white" }: SetupOptions) => {
  let disposed = false;
  let disposeGame = () => {};
  let autoStartTimer = 0;

  fetch(src)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to load footer logo: ${response.status}`);
      return response.text();
    })
    .then((svg) => {
      if (disposed) return;
      root.innerHTML = svg;
      const svgRoot = root.querySelector("svg");
      if (!svgRoot) return;

      svgRoot.setAttribute("aria-hidden", "true");
      svgRoot.setAttribute("focusable", "false");
      svgRoot.style.display = "block";
      svgRoot.style.width = "100%";
      svgRoot.style.height = "auto";
      svgRoot.style.overflow = "visible";
      svgRoot.style.opacity = "1";

      const drawableElements = Array.from(
        svgRoot.querySelectorAll<SVGGraphicsElement>(
          "path, rect, circle, ellipse, polygon, polyline, line",
        ),
      );
      const accentPieces = drawableElements.filter((piece) => {
        const fill = getComputedStyle(piece).fill;
        return piece.classList.contains("cls-2") || /rgb\(0, 175, 236\)/.test(fill);
      });
      const pieces = accentPieces;
      const wordmarkPaths = drawableElements.filter((piece) => !pieces.includes(piece));
      const instanceId = Math.random().toString(36).slice(2);
      let defs = svgRoot.querySelector("defs");
      if (!defs) {
        defs = document.createElementNS(SVG_NS, "defs");
        svgRoot.prepend(defs);
      }

      wordmarkPaths.forEach((path) => {
        path.dataset.footerWordmark = "true";
        path.style.fill = wordmarkColor;
        path.style.fillOpacity = "1";
        path.style.stroke = "none";
        path.style.strokeWidth = "0";
      });

      const targets: Target[] = [];
      const bodies: Body[] = pieces.map((piece, index) => {
        const isAccent = accentPieces.includes(piece);
        piece.dataset.footerPiece = "true";
        piece.dataset.footerPieceIndex = String(index);
        piece.style.cursor = "grab";
        piece.style.pointerEvents = "all";
        piece.style.touchAction = "none";

        const clip = document.createElementNS(SVG_NS, "clipPath");
        clip.id = `footer-target-${instanceId}-${index}`;
        clip.setAttribute("clipPathUnits", "userSpaceOnUse");
        const clipShape = piece.cloneNode(true) as SVGGraphicsElement;
        clipShape.removeAttribute("class");
        clipShape.removeAttribute("data-footer-piece");
        clipShape.removeAttribute("data-footer-piece-index");
        clipShape.setAttribute("fill", "white");
        clipShape.setAttribute("stroke", "none");
        clip.appendChild(clipShape);
        defs?.appendChild(clip);

        const guide = piece.cloneNode(true) as SVGGraphicsElement;
        guide.removeAttribute("class");
        guide.removeAttribute("data-footer-piece");
        guide.removeAttribute("data-footer-piece-index");
        guide.dataset.footerTarget = "true";
        guide.dataset.footerTargetIndex = String(index);
        guide.setAttribute("fill", isAccent ? "#00afec" : wordmarkColor);
        guide.setAttribute("fill-opacity", "0.15");
        guide.setAttribute("stroke", "none");
        guide.setAttribute("stroke-width", "0");
        guide.setAttribute("clip-path", `url(#${clip.id})`);
        guide.setAttribute("pointer-events", "none");
        guide.setAttribute("opacity", "0");
        guide.setAttribute("aria-hidden", "true");
        guide.style.pointerEvents = "none";
        guide.style.cursor = "default";
        guide.style.touchAction = "auto";
        piece.parentNode?.insertBefore(guide, piece);

        const box = piece.getBBox();
        const body: Body = {
          index,
          element: piece,
          state: "source",
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          rotation: 0,
          angularVelocity: 0,
          scaleX: 1,
          scaleY: 1,
          baseWidth: box.width,
          baseHeight: box.height,
          sourcePose: PIECE_POSES[index] ?? PIECE_POSES[0],
          targetIndex: null,
          bounceCount: 0,
          floorFrames: 0,
        };
        targets.push({
          index,
          guide,
          clip,
          pose: body.sourcePose,
          width: box.width,
          height: box.height,
          occupiedBy: null,
        });
        return body;
      });

      let gameActive = false;
      let completed = false;
      let rafId = 0;
      let physicsRunning = false;
      let previousTime = 0;
      let blinkTimeline: gsap.core.Timeline | null = null;
      let activeBody: Body | null = null;
      let activePointerId: number | null = null;
      let dragStartPointer = { x: 0, y: 0 };
      let dragStartBody = { x: 0, y: 0 };
      let dragVelocity = { x: 0, y: 0 };
      let lastDragPointer = { x: 0, y: 0 };
      let lastDragTime = 0;

      const releaseActivePointer = () => {
        const body = activeBody;
        const pointerId = activePointerId;
        activeBody = null;
        activePointerId = null;
        if (body && pointerId !== null && body.element.hasPointerCapture(pointerId)) {
          try { body.element.releasePointerCapture(pointerId); } catch { /* capture already released */ }
        }
      };

      const setState = (body: Body, state: BodyState) => {
        body.state = state;
        body.element.dataset.footerState = state;
      };

      const renderBody = (body: Body) => {
        body.element.dataset.footerRotation = String(body.rotation);
        gsap.set(body.element, {
          x: body.x,
          y: body.y,
          rotation: body.rotation,
          scaleX: body.scaleX,
          scaleY: body.scaleY,
          transformOrigin: "50% 50%",
        });
      };

      const clientToSvg = (clientX: number, clientY: number) => {
        const ctm = svgRoot.getScreenCTM();
        if (!ctm) return { x: clientX, y: clientY };
        const point = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
        return { x: point.x, y: point.y };
      };

      const clientDeltaToSvg = (dx: number, dy: number) => {
        const origin = clientToSvg(0, 0);
        const endpoint = clientToSvg(dx, dy);
        return { x: endpoint.x - origin.x, y: endpoint.y - origin.y };
      };

      const clearTarget = (body: Body) => {
        if (body.targetIndex === null) return;
        const target = targets[body.targetIndex];
        if (target.occupiedBy === body) target.occupiedBy = null;
        target.guide.setAttribute("opacity", gameActive && !completed ? "1" : "0");
        body.targetIndex = null;
        delete body.element.dataset.footerTargetIndex;
      };

      const stopPhysics = () => {
        physicsRunning = false;
        previousTime = 0;
        cancelAnimationFrame(rafId);
      };

      const ensurePhysics = () => {
        if (physicsRunning || !gameActive || completed) return;
        physicsRunning = true;
        previousTime = 0;
        rafId = requestAnimationFrame(simulate);
      };

      const settleBody = (body: Body) => {
        body.vx = 0;
        body.vy = 0;
        body.angularVelocity = 0;
        const settledRotation = Math.round(body.rotation / 90) * 90;
        body.rotation = ((settledRotation + 180) % 360 + 360) % 360 - 180;
        body.floorFrames = 0;
        setState(body, "sleeping");
        renderBody(body);
        const floor = footer.getBoundingClientRect().bottom - 1;
        const rect = body.element.getBoundingClientRect();
        const correction = clientDeltaToSvg(0, floor - rect.bottom);
        body.y += correction.y;
        renderBody(body);
      };

      function simulate(time: number) {
        if (!physicsRunning || !gameActive || completed) return;
        const dt = previousTime ? Math.min((time - previousTime) / 16.667, 1.75) : 1;
        previousTime = time;
        const footerRect = footer.getBoundingClientRect();
        const floor = footerRect.bottom - 1;
        let hasFallingBody = false;

        bodies.forEach((body) => {
          if (body.state !== "falling") return;
          hasFallingBody = true;
          body.vy += 0.68 * dt;
          body.x += body.vx * dt;
          body.y += body.vy * dt;
          body.rotation += body.angularVelocity * dt;
          renderBody(body);

          let rect = body.element.getBoundingClientRect();
          if (rect.left < footerRect.left) {
            const correction = clientDeltaToSvg(footerRect.left - rect.left, 0);
            body.x += correction.x;
            body.vx = Math.abs(body.vx) * 0.4;
            body.angularVelocity *= 0.8;
            renderBody(body);
            rect = body.element.getBoundingClientRect();
          } else if (rect.right > footerRect.right) {
            const correction = clientDeltaToSvg(footerRect.right - rect.right, 0);
            body.x += correction.x;
            body.vx = -Math.abs(body.vx) * 0.4;
            body.angularVelocity *= 0.8;
            renderBody(body);
            rect = body.element.getBoundingClientRect();
          }

          if (rect.bottom >= floor) {
            const correction = clientDeltaToSvg(0, floor - rect.bottom);
            body.y += correction.y;
            renderBody(body);

            if (body.bounceCount >= 3 && Math.abs(body.vy) < 4) {
              settleBody(body);
              return;
            }

            if (body.vy > 1.1) {
              const restitution = body.bounceCount === 0 ? 0.3 : 0.18;
              body.vy = -body.vy * restitution;
              body.vx *= 0.65;
              body.angularVelocity *= body.bounceCount === 0 ? 0.82 : 0.65;
              body.bounceCount += 1;
              body.element.dataset.footerBounceCount = String(body.bounceCount);
              body.floorFrames = 0;
            } else if (body.vy >= 0) {
              body.vy = 0;
              body.vx *= 0.62;
              const stableRotation = Math.round(body.rotation / 90) * 90;
              const error = stableRotation - body.rotation;
              body.angularVelocity = body.angularVelocity * 0.68 + error * 0.075;
              body.floorFrames += 1;
              if (
                body.floorFrames >= 28 ||
                (body.floorFrames >= 10 && Math.abs(error) < 0.75 && Math.abs(body.angularVelocity) < 0.05)
              ) {
                settleBody(body);
              }
            }
          } else {
            body.floorFrames = 0;
          }
        });

        for (let firstIndex = 0; firstIndex < bodies.length; firstIndex += 1) {
          for (let secondIndex = firstIndex + 1; secondIndex < bodies.length; secondIndex += 1) {
            const first = bodies[firstIndex];
            const second = bodies[secondIndex];
            if (!['falling', 'sleeping'].includes(first.state) || !['falling', 'sleeping'].includes(second.state)) continue;
            if (first.state === 'sleeping' && second.state === 'sleeping') continue;
            const firstRect = first.element.getBoundingClientRect();
            const secondRect = second.element.getBoundingClientRect();
            const overlapX = Math.min(firstRect.right, secondRect.right) - Math.max(firstRect.left, secondRect.left);
            const overlapY = Math.min(firstRect.bottom, secondRect.bottom) - Math.max(firstRect.top, secondRect.top);
            if (overlapX <= 0 || overlapY <= 0) continue;
            const impactSpeed = Math.max(
              Math.abs(first.vx - second.vx),
              Math.abs(first.vy - second.vy),
              Math.abs(first.angularVelocity - second.angularVelocity),
            );
            if (impactSpeed < 0.8) continue;

            const firstCenterX = firstRect.left + firstRect.width / 2;
            const firstCenterY = firstRect.top + firstRect.height / 2;
            const secondCenterX = secondRect.left + secondRect.width / 2;
            const secondCenterY = secondRect.top + secondRect.height / 2;
            const separateOnX = overlapX < overlapY;
            const direction = separateOnX
              ? (firstCenterX < secondCenterX ? -1 : 1)
              : (firstCenterY < secondCenterY ? -1 : 1);
            const correction = separateOnX
              ? clientDeltaToSvg(direction * overlapX * 0.52, 0)
              : clientDeltaToSvg(0, direction * overlapY * 0.52);
            first.x += correction.x;
            first.y += correction.y;
            second.x -= correction.x;
            second.y -= correction.y;

            if (first.state === 'sleeping' && impactSpeed > 1.5) setState(first, 'falling');
            if (second.state === 'sleeping' && impactSpeed > 1.5) setState(second, 'falling');
            const firstVx = first.vx;
            const firstVy = first.vy;
            first.vx = second.vx * 0.72;
            first.vy = second.vy * 0.58;
            second.vx = firstVx * 0.72;
            second.vy = firstVy * 0.58;
            first.angularVelocity = Math.max(-8, Math.min(8, first.angularVelocity + direction * 0.55));
            second.angularVelocity = Math.max(-8, Math.min(8, second.angularVelocity - direction * 0.55));
            if (impactSpeed > 1) {
              first.floorFrames = 0;
              second.floorFrames = 0;
            }
            renderBody(first);
            renderBody(second);
          }
        }

        if (!hasFallingBody || !bodies.some((body) => body.state === "falling")) {
          physicsRunning = false;
          previousTime = 0;
          return;
        }
        rafId = requestAnimationFrame(simulate);
      }

      const setWordmarkActive = () => {
        gsap.set(wordmarkPaths, {
          fill: wordmarkColor,
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 0,
          opacity: 1,
        });
      };

      const setWordmarkSolid = () => {
        gsap.set(wordmarkPaths, {
          fill: wordmarkColor,
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 0,
          opacity: 1,
        });
      };

      const activateGame = () => {
        if (gameActive || completed || disposed) return;
        gameActive = true;
        completed = false;
        svgRoot.dataset.footerGameState = "active";
        blinkTimeline?.kill();
        setWordmarkActive();
        targets.forEach((target) => {
          target.occupiedBy = null;
          target.guide.setAttribute("opacity", "1");
        });
        bodies.forEach((body) => {
          gsap.killTweensOf(body);
          body.targetIndex = null;
          delete body.element.dataset.footerTargetIndex;
          body.x = 0;
          body.y = 0;
          body.vx = (body.index - (bodies.length - 1) / 2) * 0.08;
          body.vy = body.index * -0.18;
          body.rotation = 0;
          body.angularVelocity = (body.index % 2 ? 1 : -1) * (1.05 + body.index * 0.2);
          body.scaleX = 1;
          body.scaleY = 1;
          body.bounceCount = 0;
          body.element.dataset.footerBounceCount = "0";
          body.floorFrames = 0;
          body.element.style.cursor = "grab";
          setState(body, "falling");
          renderBody(body);
        });
        ensurePhysics();
      };

      const resetGame = () => {
        gameActive = false;
        completed = false;
        svgRoot.dataset.footerGameState = "idle";
        stopPhysics();
        blinkTimeline?.kill();
        releaseActivePointer();
        targets.forEach((target) => {
          target.occupiedBy = null;
          target.guide.setAttribute("opacity", "0");
        });
        bodies.forEach((body) => {
          gsap.killTweensOf(body);
          body.targetIndex = null;
          delete body.element.dataset.footerTargetIndex;
          body.x = 0;
          body.y = 0;
          body.vx = 0;
          body.vy = 0;
          body.rotation = 0;
          body.angularVelocity = 0;
          body.scaleX = 1;
          body.scaleY = 1;
          body.bounceCount = 0;
          body.element.dataset.footerBounceCount = "0";
          body.floorFrames = 0;
          body.element.style.cursor = "grab";
          setState(body, "source");
          renderBody(body);
        });
        setWordmarkSolid();
      };

      const completeGame = () => {
        if (completed) return;
        completed = true;
        svgRoot.dataset.footerGameState = "completed";
        stopPhysics();
        targets.forEach((target) => target.guide.setAttribute("opacity", "0"));
        bodies.forEach((body) => { body.element.style.cursor = "default"; });
        blinkTimeline?.kill();
        const logoElements = bodies.map((body) => body.element);
        blinkTimeline = gsap.timeline()
          .set(logoElements, { opacity: 1 })
          .to(logoElements, { opacity: 0.18, duration: 0.08, ease: "none" })
          .to(logoElements, { opacity: 1, duration: 0.1, ease: "none" })
          .to(logoElements, { opacity: 0.28, duration: 0.08, ease: "none", delay: 0.06 })
          .to(logoElements, { opacity: 1, duration: 0.16, ease: "power1.out" })
          .call(() => window.location.assign("/"));
      };

      const startFalling = (body: Body) => {
        clearTarget(body);
        gsap.killTweensOf(body);
        body.vx = Math.max(-10, Math.min(10, dragVelocity.x));
        body.vy = Math.max(-18, Math.min(18, dragVelocity.y || 0.12));
        body.angularVelocity = (body.index % 2 === 0 ? -1 : 1) * (1.35 + (body.index % 3) * 0.25);
        body.scaleX = 1;
        body.scaleY = 1;
        body.bounceCount = 0;
        body.element.dataset.footerBounceCount = "0";
        body.floorFrames = 0;
        setState(body, "falling");
        renderBody(body);
        ensurePhysics();
      };

      const startSnap = (body: Body, target: Target) => {
        const bodyRect = body.element.getBoundingClientRect();
        const targetRect = target.guide.getBoundingClientRect();
        const bodyCenter = clientToSvg(
          bodyRect.left + bodyRect.width / 2,
          bodyRect.top + bodyRect.height / 2,
        );
        const targetCenter = clientToSvg(
          targetRect.left + targetRect.width / 2,
          targetRect.top + targetRect.height / 2,
        );
        const pose = relativePose(body.sourcePose, target.pose);
        const canonicalRotation = ((pose.rotation + 180) % 360 + 360) % 360 - 180;
        const rotation = canonicalRotation
          + 360 * Math.round((body.rotation - canonicalRotation) / 360);
        const quarterTurn = Math.abs(Math.round(canonicalRotation / 90)) % 2 === 1;
        const expectedWidth = quarterTurn ? body.baseHeight : body.baseWidth;
        const expectedHeight = quarterTurn ? body.baseWidth : body.baseHeight;
        const scale = (
          target.width / expectedWidth
          + target.height / expectedHeight
        ) / 2;
        const scaleX = scale;
        const scaleY = pose.reflected ? -scale : scale;

        clearTarget(body);
        target.occupiedBy = body;
        target.guide.setAttribute("opacity", "0");
        body.targetIndex = target.index;
        body.element.dataset.footerTargetIndex = String(target.index);
        body.vx = 0;
        body.vy = 0;
        body.angularVelocity = 0;
        setState(body, "snapping");
        gsap.killTweensOf(body);
        gsap.to(body, {
          x: body.x + targetCenter.x - bodyCenter.x,
          y: body.y + targetCenter.y - bodyCenter.y,
          rotation,
          scaleX,
          scaleY,
          duration: 0.28,
          ease: "power2.out",
          onUpdate: () => renderBody(body),
          onComplete: () => {
            if (body.state !== "snapping" || body.targetIndex !== target.index || target.occupiedBy !== body) return;
            setState(body, "attached");
            if (bodies.every((candidate) => candidate.state === "attached")) completeGame();
          },
        });
      };

      const finishDrag = (pointerId: number, forceFall = false) => {
        if (!activeBody || activePointerId !== pointerId) return;
        const body = activeBody;
        releaseActivePointer();
        body.element.style.cursor = "grab";
        if (!gameActive || completed) return;

        const bodyRect = body.element.getBoundingClientRect();
        const centerX = bodyRect.left + bodyRect.width / 2;
        const centerY = bodyRect.top + bodyRect.height / 2;
        const snapDistance = Math.max(52, Math.min(112, Math.max(bodyRect.width, bodyRect.height) * 3.5));
        const nearest = forceFall
          ? undefined
          : targets
            .filter((target) => target.occupiedBy === null)
            .map((target) => {
              const rect = target.guide.getBoundingClientRect();
              return {
                target,
                distance: Math.hypot(
                  centerX - (rect.left + rect.width / 2),
                  centerY - (rect.top + rect.height / 2),
                ),
              };
            })
            .sort((a, b) => a.distance - b.distance)[0];

        if (nearest && nearest.distance <= snapDistance) startSnap(body, nearest.target);
        else startFalling(body);
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0 || !event.isPrimary || !gameActive || completed || activeBody) return;
        const element = event.currentTarget as SVGGraphicsElement;
        const body = bodies.find((candidate) => candidate.element === element);
        if (!body) return;
        clearTarget(body);
        gsap.killTweensOf(body);
        activeBody = body;
        activePointerId = event.pointerId;
        dragStartPointer = clientToSvg(event.clientX, event.clientY);
        dragStartBody = { x: body.x, y: body.y };
        lastDragPointer = dragStartPointer;
        lastDragTime = performance.now();
        dragVelocity = { x: 0, y: 0 };
        body.vx = 0;
        body.vy = 0;
        body.angularVelocity = 0;
        setState(body, "dragging");
        body.element.style.cursor = "grabbing";
        try { body.element.setPointerCapture(event.pointerId); } catch { /* window listeners are the fallback */ }
        event.preventDefault();
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!activeBody || activePointerId !== event.pointerId) return;
        const pointer = clientToSvg(event.clientX, event.clientY);
        const now = performance.now();
        const frameScale = Math.max(0.25, (now - lastDragTime) / 16.667);
        dragVelocity = {
          x: (pointer.x - lastDragPointer.x) / frameScale,
          y: (pointer.y - lastDragPointer.y) / frameScale,
        };
        lastDragPointer = pointer;
        lastDragTime = now;
        activeBody.x = dragStartBody.x + pointer.x - dragStartPointer.x;
        activeBody.y = dragStartBody.y + pointer.y - dragStartPointer.y;
        renderBody(activeBody);
        event.preventDefault();
      };

      const onPointerUp = (event: PointerEvent) => finishDrag(event.pointerId);
      const onPointerCancel = (event: PointerEvent) => finishDrag(event.pointerId, true);
      const onLostPointerCapture = (event: PointerEvent) => {
        if (activePointerId === event.pointerId) finishDrag(event.pointerId, true);
      };
      const onWindowBlur = () => {
        if (activePointerId !== null) finishDrag(activePointerId, true);
      };

      const onScroll = () => {
        const viewportBottom = window.scrollY + window.innerHeight;
        const documentBottom = document.documentElement.scrollHeight;
        const atBottom = viewportBottom >= documentBottom - 80;
        if (atBottom && !gameActive && !completed) activateGame();
        const logoTop = root.getBoundingClientRect().top + window.scrollY;
        if (!atBottom && viewportBottom < logoTop && (gameActive || completed)) resetGame();
      };

      const onResize = () => {
        if (activePointerId !== null) finishDrag(activePointerId, true);
        bodies.forEach((body) => {
          if (body.state === "sleeping") {
            setState(body, "falling");
            body.vy = 0;
            body.floorFrames = 0;
          }
        });
        ensurePhysics();
      };

      bodies.forEach((body) => {
        setState(body, "source");
        body.element.addEventListener("pointerdown", onPointerDown);
        body.element.addEventListener("lostpointercapture", onLostPointerCapture);
      });
      window.addEventListener("pointermove", onPointerMove, { passive: false });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerCancel);
      window.addEventListener("blur", onWindowBlur);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      svgRoot.dataset.footerGameState = "idle";
      if (typeof autoStartDelay === "number") {
        autoStartTimer = window.setTimeout(activateGame, autoStartDelay);
      } else {
        onScroll();
      }

      disposeGame = () => {
        disposed = true;
        window.clearTimeout(autoStartTimer);
        releaseActivePointer();
        stopPhysics();
        blinkTimeline?.kill();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerCancel);
        window.removeEventListener("blur", onWindowBlur);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        bodies.forEach((body) => {
          gsap.killTweensOf(body);
          body.element.removeEventListener("pointerdown", onPointerDown);
          body.element.removeEventListener("lostpointercapture", onLostPointerCapture);
        });
        targets.forEach((target) => {
          target.guide.remove();
          target.clip.remove();
        });
      };
    })
    .catch((error) => {
      if (!disposed) console.error(error);
    });

  return () => {
    disposed = true;
    disposeGame();
  };
};
