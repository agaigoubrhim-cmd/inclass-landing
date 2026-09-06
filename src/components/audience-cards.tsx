"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SectionHead, Btn, type Tone } from "./ui";

import {
    Sparkle,
    AcademicCapAnimatedIcon,
    RocketAnimatedIcon,
    ShieldAnimatedIcon,
} from "./icons";

import { useI18n } from "@/i18n";

gsap.registerPlugin(ScrollTrigger);

interface AudienceItem {
    tone: Tone;
    kicker: string;
    title: string;
    body: string;
    href: string;
    cta: string;
    bullets: string[];
    cls: string;
    chip: string;
    icon: React.ComponentType<{ className?: string }>;
}

const SPARKLE_TONE_STYLES: Record<Tone, string> = {
    student:
        "bg-student-500/10 text-student-600 dark:bg-student-500/20 dark:text-student-300",
    tutor:
        "bg-tutor-500/10 text-tutor-600 dark:bg-tutor-500/20 dark:text-tutor-300",
    parent:
        "bg-parent-500/10 text-parent-600 dark:bg-parent-500/20 dark:text-parent-300",
    ink: "bg-ink/10 text-ink dark:bg-white/10 dark:text-white",
};

const BORDER_HOVER_STYLES: Record<Tone, string> = {
    student:
        "hover:border-student-500/40",
    tutor:
        "hover:border-tutor-500/40",
    parent:
        "hover:border-parent-500/40",
    ink: "hover:border-ink/30",
};

