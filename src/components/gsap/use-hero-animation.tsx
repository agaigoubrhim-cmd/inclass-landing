"use client";

import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HeroAnimationRefs = {
    sectionRef: RefObject<HTMLElement | null>;
    heroRef: RefObject<HTMLDivElement | null>;
    imageRef: RefObject<HTMLDivElement | null>;
    badgeRef: RefObject<HTMLDivElement | null>;
    titleRef: RefObject<HTMLHeadingElement | null>;
    descriptionRef: RefObject<HTMLParagraphElement | null>;
    buttonsRef: RefObject<HTMLDivElement | null>;
    trustRef?: RefObject<HTMLDivElement | null>;
    mobileButtonRef: RefObject<HTMLDivElement | null>;
};

export function useHeroAnimation({
    sectionRef,
    heroRef,
    imageRef,
    badgeRef,
    titleRef,
    descriptionRef,
    buttonsRef,
    trustRef,
    mobileButtonRef,
}: HeroAnimationRefs) {
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const hero = heroRef.current;
        const image = imageRef.current;

        if (!section || !hero || !image) {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reduceMotion) {
            gsap.set(hero, {
                clipPath: "inset(0% 0% 0% 0% round 40px)",
                scale: 1,
                opacity: 1,
            });

            gsap.set(image, {
                scale: 1,
                filter: "blur(0px)",
            });

            return;
        }

        const contentElements = [
            badgeRef.current,
            titleRef.current,
            descriptionRef.current,
            buttonsRef.current,
            trustRef?.current,
        ].filter(Boolean);

        const ctx = gsap.context(() => {
            /*
             * ============================================================
             * INITIAL STATES
             * ============================================================
             */

            gsap.set(hero, {
                clipPath: "inset(102% 108% 102% 108% round 180px)",
                scale: 0.94,
                opacity: 0,
            });

            gsap.set(image, {
                scale: 1.2,
                filter: "blur(8px)",
            });

            if (contentElements.length > 0) {
                gsap.set(contentElements, {
                    y: 45,
                });
            }

            if (mobileButtonRef.current) {
                gsap.set(mobileButtonRef.current, {
                    y: 35,
                    xPercent: -50,
                    opacity: 0,
                });
            }

            /*
             * ============================================================
             * INTRO ANIMATION
             * ============================================================
             */

            const introTimeline = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            introTimeline.to(hero, {
                clipPath: "inset(0% 0% 0% 0% round 40px)",
                scale: 1,
                opacity: 1,
                duration: 2.35,
            });

            introTimeline.to(
                image,
                {
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 5.7,
                },
                0,
            );

            if (contentElements.length > 0) {
                introTimeline.to(
                    contentElements,
                    {
                        y: 0,
                        duration: 4.85,
                        stagger: 0.1,
                    },
                    0.55,
                );
            }

            if (mobileButtonRef.current) {
                introTimeline.to(
                    mobileButtonRef.current,
                    {
                        y: 0,
                        xPercent: -50,
                        opacity: 1,
                        duration: 0.75,
                    },
                    1,
                );
            }

            /*
             * ============================================================
             * SCROLL ANIMATION
             * ============================================================
             */

            const scrollTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.4,
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                },
            });

            /*
             * IMAGE
             */
            scrollTimeline.to(
                image,
                {
                    scale: 1.2,
                    filter: "blur(8px)",
                    ease: "none",
                },
                0,
            );

            /*
             * TEXT CONTENT
             */
            if (contentElements.length > 0) {
                scrollTimeline.to(
                    contentElements,
                    {
                        y: 45,
                        ease: "none",
                        stagger: 0.02,
                    },
                    0,
                );
            }

            /*
             * MOBILE BUTTON
             */
            if (mobileButtonRef.current) {
                scrollTimeline.to(
                    mobileButtonRef.current,
                    {
                        y: 35,
                        xPercent: -50,
                        opacity: 0,
                        ease: "none",
                    },
                    0,
                );
            }

            /*
             * HERO CONTAINER
             */
            scrollTimeline.to(
                hero,
                {
                    clipPath:
                        "inset(112% 118% 112% 118% round 180px)",
                    scale: 0.94,
                    opacity: 0,
                    ease: "none",
                },
                0,
            );

            /*
             * ============================================================
             * REFRESH AFTER EVERYTHING IS CREATED
             * ============================================================
             */

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        }, section);

        /*
         * ================================================================
         * CLEANUP
         * ================================================================
         */

        return () => {
            ctx.revert();
        };
    }, [
        sectionRef,
        heroRef,
        imageRef,
        badgeRef,
        titleRef,
        descriptionRef,
        buttonsRef,
        trustRef,
        mobileButtonRef,
    ]);
}



