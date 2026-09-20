import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const NetworkScene = lazy(() =>
  import("./NetworkScene").then((mod) => ({ default: mod.NetworkScene }))
);

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

function FallbackField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(226,163,61,0.12),transparent_60%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#4b4e8c" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export function HeroScene() {
  const [canRender3D, setCanRender3D] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setCanRender3D(supportsWebGL());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointer = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const handleScroll = () => {
      scrollRef.current = Math.min(window.scrollY / 800, 1);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reducedMotion]);

  if (!canRender3D || reducedMotion) {
    return <FallbackField />;
  }

  return (
    <Suspense fallback={<FallbackField />}>
      <NetworkScene pointer={pointer} scrollRef={scrollRef} />
    </Suspense>
  );
}
