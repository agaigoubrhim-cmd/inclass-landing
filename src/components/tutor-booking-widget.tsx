"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Home as HomeIcon,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import { Rating } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { RollingText } from "@/components/gsap/rolling-text";
import type { Tutor } from "@/lib/data";

const PACKS = [
  { id: "1h", hours: 1, label: "1h découverte", discount: 0 },
  { id: "5h", hours: 5, label: "Pack 5h", discount: 0.05, tag: "Populaire" },
  { id: "10h", hours: 10, label: "Pack 10h", discount: 0.1, tag: "Meilleur prix (-10%)" },
];

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const SLOTS = ["10:00", "14:00", "16:30", "18:00", "19:30"];

export default function TutorBookingWidget({ tutor }: { tutor: Tutor }) {
  const [mode, setMode] = useState<"online" | "home">(tutor.mode === "home" ? "home" : "online");
  const [selectedPack, setSelectedPack] = useState("1h");
  const [selectedDay, setSelectedDay] = useState("Mer");
  const [selectedSlot, setSelectedSlot] = useState("18:00");
  const [confirmed, setConfirmed] = useState(false);

  const pack = PACKS.find((p) => p.id === selectedPack) || PACKS[0];
  const baseTotal = tutor.pricePerHour * pack.hours;
  const finalTotal = Math.round(baseTotal * (1 - pack.discount));

  return (
    <aside
      data-anim="right"
      className="sticky top-28 h-fit overflow-hidden rounded-[32px] border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-800 sm:p-7"
    >
      {confirmed ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h3 className="mt-4 text-2xl font-extrabold text-ink dark:text-white">Demande envoyée !</h3>
          <p className="mt-2 text-sm text-ink-soft dark:text-white/70">
            {tutor.fullName} a reçu ta demande pour le créneau du{" "}
            <span className="font-bold text-ink dark:text-white">{selectedDay} à {selectedSlot}</span>.
          </p>
          <p className="mt-1 text-xs text-ink-soft dark:text-white/60">
            Délai de réponse habituel : moins d&apos;une heure.
          </p>
          <button
            type="button"
            onClick={() => setConfirmed(false)}
            className="mt-6 inline-flex h-11 items-center rounded-full bg-sand px-6 text-sm font-bold text-ink hover:bg-line dark:bg-white/10 dark:text-white"
          >
            Modifier ma réservation
          </button>
        </div>
      ) : (
        <>
          {/* Header price */}
          <div className="flex items-baseline justify-between border-b border-line/80 pb-5 dark:border-white/10">
            <div>
              <p className="text-3xl font-extrabold text-ink dark:text-white">
                <RollingNumber targetNumber={tutor.pricePerHour} height={36} />
                <span className="text-sm font-semibold text-ink-soft dark:text-white/60"> MAD / h</span>
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft dark:text-white/60">
                <Rating value={Math.round(Number(tutor.rating))} />
                <span className="font-bold text-ink dark:text-white">{Number(tutor.rating).toFixed(1)}</span>
                <span>({tutor.reviews} avis)</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Zap className="h-3 w-3" />
              Réponse rapide
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="mt-5">
            <label className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/60">
              Format du cours
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode("online")}
                className={`flex items-center justify-center gap-2 rounded-2xl border p-2.5 text-xs font-bold transition-all ${
                  mode === "online"
                    ? "border-tutor-500 bg-tutor-50 text-tutor-700 dark:bg-tutor-950/70 dark:text-tutor-300"
                    : "border-line bg-white text-ink-soft hover:bg-sand dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                }`}
              >
                <Video className="h-3.5 w-3.5" />
                En ligne
              </button>
              <button
                type="button"
                onClick={() => setMode("home")}
                className={`flex items-center justify-center gap-2 rounded-2xl border p-2.5 text-xs font-bold transition-all ${
                  mode === "home"
                    ? "border-student-500 bg-student-50 text-student-700 dark:bg-student-950/70 dark:text-student-300"
                    : "border-line bg-white text-ink-soft hover:bg-sand dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                }`}
              >
                <HomeIcon className="h-3.5 w-3.5" />
                À domicile
              </button>
            </div>
          </div>

          {/* Pack Selection */}
          <div className="mt-5">
            <label className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/60">
              Formule de cours
            </label>
            <div className="mt-2 space-y-2">
              {PACKS.map((p) => {
                const active = selectedPack === p.id;
                const cost = Math.round(tutor.pricePerHour * p.hours * (1 - p.discount));
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPack(p.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition-all ${
                      active
                        ? "border-student-500 bg-student-50/70 dark:border-student-500/50 dark:bg-student-950/50"
                        : "border-line bg-white hover:bg-sand dark:border-white/10 dark:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-ink dark:text-white">{p.label}</span>
                        {p.tag && (
                          <span className="rounded-full bg-student-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-ink-soft dark:text-white/60">
                        {p.hours} heure{p.hours > 1 ? "s" : ""} avec {tutor.fullName}
                      </p>
                    </div>
                    <span className="text-sm font-extrabold text-ink dark:text-white">
                      {cost} MAD
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Day & Time Mockup */}
          <div className="mt-5">
            <label className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/60">
              Créneau souhaité
            </label>
            <div className="mt-2 flex gap-1 overflow-x-auto pb-1 no-scrollbar">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDay(d)}
                  className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                    selectedDay === d
                      ? "bg-ink text-cream dark:bg-white dark:text-ink"
                      : "bg-sand text-ink-soft hover:bg-line dark:bg-white/10 dark:text-white/70"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSlot(s)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    selectedSlot === s
                      ? "bg-student-600 text-student-50"
                      : "border border-line bg-white text-ink-soft hover:bg-sand dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Total & Action Buttons */}
          <div className="mt-6 border-t border-line/80 pt-5 dark:border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink-soft dark:text-white/60">Total estimé :</span>
              <span className="text-xl font-extrabold text-ink dark:text-white">
                <RollingNumber targetNumber={finalTotal} height={26} /> MAD
              </span>
            </div>

            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="btn-duo group mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-extrabold"
            >
              <RollingText text="Réserver ce cours" />
            </button>

            <a
              href={`https://wa.me/212600000000?text=${encodeURIComponent(
                `Bonjour, je souhaite réserver un cours de ${tutor.subjectLabel} avec ${tutor.fullName} via INCLASS.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-50/80 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <RollingText text="Contacter sur WhatsApp" />
            </a>
          </div>

          {/* Reassurance List */}
          <ul className="mt-5 space-y-2 border-t border-line/80 pt-4 text-xs text-ink-soft dark:border-white/10 dark:text-white/60">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-student-600 dark:text-student-400" />
              <span>1er cours satisfait ou remplacé sans frais</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-student-600 dark:text-student-400" />
              <span>Annulation gratuite jusqu&apos;à 24h avant</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-student-600 dark:text-student-400" />
              <span>Paiement sécurisé après validation de la séance</span>
            </li>
          </ul>
        </>
      )}
    </aside>
  );
}
