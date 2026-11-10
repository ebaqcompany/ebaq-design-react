import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

export const isVideoSrc = (src: string) => /\.(mp4|webm)$/i.test(src);

// WebM (VP9) first: about half the size of the H.264 MP4 beside it. The MP4 stays as the fallback
// for browsers without VP9 (older iOS Safari). Pass either file; the other is derived from it.
export const VideoSources = ({ src }: { src: string }) => {
  if (!isVideoSrc(src)) return null;
  const webm = src.replace(/\.mp4$/i, ".webm");
  const mp4 = src.replace(/\.webm$/i, ".mp4");
  return (
    <>
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </>
  );
};

// True once the element comes within `rootMargin` of the viewport (and stays true); `inView` tracks it live.
export function useNearViewport<T extends Element>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setNear(true);
    }, { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);
  return { ref, near, inView };
}

type LazyVideoProps = Omit<ComponentPropsWithoutRef<"video">, "src" | "children"> & {
  src: string;
  // Classes for the placeholder box that holds the frame until the video mounts.
  frameClassName?: string;
  frameStyle?: React.CSSProperties;
  eager?: boolean;
};

// A muted loop that is only created once it nears the screen, and paused while it is off screen.
// Autoplay overrides preload="none", so a plain <video autoPlay> downloads the whole file on page load.
export const LazyVideo = ({ src, frameClassName = "size-full", frameStyle, autoPlay = true, loop = true, muted = true, eager = false, ...props }: LazyVideoProps) => {
  const { ref, near, inView } = useNearViewport<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let retries = 0;
    let active = true;
    const syncPlayback = () => {
      if (!inView || document.hidden) {
        video.pause();
        return;
      }
      void video.play().then(() => { retries = 0; }).catch(() => {
        if (active && !document.hidden && retries < 2 && retryTimer === undefined) {
          retries += 1;
          retryTimer = setTimeout(() => { retryTimer = undefined; syncPlayback(); }, 500);
        }
      });
    };
    syncPlayback();
    video.addEventListener("canplay", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("pageshow", syncPlayback);
    return () => {
      active = false;
      if (retryTimer !== undefined) clearTimeout(retryTimer);
      video.removeEventListener("canplay", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      window.removeEventListener("pageshow", syncPlayback);
    };
  }, [inView, near, autoPlay, src]);
  return (
    <div ref={ref} className={frameClassName} style={frameStyle}>
      {(eager || near) && (
        <video ref={videoRef} autoPlay={autoPlay} loop={loop} muted={muted} playsInline {...props}>
          <VideoSources src={src} />
        </video>
      )}
    </div>
  );
};
