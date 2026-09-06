"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Globe,
  Menu,
  HelpCircle,
  Home as HomeIcon,
  Moon,
  Phone,
  Rocket,
  Route,
  Search,
  ShieldCheck,
  Sun,
  Users,
  Video,
  Wallet,
  Sparkles,
  X,
  Compass,
  Command,
  BookOpen,
  MapPin,
  Check,
} from "lucide-react";
import { LogoLockup } from "./icons";
import { RollingText } from "@/components/gsap/rolling-text";
import { CITIES, FALLBACK_SUBJECTS } from "@/content/site";
import { useI18n } from "@/i18n";

/* ─── Theme context ─── */
type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void; mounted: boolean }>({
  theme: "light",
  toggle: () => {},
  mounted: false,
});
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- Hydration-safe theme init from storage */
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial: Theme = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("theme", next);
      } catch {}
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, toggle, mounted }}>{children}</ThemeCtx.Provider>
  );
}

/* ─── Magnetic Hover Component ─── */
function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power2.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = el.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) * strength;
        const y = (clientY - (rect.top + rect.height / 2)) * strength;
        xTo(x);
        yTo(y);
      };

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1.1, 0.4)",
        });
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/* ─── Language selector with GSAP Dropdown ─── */
function LanguageSwitcher() {
  const { locale, setLocale, languages, currentLanguage, isRTL } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useGSAP(
    () => {
      if (!dropdownRef.current) return;
      if (open) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: -8, scale: 0.94, transformOrigin: isRTL ? "top left" : "top right" },
          { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" }
        );
      }
    },
    { dependencies: [open, isRTL] }
  );

  return (
    <div ref={ref} className="relative">
      <Magnetic strength={0.2}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/70 px-3 text-xs font-bold text-ink backdrop-blur-md transition-all hover:bg-sand hover:scale-105 active:scale-95 dark:border-white/15 dark:bg-white/8 dark:text-white dark:hover:bg-white/15"
          aria-label="Changer de langue"
        >
          <span className="text-sm">{currentLanguage.flag}</span>
          <span>{currentLanguage.label}</span>
          <ChevronDown
            className={`h-3 w-3 opacity-60 transition-transform duration-300 ${
              open ? "rotate-180 text-tutor-500" : ""
            }`}
          />
        </button>
      </Magnetic>

      {open ? (
        <div
          ref={dropdownRef}
          className={`absolute ${isRTL ? "left-0" : "right-0"} top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line/80 bg-white/95 p-1.5 backdrop-blur-xl dark:border-white/15 dark:bg-ink-900/95`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setLocale(lang.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                locale === lang.code
                  ? "bg-tutor-50 text-tutor-700 dark:bg-tutor-950/60 dark:text-tutor-300"
                  : "text-ink hover:bg-sand dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              {locale === lang.code ? (
                <span className="h-1.5 w-1.5 rounded-full bg-tutor-500" />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ─── Dark/light toggle with GSAP Rotation Bounce ─── */
function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = mounted ? theme === "dark" : false;
  const iconRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotate: 0, scale: 0.7 },
        { rotate: 360, scale: 1, duration: 0.5, ease: "back.out(1.8)" }
      );
    }
    toggle();
  };

  return (
    <Magnetic strength={0.25}>
      <button
        type="button"
        onClick={handleToggle}
        className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/70 backdrop-blur-md transition-all hover:bg-sand hover:scale-105 active:scale-95 dark:border-white/15 dark:bg-white/8 dark:hover:bg-white/15"
        aria-label="Basculer le mode sombre"
      >
        <div ref={iconRef} className="grid place-items-center">
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-400 transition-colors" />
          ) : (
            <Moon className="h-4 w-4 text-ink-soft group-hover:text-ink transition-colors" />
          )}
        </div>
      </button>
    </Magnetic>
  );
}

