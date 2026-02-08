"use client";

import { useEffect, useState } from "react";

export const Loader3 = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      setShowImage(true);
    }, 500);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    // Remove from DOM after exit animation completes
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, 2700);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-black transition-transform duration-700 ease-in-out ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {!isExiting && (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/ebaqdesign-logo.svg"
            alt="Ebaq Design"
            className={`h-12 w-auto invert transition-all duration-500 ease-out ${
              showImage ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}
          />
        </div>
      )}
    </div>
  );
};
