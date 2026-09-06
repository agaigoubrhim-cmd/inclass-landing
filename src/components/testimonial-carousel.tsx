"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star, CheckCircle2 } from "lucide-react";
import { Squiggle } from "@/components/icons";
import type { Testimonial as DbTestimonial } from "@/db/schema";
import { useI18n } from "@/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export type TestimonialItem = {
  id?: string | number;
  text: string;
  name: string;
  role: string;
  location?: string;
  rating: number | string;
  avatarUrl: string;
};

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    text: "INCLASS m'a aidé à trouver le tuteur idéal pour mon cours de calcul. Mes notes se sont nettement améliorées !",
    name: "Alex Thompson",
    role: "Étudiant universitaire",
    location: "Casablanca",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    text: "Les tuteurs sont professionnels et la plateforme est très facile à utiliser. Je recommande !",
    name: "Maria Garcia",
    role: "Lycéenne",
    location: "Rabat",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    text: "La confiance de ma fille en mathématiques a grimpé en flèche grâce à son incroyable tuteur sur INCLASS.",
    name: "James Wilson",
    role: "Parent",
    location: "Marrakech",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 4,
    text: "Grâce à mon professeur de physique sur INCLASS, j'ai réussi mon année de prépa avec d'excellents résultats.",
    name: "Sarah Lahlou",
    role: "Étudiante CPGE",
    location: "Casablanca",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 5,
    text: "Une flexibilité incroyable et un suivi rigoureux après chaque séance. C'est exactement ce dont nous avions besoin.",
    name: "Youssef Bennani",
    role: "Parent d'élève",
    location: "Tanger",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 6,
    text: "J'ai gagné 4 points en anglais en seulement 2 mois avant de passer mon test IELTS. Professeur au top !",
    name: "Hiba Naciri",
    role: "Lycéenne",
    location: "Rabat",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 7,
    text: "Le système de réservation est ultra simple et les cours en ligne sont d'une grande fluidité technique.",
    name: "Amine Tazi",
    role: "Étudiant universitaire",
    location: "Fès",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 8,
    text: "Mon tuteur m'a redonné le goût des mathématiques. Méthode claire, patience et exercices ciblés.",
    name: "Kenza Fassi",
    role: "Collégienne",
    location: "Agadir",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 9,
    text: "Premier cours satisfait ou remplacé testé et validé ! Une vraie sérénité pour nous en tant que parents.",
    name: "Mehdi Alaoui",
    role: "Parent",
    location: "Casablanca",
    rating: "5.0",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  },
];

export function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="group relative rounded-[28px] border border-line bg-white p-6  transition-all duration-300 hover:-translate-y-1 hover:border-student-400 dark:border-white/10 dark:bg-ink-800/90 dark:hover:border-student-500/30">
      {/* Stars + Rating badge */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="ml-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
          {item.rating || "5.0"}
        </span>
      </div>

      {/* Quote */}
      <p className="mt-4 text-[15px] italic leading-relaxed text-ink dark:text-white/90">
        &ldquo;{item.text}&rdquo;
      </p>

      {/* Author info with photographic avatar */}
      <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4 dark:border-white/10">
        <div className="flex items-center gap-3">
          <img
            src={item.avatarUrl}
            alt={item.name}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-black/5 dark:ring-white/15"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink dark:text-white leading-tight">
              {item.name}
            </p>
            <p className="truncate text-xs text-ink-soft dark:text-white/50 mt-0.5">
              {item.role} · INCLASS
            </p>
          </div>
        </div>
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
      </div>
    </div>
  );
}

