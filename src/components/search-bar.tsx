"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GraduationCap, MapPin, Search, Users } from "lucide-react";
import { CITIES, FALLBACK_SUBJECTS } from "@/content/site";
import { useI18n } from "@/i18n";
import { getLocalizedSubject } from "@/lib/subject-translations";

export default function SearchBar({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  const router = useRouter();
  const { dict, locale } = useI18n();
  const [role, setRole] = useState<"student" | "parent">("student");
  const [subject, setSubject] = useState("mathematiques");
  const [city, setCity] = useState("");

  const roles = [
    { id: "student" as const, label: dict.contactForm.roleStudent, icon: GraduationCap, cls: "bg-student-600 text-student-50" },
    { id: "parent" as const, label: dict.contactForm.roleParent, icon: Users, cls: "bg-parent-600 text-parent-50" },
  ];

  const accent = role === "student" ? "student" : "parent";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (city) params.set("city", city);
    params.set("role", role);
    router.push(`/contact?${params.toString()}`);
  }

  return (
    <div className={compact ? "" : "w-full"}>
      <div
        className={`mb-3 grid grid-cols-2 gap-1 rounded-full p-1 sm:inline-flex sm:gap-0 ${
          onDark ? "bg-white/12 backdrop-blur-md" : "bg-ink/5"
        }`}
      >
        {roles.map((r) => {
          const Icon = r.icon;
          const active = role === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active
                  ? `${r.cls}`
                  : onDark
                    ? "text-white/75 hover:text-white"
                    : "text-ink-soft hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" />
              {r.label}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={submit}
        className={`flex flex-col gap-2 rounded-[28px] border bg-white p-2 sm:flex-row sm:items-center sm:rounded-full dark:border-white/10 dark:bg-ink-800 ${
          onDark ? "border-white/20" : "border-line"
        }`}
      >
        <label className="flex flex-1 items-center gap-2 rounded-full px-4 py-2.5">
          <Search className={`h-4.5 w-4.5 ${accent === "student" ? "text-student-500" : "text-parent-500"}`} />
          <span className="sr-only">{dict.contactForm.subjectLabel}</span>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-transparent text-[15px] font-medium text-ink focus:outline-none dark:text-white [&>option]:bg-white [&>option]:text-ink dark:[&>option]:bg-ink-800 dark:[&>option]:text-white"
          >
            {FALLBACK_SUBJECTS.map((s) => (
              <option key={s.slug} value={s.slug}>
                {getLocalizedSubject(s.slug, locale, s.name)}
              </option>
            ))}
          </select>
        </label>

        <span className="hidden h-8 w-px bg-line dark:bg-white/10 sm:block" />

        <label className="flex flex-1 items-center gap-2 rounded-full px-4 py-2.5">
          <MapPin className={`h-4.5 w-4.5 ${accent === "student" ? "text-student-500" : "text-parent-500"}`} />
          <span className="sr-only">{dict.contactForm.cityLabel}</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent text-[15px] font-medium text-ink focus:outline-none dark:text-white [&>option]:bg-white [&>option]:text-ink dark:[&>option]:bg-ink-800 dark:[&>option]:text-white"
          >
            <option value="">{dict.common.online} ({dict.common.citiesInMorocco})</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className={`h-12 shrink-0 rounded-full px-7 text-[15px] font-bold text-white transition-transform active:scale-[0.98] ${
            accent === "student"
              ? "bg-student-600 hover:bg-student-700"
              : "bg-parent-600 hover:bg-parent-700"
          }`}
        >
          {dict.common.findTutor}
        </button>
      </form>
    </div>
  );
}
