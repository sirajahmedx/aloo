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


const testimonials = [
  {
    quote:
      "‎actual incandescent ball of sunshine! Who wouldn't want to chat with him? he's great with his words (p.s gets philosophical too) and that's what i love about aloo.",
    name: "saba",
  },
  {
    quote:
      "being around him feels like being heard from the heart. he is sweet in a way that does not try to be, and that is the rarest thing.",
    name: "siraj",
  },
  {
    quote:
      "If I had to name his presence, I would call it a soft morning breeze. Gentle, calm, and somehow always enough.",
    name: "safa",
  },
  {
    quote:
      "He starts with books and poetry, then turns simple moments into something warm. That sweetness is just who he is.",
    name: "ahmed",
  },
];

const heroLines = [
  "Some people walk in and the air shifts a little.",
  "You are one of those people.",
  "Happy Birthday, alloo.",
  "We are glad you exist.",
];

const letterCards = [

  {
    title: "Saif's Letter",
    preview:
      "Talking to you feels easy, like one of those days that’s warm for no reason and it means a lot.",
    meta: "from saif",
    content: [
      "Happy birthday, aloo. Talking to you just feels easy, like one of those days that's warm for no reason. You make people feel heard without even trying, and that actually means a lot.",
      "I love our deep talks, even when you go way off track. You've got a way with words too, so I'm definitely waiting on more of your writing. Hope we stay like this for a long time.",
    ],
  },
  {
    title: "Siraj's Letter",
    preview: "short. but i mean it. you listen from the heart, and people feel it.",
    meta: "from siraj",
    content: [
      "happy birthday, alloo.",
      "you're one of the kindest people i've come across. and i don't mean that in a general way, i mean the specific kind of kind. your presence just feels like someone is actually listening from the heart. not performing it, just genuinely there. that's not common at all.",
      "have a good one. you've earned a calm day.",
      "from siraj aka penguin",
    ],
  },
  {
    title: "Saba's Letter",
    preview:
      "happy birthday alloo. you bring love and joy so easily — i hope today brings it back to you.",
    meta: "from saba",
    content: [
      "‎Happy Birthday Alloo! I hope you have an awesome day today. Cheers to another chapter in your life and also congrats on coming this far. I hope your special day is filled with love and joy just like how you fill everyone else's day with joy and love.",
      "‎Your deep passion for literature, books and wholesome stuff in general really fills me with awe and i just adore how you radiate this warm energy that brighten ups everyone's mood. I love talking to you! So make sure to have fun today and eat a yummy cake to celebrate YOU ❤ 🎂",
      "from saba",
    ],
  },
  {
    title: "Ahmed's Letter",
    preview:
      "happy birthday alloo. keep smiling, and don’t forget to be the joyous little aluu.",
    meta: "from ahmed",
    content: [
      "Happy Birthday Alloo,",
      "",
      "May the upcoming days be just as good and epic as you've made ours. Hope things keep going in a good way for you and you keep doing well in whatever you’re doing.",
      "",
      "Keep smiling and be happy and don't forget to be the joyous little aluu.",
      "",
      "from ahmed",
    ],
  },
  {
    title: "Safa's Letter",
    preview:
      "may this day unfold like a soft morning breeze—gentle, warm, and full of hope.",
    meta: "from safa",
    content: [
      "Happy birthday, Allu. May this day unfold like a soft morning breeze, where the rich, warm, earthy scent of coffee lingers in the air and the world feels a little kinder. Even if sadness finds its way into your heart, remember that daffodils still bloom vibrant and golden after the coldest nights as if they never doubted the sun would return. So never leave hope.",
      "May this year bring you a thousand flowers, each one a small hope planted and slowly coming to light. Just be yourself kind, soft, and wonderfully resilient and always be gentle with your own heart.",
      "When the world feel like too much, I hope you remember that you have friends who will listen to you patiently, without hurry",
      "_safa",
    ],
  },
];


