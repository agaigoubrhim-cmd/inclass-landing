"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
  BookOpen,
  Brain,
  Briefcase,
  Clock3,
  Code2,
  Cpu,
  Database,
  Dumbbell,
  FileCode,
  Flame,
  Globe,
  Globe2,
  GraduationCap,
  HeartPulse,
  HeartHandshake,
  Laptop,
  Languages,
  Lightbulb,
  Mail,
  Map,
  MapPin,
  Megaphone,
  MessageSquare,
  Microscope,
  Music,
  Palette,
  PenTool,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Terminal,
  Trophy,
  UserCheck,
  Video,
  Wrench,
} from "lucide-react";

import PageHero from "@/components/page-hero";
import { FaqAccordion } from "@/components/sections";
import { WhatsAppIcon } from "@/components/icons";
import { SectionHead } from "@/components/ui";
import { useI18n } from "@/i18n";

// ============================================================
// CURRICULA SUBJECTS DATA
// ============================================================
const subjectCategories = [
  {
    category: "Sciences Exactes & Naturelles",
    items: [
      { name: "Mathematics", icon: GraduationCap, tutors: "24", students: "180+" },
      { name: "Physique", icon: Microscope, tutors: "18", students: "140+" },
      { name: "Chimie", icon: Flame, tutors: "15", students: "110+" },
      { name: "Biologie", icon: HeartPulse, tutors: "12", students: "90+" },
      { name: "Sciences de la Terre", icon: Globe, tutors: "8", students: "65+" },
      { name: "Informatique", icon: Laptop, tutors: "22", students: "210+" },
      { name: "Statistiques", icon: Sparkles, tutors: "10", students: "75+" },
    ],
  },
  {
    category: "Sciences Humaines & Sociales",
    items: [
      { name: "Philosophie", icon: Brain, tutors: "11", students: "95+" },
      { name: "Histoire", icon: BookOpen, tutors: "9", students: "80+" },
      { name: "Géographie", icon: Map, tutors: "8", students: "70+" },
      { name: "Éducation Islamique", icon: BookOpen, tutors: "14", students: "130+" },
      { name: "Éducation Civique", icon: UserCheck, tutors: "6", students: "50+" },
      { name: "Sociologie", icon: HeartHandshake, tutors: "5", students: "40+" },
      { name: "Psychologie", icon: Brain, tutors: "7", students: "60+" },
    ],
  },
  {
    category: "Langues & Linguistique",
    items: [
      { name: "Langue Arabe", icon: Languages, tutors: "20", students: "160+" },
      { name: "Langue Française", icon: Languages, tutors: "25", students: "220+" },
      { name: "Langue Anglaise", icon: Globe2, tutors: "30", students: "310+" },
      { name: "Langue Espagnole", icon: Globe2, tutors: "10", students: "85+" },
      { name: "Langue Allemande", icon: Globe2, tutors: "8", students: "60+" },
      { name: "Langue Italienne", icon: Globe2, tutors: "6", students: "45+" },
      { name: "Langue Amazighe", icon: Languages, tutors: "7", students: "50+" },
      { name: "Chinois (Mandarin)", icon: Globe2, tutors: "4", students: "30+" },
    ],
  },
  {
    category: "Économie & Gestion",
    items: [
      { name: "Économie", icon: Briefcase, tutors: "16", students: "130+" },
      { name: "Comptabilité", icon: Briefcase, tutors: "14", students: "115+" },
      { name: "Gestion d'Entreprise", icon: Briefcase, tutors: "12", students: "95+" },
      { name: "Marketing", icon: Megaphone, tutors: "11", students: "105+" },
      { name: "Finance", icon: Briefcase, tutors: "9", students: "80+" },
      { name: "Droit des Affaires", icon: Scale, tutors: "7", students: "60+" },
    ],
  },
  {
    category: "Arts & Culture",
    items: [
      { name: "Arts Plastiques", icon: Palette, tutors: "8", students: "55+" },
      { name: "Musique", icon: Music, tutors: "10", students: "70+" },
      { name: "Dessin", icon: PenTool, tutors: "9", students: "65+" },
      { name: "Photographie", icon: Video, tutors: "6", students: "40+" },
      { name: "Calligraphie Arabe", icon: PenTool, tutors: "5", students: "35+" },
    ],
  },
  {
    category: "Ingénierie, Santé & Droit",
    items: [
      { name: "Génie Civil", icon: Wrench, tutors: "8", students: "60+" },
      { name: "Génie Électrique", icon: Cpu, tutors: "10", students: "75+" },
      { name: "Génie Mécanique", icon: Wrench, tutors: "9", students: "70+" },
      { name: "Génie Logiciel", icon: Code2, tutors: "18", students: "160+" },
      { name: "Génie Industriel", icon: Wrench, tutors: "7", students: "50+" },
      { name: "Sciences Médicales", icon: Stethoscope, tutors: "12", students: "110+" },
      { name: "Pharmacie", icon: Stethoscope, tutors: "8", students: "65+" },
      { name: "Sciences Infirmières", icon: HeartPulse, tutors: "6", students: "55+" },
      { name: "Médecine Dentaire", icon: Stethoscope, tutors: "7", students: "50+" },
      { name: "Droit Constitutionnel", icon: Scale, tutors: "5", students: "40+" },
      { name: "Droit Civil", icon: Scale, tutors: "8", students: "60+" },
      { name: "Droit Pénal", icon: Scale, tutors: "6", students: "45+" },
      { name: "Droit International", icon: Scale, tutors: "5", students: "35+" },
    ],
  },
  {
    category: "Technologie & Design",
    items: [
      { name: "Programmation Python", icon: FileCode, tutors: "25", students: "240+" },
      { name: "JavaScript", icon: Code2, tutors: "22", students: "200+" },
      { name: "Programmation Java", icon: Code2, tutors: "15", students: "130+" },
      { name: "Programmation C/C++", icon: Terminal, tutors: "14", students: "110+" },
      { name: "Développement Web", icon: Globe, tutors: "28", students: "290+" },
      { name: "Développement Mobile", icon: Laptop, tutors: "16", students: "150+" },
      { name: "Science des Données", icon: Database, tutors: "11", students: "95+" },
      { name: "Apprentissage Automatique & IA", icon: Brain, tutors: "13", students: "120+" },
      { name: "Gestion de Bases de Données", icon: Database, tutors: "10", students: "85+" },
      { name: "Cybersécurité", icon: ShieldCheck, tutors: "9", students: "75+" },
      { name: "Design Graphique", icon: Palette, tutors: "17", students: "140+" },
      { name: "Design UI/UX", icon: PenTool, tutors: "12", students: "110+" },
      { name: "Montage Vidéo", icon: Video, tutors: "14", students: "125+" },
      { name: "Modélisation 3D & Animation", icon: Sparkles, tutors: "8", students: "65+" },
    ],
  },
  {
    category: "Préparation aux Examens & Soft Skills",
    items: [
      { name: "Préparation au Baccalauréat", icon: Trophy, tutors: "35", students: "450+" },
      { name: "Préparation aux Concours CPGE", icon: Trophy, tutors: "18", students: "190+" },
      { name: "Préparation IELTS", icon: Globe2, tutors: "15", students: "160+" },
      { name: "Préparation TOEFL", icon: Globe2, tutors: "12", students: "130+" },
      { name: "Préparation DELF/DALF", icon: Languages, tutors: "14", students: "140+" },
      { name: "Préparation GRE", icon: GraduationCap, tutors: "6", students: "45+" },
      { name: "Préparation GMAT", icon: GraduationCap, tutors: "5", students: "40+" },
      { name: "Préparation Concours Médecine", icon: Stethoscope, tutors: "16", students: "175+" },
      { name: "Art Oratoire", icon: MessageSquare, tutors: "10", students: "80+" },
      { name: "Compétences en Leadership", icon: Dumbbell, tutors: "8", students: "65+" },
      { name: "Gestion du Temps", icon: Clock3, tutors: "7", students: "55+" },
      { name: "Méthodologie d'Étude", icon: Lightbulb, tutors: "12", students: "100+" },
      { name: "Coaching de Carrière", icon: Briefcase, tutors: "9", students: "70+" },
    ],
  },
];

