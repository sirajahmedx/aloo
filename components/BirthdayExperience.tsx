"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconSparkles,
  IconBook,
  IconArrowRight,
  IconFeather,
  IconMail,
  IconStars,
} from "@tabler/icons-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SparklesCore } from "@/components/ui/sparkles";
import { FloatingDock } from "@/components/ui/floating-dock";
import FluidCursor from "@/components/FluidCursor";

/* ─── Data ─── */

const testimonials = [
  { quote: "The best word to describe your presence allu is zephyr. A gentle breeze of the morning that makes you feel refreshed.", name: "stella" },
  { quote: "There\u2019s a stillness in him. Not emptiness. Stillness. Like someone who has felt a lot and chose to carry it quietly.", name: "anonymous" },
  { quote: "He\u2019s mature in a way that feels natural, not forced. Knows when to speak, knows when to just be there.", name: "anonymous" },
  { quote: "When he talks about something he cares about, you feel it. He means what he says. Every word comes from somewhere real.", name: "anonymous" },
  { quote: "Aluu the guy who first takes bout the poetry and books the sweetest guy.", name: "ahmed" },
];

const heroLines = [
  "Some people talk.",
  "Some people speak to be heard.",
  "He speaks to be understood.",
  "There\u2019s a difference.",
];

const scenes = [
  { id: "opening", duration: 14700, label: "Opening" },
  { id: "hero", duration: 90000, label: "Quiet Voices" },
  { id: "transition", duration: 18000, label: "Turn" },
  { id: "strong", duration: 11000, label: "Stay Soft" },
  { id: "letter", duration: 32000, label: "Letter" },
  { id: "closing", duration: 9999999, label: "Closing" },
];

const sceneIcons: Record<string, React.ReactNode> = {
  opening: <IconBook className="h-full w-full" />,
  hero: <IconFeather className="h-full w-full" />,
  transition: <IconArrowRight className="h-full w-full" />,
  strong: <IconSparkles className="h-full w-full" />,
  letter: <IconMail className="h-full w-full" />,
  closing: <IconStars className="h-full w-full" />,
};

/* ─── Animation constants ─── */

const ease = [0.16, 1, 0.3, 1] as const;          // slightly snappier entry, buttery decay
const fadeTransition = { duration: 1.8, ease };     // scene cross-fade

/* ─── Backgrounds ─── */

function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-black">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0 bg-black"
        style={{
          maskImage: "radial-gradient(ellipse at center, transparent 0%, black 68%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 0%, black 68%)",
        }}
      />
      {/* Subtle warm ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.015] blur-[120px]" />
    </div>
  );
}

/* ─── Staggered text block ─── */

function StaggeredLines({
  lines,
  className,
  stagger = 1.6,
  start = 0,
}: {
  lines: string[];
  className?: (i: number) => string;
  stagger?: number;
  start?: number;
}) {
  return (
    <div className="flex max-h-[85dvh] w-full flex-col items-center gap-5 overflow-y-auto px-6 py-8 text-center sm:gap-7 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.4, delay: start + i * stagger, ease }}
          className={cn("shrink-0", className?.(i))}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

/* ─── Scene: Opening ─── */

function Opening() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 sm:px-10">
      <StaggeredLines
        lines={[
          "This is for the sweetest person I\u2019ve ever met who is also, somehow, obsessed with books.",
          "So naturally, this started there.",
          "But it was never really about books.",
          "It\u2019s about the person who reads them like he\u2019s looking for something.",
          "And maybe that\u2019s the whole point.",
        ]}
        stagger={1.2}
        className={(i) =>
          i === 0
            ? "font-serif text-lg leading-[1.6] text-transparent bg-clip-text bg-gradient-to-br from-neutral-100 to-neutral-300 sm:text-2xl md:text-3xl lg:text-4xl max-w-[min(640px,88vw)]"
            : "font-serif text-base leading-[1.6] text-transparent bg-clip-text bg-gradient-to-br from-neutral-400 to-neutral-500 sm:text-lg md:text-xl lg:text-2xl max-w-[min(560px,86vw)]"
        }
      />
    </div>
  );
}

/* ─── Scene: Hero (quotes) ─── */

function Hero() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 sm:gap-8 sm:px-6">
      <StaggeredLines
        lines={heroLines}
        stagger={1.3}
        className={(i) =>
          i === 0 || i === 1
            ? "font-serif text-base leading-[1.6] font-light text-transparent bg-clip-text bg-gradient-to-br from-neutral-400 to-neutral-500 sm:text-xl md:text-2xl lg:text-3xl"
            : i === 2
              ? "font-serif text-xl leading-[1.6] font-light text-transparent bg-clip-text bg-gradient-to-br from-neutral-100 to-neutral-300 sm:text-3xl md:text-4xl lg:text-5xl"
              : "font-serif text-sm leading-[1.6] font-light italic text-transparent bg-clip-text bg-gradient-to-br from-neutral-500 to-neutral-600 sm:text-lg md:text-xl"
        }
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, delay: 6, ease }}
        className="mt-4 w-full max-w-5xl sm:mt-6"
      >
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
      </motion.div>
    </div>
  );
}

