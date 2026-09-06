"use client";

import { useState } from "react";
import { Check, CheckCircle2, Loader2, Send, Sparkles } from "lucide-react";
import { CITIES, FALLBACK_SUBJECTS } from "@/content/site";
import { RollingText } from "@/components/gsap/rolling-text";
import { useI18n } from "@/i18n";
import { getLocalizedSubject } from "@/lib/subject-translations";

const field =
  "h-12 w-full rounded-2xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-ink/35 focus:outline-none dark:border-white/15 dark:bg-ink-900 dark:text-white dark:placeholder:text-white/35";

export default function ContactForm({
  initialSubject,
  initialTutor,
}: {
  initialSubject?: string;
  initialTutor?: string;
}) {
  const { dict, locale } = useI18n();
  const [role, setRole] = useState<"student" | "parent" | "tutor">("student");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const roles = [
    { id: "student" as const, label: dict.contactForm.roleStudent, cls: "bg-student-600 text-student-50", ring: "focus:border-student-500" },
    { id: "parent" as const, label: dict.contactForm.roleParent, cls: "bg-parent-600 text-parent-50", ring: "focus:border-parent-500" },
    { id: "tutor" as const, label: dict.contactForm.roleTutor, cls: "bg-tutor-600 text-tutor-50", ring: "focus:border-tutor-500" },
  ];

  const active = roles.find((r) => r.id === role) ?? roles[0];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.get("fullName"),
          email: form.get("email"),
          phone: form.get("phone"),
          city: form.get("city"),
          subject: form.get("subject"),
          message: form.get("message"),
          role,
          tutorTarget: initialTutor,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || dict.contactForm.errorMessage);
      setState("done");
      setMessage(dict.contactForm.successMessage);
      event.currentTarget.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : dict.contactForm.errorMessage);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[32px] border border-line bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-ink-800"
    >
      {initialTutor && (
        <div className="mb-6 flex items-center gap-2.5 rounded-2xl bg-student-50 p-4 text-xs font-semibold text-student-800 dark:bg-student-950/60 dark:text-student-300">
          <Sparkles className="h-4 w-4 shrink-0 text-student-600" />
          <span>
            {dict.common.requestTutor} : <strong className="underline">{initialTutor}</strong>
          </span>
        </div>
      )}

      <p className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/60">
        {dict.contactForm.roleLabel}
      </p>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5 rounded-2xl bg-sand p-1 dark:bg-ink-900">
        {roles.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRole(r.id)}
            className={`rounded-xl px-2 py-2 text-xs font-bold transition-all ${
              role === r.id
                ? `${r.cls}`
                : "text-ink-soft hover:text-ink dark:text-white/70 dark:hover:text-white"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink dark:text-white">
            {dict.contactForm.nameLabel}
          </span>
          <input
            name="fullName"
            required
            placeholder={dict.contactForm.namePlaceholder}
            className={`${field} ${active.ring}`}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink dark:text-white">
            {dict.contactForm.emailLabel}
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder={dict.contactForm.emailPlaceholder}
            className={`${field} ${active.ring}`}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink dark:text-white">
            {dict.contactForm.phoneLabel}
          </span>
          <input
            name="phone"
            required
            placeholder={dict.contactForm.phonePlaceholder}
            className={`${field} ${active.ring}`}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink dark:text-white">
            {dict.contactForm.cityLabel}
          </span>
          <select name="city" className={`${field} ${active.ring}`} defaultValue="Agadir">
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-ink dark:text-white">
            {dict.contactForm.subjectLabel}
          </span>
          <select
            name="subject"
            className={`${field} ${active.ring}`}
            defaultValue={initialSubject || "Mathématiques"}
          >
            {FALLBACK_SUBJECTS.map((s) => (
              <option key={s.slug} value={s.name}>
                {getLocalizedSubject(s.slug, locale, s.name)}
              </option>
            ))}
            <option value="Autre">{dict.common.seeMore}</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold text-ink dark:text-white">
            {dict.contactForm.messageLabel}
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder={dict.contactForm.messagePlaceholder}
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus:outline-none dark:border-white/15 dark:bg-ink-900 dark:text-white dark:placeholder:text-white/35"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className={`btn-duo group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-extrabold disabled:opacity-60`}
      >
        {state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : state === "done" ? (
          <Check className="h-4 w-4" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        <RollingText text={dict.contactForm.submitBtn} />
      </button>

      {message ? (
        <div
          className={`mt-4 flex items-start gap-2.5 rounded-2xl p-4 text-xs font-semibold ${
            state === "error"
              ? "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300"
              : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
          }`}
        >
          {state === "done" && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
          <span>{message}</span>
        </div>
      ) : null}
    </form>
  );
}
