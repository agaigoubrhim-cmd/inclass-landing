"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// 2 full cycles of 0-9 so every digit starts at 0 and visibly spins into place
const CYCLES = 2;
const DIGIT_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const REEL_DIGITS: number[] = [];
for (let c = 0; c <= CYCLES; c++) {
    REEL_DIGITS.push(...DIGIT_ARRAY);
}

type RollingDigitProps = {
    digit: string;
    duration?: number;
    delay?: number;
    height?: number;
    repeatOnScroll?: boolean;
    triggerRef: React.RefObject<HTMLSpanElement | null>;
};

const RollingDigit = ({
    digit,
    duration = 2.4,
    delay = 0,
    height = 40,
    repeatOnScroll = true,
    triggerRef,
}: RollingDigitProps) => {
    const reelRef = useRef<HTMLSpanElement>(null);

    const isDigit = /^[0-9]$/.test(digit);
    const num = isDigit ? parseInt(digit, 10) : NaN;

    useGSAP(
        () => {
            if (!isDigit || !reelRef.current) return;

            const targetIndex = CYCLES * 10 + num;
            const targetY = -height * targetIndex;

            gsap.fromTo(
                reelRef.current,
                { y: 0 },
                {
                    y: targetY,
                    duration,
                    delay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: triggerRef.current || reelRef.current,
                        start: "top 88%",
                        toggleActions: repeatOnScroll
                            ? "play none none reverse"
                            : "play none none none",
                    },
                }
            );
        },
        {
            dependencies: [num, height, duration, delay, isDigit, repeatOnScroll],
        }
    );

    if (!isDigit) {
        return (
            <span
                className="inline-flex items-center justify-center select-none"
                style={{
                    height,
                    lineHeight: `${height}px`,
                }}
            >
                {digit === " " ? "\u00A0" : digit}
            </span>
        );
    }

    return (
        <span
            className="relative inline-block overflow-hidden select-none"
            style={{
                height,
                verticalAlign: "top",
            }}
        >
            <span
                ref={reelRef}
                className="flex flex-col items-center"
                style={{
                    transform: "translateY(0)",
                    willChange: "transform",
                }}
            >
                {/* Starts from 0 (index 0) and spins through to CYCLES * 10 + num */}
                {REEL_DIGITS.map((n, idx) => (
                    <span
                        key={idx}
                        style={{
                            height,
                            lineHeight: `${height}px`,
                        }}
                        className="flex items-center justify-center"
                    >
                        {n}
                    </span>
                ))}
            </span>
        </span>
    );
};

type RollingNumberProps = {
    targetNumber: number | string;
    duration?: number;
    height?: number;
    delay?: number;
    repeatOnScroll?: boolean;
    onComplete?: () => void;
    className?: string;
};

export const RollingNumber = ({
    targetNumber,
    duration = 2.4,
    height = 40,
    delay = 0,
    repeatOnScroll = true,
    onComplete,
    className,
}: RollingNumberProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const digits = String(targetNumber).split("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete?.();
        }, (duration + delay) * 1000);

        return () => clearTimeout(timer);
    }, [duration, delay, onComplete, targetNumber]);

    return (
        <span
            ref={containerRef}
            className={cn(
                "inline-flex items-center justify-center",
                className
            )}
        >
            {digits.map((digit, i) => (
                <RollingDigit
                    key={i}
                    digit={digit}
                    duration={duration}
                    delay={delay + i * 0.05}
                    height={height}
                    repeatOnScroll={repeatOnScroll}
                    triggerRef={containerRef}
                />
            ))}
        </span>
    );
};