const scenes = [
  { id: "opening", duration: 14700, label: "Opening" },
  { id: "hero", duration: 90000, label: "Quiet Voices" },
  { id: "transition", duration: 18000, label: "Turn" },
  { id: "strong", duration: 11000, label: "Stay Soft" },
  { id: "letter", duration: 90000, label: "Letter" },
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


const ease = [0.2, 0.95, 0.3, 1] as const;
const fadeTransition = { duration: 1.95, ease };


function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#E8DDC7]">
      <div
        className="absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(74,52,38,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,52,38,0.13) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div
        className="absolute inset-0 bg-[#E8DDC7]"
        style={{
          maskImage: "radial-gradient(ellipse at center, transparent 0%, black 68%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 0%, black 68%)",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89B5E]/18 blur-[130px]" />
      <div className="absolute right-8 top-20 h-[340px] w-[340px] rounded-full bg-[#6E7F5B]/16 blur-[120px]" />
    </div>
  );
}


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
    <div className="flex max-h-[85dvh] w-full flex-col items-center gap-6 overflow-y-auto px-6 py-8 text-center sm:gap-8 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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


function Opening() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 sm:px-10">
      <StaggeredLines
        lines={[
          "This is for the sweetest person I’ve ever met, and somehow, also the one most obsessed with books.",
          "People describe your presence like it is weather.",
          "Like a breeze. Like something soft that makes the morning feel easier.",
          "That is the first thing you do. You make things feel light.",
          "And then you do the second thing. You make people feel heard.",
        ]}
        stagger={1.2}
        className={(i) =>
          i === 0
            ? "font-serif text-lg leading-[1.68] font-semibold tracking-[0.01em] text-transparent bg-clip-text bg-gradient-to-br from-[#2B1D14] to-[#4A3426] sm:text-2xl md:text-3xl lg:text-4xl max-w-[min(640px,88vw)]"
            : "font-sans text-base leading-[1.82] font-normal tracking-[0.004em] text-[#5A4534] sm:text-lg md:text-xl lg:text-2xl max-w-[min(560px,86vw)]"
        }
      />
    </div>
  );
}


function Hero() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-4 sm:gap-8 sm:px-6">
      <StaggeredLines
        lines={heroLines}
        stagger={1.3}
        className={(i) =>
          i === 0 || i === 1
            ? "font-sans text-base leading-[1.85] font-normal tracking-[0.004em] text-[#5E4A39] sm:text-xl md:text-2xl lg:text-3xl"
            : i === 2
              ? "font-serif text-xl leading-[1.72] font-semibold tracking-[0.01em] text-transparent bg-clip-text bg-gradient-to-br from-[#2B1D14] to-[#4A3426] sm:text-3xl md:text-4xl lg:text-5xl"
              : "font-serif text-sm leading-[1.82] font-medium italic tracking-[0.006em] text-[#6E7F5B] sm:text-lg md:text-xl"
        }
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, delay: 6, ease }}
        className="mt-5 flex w-full max-w-6xl flex-col items-center sm:mt-7"
      >
        <p className="mb-4 text-center font-serif text-xl font-semibold tracking-[0.02em] text-[#2B1D14] sm:mb-5 sm:text-2xl">
          what people gently say about you
        </p>
        <div className="h-px w-28 bg-gradient-to-r from-transparent via-[#2F4F4F]/50 to-transparent sm:w-36" />
        <InfiniteMovingCards items={testimonials} direction="right" speed="normal" />
      </motion.div>
    </div>
  );
}


function Transition() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-5 sm:px-8 max-w-[min(800px,90vw)] mx-auto text-center">
      <StaggeredLines
        lines={[
          "you carry a kindness that never needed to be introduced.",
          "it just sits with you,",
          "making you aware of its presence.",
          "you have that.",
          "your words find the parts of the heart",
          "that people forget to guard.",
          "your presence makes people feel less alone,",
          "naturally.",
          "not everyone carries this.",
          "you do — safa",
        ]}
        stagger={1.25}
        start={0}
        className={() => "font-serif text-xl leading-[1.35] font-medium text-[#5A4637] sm:text-2xl md:text-3xl lg:text-4xl"}
      />
    </div>
  );
}


