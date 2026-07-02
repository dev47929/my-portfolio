import React, { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ value, duration = 1500, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  const numeric = parseFloat(String(value).replace(/[^0-9.]/g, ""));
  const nonNumericSuffix = suffix || String(value).replace(/[0-9.]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.unobserve(el);

          const startTime = performance.now();
          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(numeric * eased);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}{nonNumericSuffix}
    </span>
  );
}
