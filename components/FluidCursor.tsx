"use client";
import { useEffect } from "react";

import fluidCursor from "@/hooks/use-FluidCursor";

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.52] mix-blend-soft-light">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
};
export default FluidCursor;