/* ─── Scene: Transition ─── */

function Transition() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-5 sm:gap-14 sm:px-8">
      <StaggeredLines
        lines={[
          "But today is just about you.",
          "Not what you write. Not what you read.",
          "Just you.",
        ]}
        stagger={1.8}
        start={0}
        className={(i) =>
          i === 0
            ? "font-serif text-2xl leading-[1.6] font-light text-transparent bg-clip-text bg-gradient-to-br from-neutral-100 to-neutral-300 sm:text-4xl md:text-5xl lg:text-6xl"
            : "font-serif text-lg leading-[1.6] font-light text-transparent bg-clip-text bg-gradient-to-br from-neutral-400 to-neutral-500 sm:text-2xl md:text-3xl lg:text-4xl"
        }
      />
      <StaggeredLines
        lines={[
          "You are one of those people who makes everything feel a little lighter.",
          "Being around you just feels easy.",
          "And that\u2019s a rare thing to be.",
        ]}
        stagger={1.6}
        start={8.0}
        className={(i) =>
          i === 0
            ? "font-serif text-lg leading-[1.6] font-light text-transparent bg-clip-text bg-gradient-to-br from-neutral-300 to-neutral-400 sm:text-2xl md:text-3xl max-w-[min(640px,88vw)]"
            : i === 2
              ? "font-serif text-lg leading-[1.6] font-light italic text-transparent bg-clip-text bg-gradient-to-br from-neutral-100 to-neutral-300 sm:text-2xl md:text-3xl"
              : "font-serif text-base leading-[1.6] font-light text-transparent bg-clip-text bg-gradient-to-br from-neutral-400 to-neutral-500 sm:text-xl md:text-2xl"
        }
      />
    </div>
  );
}

/* ─── Scene: Strong line ─── */

function StrongLine() {
  return (
    <div className="flex h-full w-full items-center justify-center px-5 sm:px-8">
      <StaggeredLines
        lines={[
          "Don't be harsh on yourself,",
          "daffodils don't rush their blooming,",
          "neither should you.",
        ]}
        stagger={1.6}
        className={() =>
          "font-serif text-3xl leading-[1.6] font-light text-transparent bg-clip-text bg-gradient-to-br from-neutral-100 to-neutral-300 sm:text-5xl md:text-6xl lg:text-7xl"
        }
      />
    </div>
  );
}

/* ─── Scene: Letter ─── */

function Letter() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4 py-12 sm:px-6">
      
      {/* Invisible outer scrolling wrapper */}
      <div className="relative flex max-h-[85dvh] w-full max-w-[680px] flex-col gap-10 overflow-y-auto overflow-x-hidden pb-32 pt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* Global Greeting Header */}
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 0, ease }}
            className="mb-3 font-sans text-[11px] font-light tracking-[0.3em] text-neutral-500 uppercase sm:text-xs"
          >
            for Mustafa &mdash; or as I call him,
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2.0, delay: 0.4, ease }}
            className="mb-1 font-serif text-5xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-neutral-100 to-neutral-300 sm:text-7xl"
          >
            alooo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease }}
            className="font-serif text-lg font-light text-neutral-400 sm:text-2xl"
          >
            Happy Birthday
          </motion.p>
          
          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.5, scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1, ease }}
            className="mt-10 h-px w-16 shrink-0 bg-gradient-to-r from-transparent via-white/40 to-transparent sm:mt-12"
          />
        </div>

        {/* Card 1: Penguin's Letter */}
        <div className="relative w-full shrink-0">
          {/* Ambient glow behind the first card */}
          <div className="absolute inset-0 scale-[0.92] transform rounded-full bg-white/[0.02] blur-[80px]" />

          <div className="relative flex w-full flex-col items-center rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-neutral-800/30 to-neutral-950/50 px-7 py-14 text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-16 sm:py-20">
            
            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.0, delay: 1.4, ease }}
              className="mb-7 flex flex-col gap-4 font-serif text-[15px] font-light leading-[1.8] text-transparent bg-clip-text bg-gradient-to-br from-neutral-300 to-neutral-400 sm:mb-9 sm:gap-5 sm:text-[18px]"
            >
              <p>I hope today feels like the first page of something good</p>
              <p>I hope the people around you actually see you, not just the quiet, but what&apos;s underneath it</p>
              <p>I hope you keep writing, even when it feels like no one&apos;s reading</p>
              <p>I hope you keep feeling things fully, even when it&apos;s easier not to</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.0, delay: 3.0, ease }}
              className="mb-9 flex flex-col gap-3 font-serif text-[14px] font-light leading-[1.8] text-transparent bg-clip-text bg-gradient-to-br from-neutral-400 to-neutral-500 sm:mb-11 sm:gap-4 sm:text-[17px]"
            >
              <p>Keep going quiet when you need to.</p>
              <p>Keep being the person whose silence says something.</p>
              <p className="mt-2 text-transparent bg-clip-text bg-gradient-to-br from-neutral-200 to-neutral-400">The world needs more of that. More of you.</p>
            </motion.div>

            {/* Sign-off 1 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.0, delay: 5.5, ease }}
              className="font-sans text-[10px] font-light tracking-[0.3em] text-neutral-600 uppercase sm:text-xs"
            >
              with love, from penguin
            </motion.p>
          </div>
        </div>

        {/* Card 2: Saif's Letter */}
        <div className="relative w-full shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 2.2, ease }}
            className="absolute inset-0 scale-[0.92] transform rounded-full bg-white/[0.02] blur-[80px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 2.2, ease }}
            className="relative flex w-full flex-col items-center rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-neutral-800/30 to-neutral-950/50 px-7 py-14 text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:px-16 sm:py-20"
          >
            <div className="mb-9 flex flex-col gap-4 font-serif text-[15px] font-light leading-[1.8] text-transparent bg-clip-text bg-gradient-to-br from-neutral-300 to-neutral-400 sm:mb-11 sm:gap-5 sm:text-[18px]">
              <p>Happy birthday, aloo. Talking to you just feels easy, like one of those days that&apos;s warm for no reason. You make people feel heard without even trying, and that actually means a lot.</p>
              <p>I love our deep talks, even when you go way off track. You&apos;ve got a way with words too, so I&apos;m definitely waiting on more of your writing. Hope we stay like this for a long time.</p>
            </div>

            <p className="font-sans text-[10px] font-light tracking-[0.3em] text-neutral-600 uppercase sm:text-xs">
              from saif
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