export default function ContactView({
  initialSubject,
  initialTutor,
}: {
  initialSubject?: string;
  initialTutor?: string;
}) {
  const { dict } = useI18n();
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContentRef.current) return;

    const el = scrollContentRef.current;

    const anim = gsap.to(el, {
      yPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });

    const handleMouseEnter = () => anim.pause();
    const handleMouseLeave = () => anim.play();

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      anim.kill();
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const channels = [
    {
      icon: WhatsAppIcon,
      title: dict.common.whatsappSupport,
      value: "+212 6 00 00 00 00",
      hint: dict.faq.supportAnswerTime,
      href: "https://wa.me/212600000000",
      cls: "text-student-600 dark:text-student-300",
      iconBg:
        "bg-student-50 text-student-600 dark:bg-student-950/40 dark:text-student-300",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+212 5 28 00 00 00",
      hint: "Lundi au Samedi · 9h – 19h",
      href: "tel:+212528000000",
      cls: "text-tutor-600 dark:text-tutor-300",
      iconBg:
        "bg-tutor-50 text-tutor-600 dark:bg-tutor-950/40 dark:text-tutor-300",
    },
    {
      icon: Mail,
      title: "Email Support",
      value: "salam@inclass.app",
      hint: "Réponse sous 24h ouvrées",
      href: "mailto:salam@inclass.app",
      cls: "text-parent-600 dark:text-parent-300",
      iconBg:
        "bg-parent-50 text-parent-600 dark:bg-parent-950/40 dark:text-parent-300",
    },
  ];

  const renderSubjectContent = () => (
    <div className="space-y-6">
      {subjectCategories.map((cat) => (
        <div key={cat.category}>
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-white/40">
            {cat.category}
          </h3>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cat.items.map((sub) => {
              const IconComponent = sub.icon;
              return (
                <div
                  key={sub.name}
                  className="group flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-all duration-200 hover:border-slate-300 hover:bg-white dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-parent-50 text-parent-600 transition-colors group-hover:bg-parent-600 group-hover:text-white dark:bg-parent-950/60 dark:text-parent-300">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <h4 className="truncate text-xs font-bold text-ink dark:text-white">
                      {sub.name}
                    </h4>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2 border-t border-slate-100/60 pt-1.5 dark:border-white/5">
                    <span className="inline-flex items-center gap-1 rounded bg-student-50 px-1.5 py-0.5 text-[10px] font-semibold text-student-700 dark:bg-student-950/40 dark:text-student-300">
                      <UserCheck className="h-2.5 w-2.5" />
                      {sub.tutors} tutors
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-tutor-50 px-1.5 py-0.5 text-[10px] font-semibold text-tutor-700 dark:bg-tutor-950/40 dark:text-tutor-300">
                      <GraduationCap className="h-2.5 w-2.5" />
                      {sub.students} students
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-100 dark:bg-ink-950">
      {/* HERO */}
      <PageHero
        eyebrow={dict.contactForm.eyebrow}
        title={dict.contactForm.title}
        highlight={dict.contactForm.highlight}
        tone="parent"
        sub={dict.contactForm.sub}
        image="/images/parents.jpg"
        imageAlt={dict.nav.contact}
        crumbs={[{ label: dict.nav.contact }]}
      />

      {/* MAIN CONTENT */}
      <main>
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* CONTACT CHANNELS */}
          <div data-anim-stagger className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {channels.map((channel) => {
              const Icon = channel.icon;

              return (
                <a
                  key={channel.title}
                  href={channel.href}
                  target={channel.title.includes("WhatsApp") ? "_blank" : undefined}
                  rel={channel.title.includes("WhatsApp") ? "noopener noreferrer" : undefined}
                  data-anim-child
                  className={`group min-w-0 rounded-2xl bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20 ${channel.cls}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${channel.iconBg}`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-slate-100 dark:bg-white/5 dark:text-white/40 dark:group-hover:bg-white/10">
                      <span className="text-xs">↗</span>
                    </div>
                  </div>

                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] opacity-70">
                    {channel.title}
                  </p>

                  <p className="mt-1 break-words text-sm font-extrabold leading-5 text-ink dark:text-white">
                    {channel.value}
                  </p>

                  <p className="mt-1 text-xs leading-4 text-ink-soft dark:text-white/55">
                    {channel.hint}
                  </p>
                </a>
              );
            })}
          </div>

          {/* SIDEBAR / CONTACT INFORMATION */}
          <div className="mt-6 grid items-start gap-4 sm:mt-8 lg:grid-cols-2 lg:gap-6">
            {/* OFFICE CARD */}
            <div
              data-anim="right"
              className="rounded-2xl bg-white p-4 sm:p-5 dark:border dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-ink dark:bg-white/10 dark:text-white">
                  <MapPin className="h-4.5 w-4.5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-parent-600 dark:text-parent-300">
                    Notre bureau
                  </p>

                  <h3 className="mt-0.5 text-base font-extrabold text-ink dark:text-white">
                    {dict.footer.officeAgadir}
                  </h3>
                </div>
              </div>

              <div className="my-4 h-px bg-slate-100 dark:bg-white/10" />

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-student-500" />
                  <div>
                    <p className="text-xs font-semibold text-ink dark:text-white">Adresse</p>
                    <p className="mt-0.5 text-xs text-ink-soft dark:text-white/60">
                      Avenue Hassan II, Agadir
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-tutor-500" />
                  <div>
                    <p className="text-xs font-semibold text-ink dark:text-white">Horaires</p>
                    <p className="mt-0.5 text-xs text-ink-soft dark:text-white/60">
                      Lun – Sam · 9h–19h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-parent-500" />
                  <div>
                    <p className="text-xs font-semibold text-ink dark:text-white">Langues</p>
                    <p className="mt-0.5 text-xs text-ink-soft dark:text-white/60">
                      FR, AR, ES, EN
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SUPPORT CARD */}
            <div
              data-anim="right"
              className="rounded-2xl bg-white p-4 sm:p-5 dark:border dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-parent-50 text-parent-600 dark:bg-parent-950/40 dark:text-parent-300">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-base font-extrabold text-ink dark:text-white">
                    Besoin d&apos;aide ?
                  </h4>

                  <p className="mt-1 text-xs text-ink-soft dark:text-white/60">
                    Notre équipe est disponible pour répondre à vos questions et vous accompagner.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>

                <span className="text-xs font-semibold text-ink-soft dark:text-white/60">
                  Support disponible
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* AUTO-SCROLLING CURRICULA SECTION */}
        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-ink-950">

            {/* Top Gradient Blur */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-14 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-ink-950 dark:via-ink-950/80" />

            {/* Title Badge */}
            <div className="relative z-20 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-parent-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-parent-600 dark:bg-parent-950/50 dark:text-parent-300">
                  <Globe className="h-3 w-3" /> Program & Curricula
                </span>
                <h2 className="text-sm font-bold text-ink dark:text-white">
                  Moroccan & International Curricula
                </h2>
              </div>
            </div>

            {/* Infinite Auto-scrolling List */}
            <div className="h-full overflow-hidden pt-1 pb-6">
              <div ref={scrollContentRef} className="space-y-6">
                {renderSubjectContent()}
                {renderSubjectContent()}
              </div>
            </div>

            {/* Bottom Gradient Blur */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-14 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-ink-950 dark:via-ink-950/80" />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-100 py-12 sm:py-16 dark:border-white/5 dark:bg-ink-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow={dict.faq.eyebrow}
              title={dict.faq.title}
              highlight={dict.faq.highlight}
              tone="parent"
            />

            <div className="mt-6 overflow-hidden rounded-2xl bg-white p-4 sm:p-6 dark:border dark:border-white/10 dark:bg-white/[0.04]">
              <FaqAccordion tone="parent" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}