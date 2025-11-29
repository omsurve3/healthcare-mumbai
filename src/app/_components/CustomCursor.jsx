"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    // make sure it's visible
    gsap.set(cursorEl, { opacity: 1 });

    const moveHandler = (e) => {
      const { clientX, clientY } = e;

      gsap.to(cursorEl, {
        x: clientX,
        y: clientY,
        duration: 0.12,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        fixed
        top-0 left-0
        h-4 w-4
        rounded-full
        bg-black
        pointer-events-none
        z-[9999]
        -translate-x-1/2 -translate-y-1/2
      "
    />
  );
}
