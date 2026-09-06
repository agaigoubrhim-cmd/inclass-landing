"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Home as HomeIcon,
  HelpCircle,
  Percent,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
  Wallet,
  Zap,
} from "lucide-react";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { RollingText } from "@/components/gsap/rolling-text";

type LevelKey = "primary" | "college" | "lycee" | "prepa";

interface LevelData {
  name: string;
  onlineRate: number;
  homeRate: number;
  subtitle: string;
}

const LEVELS_DATA: Record<LevelKey, LevelData> = {
  primary: {
    name: "Primaire",
    onlineRate: 80,
    homeRate: 100,
    subtitle: "CP, CE1 à CM2 · Éveil, lecture, bases en calcul et langues",
  },
  college: {
    name: "Collège",
    onlineRate: 110,
    homeRate: 130,
    subtitle: "1ère à 3ème AC · Méthode, maths, physique-chimie, français",
  },
  lycee: {
    name: "Lycée / Bac",
    onlineRate: 150,
    homeRate: 180,
    subtitle: "Tronc Commun, 1ère & 2ème Bac (SM, PC, SVT, Eco, Lettres)",
  },
  prepa: {
    name: "Prépa & Supérieur",
    onlineRate: 200,
    homeRate: 250,
    subtitle: "CPGE (MPSI, PCSI, ECT), Médecine, CNC, Universités & Concours",
  },
};

