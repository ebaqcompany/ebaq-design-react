import { lazy, Suspense, type ComponentProps, type ReactNode } from "react";

// lottie-web is ~80 KB gzipped, so it is fetched the first time an animation actually renders
// instead of shipping with every page that might show one.
const Lottie = lazy(() => import("lottie-react"));

type LottieProps = ComponentProps<typeof import("lottie-react").default>;

export const LottiePlayer = ({ fallback = null, ...props }: LottieProps & { fallback?: ReactNode }) => (
  <Suspense fallback={fallback}>
    <Lottie {...props} />
  </Suspense>
);
