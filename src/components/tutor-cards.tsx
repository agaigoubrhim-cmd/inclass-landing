"use client";

import type { Tutor } from "@/lib/data";
import { Btn } from "./ui";
import { RollingNumber } from "./gsap/rolling-number";
import { RollingText } from "@/components/gsap/rolling-text";

import {
    Video,
    MapPin,
    BadgeCheck,
    HomeIcon,
    Bookmark,
    Star,
    Play,
} from "lucide-react";

import { useI18n } from "@/i18n";
import { getLocalizedSubject } from "@/lib/subject-translations";

const TUTOR_PHOTOS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
];

export function TutorCard({ tutor, index = 0, asSlide = false }: { tutor: Tutor; index?: number; asSlide?: boolean }) {
    const { dict, locale } = useI18n();
    const modeLabel =
        tutor.mode === "online"
            ? dict.common.online
            : tutor.mode === "home"
                ? dict.common.home
                : dict.common.bothModes;

    const ModeIcon = tutor.mode === "home" ? HomeIcon : Video;
    const photo = TUTOR_PHOTOS[Math.abs((tutor.id ?? index)) % TUTOR_PHOTOS.length] ?? TUTOR_PHOTOS[0];

    return (
        <article
            data-tutor-card
            data-anim-child
            className={`
        group
        relative
        flex
        ${asSlide ? "h-[540px]" : "h-[520px]"}
        ${asSlide ? "w-[86vw] max-w-[380px] flex-shrink-0 snap-center" : "w-full"}
        flex-col
        overflow-hidden
        rounded-[24px]
        border
        border-black/[0.08]
        bg-black
        duration-300

        sm:h-[calc(100svh-32px)]
        sm:w-full
        sm:max-w-none
        sm:min-h-[650px]
        sm:snap-none

        lg:h-full
        lg:min-h-[650px]
        lg:rounded-[30px]

        dark:border-white/[0.09]
      `}
        >
            {/* =========================================================
          FULL IMAGE
         ========================================================= */}

            <div
                data-tutor-image
                className="
          absolute
          inset-0
          overflow-hidden
        "
            >
                <img
                    src={photo}
                    alt={tutor.fullName}
                    className="
            absolute
            inset-0
            h-full
            w-full
            scale-[1.02]
            object-cover
            object-center
            will-change-transform
          "
                />

                {/* Top gradient */}

                <div
                    className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-b
            from-black/20
            via-transparent
            to-black/[0.96]
          "
                />

                {/* Bottom depth */}

                <div
                    className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-[72%]
            bg-gradient-to-t
            from-black/[0.96]
            via-black/45
            to-transparent
          "
                />
            </div>

            {/* =========================================================
          TOP LEFT — MODE
         ========================================================= */}

            <div
                className="
          absolute
          left-4
          top-4
          z-30
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/20
          bg-black/25
          px-3
          py-1.5
          text-[11px]
          font-bold
          text-white
         
          backdrop-blur-md
        "
            >
                <span
                    className="
            h-2
            w-2
            rounded-full
            bg-emerald-400
          "
                />

                {tutor.mode === "online" ? dict.common.available : modeLabel}
            </div>

            {/* =========================================================
          TOP RIGHT — BOOKMARK
         ========================================================= */}

            <button
                type="button"
                aria-label={`Ajouter ${tutor.fullName} aux favoris`}
                className="
          absolute
          right-4
          top-4
          z-30
          grid
          h-10
          w-10
          place-items-center
          rounded-full
          border
          border-white/20
          bg-black/25
          text-white
         
          backdrop-blur-md
          transition-all
          duration-300
          hover:scale-105
          hover:bg-black/45
        "
            >
                <Bookmark
                    className="h-[17px] w-[17px]"
                    strokeWidth={2}
                />
            </button>

            {/* =========================================================
          CONTENT OVER IMAGE
         ========================================================= */}

            <div
                data-tutor-content
                className="
          relative
          z-20
          mt-auto
          px-4
          pb-4
          pt-16
          will-change-transform

          sm:px-5
          sm:pb-5
          sm:pt-20
        "
            >
                {/* VIDEO + TEXT */}

                <div
                    className="
            mb-4
            flex
            items-center
            gap-3

            sm:mb-5
          "
                >
                    <div
                        className="
              relative
              h-[62px]
              w-[110px]
              shrink-0
              overflow-hidden
              rounded-2xl
              border
              border-white/20
             

              sm:h-[82px]
              sm:w-[145px]
            "
                    >
                        <img
                            src={photo}
                            alt=""
                            className="h-full w-full scale-110 object-cover"
                        />
                        <span className="absolute inset-0 grid place-items-center bg-black/15">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25 backdrop-blur-md">
                                <Play className="h-3 w-3 translate-x-[1px] text-white" fill="currentColor" />
                            </span>
                        </span>
                    </div>

                    <div
                        className="
              flex
              items-center
              gap-2
              text-white
              drop-
            "
                    >
                        <Video
                            className="
                h-4
                w-4
                shrink-0
                sm:h-5
                sm:w-5
              "
                            strokeWidth={2}
                        />

                        <span
                            className="
                text-[12px]
                font-bold
                sm:text-[14px]
              "
                        >
                            {dict.common.watchVideo}
                        </span>
                    </div>
                </div>

                {/* NAME */}

                <div className="flex items-center gap-1.5">
                    <h3
                        className="
              min-w-0
              truncate
              text-[20px]
              font-extrabold
              tracking-[-0.025em]
              text-white
              sm:text-[21px]
            "
                    >
                        {tutor.fullName}
                    </h3>

                    {tutor.verified ? (
                        <BadgeCheck
                            className="
                h-[18px]
                w-[18px]
                shrink-0
                text-blue-400
              "
                            fill="currentColor"
                            strokeWidth={1.5}
                        />
                    ) : null}
                </div>

                {/* LOCATION */}

                <p
                    className="
            mt-1
            flex
            items-center
            gap-1.5
            text-xs
            font-medium
            text-white/65
          "
                >
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {tutor.city}
                </p>

                {/* HEADLINE */}

                <p
                    className="
            mt-3
            line-clamp-2
            max-w-[95%]
            text-[13px]
            font-medium
            leading-[1.45]
            text-white/80
            sm:text-[14px]
          "
                >
                    {tutor.headline}
                </p>

                {/* TAGS */}

                <div className="mt-3 flex flex-wrap gap-1.5">
                    <span
                        className="
              max-w-[45%]
              truncate
              rounded-full
              bg-white/10
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-white
              backdrop-blur-md
            "
                    >
                        {getLocalizedSubject(tutor.subjectSlug, locale, tutor.subjectLabel)}
                    </span>

                    <span
                        className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-white/10
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-white
              backdrop-blur-md
            "
                    >
                        <ModeIcon className="h-3 w-3" />
                        {modeLabel}
                    </span>

                    <span
                        className="
              max-w-[35%]
              truncate
              rounded-full
              bg-white/10
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-white
              backdrop-blur-md
            "
                    >
                        {tutor.levels}
                    </span>
                </div>

                {/* STATS */}

                <div
                    className="
            mt-4
            grid
            grid-cols-3
            divide-x
            divide-white/15
            border-t
            border-white/15
            pt-3
          "
                >
                    {/* Rating */}

                    <div className="flex flex-col items-start px-2 first:pl-0">
                        <div className="flex items-center gap-1.5">
                            <Star
                                className="
                  h-3.5
                  w-3.5
                  fill-amber-400
                  text-amber-400
                "
                                strokeWidth={1.5}
                            />

                            <span className="text-[14px] font-extrabold text-white">
                                <RollingNumber
                                    targetNumber={Number(tutor.rating).toFixed(1)}
                                    height={20}
                                />
                            </span>
                        </div>

                        <span className="mt-0.5 text-[10px] font-medium text-white/50">
                            {dict.common.ratingWord}
                        </span>
                    </div>

                    {/* Reviews */}

                    <div className="flex flex-col items-start px-3">
                        <span className="text-[14px] font-extrabold text-white">
                            <RollingNumber
                                targetNumber={tutor.reviews}
                                height={20}
                            />
                        </span>

                        <span className="mt-0.5 text-[10px] font-medium text-white/50">
                            {dict.common.reviewsWord}
                        </span>
                    </div>

                    {/* Price */}

                    <div className="flex flex-col items-start px-3 last:pr-0">
                        <span className="whitespace-nowrap text-[14px] font-extrabold text-white">
                            <RollingNumber
                                targetNumber={tutor.pricePerHour}
                                height={20}
                            />

                            <span className="ml-0.5 text-[9px] font-bold">
                                {dict.common.perHour}
                            </span>
                        </span>

                        <span className="mt-0.5 text-[10px] font-medium text-white/50">
                            {dict.common.priceWord}
                        </span>
                    </div>
                </div>

                {/* ACTIONS */}

                <div className="mt-4">
                    <div className="flex items-center gap-2">
                        <Btn
                            href={`/profs/${tutor.slug}`}
                            tone="student"
                            size="sm"
                            arrow
                            className="
                h-12
                flex-1
                justify-center
                rounded-full
                bg-white
                px-4
                text-[13px]
                font-extrabold
                text-ink
               
                transition-all
                duration-300
                hover:scale-[1.01]
               
              "
                        >
                            <RollingText text={dict.common.viewProfile} />
                        </Btn>

                        <button
                            type="button"
                            aria-label={`Ajouter ${tutor.fullName} aux favoris`}
                            className="
                grid
                h-12
                w-12
                shrink-0
                place-items-center
                rounded-full
                border
                border-white/20
                bg-white/10
                text-white
               
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white/20
              "
                        >
                            <Bookmark
                                className="h-[18px] w-[18px]"
                                strokeWidth={2}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export function TutorCards({ tutors }: { tutors: Tutor[] }) {
    return (
        <div
            data-anim-stagger
            className="
                flex
                snap-x
                snap-mandatory
                gap-4
                overflow-x-auto
                pb-2
                no-scrollbar

                sm:grid
                sm:grid-cols-2
                sm:gap-6
                sm:overflow-visible
                sm:pb-0

                lg:grid-cols-3
            "
        >
            {tutors.map((tutor, i) => (
                <TutorCard key={tutor.slug} tutor={tutor} index={i} asSlide />
            ))}
        </div>
    );
}
