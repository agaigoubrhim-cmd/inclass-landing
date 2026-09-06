"use client";

import { useState } from "react";
import { Check, Loader2, Rocket } from "lucide-react";
import { CITIES, FALLBACK_SUBJECTS, LEVELS } from "@/content/site";
import { RollingText } from "@/components/gsap/rolling-text";

const field =
  "h-12 w-full rounded-2xl border border-tutor-200 bg-white px-4 text-[15px] text-ink placeholder:text-ink/35 focus:border-tutor-400 focus:outline-none dark:border-white/15 dark:bg-ink-900 dark:text-white dark:placeholder:text-white/35";

export default function TutorApplyForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("loading");
    try {
      const res = await fetch("/api/tutor-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"),
          email: form.get("email"),
          phone: form.get("phone"),
          city: form.get("city"),
          subject: form.get("subject"),
          experienceYears: form.get("experienceYears"),
          mode: form.get("mode"),
          motivation: form.get("motivation"),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Erreur");
      setState("done");
      setMessage("Candidature envoyée ! On revient vers toi sous 48 h pour l'entretien pédagogique.");
      event.currentTarget.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[28px] border border-tutor-200 bg-white p-6 sm:p-8 dark:border-tutor-500/30 dark:bg-ink-800"
    >
      <h3 className="text-2xl font-extrabold text-ink dark:text-white">Candidature professeur</h3>
      <p className="mt-2 text-sm text-ink-soft dark:text-white/60">
        10 minutes pour postuler, réponse sous 48 heures. Inscription 100 % gratuite.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Nom complet *</span>
          <input name="fullName" required placeholder="Mehdi Alaoui" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Email *</span>
          <input type="email" name="email" required placeholder="mehdi@exemple.ma" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Téléphone</span>
          <input name="phone" placeholder="+212 6 00 00 00 00" className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Ville</span>
          <select name="city" className={field} defaultValue="Agadir">
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Matière principale</span>
          <select name="subject" className={field} defaultValue="Mathématiques">
            {FALLBACK_SUBJECTS.map((s) => (
              <option key={s.slug}>{s.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Années d&apos;expérience</span>
          <input
            type="number"
            name="experienceYears"
            min={0}
            max={50}
            defaultValue={3}
            className={field}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Format des cours</span>
          <select name="mode" className={field} defaultValue="both">
            <option value="both">En ligne et à domicile</option>
            <option value="online">Uniquement en ligne</option>
            <option value="home">Uniquement à domicile</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">Ta pédagogie en quelques lignes</span>
          <textarea
            name="motivation"
            rows={4}
            placeholder="Diplômes, niveaux enseignés, méthode…"
            className="w-full rounded-2xl border border-tutor-200 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus:border-tutor-400 focus:outline-none dark:border-white/15 dark:bg-ink-900 dark:text-white dark:placeholder:text-white/35"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-duo group mt-6 inline-flex h-12 items-center gap-2 rounded-2xl px-7 text-[15px] font-extrabold disabled:opacity-60"
      >
        {state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : state === "done" ? (
          <Check className="h-4 w-4" />
        ) : (
          <Rocket className="h-4 w-4" />
        )}
        <RollingText text="Envoyer ma candidature" />
      </button>

      {message ? (
        <p className={`mt-4 text-sm ${state === "error" ? "text-red-600 dark:text-red-400" : "text-tutor-700 dark:text-tutor-300"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
