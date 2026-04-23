"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

type DockItem = {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-[#B89B5E]/25 bg-[#4A3426]/85 px-3 py-2 shadow-[0_8px_24px_rgba(25,16,9,0.45)] backdrop-blur md:hidden max-w-[95vw] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.title}
          type="button"
          aria-label={item.title}
          onClick={item.onClick}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all active:scale-90",
            item.active
              ? "border-[#B89B5E]/50 bg-[#B89B5E]/25 text-[#E8DDC7] shadow-[0_0_20px_rgba(184,155,94,0.22)]"
              : "border-[#6E7F5B]/35 bg-[#2B1D14]/70 text-[#C7B89D]"
          )}
        >
          <div className="h-4 w-4">{item.icon}</div>
        </button>
      ))}
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-5 left-1/2 z-50 hidden h-14 -translate-x-1/2 items-end gap-3 rounded-2xl border border-[#B89B5E]/25 bg-[#4A3426]/78 px-3 pb-2 shadow-[0_12px_30px_rgba(25,16,9,0.5)] backdrop-blur md:flex",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  onClick,
  active,
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

const widthSync  = useTransform(distance, [-150, 0, 150], [28, 52, 28]);
const heightSync = useTransform(distance, [-150, 0, 150], [28, 52, 28]);
const widthIcon  = useTransform(distance, [-150, 0, 150], [14, 26, 14]);
const heightIcon = useTransform(distance, [-150, 0, 150], [14, 26, 14]);

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthI = useSpring(widthIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightI = useSpring(heightIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={ref}
      type="button"
      aria-label={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative outline-none"
    >
      <motion.div
        style={{ width, height }}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full border transition-colors",
          active
            ? "border-[#B89B5E]/55 bg-[#B89B5E]/25 text-[#E8DDC7] shadow-[0_0_26px_rgba(184,155,94,0.24)]"
            : "border-[#6E7F5B]/35 bg-[#2B1D14]/72 text-[#D7CAB0] hover:bg-[#6E7F5B]/25 hover:text-[#E8DDC7]"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-[#B89B5E]/30 bg-[#2B1D14]/95 px-2 py-0.5 text-xs text-[#E8DDC7]"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthI, height: heightI }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </button>
  );
}
