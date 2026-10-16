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
};

// A muted loop that is only created once it nears the screen, and paused while it is off screen.
// Autoplay overrides preload="none", so a plain <video autoPlay> downloads the whole file on page load.
export const LazyVideo = ({ src, frameClassName = "size-full", frameStyle, autoPlay = true, loop = true, muted = true, ...props }: LazyVideoProps) => {
  const { ref, near, inView } = useNearViewport<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;
    if (inView) void video.play().catch(() => {});
    else video.pause();
  }, [inView, near, autoPlay]);
  return (
    <div ref={ref} className={frameClassName} style={frameStyle}>
      {near && (
        <video ref={videoRef} autoPlay={autoPlay} loop={loop} muted={muted} playsInline {...props}>
          <VideoSources src={src} />
        </video>
      )}
    </div>
  );
};
