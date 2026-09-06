"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { RollingText } from "@/components/gsap/rolling-text";
import { useI18n } from "@/i18n";

export default function NewsletterForm() {
  const { dict, isRTL } = useI18n();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      setState("done");
      setMessage(dict.footer.newsletterSuccess);
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.footer.newsletterPlaceholder}
          className="h-12 w-full rounded-full border border-white/15 bg-white/10 px-5 text-sm text-cream placeholder:text-cream/40 focus:border-student-300 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn-duo group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-extrabold disabled:opacity-60"
        >
          {state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : state === "done" ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`} />
          )}
          <RollingText text={dict.footer.newsletterBtn} />
        </button>
      </div>
      {message ? (
        <p
          className={`mt-2 text-xs ${state === "error" ? "text-red-300" : "text-student-200"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
