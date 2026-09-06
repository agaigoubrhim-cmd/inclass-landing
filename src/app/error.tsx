"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { RollingText } from "@/components/gsap/rolling-text";
import { useI18n } from "@/i18n";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { dict } = useI18n();

  useEffect(() => {
    console.error("INCLASS App Error Boundary caught:", error);
  }, [error]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Glow Effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        {/* Error icon badge */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-950/40">
          <AlertTriangle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
        </div>

        {/* Top Status Pill */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 backdrop-blur-md dark:border-amber-500/30 dark:bg-amber-950/60 dark:text-amber-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>{dict.errorState.statusBadge}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl dark:text-white">
          {dict.errorState.title}
        </h1>

        <p className="mt-3 text-base text-ink-soft dark:text-white/70">
          {dict.errorState.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-duo group inline-flex h-12 items-center gap-2 rounded-2xl px-7 text-sm font-extrabold"
          >
            <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            <RollingText text={dict.errorState.btnRetry} />
          </button>

          <Link
            href="/"
            className="btn-duo btn-duo-white inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-extrabold"
          >
            <Home className="h-4 w-4" />
            <span>{dict.errorState.btnHome}</span>
          </Link>

          <a
            href="https://wa.me/212600000000?text=Bonjour,%20j'ai%20rencontr%C3%A9%20une%20erreur%20sur%20INCLASS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-duo inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-extrabold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>{dict.errorState.btnReport}</span>
          </a>
        </div>

        {/* Technical details accordion (for debugging) */}
        {process.env.NODE_ENV !== "production" && error?.message && (
          <div className="mt-10 text-left">
            <details className="rounded-2xl border border-line bg-white/60 p-4 text-xs dark:border-white/10 dark:bg-ink-800/60">
              <summary className="cursor-pointer font-bold text-ink-soft dark:text-white/60">
                Détails techniques pour les développeurs
              </summary>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-ink p-3 text-[11px] text-emerald-400 font-mono">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          </div>
        )}
      </div>
    </section>
  );
}