/* ─── Spotlight Search Palette Modal ─── */
function SearchPaletteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { dict, isRTL } = useI18n();
  const [query, setQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      /* eslint-disable-next-line react-hooks/set-state-in-effect -- Reset search while closing the modal */
      setQuery("");
    }
  }, [isOpen]);

  useGSAP(
    () => {
      if (!modalRef.current) return;
      if (isOpen) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.96, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power3.out" }
        );
      }
    },
    { dependencies: [isOpen] }
  );

  if (!isOpen) return null;

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  const filteredSubjects = FALLBACK_SUBJECTS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredCities = CITIES.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:p-6 sm:pt-28">
      <div
        className="fixed inset-0 bg-ink/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-line/80 bg-white/95 backdrop-blur-2xl dark:border-white/15 dark:bg-ink-900/95"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4 dark:border-white/10">
          <Search className="h-5 w-5 text-tutor-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.common.searchPlaceholder}
            className="w-full bg-transparent text-[15px] font-medium text-ink placeholder:text-ink-soft/60 focus:outline-none dark:text-white dark:placeholder:text-white/40"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-sand p-1 text-ink-soft hover:text-ink dark:bg-white/10 dark:text-white/60 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Suggestions Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() && (
            <button
              type="button"
              onClick={() => handleSelect(`/contact?q=${encodeURIComponent(query)}`)}
              className="flex w-full items-center justify-between rounded-xl bg-student-50 px-4 py-2.5 text-left text-sm font-bold text-student-700 hover:bg-student-100 dark:bg-student-950/60 dark:text-student-300"
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                {dict.common.requestTutor} : &quot;{query}&quot;
              </span>
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </button>
          )}

          {/* Subjects */}
          <div className="mt-3">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft dark:text-white/40">
              {dict.footer.subjectsTitle}
            </p>
            <div className="mt-1 space-y-1">
              {filteredSubjects.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => handleSelect(`/contact?subject=${encodeURIComponent(s.name)}`)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-ink transition-colors hover:bg-sand dark:text-white dark:hover:bg-white/10"
                >
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="h-4 w-4 text-tutor-500" />
                    {s.name}
                  </span>
                  <span className="text-xs text-ink-soft dark:text-white/50">{s.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="mt-4">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft dark:text-white/40">
              {dict.common.citiesInMorocco}
            </p>
            <div className="mt-1 grid grid-cols-2 gap-1">
              {filteredCities.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleSelect(`/contact?city=${encodeURIComponent(c)}`)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-ink transition-colors hover:bg-sand dark:text-white dark:hover:bg-white/10"
                >
                  <MapPin className="h-3.5 w-3.5 text-student-500" />
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-line bg-sand/40 px-5 py-2.5 text-[11px] text-ink-soft dark:border-white/10 dark:bg-white/[0.02] dark:text-white/50">
          <span>{dict.common.brandName} · {dict.common.citiesInMorocco}</span>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">ESC pour fermer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mega Menu Styling Maps ─── */
const LINK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  route: Route,
  search: Search,
  home: HomeIcon,
  video: Video,
  users: Users,
  cap: GraduationCap,
  wallet: Wallet,
  rocket: Rocket,
  help: HelpCircle,
  chart: BarChart3,
  shield: ShieldCheck,
  phone: Phone,
};

const COLUMN_STYLE: Record<
  string,
  { chip: string; hover: string; borderHover: string; icon: string }
> = {
  student: {
    chip: "bg-student-500/10 text-student-700 dark:bg-student-500/20 dark:text-student-300",
    hover: "hover:bg-student-50/70 dark:hover:bg-student-950/40",
    borderHover: "hover:border-student-200 dark:hover:border-student-500/30",
    icon: "bg-student-100 text-student-700 dark:bg-student-950 dark:text-student-300",
  },
  tutor: {
    chip: "bg-tutor-500/10 text-tutor-700 dark:bg-tutor-500/20 dark:text-tutor-300",
    hover: "hover:bg-tutor-50/70 dark:hover:bg-tutor-950/40",
    borderHover: "hover:border-tutor-200 dark:hover:border-tutor-500/30",
    icon: "bg-tutor-100 text-tutor-700 dark:bg-tutor-950 dark:text-tutor-300",
  },
  parent: {
    chip: "bg-parent-500/10 text-parent-700 dark:bg-parent-500/20 dark:text-parent-300",
    hover: "hover:bg-parent-50/70 dark:hover:bg-parent-950/40",
    borderHover: "hover:border-parent-200 dark:hover:border-parent-500/30",
    icon: "bg-parent-100 text-parent-700 dark:bg-parent-950 dark:text-parent-300",
  },
};

/* ─── Main Site Header Component ─── */
export default function SiteHeader() {
  const pathname = usePathname();
  const { dict, isRTL, languages, setLocale, locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMega, setMobileMega] = useState<string>("student");

  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaColsRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileBackdropRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const navItems = [
    { href: "/", label: dict.nav.home },
    { href: "/comment-ca-marche", label: dict.nav.howItWorks, mega: true },
    { href: "/ressources", label: dict.nav.resources },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  const megaMenuData = [
    {
      key: "student",
      title: dict.megaMenu.studentTitle,
      tagline: dict.megaMenu.studentTagline,
      href: "/comment-ca-marche/eleves",
      links: [
        { label: dict.megaMenu.studentLink1, href: "/comment-ca-marche/eleves", icon: "route" },
        { label: dict.megaMenu.studentLink2, href: "/contact", icon: "search" },
        { label: dict.megaMenu.studentLink3, href: "/comment-ca-marche/eleves", icon: "home" },
        { label: dict.megaMenu.studentLink4, href: "/comment-ca-marche/eleves", icon: "video" },
        { label: dict.megaMenu.studentLink5, href: "/comment-ca-marche/eleves#parents", icon: "users" },
      ],
    },
    {
      key: "tutor",
      title: dict.megaMenu.tutorTitle,
      tagline: dict.megaMenu.tutorTagline,
      href: "/comment-ca-marche/profs",
      links: [
        { label: dict.megaMenu.tutorLink1, href: "/comment-ca-marche/profs", icon: "cap" },
        { label: dict.megaMenu.tutorLink2, href: "/comment-ca-marche/profs#commissions", icon: "wallet" },
        { label: dict.megaMenu.tutorLink3, href: "/comment-ca-marche/profs#candidature", icon: "rocket" },
        { label: dict.megaMenu.tutorLink4, href: "/comment-ca-marche/profs#faq", icon: "help" },
      ],
    },
    {
      key: "parent",
      title: dict.megaMenu.parentTitle,
      tagline: dict.megaMenu.parentTagline,
      href: "/comment-ca-marche/eleves#parents",
      links: [
        { label: dict.megaMenu.parentLink1, href: "/comment-ca-marche/eleves#parents", icon: "users" },
        { label: dict.megaMenu.parentLink2, href: "/comment-ca-marche/eleves#suivi", icon: "chart" },
        { label: dict.megaMenu.parentLink3, href: "/a-propos#confiance", icon: "shield" },
        { label: dict.megaMenu.parentLink4, href: "/comment-ca-marche/eleves#faq", icon: "help" },
        { label: dict.megaMenu.parentLink5, href: "/contact", icon: "phone" },
      ],
    },
  ];

  /* Scroll Listener */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- Close menus after navigation */
    setMega(false);
    setMenuOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  /* Keyboard shortcut for Cmd+K */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* GSAP Mega Menu Dropdown Animation */
  useGSAP(
    () => {
      if (!megaMenuRef.current) return;
      if (mega) {
        gsap.fromTo(
          megaMenuRef.current,
          { opacity: 0, y: -12, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" }
        );
        if (megaColsRef.current) {
          gsap.fromTo(
            megaColsRef.current.children,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.28, stagger: 0.05, ease: "power2.out", delay: 0.05 }
          );
        }
      }
    },
    { dependencies: [mega] }
  );

  /* GSAP Mobile Drawer Open/Close Animation */
  useGSAP(
    () => {
      if (!mobileDrawerRef.current) return;
      if (menuOpen) {
        gsap.fromTo(
          mobileBackdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          mobileDrawerRef.current,
          { x: isRTL ? -380 : 380 },
          { x: 0, duration: 0.45, ease: "power3.out" }
        );
        const items = mobileDrawerRef.current.querySelectorAll(".mobile-anim-item");
        if (items.length) {
          gsap.fromTo(
            items,
            { x: isRTL ? -25 : 25, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: "power3.out",
              delay: 0.1,
            }
          );
        }
      }
    },
    { dependencies: [menuOpen, isRTL] }
  );

  function openMega() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(true);
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  }

  function closeAll() {
    setMega(false);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-2.5 z-50 w-full px-3 sm:px-6 lg:px-8"
      >
        {/* Floating Capsule Container */}
        <div
          className={`relative mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-black/[0.07] bg-white/80 backdrop-blur-xl transition-all duration-300 ease-out dark:border-white/10 dark:bg-ink-900/90 [&>*]:relative [&>*]:z-[3] ${
            scrolled
              ? "px-4 py-2 sm:px-6 sm:py-2.5"
              : "px-4 py-2.5 sm:px-6 sm:py-3"
          }`}
        >

          {/* Left Brand Logo */}
          <Link href="/" onClick={closeAll} className="nav-anim-item group relative shrink-0">
            <Magnetic strength={0.15}>
              <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                <LogoLockup markClassName="h-9 w-9 sm:h-10 sm:w-10 transition-transform duration-500 group-hover:rotate-[6deg]" />
              </div>
            </Magnetic>
          </Link>

          {/* Desktop Center Nav */}
          <nav
            ref={navContainerRef}
            className="relative hidden items-center gap-0.5 rounded-full border border-black/[0.05] bg-sand/60 p-1 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] lg:flex"
          >
            {navItems.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.split("#")[0]);

              if (link.mega) {
                return (
                  <div
                    key={link.href}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleClose}
                    className="nav-anim-item relative"
                  >
                    <button
                      type="button"
                      onClick={() => setMega((v) => !v)}
                      aria-expanded={mega}
                      data-active={mega || pathname.startsWith("/comment-ca-marche")}
                      className={`nav-pill-target relative z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                        mega || pathname.startsWith("/comment-ca-marche")
                          ? "text-tutor-600 dark:text-white"
                          : "text-ink-soft hover:text-ink dark:text-white/70 dark:hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          mega ? "rotate-180 text-tutor-500" : "opacity-60"
                        }`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <div key={link.href} className="nav-anim-item relative">
                  <Link
                    href={link.href}
                    data-active={active}
                    className={`nav-pill-target relative z-10 inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      active
                        ? "text-tutor-600 dark:text-white"
                        : "text-ink-soft hover:text-ink dark:text-white/70 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="ms-auto hidden items-center gap-2 lg:flex">
            {/* Spotlight Search Trigger */}
            <div className="action-anim-item">
              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="group inline-flex h-9 items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 px-3 text-xs font-bold text-ink-soft backdrop-blur-md transition-all hover:bg-sand hover:text-ink hover:scale-105 active:scale-95 dark:border-white/15 dark:bg-white/8 dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white"
                  aria-label={dict.common.search}
                >
                  <Search className="h-3.5 w-3.5 text-tutor-500 transition-transform duration-300 group-hover:scale-110" />
                  <span>{dict.common.search}</span>
                  <kbd className="hidden rounded bg-sand px-1.5 py-0.5 text-[10px] font-semibold text-ink-soft dark:bg-white/10 dark:text-white/60 sm:inline-block">
                    {dict.common.searchCmd}
                  </kbd>
                </button>
              </Magnetic>
            </div>

            <div className="action-anim-item">
              <LanguageSwitcher />
            </div>

            <div className="action-anim-item">
              <ThemeToggle />
            </div>

            {/* Primary CTA */}
            <div className="action-anim-item">
              <Magnetic strength={0.3}>
                <Link
                  href="/contact"
                  className="btn-duo group relative inline-flex h-9 items-center gap-2 overflow-hidden rounded-2xl px-4 text-xs font-extrabold"
                >
                  <Sparkles className="h-3.5 w-3.5 text-tutor-200 transition-transform duration-300 group-hover:rotate-12" />
                  <RollingText text={dict.common.findTutor} />
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Mobile Header Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/80 text-ink backdrop-blur-md transition-all active:scale-90 dark:border-white/15 dark:bg-white/8 dark:text-white"
              aria-label={dict.common.search}
            >
              <Search className="h-4 w-4 text-tutor-500" />
            </button>

            <ThemeToggle />

            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Ouvrir le menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/90 text-ink backdrop-blur-md transition-all active:scale-90 dark:border-white/15 dark:bg-white/8 dark:text-white"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Desktop Animated Mega Menu Dropdown */}
        {mega ? (
          <div
            ref={megaMenuRef}
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-3 top-full mt-3 hidden max-w-7xl overflow-hidden rounded-[32px] border border-black/[0.08] bg-cream/95 backdrop-blur-2xl dark:border-white/10 dark:bg-ink-950/95 sm:inset-x-6 lg:block lg:inset-x-8 mx-auto"
          >
            <div
              ref={megaColsRef}
              className="grid gap-8 p-8 lg:grid-cols-[repeat(3,minmax(0,1fr))_320px]"
            >
              {megaMenuData.map((col) => {
                const style = COLUMN_STYLE[col.key] ?? COLUMN_STYLE.student;

                return (
                  <div key={col.key} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${style.chip}`}
                      >
                        {col.title}
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-semibold text-ink-soft dark:text-white/50">
                      {col.tagline}
                    </p>

                    <ul className="mt-4 space-y-1.5">
                      {col.links.map((l) => {
                        const Icon = LINK_ICONS[l.icon] ?? Route;

                        return (
                          <li key={l.label}>
                            <Link
                              href={l.href}
                              onClick={closeAll}
                              className={`group flex items-center gap-3 rounded-2xl border border-transparent p-2.5 text-sm font-medium text-ink transition-all duration-200 dark:text-white ${style.hover} ${style.borderHover}`}
                            >
                              <span
                                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-all duration-300 ${style.icon}`}
                              >
                                <Icon className="h-4.5 w-4.5" />
                              </span>

                              <span className="font-bold transition-transform duration-200 group-hover:translate-x-1">
                                {l.label}
                              </span>

                              <ArrowRight className={`ms-auto h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 ${isRTL ? "rotate-180" : ""}`} />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}

              {/* Promo Card with Gradient */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-tutor-600 via-tutor-500 to-tutor-700 p-6 text-white">
                <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/15 blur-2xl" />

                <div>
                  <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    {dict.megaMenu.guaranteeBadge}
                  </span>

                  <h4 className="mt-4 text-xl font-extrabold leading-snug">
                    {dict.megaMenu.guaranteeTitle}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-tutor-50/90">
                    {dict.megaMenu.guaranteeDesc}
                  </p>
                </div>

                <div className="mt-6 pt-2">
                  <Magnetic strength={0.25}>
                    <Link
                      href="/contact"
                      onClick={closeAll}
                      className="btn-duo btn-duo-white group inline-flex h-11 items-center gap-2.5 rounded-2xl px-5 text-xs font-extrabold"
                    >
                      <RollingText text={dict.common.requestTutor} />
                      <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* Spotlight Command Palette Modal */}
      <SearchPaletteModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer */}
      {menuOpen ? (
        <>
          {/* Backdrop */}
          <div
            ref={mobileBackdropRef}
            className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-lg lg:hidden"
            onClick={closeAll}
          />

          {/* Full-height Drawer Panel */}
          <div
            ref={mobileDrawerRef}
            className={`fixed inset-y-0 ${isRTL ? "left-0" : "right-0"} z-50 flex w-full max-w-[380px] flex-col bg-cream dark:bg-ink-950 lg:hidden`}
          >
            {/* Drawer Header */}
            <div className="mobile-anim-item flex items-center justify-between border-b border-line px-5 py-4 dark:border-white/10">
              <LogoLockup markClassName="h-9 w-9" textClassName="text-lg font-extrabold tracking-tight" />
              <button
                type="button"
                onClick={closeAll}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand text-ink transition-transform hover:rotate-90 active:scale-90 dark:bg-white/10 dark:text-white"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Role Switcher Chips on Mobile */}
            <div className="mobile-anim-item border-b border-line bg-sand/40 px-5 py-3 dark:border-white/10 dark:bg-white/[0.02]">
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "student", label: dict.common.students, icon: GraduationCap, href: "/comment-ca-marche/eleves" },
                  { id: "tutor", label: dict.common.tutors, icon: Rocket, href: "/comment-ca-marche/profs" },
                  { id: "parent", label: dict.common.parents, icon: Users, href: "/comment-ca-marche/eleves#parents" },
                ].map((r) => {
                  const active = mobileMega === r.id;
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setMobileMega(r.id)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                        active
                          ? "bg-ink text-cream dark:bg-white dark:text-ink"
                          : "bg-white text-ink-soft hover:text-ink dark:bg-white/10 dark:text-white/70"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Body */}
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              {/* Selected Role Sublinks */}
              {mobileMega && (
                <div className="mobile-anim-item mb-5 rounded-2xl border border-line bg-white p-3.5 dark:border-white/10 dark:bg-white/5">
                  {megaMenuData.filter((m) => m.key === mobileMega).map((col) => (
                    <div key={col.key}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink dark:text-white">{col.tagline}</span>
                        <Link
                          href={col.href}
                          onClick={closeAll}
                          className="text-[11px] font-bold text-tutor-600 dark:text-tutor-400 hover:underline"
                        >
                          {dict.common.seeMore} →
                        </Link>
                      </div>
                      <ul className="mt-3 space-y-1">
                        {col.links.map((l) => {
                          const Icon = LINK_ICONS[l.icon] ?? Route;
                          return (
                            <li key={l.label}>
                              <Link
                                href={l.href}
                                onClick={closeAll}
                                className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-ink-soft transition-colors hover:bg-sand dark:text-white/70 dark:hover:bg-white/10"
                              >
                                <Icon className="h-3.5 w-3.5 text-tutor-500" />
                                <span>{l.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Main Nav Links */}
              <ul className="space-y-1">
                {navItems.map((link) => (
                  <li key={link.href} className="mobile-anim-item">
                    <Link
                      href={link.href}
                      onClick={closeAll}
                      className={`flex items-center justify-between rounded-2xl px-3.5 py-3 text-base font-bold transition-colors ${
                        pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                          ? "bg-sand text-tutor-600 dark:bg-white/10 dark:text-white"
                          : "text-ink hover:bg-sand/60 dark:text-white dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`h-4 w-4 opacity-40 ${isRTL ? "rotate-180" : ""}`} />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Language Switch Pills */}
              <div className="mobile-anim-item mt-6 flex items-center justify-between border-t border-line pt-4 dark:border-white/10">
                <span className="text-xs font-bold text-ink-soft dark:text-white/50">Langue / اللغة :</span>
                <div className="flex gap-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLocale(lang.code)}
                      className={`rounded-full border px-3 py-1 text-xs font-bold transition-all ${
                        locale === lang.code
                          ? "border-tutor-500 bg-tutor-500 text-white"
                          : "border-line bg-white text-ink hover:bg-sand dark:border-white/15 dark:bg-white/10 dark:text-white"
                      }`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Mobile Footer CTAs */}
            <div className="mobile-anim-item space-y-2 border-t border-line p-5 dark:border-white/10">
              <Link
                href="/contact"
                onClick={closeAll}
                className="btn-duo group flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-extrabold"
              >
                <Search className="h-4 w-4" />
                <RollingText text={dict.common.requestTutor} />
              </Link>

              <Link
                href="/comment-ca-marche/profs"
                onClick={closeAll}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-white text-xs font-bold text-ink transition-transform active:scale-95 dark:border-white/15 dark:bg-white/10 dark:text-white"
              >
                <Sparkles className="h-3.5 w-3.5 text-tutor-500" />
                <span>{dict.common.becomeTutor}</span>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