export function AudienceCards() {
    const { dict } = useI18n();
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLElement | null)[]>([]);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

    const audiences: AudienceItem[] = [
        {
            tone: "student",
            kicker: dict.audiences.studentKicker,
            title: dict.audiences.studentTitle,
            body: dict.audiences.studentBody,
            href: "/comment-ca-marche/eleves",
            cta: dict.audiences.studentCta,
            bullets: dict.audiences.studentBullets,
            cls: "bg-student-50 border-student-200 dark:bg-student-950/40 dark:border-student-500/20",
            chip: "bg-student-600 text-student-50",
            icon: AcademicCapAnimatedIcon,
        },
        {
            tone: "tutor",
            kicker: dict.audiences.tutorKicker,
            title: dict.audiences.tutorTitle,
            body: dict.audiences.tutorBody,
            href: "/comment-ca-marche/profs",
            cta: dict.audiences.tutorCta,
            bullets: dict.audiences.tutorBullets,
            cls: "bg-tutor-50 border-tutor-200 dark:bg-tutor-950/40 dark:border-tutor-500/20",
            chip: "bg-tutor-600 text-tutor-50",
            icon: RocketAnimatedIcon,
        },
        {
            tone: "parent",
            kicker: dict.audiences.parentKicker,
            title: dict.audiences.parentTitle,
            body: dict.audiences.parentBody,
            href: "/comment-ca-marche/eleves#parents",
            cta: dict.audiences.parentCta,
            bullets: dict.audiences.parentBullets,
            cls: "bg-parent-50 border-parent-200 dark:bg-parent-950/40 dark:border-parent-500/20",
            chip: "bg-parent-600 text-parent-50",
            icon: ShieldAnimatedIcon,
        },
    ];


    const audienceImages = [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85",
    ];

    useGSAP(
        () => {
            /*
             * ==========================================
             * CARD 3D HOVER
             * ==========================================
             */

            cardsRef.current.forEach((card) => {
                if (!card) return;

                const xTo = gsap.quickTo(card, "rotateY", {
                    duration: 0.35,
                    ease: "power2.out",
                });

                const yTo = gsap.quickTo(card, "rotateX", {
                    duration: 0.35,
                    ease: "power2.out",
                });

                const handleMouseMove = (e: MouseEvent) => {
                    const rect = card.getBoundingClientRect();

                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX =
                        ((y - centerY) / centerY) * -10;

                    const rotateY =
                        ((x - centerX) / centerX) * 10;

                    xTo(rotateY);
                    yTo(rotateX);
                };

                const handleMouseLeave = () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                };

                card.addEventListener(
                    "mousemove",
                    handleMouseMove
                );

                card.addEventListener(
                    "mouseleave",
                    handleMouseLeave
                );

                return () => {
                    card.removeEventListener(
                        "mousemove",
                        handleMouseMove
                    );

                    card.removeEventListener(
                        "mouseleave",
                        handleMouseLeave
                    );
                };
            });

            /*
             * ==========================================
             * IMAGE SCROLL ANIMATION
             * ==========================================
             *
             * Image stays bigger than the container so
             * there is never an empty gap while moving.
             *
             * Movement:
             * -100px -> +100px
             */

            imagesRef.current.forEach((image) => {
                if (!image) return;

                gsap.set(image, {
                    scale: 1.08,
                    y: -100,
                    force3D: true,
                    willChange: "transform",
                });

                gsap.to(image, {
                    y: 85,
                    ease: "none",
                    force3D: true,
                    scrollTrigger: {
                        trigger: image,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
            });
        },
        {
            scope: containerRef,
        }
    );

    return (
        <section
            ref={containerRef}
            className="
                mx-auto
                max-w-[1440px]
                px-4
                py-16
                sm:px-6
                lg:px-8
                lg:py-24
                [perspective:1200px]
            "
        >
            <SectionHead
                eyebrow={dict.audiencesSection.eyebrow}
                title={dict.audiencesSection.title}
                highlight={dict.audiencesSection.highlight}
                sub={dict.audiencesSection.sub}
            />

            <div
                data-anim-stagger
                className="
                    mt-12
                    grid
                    grid-cols-1
                    gap-6
                    md:gap-8
                    lg:grid-cols-3
                "
            >
                {audiences.map((a, index) => {
                    const Icon = a.icon;

                    return (
                        <article
                            key={a.kicker}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            data-anim-child
                            className={`
                                group
                                flex
                                flex-col
                                overflow-hidden
                                rounded-3xl
                                border
                                border-slate-200
                                bg-white
                                p-3
                                duration-300
                                will-change-transform
                                [transform-style:preserve-3d]
                                dark:border-slate-800
                                dark:bg-ink-900
                                ${BORDER_HOVER_STYLES[a.tone] || ""}
                            `}
                        >
                            {/* Image Container */}
                            <div
                                className="
                                    relative
                                    h-[240px]
                                    w-full
                                    overflow-hidden
                                    rounded-[40px]
                                    sm:h-[260px]
                                    [transform:translateZ(120px)]
                                "
                            >
                                <img
                                    ref={(el) => {
                                        imagesRef.current[index] = el;
                                    }}
                                    src={audienceImages[index]}
                                    alt={a.title}
                                    loading="lazy"
                                    className="
                                        absolute
                                        inset-0
                                        h-full
                                        w-full
                                        object-cover
                                        scale-100
                                        will-change-transform
                                        select-none
                                    "
                                />

                                {/* Image overlay */}
                                {/* <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-black/75 via-black/25 to-transparent" /> */}

                                {/* Icon & Kicker Overlay */}
                                <div
                                    className="
                                        absolute
                                        bottom-4
                                        left-4
                                        right-4
                                        flex
                                        items-center
                                        gap-3
                                        [transform:translateZ(10px)]
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl                                            border
                                            border-white/20
                                            bg-white/20
                                            backdrop-blur-md
                                            transition-transform
                                            duration-300
                                            group-hover:scale-105
                                        "
                                    >
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>

                                    <span
                                        className="
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-white                                        "
                                    >
                                        {a.kicker}
                                    </span>
                                </div>
                            </div>

                            {/* Card content */}
                            <div
                                className="
                                    flex
                                    flex-1
                                    flex-col
                                    p-5
                                    sm:p-6
                                    [transform:translateZ(15px)]
                                "
                            >
                                <h3
                                    className="
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                        dark:text-white
                                        xl:text-3xl
                                    "
                                >
                                    {a.title}
                                </h3>

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        leading-relaxed
                                        text-slate-600
                                        dark:text-white/70
                                    "
                                >
                                    {a.body}
                                </p>

                                <ul
                                    className="
                                        mt-6
                                        space-y-3.5
                                        text-sm
                                        font-medium
                                        text-slate-700
                                        dark:text-white/90
                                    "
                                >
                                    {a.bullets.map((b) => (
                                        <li
                                            key={b}
                                            className="
                                                flex
                                                items-start
                                                gap-3
                                            "
                                        >
                                            <span
                                                className={`
                                                    mt-0.5
                                                    flex
                                                    h-6
                                                    w-6
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    ${SPARKLE_TONE_STYLES[a.tone]}
                                                `}
                                            >
                                                <Sparkle className="h-3.5 w-3.5" />
                                            </span>

                                            <span className="leading-snug">
                                                {b}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-8">
                                    <Btn
                                        href={a.href}
                                        tone={a.tone}
                                        variant="solid"
                                        size="sm"
                                        arrow
                                        className="w-full justify-center"
                                    >
                                        {a.cta}
                                    </Btn>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
