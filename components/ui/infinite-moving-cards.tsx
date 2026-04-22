"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
} from "motion/react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: { quote: string; name?: string; title?: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [holding, setHolding] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // We duplicate items 4 times to ensure seamless wrapping in both directions
  const duplicatedItems = [...items, ...items, ...items, ...items];

  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRef1 = useRef<HTMLDivElement>(null);
  const itemRef2 = useRef<HTMLDivElement>(null);
  
  const [cycleWidth, setCycleWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (itemRef1.current && itemRef2.current) {
        // The exact width of one complete sequence is the distance between the
        // start of the first item in cycle 1 and the first item in cycle 2.
        const width = itemRef2.current.offsetLeft - itemRef1.current.offsetLeft;
        if (width > 0) setCycleWidth(width);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  const x = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    if (!cycleWidth) return;

    // Only auto-scroll if the user isn't interacting
    if (!holding && !(pauseOnHover && isHovering)) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const speeds = {
        fast: isMobile ? 0.05 : 0.08,
        normal: isMobile ? 0.02 : 0.03,
        slow: isMobile ? 0.01 : 0.015,
      };

      let moveAmount = (speeds[speed] || speeds.slow) * delta;
      if (direction === "left") moveAmount *= -1;

      x.set(x.get() + moveAmount);
    }

    // Flawless wrap logic:
    // If we scroll too far left (negative x), jump right by cycleWidth
    // If we scroll too far right (positive x), jump left by cycleWidth
    const currentX = x.get();
    if (currentX <= -cycleWidth) {
      x.set(currentX + cycleWidth);
    } else if (currentX > 0) {
      x.set(currentX - cycleWidth);
    }
  });

  return (
    <div
      onPointerDown={() => setHolding(true)}
      onPointerUp={() => setHolding(false)}
      onPointerLeave={() => {
        setHolding(false);
        setIsHovering(false);
      }}
      onPointerCancel={() => setHolding(false)}
      onPointerEnter={() => setIsHovering(true)}
      onTouchStart={() => setHolding(true)}
      onTouchEnd={() => setHolding(false)}
      onTouchCancel={() => setHolding(false)}
      className={cn(
        "relative z-20 w-full max-w-7xl overflow-hidden touch-none",
        "[mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        className
      )}
    >
      <motion.div
        ref={scrollerRef}
        style={{ x }}
        drag="x"
        dragElastic={0}
        dragMomentum={true}
        // dragConstraints bounds us slightly so we don't fling it thousands of pixels past the copies.
        // The useAnimationFrame wrap will handle keeping us within the visual bounds seamlessly.
        className="flex w-max cursor-grab active:cursor-grabbing items-center gap-5 py-4 sm:gap-6"
      >
        {duplicatedItems.map((item, idx) => {
          // Attach refs to the first item of sequence 1 and sequence 2 for perfect measurement
          const isItem1 = idx === 0;
          const isItem2 = idx === items.length;
          
          return (
            <div
              key={idx}
              ref={isItem1 ? itemRef1 : isItem2 ? itemRef2 : null}
              className={cn(
                "group relative shrink-0 select-none rounded-[18px] border px-7 py-7 transition-all duration-700 sm:px-9 sm:py-9",
                // Make the card dynamically wider if it contains a lot of text
                item.quote.length > 180
                  ? "w-[88vw] max-w-[640px] sm:w-[520px] md:w-[640px]" 
                  : "w-[82vw] max-w-[440px] sm:w-[360px] md:w-[440px]",
                "border-white/[0.04] bg-neutral-950/40 backdrop-blur-md",
                "hover:border-white/[0.08] hover:bg-neutral-900/60 hover:shadow-[0_0_50px_rgba(255,255,255,0.03)]"
              )}
            >
              <blockquote className="flex h-full flex-col justify-between gap-5 pointer-events-none">
                <span className="relative z-20 block font-serif text-[15px] font-light leading-[1.85] tracking-[0.015em] text-transparent bg-clip-text bg-gradient-to-br from-neutral-200 to-neutral-500 transition-colors duration-700 group-hover:from-neutral-100 group-hover:to-neutral-300 sm:text-[17px]">
                  &ldquo;{item.quote}&rdquo;
                </span>
                {item.name && (
                  <footer className="mt-auto flex flex-col gap-1 border-t border-white/[0.04] pt-4">
                    <span className="font-serif text-[14px] font-normal tracking-[0.03em] text-neutral-300 sm:text-[15px]">
                      {item.name}
                    </span>
                    {item.title && (
                      <span className="font-sans text-[11px] font-light tracking-[0.06em] text-neutral-500 uppercase sm:text-[12px]">
                        {item.title}
                      </span>
                    )}
                  </footer>
                )}
              </blockquote>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