export default function PricingCalculator() {
  const [level, setLevel] = useState<LevelKey>("lycee");
  const [mode, setMode] = useState<"online" | "home">("online");
  const [sessionCount, setSessionCount] = useState<number>(4);

  const currentLevel = LEVELS_DATA[level];
  const hourlyRate = mode === "online" ? currentLevel.onlineRate : currentLevel.homeRate;
  const estimatedTotal = hourlyRate * sessionCount;

  return (
    <div className="w-full space-y-12">
      {/* ─── 1. Interactive Session Estimator ─── */}
      <div
        data-anim="up"
        className="relative overflow-hidden rounded-[36px] border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-800/90 sm:p-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/80 pb-6 dark:border-white/10">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-student-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-student-700 dark:bg-student-950 dark:text-student-300">
              <Sparkles className="h-3.5 w-3.5" />
              Sans abonnement · 100% à la séance
            </span>
            <h3 className="mt-2 text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">
              Estime le coût de tes séances
            </h3>
            <p className="mt-1 text-sm text-ink-soft dark:text-white/60">
              INCLASS est gratuit pour les élèves. Tu ne paies que le tarif du professeur par séance validée.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex rounded-2xl bg-sand p-1.5 dark:bg-ink-900">
            <button
              type="button"
              onClick={() => setMode("online")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mode === "online"
                  ? "bg-white text-tutor-700 dark:bg-white/15 dark:text-white"
                  : "text-ink-soft hover:text-ink dark:text-white/60"
              }`}
            >
              <Video className="h-4 w-4" />
              En ligne
            </button>
            <button
              type="button"
              onClick={() => setMode("home")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                mode === "home"
                  ? "bg-white text-student-700 dark:bg-white/15 dark:text-white"
                  : "text-ink-soft hover:text-ink dark:text-white/60"
              }`}
            >
              <HomeIcon className="h-4 w-4" />
              À domicile
            </button>
          </div>
        </div>

        {/* Level selector tabs */}
        <div className="mt-8">
          <label className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/50">
            1. Niveau scolaire :
          </label>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {(
              [
                { id: "primary" as LevelKey, label: "Primaire" },
                { id: "college" as LevelKey, label: "Collège" },
                { id: "lycee" as LevelKey, label: "Lycée / Bac" },
                { id: "prepa" as LevelKey, label: "Prépa / Supérieur" },
              ]
            ).map((lvl) => {
              const active = level === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setLevel(lvl.id)}
                  className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                    active
                      ? "border-student-500 bg-student-50/70 ring-2 ring-student-500/20 dark:border-student-500/60 dark:bg-student-950/60"
                      : "border-line bg-white hover:bg-sand dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  }`}
                >
                  <span className="text-sm font-extrabold text-ink dark:text-white">{lvl.label}</span>
                  <span className="mt-1 text-xs font-semibold text-student-600 dark:text-student-400">
                    dès {mode === "online" ? LEVELS_DATA[lvl.id].onlineRate : LEVELS_DATA[lvl.id].homeRate} MAD / séance
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-ink-soft dark:text-white/60">
            Programme couvert : <strong className="text-ink dark:text-white">{currentLevel.subtitle}</strong>
          </p>
        </div>

        {/* Sessions count slider */}
        <div className="mt-8 rounded-2xl bg-sand/50 p-5 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-ink-soft dark:text-white/50">
                2. Nombre de séances prévues :
              </label>
              <p className="text-xs text-ink-soft dark:text-white/60">
                Ajustez pour estimer votre budget · Chaque séance est payable individuellement
              </p>
            </div>
            <span className="rounded-full bg-student-600 px-3 py-1 text-xs font-extrabold text-white">
              {sessionCount} séance{sessionCount > 1 ? "s" : ""}
            </span>
          </div>

          <div className="mt-4">
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={sessionCount}
              onChange={(e) => setSessionCount(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line accent-student-600 dark:bg-white/20"
            />
            <div className="mt-2 flex justify-between text-[11px] font-semibold text-ink-soft dark:text-white/40">
              <span>1 séance (Test ponctuel)</span>
              <span>4 séances (1/semaine)</span>
              <span>8 séances (2/semaine)</span>
              <span>16 séances (Intensif)</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Banner */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-ink p-6 text-white dark:bg-ink-950 sm:p-8">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-tutor-300">
              <Zap className="h-3.5 w-3.5" />
              Estimation pour {sessionCount} séance{sessionCount > 1 ? "s" : ""} ({currentLevel.name} · {mode === "online" ? "En ligne" : "À domicile"})
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold sm:text-5xl">
                <RollingNumber targetNumber={estimatedTotal} height={44} />
              </span>
              <span className="text-lg font-bold text-white/80">MAD</span>
            </div>
            <p className="mt-1 text-xs text-white/60">
              Soit {hourlyRate} MAD / séance · Zéro frais d&apos;inscription · Zéro abonnement · Débit après chaque cours.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/profs?mode=${mode}`}
              className="btn-duo group inline-flex h-13 items-center gap-2.5 rounded-2xl px-7 text-sm font-extrabold"
            >
              <RollingText text="Voir les profs disponibles" />
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── 2. Transparent Model Pillars ─── */}
      <div data-anim-stagger className="grid gap-7 lg:grid-cols-3">
        {/* Card 1: Pour les Élèves & Parents */}
        <div
          data-anim-child
          className="flex flex-col justify-between rounded-[32px] border border-student-200 bg-student-50/50 p-7 transition-all duration-300 hover:-translate-y-1 dark:border-student-500/20 dark:bg-student-950/30"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-student-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-student-700 dark:bg-student-900/80 dark:text-student-300">
                Élèves & Parents
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">100% Gratuit</span>
            </div>

            <h4 className="mt-4 text-2xl font-extrabold text-ink dark:text-white">Accès libre & sans abonnement</h4>
            <p className="mt-1 text-xs text-ink-soft dark:text-white/60">
              Aucun engagement mensuel, aucun frais de dossier. Vous ne payez que les cours suivis.
            </p>

            <div className="mt-6 border-y border-student-200/80 py-4 dark:border-student-500/20">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-ink dark:text-white">0 MAD</span>
                <span className="text-sm font-semibold text-ink-soft dark:text-white/60">d&apos;inscription</span>
              </div>
              <p className="mt-1 text-[11px] text-ink-soft dark:text-white/50">
                Le premier échange avec un professeur est toujours offert.
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-xs font-semibold text-ink dark:text-white/90">
              {[
                "Création de compte gratuite",
                "Choix libre parmi 12 400+ profs vérifiés",
                "Paiement uniquement à la séance réalisée",
                "1er cours satisfait ou remplacé sans frais",
                "Comptes rendus réguliers pour les parents",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-student-600 dark:text-student-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/profs"
              className="btn-duo group flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-extrabold"
            >
              <RollingText text="Trouver un professeur" />
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Card 2: Portefeuille Sécurisé */}
        <div
          data-anim-child
          className="flex flex-col justify-between rounded-[32px] border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-ink-800"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-soft dark:bg-white/10 dark:text-white/70">
                Portefeuille (Wallet)
              </span>
              <span className="text-xs text-ink-soft dark:text-white/50">Sécurité maximale</span>
            </div>

            <h4 className="mt-4 text-2xl font-extrabold text-ink dark:text-white">Paiement protégé par séance</h4>
            <p className="mt-1 text-xs text-ink-soft dark:text-white/60">
              Votre solde est conservé sous séquestre sécurisé et reversé au tuteur après le cours.
            </p>

            <div className="mt-6 border-y border-line/80 py-4 dark:border-white/10">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-ink dark:text-white">
                  Séquestre garanti
                </span>
              </div>
              <p className="mt-1 text-[11px] text-ink-soft dark:text-white/50">
                Votre argent reste protégé jusqu&apos;à la confirmation du cours.
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-xs font-semibold text-ink dark:text-white/90">
              {[
                "Recharge en dirhams par carte, virement ou agence",
                "Montant bloqué uniquement lors de la réservation",
                "Déblocage automatique après validation du cours",
                "Annulation sans frais jusqu'à 24h avant",
                "Solde réutilisable pour toutes les matières",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-student-600 dark:text-student-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/comment-ca-marche/eleves#parents"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-line text-sm font-bold text-ink transition-colors hover:bg-sand dark:border-white/15 dark:text-white dark:hover:bg-white/10"
            >
              <RollingText text="Comment fonctionne le wallet" />
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Card 3: Pour les Professeurs */}
        <div
          data-anim-child
          className="flex flex-col justify-between rounded-[32px] border border-tutor-200 bg-tutor-50/50 p-7 transition-all duration-300 hover:-translate-y-1 dark:border-tutor-500/20 dark:bg-tutor-950/30"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-tutor-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-tutor-700 dark:bg-tutor-900/80 dark:text-tutor-300">
                Professeurs
              </span>
              <span className="text-xs text-tutor-700 dark:text-tutor-300 font-semibold">Tarif libre</span>
            </div>

            <h4 className="mt-4 text-2xl font-extrabold text-ink dark:text-white">Commission par séance</h4>
            <p className="mt-1 text-xs text-ink-soft dark:text-white/60">
              Fixez votre tarif horaire librement. Zéro frais d&apos;inscription, zéro abonnement tuteur.
            </p>

            <div className="mt-6 border-y border-tutor-200/80 py-4 dark:border-tutor-500/20">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-ink dark:text-white">0%</span>
                <span className="text-sm font-semibold text-ink-soft dark:text-white/60">sur tes 3 1ers cours</span>
              </div>
              <p className="mt-1 text-[11px] text-ink-soft dark:text-white/50">
                Puis commission transparente uniquement sur les cours réalisés.
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-xs font-semibold text-ink dark:text-white/90">
              {[
                "Fixation 100% libre de votre tarif horaire",
                "Badge Vérifié gratuit après validation du profil",
                "Paiements garantis et transférés sous 48h",
                "Gestion centralisée des élèves et des réservations",
                "Support dédié aux professeurs 6j/7",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-tutor-600 dark:text-tutor-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/comment-ca-marche/profs"
              className="btn-duo group flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-extrabold"
            >
              <RollingText text="Devenir professeur INCLASS" />
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── 3. Payment Methods & Trust Banner ─── */}
      <div
        data-anim="up"
        className="rounded-3xl border border-line bg-white p-6 dark:border-white/10 dark:bg-ink-900/80 sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-student-100 text-student-700 dark:bg-student-950 dark:text-student-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-ink dark:text-white">
                Paiement 100% sécurisé & protection des familles
              </p>
              <p className="text-xs text-ink-soft dark:text-white/60">
                Votre argent est conservé sous séquestre sécurisé et reversé au professeur uniquement après la validation de la séance.
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-ink-soft dark:text-white/70">
            <span className="rounded-xl border border-line bg-sand px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
              💳 Carte bancaire CMI / Visa / Mastercard
            </span>
            <span className="rounded-xl border border-line bg-sand px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
              🏦 Virement bancaire Maroc
            </span>
            <span className="rounded-xl border border-line bg-sand px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
              ⚡ Cash Plus / Wafacash
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
