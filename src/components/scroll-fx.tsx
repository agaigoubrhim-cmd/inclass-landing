"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade" | "clip";

const FROM: Record<Direction, gsap.TweenVars> = {
  up: { y: 60, opacity: 0 },
  down: { y: -60, opacity: 0 },
  left: { x: -60, opacity: 0 },
  right: { x: 60, opacity: 0 },
  scale: { scale: 0.92, opacity: 0, transformOrigin: "50% 60%" },
  fade: { opacity: 0 },
  clip: { y: 70, opacity: 0, rotate: -1.5 },
};

/**
 * GSAP Scroll Experience (inspired by https://gsap.com/scroll/).
 *
 * Features:
 * - Buttery Lenis inertial smooth scrolling tied to GSAP ticker.
 * - Velocity-aware dynamic skew & drift on fast scrolling.
 * - Scrubbed multi-depth parallax on floating elements, cards and decorative stars.
 * - Smooth scroll-progress indicator.
 * - Seamless anchor navigation with easing.
 */
export default function ScrollFX() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  // 1. Initialize Lenis Inertial Smooth Scroll
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Connect Lenis scroll to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor click handling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // 2. Handle route changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  // 3. GSAP Scroll Choreography
  // Deferred one frame after hydration so GSAP never fights React during the
  // hydration pass (its inline opacity/transform styles caused mismatch diffs).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("gsap-ready");
    if (reduced) return;

    let cleanupLoad: (() => void) | undefined;
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const all = (selector: string) =>
          Array.from(document.querySelectorAll<HTMLElement>(selector));

        // A. Reveal elements on enter, rewind smoothly on leave-back
        all("[data-anim]").forEach((el) => {
          const dir = (el.dataset.anim || "up") as Direction;
          const delay = Number(el.dataset.animDelay || 0);
          gsap.fromTo(
            el,
            FROM[dir] ?? FROM.up,
            {
              y: 0,
              x: 0,
              scale: 1,
              rotate: 0,
              opacity: 1,
              duration: 0.9,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        // B. Staggered groups
        all("[data-anim-stagger]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-anim-child]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { y: 48, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: group,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        // C. Multi-depth Parallax drift (Scrubbed with smooth interpolation)
        all("[data-parallax]").forEach((el) => {
          const strength = Number(el.dataset.parallax || 0.18);
          gsap.fromTo(
            el,
            { yPercent: -strength * 50 },
            {
              yPercent: strength * 50,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        });

        // D. Continuous rotational parallax for decorative background stars
        all(".zellige-rotate, [data-rotate-parallax]").forEach((el) => {
          const speed = Number(el.dataset.rotateParallax || 90);
          gsap.to(el, {
            rotate: speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });

        // E. Velocity-aware scroll dynamics (Like gsap.com/scroll showcase)
        const drifters = all("[data-drift]");
        if (drifters.length) {
          const setters = drifters.map((el) => ({
            y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
            skewY: gsap.quickTo(el, "skewY", { duration: 0.7, ease: "power3.out" }),
            rot: gsap.quickTo(el, "rotation", { duration: 0.7, ease: "power3.out" }),
            amount: Number(el.dataset.drift || 1),
          }));
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              const v = gsap.utils.clamp(-100, 100, self.getVelocity() / 35);
              setters.forEach(({ y, skewY, rot, amount }) => {
                y(v * amount * 0.3);
                skewY(v * amount * 0.025);
                rot(v * amount * 0.03);
              });
            },
          });
        }

        // F. Smooth Scroll Progress Bar
        const bar = document.querySelector<HTMLElement>("[data-scroll-progress]");
        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.05 },
            },
          );
        }

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const t = window.setTimeout(refresh, 600);
        cleanupLoad = () => {
          window.removeEventListener("load", refresh);
          window.clearTimeout(t);
        };
      });

      ctxRef.current = ctx;
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanupLoad?.();
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, [pathname]);

  return <div ref={root} aria-hidden="true" className="hidden" />;
}