function StrongLine() {
  return (
    <div className="flex h-full w-full items-center justify-center px-5 sm:px-8">
      <StaggeredLines
        lines={[
          "Do not be harsh on yourself,",
          "daffodils do not rush their blooming,",
          "and neither should you — safa",
        ]}
        stagger={1.6}
        className={() =>
          "font-serif text-3xl leading-[1.7] font-semibold tracking-[0.01em] text-transparent bg-clip-text bg-gradient-to-br from-[#2B1D14] to-[#4A3426] sm:text-5xl md:text-6xl lg:text-7xl"
        }
      />
    </div>
  );
}


function Letter() {
  const [selectedLetter, setSelectedLetter] = useState<(typeof letterCards)[number] | null>(null);

  useEffect(() => {
    if (!selectedLetter) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedLetter(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedLetter]);

  return (
    <div className="flex h-full w-full items-center justify-center px-0 py-10 sm:px-2">
      <div className="w-full max-w-[1240px]">
        <div className="mb-8 flex flex-col items-center px-5 text-center sm:mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease }}
            className="mb-3 font-sans text-[11px] font-light tracking-[0.3em] text-[#6E7F5B] uppercase sm:text-xs"
          >
            for Mustafa or as we call him,
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.9, delay: 0.2, ease }}
            className="mb-2 font-serif text-5xl font-semibold tracking-[0.04em] text-transparent bg-clip-text bg-gradient-to-br from-[#2B1D14] to-[#4A3426] sm:text-7xl"
          >
            alooo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease }}
            className="font-sans text-lg tracking-[0.01em] text-[#4A3426] sm:text-2xl"
          >
            Happy Birthday
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.7, delay: 0.55, ease }}
          className="relative"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#E8DDC7] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#E8DDC7] to-transparent sm:w-20" />

          <div className="flex snap-x snap-mandatory scroll-smooth gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-7 sm:px-10">
            {[...letterCards, ...letterCards].map((card, i) => (
              <motion.button
                key={`${card.title}-${i}`}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.45, ease }}
                onClick={() => setSelectedLetter(card)}
                className="group relative min-h-[280px] w-[84vw] max-w-[430px] snap-center shrink-0 rounded-[24px] border border-[#B89B5E]/35 bg-gradient-to-br from-[#4A3426] via-[#3B2A1F] to-[#2B1D14] p-7 text-left text-[#E8DDC7] shadow-[0_14px_30px_rgba(25,16,9,0.35)] outline-none transition-shadow duration-500 hover:shadow-[0_18px_38px_rgba(25,16,9,0.45),0_0_22px_rgba(47,79,79,0.2)] focus-visible:ring-2 focus-visible:ring-[#2F4F4F]/65 sm:min-h-[320px] sm:p-9"
                type="button"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[24px] opacity-[0.2]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, rgba(232,221,199,0.2) 0.3px, transparent 0.8px)",
                    backgroundSize: "4px 4px",
                  }}
                />
                <div className="relative flex h-full flex-col">
                  <p className="mb-3 font-sans text-[11px] tracking-[0.22em] text-[#9CAD8A] uppercase">
                    Letter {i + 1}
                  </p>
                  <h3 className="mb-3 font-serif text-2xl font-semibold tracking-[0.01em] text-[#F0E6D2] sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="line-clamp-5 font-sans text-[15px] leading-[1.86] tracking-[0.003em] text-[#D9CCB2] sm:text-[16px]">
                    {card.preview}
                  </p>
                  <p className="mt-auto border-t border-[#B89B5E]/30 pt-4 font-sans text-[11px] tracking-[0.2em] text-[#B89B5E] uppercase">
                    {card.meta}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.48, ease }}
              className="fixed inset-0 z-[70] flex items-center justify-center bg-[#2B1D14]/55 px-4 backdrop-blur-sm"
              onClick={() => setSelectedLetter(null)}
            >
              <motion.article
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.98 }}
                transition={{ duration: 0.58, ease }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[84dvh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-[#B89B5E]/35 bg-gradient-to-br from-[#F0E6D2] via-[#E8DDC7] to-[#E2D4B8] p-6 shadow-[0_28px_60px_rgba(22,14,8,0.35)] sm:p-9"
              >
                <button
                  type="button"
                  onClick={() => setSelectedLetter(null)}
                  className="absolute right-4 top-4 rounded-full border border-[#4A3426]/20 bg-[#E8DDC7] px-3 py-1 font-sans text-xs tracking-[0.12em] text-[#4A3426] uppercase transition-colors hover:bg-[#DFD0B1]"
                >
                  Close
                </button>
                <p className="mb-2 font-sans text-[11px] tracking-[0.2em] text-[#6E7F5B] uppercase">
                  Letter
                </p>
                <h3 className="mb-2 pr-16 font-serif text-3xl font-semibold tracking-[0.01em] text-[#2B1D14] sm:text-4xl">
                  {selectedLetter.title}
                </h3>
                <p className="mb-6 border-b border-[#4A3426]/16 pb-4 font-sans text-[11px] tracking-[0.2em] text-[#7D6750] uppercase">
                  {selectedLetter.meta}
                </p>
                <div className="space-y-4 font-sans text-[16px] leading-[1.9] tracking-[0.002em] text-[#3B2A1F] sm:text-[17px]">
                  {selectedLetter.content.map((line, lineIndex) => (
                    <p key={`${selectedLetter.title}-line-${lineIndex}`}>{line}</p>
                  ))}
                </div>
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


function Closing() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#E8DDC7] px-5">
      <motion.h1
        initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2.4, ease }}
        className="relative z-20 max-w-[min(640px,92vw)] text-center font-serif text-4xl font-semibold leading-[1.18] tracking-[0.012em] text-transparent bg-clip-text bg-gradient-to-br from-[#2B1D14] to-[#4A3426] sm:text-6xl md:text-7xl lg:text-8xl"
      >
        You are quietly extraordinary.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.6, ease }}
        className="relative z-20 mt-6 max-w-[90vw] text-center font-serif text-lg font-light leading-[1.75] tracking-[0.01em] text-transparent bg-clip-text bg-gradient-to-br from-[#4A3426] to-[#6E7F5B] sm:mt-8 sm:text-2xl"
      >
        and the world feels softer because you are in it.
      </motion.p>

      <div className="relative mt-4 h-32 w-full max-w-[40rem] sm:h-40">
        <div className="absolute inset-x-10 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-[#B89B5E]/70 to-transparent blur-sm sm:inset-x-20" />
        <div className="absolute inset-x-10 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-[#B89B5E]/50 to-transparent sm:inset-x-20" />
        <div className="absolute inset-x-32 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-[#6E7F5B]/60 to-transparent blur-sm sm:inset-x-60" />
        <div className="absolute inset-x-32 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-[#6E7F5B]/45 to-transparent sm:inset-x-60" />
        <SparklesCore
          background="transparent"
          minSize={0.3}
          maxSize={0.9}
          particleDensity={350}
          className="h-full w-full"
          particleColor="#E8DDC7"
        />
        <div
          className="absolute inset-0 h-full w-full bg-[#E8DDC7]"
          style={{
            maskImage: "radial-gradient(350px 200px at top, transparent 20%, black)",
            WebkitMaskImage: "radial-gradient(350px 200px at top, transparent 20%, black)",
          }}
        />
      </div>
    </div>
  );
}


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
    <main className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-[#E8DDC7]">
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