/* ─── Scene: Closing ─── */

function Closing() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black px-5">
      <motion.h1
        initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2.4, ease }}
        className="relative z-20 max-w-[min(640px,92vw)] text-center font-serif text-4xl font-light leading-snug text-transparent bg-clip-text bg-gradient-to-br from-neutral-100 to-neutral-300 sm:text-6xl md:text-7xl lg:text-8xl"
      >
        You are quietly extraordinary.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.6, ease }}
        className="relative z-20 mt-6 max-w-[90vw] text-center font-serif text-lg font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-neutral-400 to-neutral-500 sm:mt-8 sm:text-2xl"
      >
        and the world is softer because you&apos;re in it.
      </motion.p>

      {/* Sparkle strip */}
      <div className="relative mt-4 h-32 w-full max-w-[40rem] sm:h-40">
        <div className="absolute inset-x-10 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent blur-sm sm:inset-x-20" />
        <div className="absolute inset-x-10 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent sm:inset-x-20" />
        <div className="absolute inset-x-32 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500/60 to-transparent blur-sm sm:inset-x-60" />
        <div className="absolute inset-x-32 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500/40 to-transparent sm:inset-x-60" />
        <SparklesCore
          background="transparent"
          minSize={0.3}
          maxSize={0.9}
          particleDensity={350}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
        <div
          className="absolute inset-0 h-full w-full bg-black"
          style={{
            maskImage: "radial-gradient(350px 200px at top, transparent 20%, black)",
            WebkitMaskImage: "radial-gradient(350px 200px at top, transparent 20%, black)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Scene router ─── */

const renderScene = (id: string) => {
  switch (id) {
    case "opening": return <Opening />;
    case "hero": return <Hero />;
    case "transition": return <Transition />;
    case "strong": return <StrongLine />;
    case "letter": return <Letter />;
    case "closing": return <Closing />;
    default: return null;
  }
};

/* ─── Main experience ─── */

export function BirthdayExperience() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= scenes.length - 1) return;
    const t = setTimeout(() => setIndex((i) => i + 1), scenes[index].duration);
    return () => clearTimeout(t);
  }, [index]);

  const scene = scenes[index];

  const goTo = useCallback((i: number) => setIndex(i), []);

  const dockItems = scenes.map((s, i) => ({
    title: s.label,
    icon: sceneIcons[s.id],
    onClick: () => goTo(i),
    active: i === index,
  }));

  return (
    <main className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-black">
      <GridBackground />
      <FluidCursor />

      <AnimatePresence mode="wait">
        <motion.section
          key={scene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fadeTransition}
          className="absolute inset-0 flex h-full w-full items-center justify-center"
        >
          {renderScene(scene.id)}
        </motion.section>
      </AnimatePresence>

      <FloatingDock items={dockItems} />
    </main>
  );
}