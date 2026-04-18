import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sinus Relief Exercise — Breathe Easy" },
      {
        name: "description",
        content:
          "Guided sinus relief exercise: learn about your sinuses and follow simple acupressure & breathing techniques for instant relief.",
      },
      { property: "og:title", content: "Sinus Relief Exercise" },
      {
        property: "og:description",
        content: "Breathe easy, feel better with this guided wellness exercise.",
      },
    ],
  }),
  component: SinusReliefExercise,
});

type Item = { icon: string; title: string; body: string };

const FACTS: Item[] = [
  {
    icon: "👃",
    title: "What are sinuses?",
    body: "Sinuses are air-filled spaces behind your forehead, nose, cheeks & eyes. They produce mucus that keeps your nasal passages moist and clean.",
  },
  {
    icon: "🤧",
    title: "Why do they get blocked?",
    body: "Allergies, infections, pollution, dry air & cold weather can cause your sinuses to swell and fill with mucus.",
  },
  {
    icon: "😮‍💨",
    title: "Common symptoms",
    body: "Stuffy nose, facial pressure, headache, reduced sense of smell & post nasal drip.",
  },
  {
    icon: "💧",
    title: "Hydration helps",
    body: "Drinking enough water thins mucus and helps your sinuses drain naturally.",
  },
  {
    icon: "⚠️",
    title: "When to see a doctor",
    body: "If symptoms last more than 10 days, you have a high fever, or experience severe facial pain, consult an ENT specialist.",
  },
];

const STEPS: Item[] = [
  {
    icon: "1️⃣",
    title: "Warm up",
    body: "Rub your palms together until they feel warm. Place them gently over your nose and breathe in the warmth for 30 seconds.",
  },
  {
    icon: "2️⃣",
    title: "Acupressure point 1",
    body: "Using your index fingers, press gently on the sides of your nose bridge. Hold for 10 seconds, release. Repeat 3 times.",
  },
  {
    icon: "3️⃣",
    title: "Acupressure point 2",
    body: "Press gently under your cheekbones with both index fingers. Hold for 10 seconds, release. Repeat 3 times.",
  },
  {
    icon: "4️⃣",
    title: "Steam breathing",
    body: "Breathe in slowly through your nose for 4 counts, hold for 2, breathe out through your mouth for 4 counts. Repeat 5 times.",
  },
  {
    icon: "5️⃣",
    title: "Gentle head tilt",
    body: "Tilt your head slowly to the left for 10 seconds, then to the right for 10 seconds. This helps drain blocked sinuses naturally.",
  },
];

const TOTAL = 4;

function SinusReliefExercise() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen w-full bg-shell font-sans flex items-center justify-center p-4 sm:p-8">
      <div
        className="w-full max-w-[390px] bg-background rounded-[2rem] shadow-[0_20px_60px_-20px_rgba(74,144,184,0.35)] overflow-hidden flex flex-col"
        style={{ minHeight: "min(780px, 95vh)" }}
      >
        <Header step={step} onBack={() => setStep(1)} showBack={step === 1} />
        <div key={step} className="flex-1 px-6 pb-6 animate-fade-in flex flex-col">
          {step === 1 && <ScreenIntro onNext={() => setStep(2)} />}
          {step === 2 && <ScreenFacts onNext={() => setStep(3)} />}
          {step === 3 && <ScreenExercise onNext={() => setStep(4)} />}
          {step === 4 && <ScreenDone onDone={() => setStep(1)} />}
        </div>
      </div>
    </div>
  );
}

