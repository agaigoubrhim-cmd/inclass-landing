"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { RollingNumber } from "@/components/gsap/rolling-number";
import { useI18n } from "@/i18n";

export default function EarningsSimulator() {
  const [hours, setHours] = useState(10);
  const [price, setPrice] = useState(150);
  const { dict } = useI18n();

  const gross = hours * price * 4;
  const commission = Math.round(gross * 0.15);
  const net = gross - commission;

  return (
    <div className="rounded-[28px] border border-tutor-200 bg-white p-7 dark:border-tutor-500/30 dark:bg-ink-800">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-tutor-100 text-tutor-700 dark:bg-tutor-950/80 dark:text-tutor-300">
          <TrendingUp className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold text-ink dark:text-white">{dict.simulator.title}</h3>
          <p className="text-sm text-ink-soft dark:text-white/60">{dict.simulator.sub}</p>
        </div>
      </div>

      <div className="mt-7 space-y-6">
        <label className="block">
          <span className="flex items-center justify-between text-sm font-semibold text-ink dark:text-white">
            {dict.simulator.hoursLabel}
            <span className="text-tutor-700 dark:text-tutor-400">
              <RollingNumber targetNumber={hours} height={20} /> {dict.common.hours}
            </span>
          </span>
          <input
            type="range"
            min={2}
            max={30}
            step={1}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-tutor-100 dark:bg-ink-900 accent-tutor-600"
          />
        </label>

        <label className="block">
          <span className="flex items-center justify-between text-sm font-semibold text-ink dark:text-white">
            {dict.simulator.priceLabel}
            <span className="text-tutor-700 dark:text-tutor-400">
              <RollingNumber targetNumber={price} height={20} /> {dict.common.mad}
            </span>
          </span>
          <input
            type="range"
            min={80}
            max={400}
            step={10}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-tutor-100 dark:bg-ink-900 accent-tutor-600"
          />
        </label>
      </div>

      <div className="mt-8 rounded-3xl bg-tutor-600 p-6 text-tutor-50">
        <p className="text-sm uppercase tracking-widest text-tutor-100">{dict.simulator.netLabel}</p>
        <p className="mt-1 flex items-baseline gap-2 text-4xl font-extrabold">
          <RollingNumber targetNumber={net.toLocaleString("fr-MA")} height={44} />
          <span className="text-lg font-bold">{dict.simulator.madPerMonth}</span>
        </p>
        <p className="mt-3 text-sm text-tutor-100">
          {dict.simulator.revenueDesc}{" "}
          (<RollingNumber targetNumber={gross.toLocaleString("fr-MA")} height={18} /> {dict.common.mad})
        </p>
      </div>
    </div>
  );
}