export function TestimonialsColumn({
  testimonials,
  duration = 25,
  className = "",
}: {
  testimonials: TestimonialItem[];
  duration?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!columnRef.current) return;

      const anim = gsap.to(columnRef.current, {
        yPercent: -50,
        ease: "none",
        duration: duration,
        repeat: -1,
      });

      const el = columnRef.current;
      const handleMouseEnter = () => anim.pause();
      const handleMouseLeave = () => anim.play();

      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        anim.kill();
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef, dependencies: [duration] }
  );

  const duplicated = [...testimonials, ...testimonials];

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={columnRef} className="flex flex-col gap-5 will-change-transform">
        {duplicated.map((t, i) => (
          <TestimonialCard key={`${t.id || t.name}-${i}`} item={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialCarousel({
  items,
}: {
  items?: (DbTestimonial | TestimonialItem)[];
}) {
  const { dict } = useI18n();

  const allItems: TestimonialItem[] =
    items && items.length > 0
      ? items.map((item: any, idx) => {
          if (item.quote) {
            return {
              id: item.id || idx,
              text: item.quote,
              name: item.authorName || "Utilisateur INCLASS",
              role:
                item.authorRole === "student"
                  ? dict.common.students
                  : item.authorRole === "parent"
                    ? dict.common.parents
                    : item.authorRole === "tutor"
                      ? dict.common.tutors
                      : item.authorRole || dict.common.students,
              location: item.city || "Maroc",
              rating: item.rating ? String(item.rating) : "5.0",
              avatarUrl:
                DEFAULT_TESTIMONIALS[idx % DEFAULT_TESTIMONIALS.length].avatarUrl,
            };
          }
          return item;
        })
      : DEFAULT_TESTIMONIALS;

  const col1 = [allItems[0 % allItems.length], allItems[3 % allItems.length], allItems[6 % allItems.length]];
  const col2 = [allItems[1 % allItems.length], allItems[4 % allItems.length], allItems[7 % allItems.length]];
  const col3 = [allItems[2 % allItems.length], allItems[5 % allItems.length], allItems[8 % allItems.length]];

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div data-anim="up" className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-student-400/80" />
          <span className="font-brand text-xs font-bold uppercase tracking-[0.18em] text-student-600 dark:text-student-400">
            {dict.testimonialsSection.eyebrow}
          </span>
          <span className="h-px w-8 bg-student-400/80" />
        </div>

        {/* Title */}
        <h2
          data-anim="up"
          data-anim-delay="0.05"
          className="text-center font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.06] text-ink dark:text-white"
        >
          {dict.testimonialsSection.titlePrefix}{" "}
          <span className="relative ms-1.5 inline-block font-brand text-student-600 dark:text-student-400">
            {dict.testimonialsSection.highlight}
            <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-student-300 dark:text-student-400" />
          </span>
        </h2>

        {/* Subtitle */}
        <p
          data-anim="up"
          data-anim-delay="0.1"
          className="mx-auto mt-4 max-w-xl text-center text-base sm:text-lg text-ink-soft dark:text-white/70"
        >
          {dict.testimonialsSection.sub}
        </p>

        {/* 3 Stat Badges */}
        <div
          data-anim="up"
          data-anim-delay="0.15"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >





        </div>

        {/* Infinite scrolling 3-column container */}
        <div className="relative mt-14 h-[600px] sm:h-[660px] overflow-hidden">
          {/* Top & Bottom gradient fade overlays */}
          {/* Top fade */}
          {/* Top fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[200px] bg-gradient-to-b from-sand/60 via-sand/30 to-transparent dark:from-ink-950/50 dark:via-ink-950/25 dark:to-transparent" />

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[200px] bg-gradient-to-t from-sand/60 via-sand/30 to-transparent dark:from-ink-950/50 dark:via-ink-950/25 dark:to-transparent" />

          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[200px] bg-gradient-to-r from-sand/60 via-sand/30 to-transparent dark:from-ink-950/50 dark:via-ink-950/25 dark:to-transparent" />

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[200px] bg-gradient-to-l from-sand/60 via-sand/30 to-transparent dark:from-ink-950/50 dark:via-ink-950/25 dark:to-transparent" />


          <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialsColumn testimonials={col1} duration={28} />
            <TestimonialsColumn testimonials={col2} duration={22} className="hidden md:block" />
            <TestimonialsColumn testimonials={col3} duration={26} className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