function Header({
  step,
  onBack,
  showBack,
}: {
  step: number;
  onBack: () => void;
  showBack: boolean;
}) {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="h-8 flex items-center">
        {showBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            className="-ml-2 p-2 rounded-full text-foreground/70 hover:bg-primary-soft transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => {
          const idx = i + 1;
          const active = idx === step;
          const done = idx < step;
          return (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                active
                  ? "w-8 bg-primary"
                  : done
                    ? "w-2 bg-primary/60"
                    : "w-2 bg-primary-soft"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-serif text-[28px] leading-tight text-foreground">{children}</h1>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-muted-foreground">{children}</p>;
}

function CTAButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-6 rounded-full bg-primary text-primary-foreground py-4 px-6 font-semibold text-[15px] shadow-[0_8px_20px_-8px_rgba(74,144,184,0.6)] hover:brightness-110 active:scale-[0.98] transition"
    >
      {children}
    </button>
  );
}

function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-xl bg-primary-soft border-l-4 border-primary px-4 py-3 text-[14px] leading-relaxed text-foreground/85">
      {children}
    </div>
  );
}

/* ---------- Screens ---------- */

function ScreenIntro({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <Title>Sinus Relief Exercise</Title>
      <p className="mt-2 text-primary font-medium">Breathe easy, feel better!</p>
      <div className="mt-6">
        <Body>
          Welcome to your Sinus Relief Exercise! 👃 Blocked sinuses can make you feel heavy,
          foggy, and exhausted. Whether it's due to allergies, pollution, or a cold — there are
          simple techniques you can do right now to find relief. No medication needed — just
          your hands and your breath!
        </Body>
      </div>
      <div className="mt-auto">
        <CTAButton onClick={onNext}>Let's Begin →</CTAButton>
      </div>
    </div>
  );
}

function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-5 space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <button
            key={i}
            onClick={() => setOpen(isOpen ? null : i)}
            className={`w-full text-left rounded-2xl border bg-card transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-primary shadow-[0_6px_18px_-10px_rgba(74,144,184,0.5)]"
                : "border-primary-soft hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3.5">
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="flex-1 font-semibold text-[14.5px] text-foreground">
                {item.title}
              </span>
              <ChevronRight
                className={`w-4 h-4 text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-[13.5px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ScreenFacts({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <Title>What's happening in there? 🔍</Title>
      <p className="mt-2 text-[14px] text-muted-foreground">
        A little knowledge goes a long way. Here's what you should know!
      </p>
      <div className="overflow-y-auto -mx-1 px-1">
        <Accordion items={FACTS} />
      </div>
      <div className="mt-auto pt-4">
        <CTAButton onClick={onNext}>Next →</CTAButton>
      </div>
    </div>
  );
}

function ScreenExercise({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <Title>Let's clear those sinuses! 💨</Title>
      <p className="mt-2 text-[14px] text-muted-foreground">
        Try this simple acupressure & breathing technique for instant sinus relief!
      </p>
      <div className="overflow-y-auto -mx-1 px-1">
        <Accordion items={STEPS} />
        <TipBox>
          💡 For best results, do this in a warm room or after a hot shower when your nasal
          passages are already slightly open!
        </TipBox>
      </div>
      <div className="mt-auto pt-4">
        <CTAButton onClick={onNext}>Next →</CTAButton>
      </div>
    </div>
  );
}

function ScreenDone({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex flex-col h-full text-center">
      <div className="mt-6 mx-auto w-20 h-20 rounded-full bg-primary-soft flex items-center justify-center text-4xl animate-scale-in">
        🎉
      </div>
      <h1 className="mt-5 font-serif text-[28px] leading-tight text-foreground">
        Well done! Breathe easy!
      </h1>
      <div className="text-left">
        <TipBox>
          💡 Do this exercise every morning and evening during allergy season or when you feel
          congested. Staying hydrated and using a humidifier at home can also help!
        </TipBox>
      </div>
      <p className="mt-5 text-[14.5px] leading-relaxed text-muted-foreground">
        Your sinuses will thank you! Consistency with these simple techniques can make a big
        difference in how you breathe and feel every day. Stay healthy! 💙
      </p>
      <div className="mt-auto pt-4">
        <CTAButton onClick={onDone}>Done ✅</CTAButton>
      </div>
    </div>
  );
}
