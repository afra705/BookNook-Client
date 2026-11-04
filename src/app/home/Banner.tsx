"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    subtitle: "WELCOME TO BOOKNOOK",
    lead: "Every Book Opens",
    accent: "a New World",
    description:
      "Discover wonderful stories, explore new ideas, and find your next favorite book in our growing collection.",
    badge: "Your next adventure starts here",
    image: "/images/1.png",
    imageAlt: "BookNook book collection",
  },
  {
    subtitle: "DISCOVER YOUR NEXT READ",
    lead: "Find Stories That",
    accent: "Stay With You",
    description:
      "From timeless classics to modern favorites, explore books that inspire your imagination and curiosity.",
    badge: "A little reading, a lot of magic",
    image: "/images/2.png",
    imageAlt: "A selection of books for readers",
  },
  {
    subtitle: "YOUR PERSONAL READING CORNER",
    lead: "Make Every",
    accent: "Chapter Count",
    description:
      "Build your reading journey, discover new authors, and make more room for the stories you love.",
    badge: "Turn the page to something new",
    image: "/images/3.png",
    imageAlt: "Books for your next reading adventure",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const pad = (value: number) => String(value).padStart(2, "0");

const renderBullet = (index: number, className: string) =>
  `<span class="${className}">${pad(index + 1)}</span>`;

const grainTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23g)' opacity='0.55'/%3E%3C/svg%3E\")";

export default function Banner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F8F5ED] px-3 py-5 sm:px-6 lg:px-10">
      <div className="relative mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop
          speed={800}
          autoplay={
            shouldReduceMotion
              ? false
              : {
                  delay: 5200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          pagination={{
            clickable: true,
            bulletClass: "booknook-chapter",
            bulletActiveClass: "booknook-chapter-active",
            renderBullet,
          }}
          navigation={{
            prevEl: ".booknook-prev",
            nextEl: ".booknook-next",
          }}
          className="booknook-swiper overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-45px_rgba(40,61,50,0.55)] sm:rounded-[2rem]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.subtitle}>
              <div className="relative isolate overflow-hidden bg-[#283D32] text-[#F8F5ED]">
                {/* Paper grain */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-soft-light"
                  style={{ backgroundImage: grainTexture }}
                />

                {/* Soft light pools */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#879878]/25 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-28 right-0 h-96 w-96 rounded-full bg-[#C8795B]/15 blur-3xl"
                />

                {/* Catalog rail */}
                <div className="relative z-20 flex items-center justify-between gap-4 border-b border-[#F8F5ED]/10 px-6 py-4 sm:px-10 lg:px-14">
                  <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#DCE3D0]/70">
                    <BookOpen size={13} className="text-[#C8795B]" />
                    BookNook
                    <span className="hidden text-[#DCE3D0]/30 sm:inline">/</span>
                    <span className="hidden sm:inline">The Reading Room</span>
                  </p>

                  <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#DCE3D0]/50">
                    <span className="tabular-nums text-[#FFFDF8]">
                      {pad(index + 1)}
                    </span>
                    <span className="h-px w-8 bg-[#F8F5ED]/25" />
                    <span className="tabular-nums">{pad(slides.length)}</span>
                  </p>
                </div>

                {/* Slide body */}
                <div className="relative z-10 grid gap-10 px-6 pb-20 pt-9 sm:px-10 sm:pb-24 sm:pt-11 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-8 lg:px-14 lg:pb-24 lg:pt-12">
                  {/* ---------- Copy ---------- */}
                  <motion.div
                    key={`copy-${slide.subtitle}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative max-w-xl"
                  >
                    {/* Eyebrow */}
                    <motion.p
                      variants={itemVariants}
                      className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A8B79B] sm:text-[11px]"
                    >
                      <span className="tabular-nums text-[#C8795B]">
                        {pad(index + 1)}
                      </span>
                      <span className="h-px w-8 bg-[#F8F5ED]/25" />
                      {slide.subtitle}
                    </motion.p>

                    {/* Headline with an italic, underlined accent */}
                    <motion.h1
                      variants={itemVariants}
                      className="mt-6 font-serif text-[2.5rem] font-bold leading-[1.06] tracking-tight text-[#FFFDF8] sm:text-5xl lg:text-[3.75rem]"
                    >
                      {slide.lead}{" "}
                      <span className="relative inline-block italic text-[#DFA588]">
                        {slide.accent}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 240 14"
                          fill="none"
                          preserveAspectRatio="none"
                          className="absolute -bottom-1 left-0 h-3 w-full text-[#C8795B]/75"
                        >
                          <path
                            d="M3 10C54 3 132 2 236 8"
                            stroke="currentColor"
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      className="mt-6 max-w-md text-sm leading-7 text-[#D7DFD0] sm:text-base sm:leading-8"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                      variants={itemVariants}
                      className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
                    >
                      <Link
                        href="/books"
                        className="group inline-flex items-center gap-3 rounded-full bg-[#C8795B] px-6 py-3.5 text-sm font-semibold text-[#FFFDF8] shadow-[0_14px_30px_-14px_rgba(200,121,91,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B86B4F] sm:px-7"
                      >
                        Browse Books
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>

                
                    </motion.div>

                    {/* Shelf note */}
                    <motion.p
                      variants={itemVariants}
                      className="mt-9 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A8B79B] sm:text-xs"
                    >
                      {index === 0 ? (
                        <Sparkles size={15} className="text-[#C8795B]" />
                      ) : (
                        <BookOpen size={15} className="text-[#C8795B]" />
                      )}
                      {slide.badge}
                    </motion.p>
                  </motion.div>

                  {/* ---------- Book display ---------- */}
                  <motion.div
                    key={`display-${slide.subtitle}`}
                    initial={{ opacity: 0, x: 45, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative mx-auto w-full max-w-[300px] pb-4 sm:max-w-[360px] lg:max-w-[400px]"
                  >
                    {/* Ghost chapter numeral */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-9 select-none font-serif text-[6.5rem] leading-none text-transparent sm:text-[8.5rem] lg:text-[10rem]"
                      style={{
                        WebkitTextStroke: "1px rgba(248,245,237,0.18)",
                      }}
                    >
                      {pad(index + 1)}
                    </span>

                    {/* Arch niche */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-1 bottom-12 top-6 overflow-hidden rounded-t-full border border-[#F8F5ED]/15 bg-gradient-to-b from-[#879878]/30 via-[#879878]/10 to-transparent"
                    >
                      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#F8F5ED_1px,transparent_1px)] [background-size:16px_16px]" />
                      <div className="absolute inset-x-5 bottom-0 top-5 rounded-t-full border border-[#F8F5ED]/10" />
                    </div>

                    {/* Cover with page stack */}
                    <div className="relative z-10 mx-auto mt-16 w-[64%]">
                      <div
                        aria-hidden="true"
                        className="absolute -inset-x-3 -top-3 bottom-3 -rotate-6 rounded-lg border border-[#F8F5ED]/20 bg-[#F8F5ED]/10"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute -inset-x-1 -top-1 bottom-1 rotate-3 rounded-lg border border-[#F8F5ED]/15 bg-[#F8F5ED]/5"
                      />

                      <motion.div
                        animate={
                          shouldReduceMotion ? undefined : { y: [0, -9, 0] }
                        }
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative"
                      >
                        <div className="relative overflow-hidden rounded-xl border border-[#F8F5ED]/30 bg-[#FFFDF8] p-3 shadow-[0_35px_60px_-25px_rgba(0,0,0,0.65)]">
                          <div className="relative aspect-[3/4] w-full">
                            <Image
                              src={slide.image}
                              alt={slide.imageAlt}
                              fill
                              sizes="(max-width: 640px) 190px, (max-width: 1024px) 225px, 250px"
                              className="object-contain"
                              priority={index === 0}
                            />
                          </div>
                        </div>

                        {/* Bookmark ribbon, tucked into the cover */}
                        <div
                          aria-hidden="true"
                          className="absolute -top-2 left-[18%] z-20 h-14 w-4 bg-[#C8795B] shadow-[3px_6px_12px_-5px_rgba(0,0,0,0.6)] sm:h-16 sm:w-[1.15rem]"
                          style={{
                            clipPath:
                              "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)",
                          }}
                        />

                        {/* Reader's pick seal */}
                        <div className="absolute -right-2 -top-3 z-20 flex h-[4.25rem] w-[4.25rem] rotate-6 flex-col items-center justify-center rounded-full border border-[#FFFDF8]/50 bg-[#C8795B] text-center text-[8px] font-bold uppercase leading-[1.35] tracking-[0.14em] text-[#FFFDF8] shadow-lg sm:h-20 sm:w-20">
                          Reader&apos;s
                          <br />
                          pick
                        </div>
                      </motion.div>
                    </div>

                    {/* Plinth shadow */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-16 bottom-6 h-4 rounded-[100%] bg-black/45 blur-md"
                    />

                    {/* Edition line */}
                    <p className="relative z-10 mt-7 text-center text-[9px] font-semibold uppercase tracking-[0.35em] text-[#F8F5ED]/45">
                      BookNook Edition · No. {pad(index + 1)}
                    </p>
                  </motion.div>
                </div>

                {/* Vertical microcopy */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 rotate-180 text-[9px] font-semibold uppercase tracking-[0.5em] text-[#F8F5ED]/30 [writing-mode:vertical-rl] xl:block"
                >
                  Discover · Read · Repeat
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom slide controls, kept clear of the editorial copy */}
        <div className="pointer-events-none absolute bottom-4 right-5 z-30 hidden items-center gap-2 sm:flex sm:right-8">
          <button
            type="button"
            aria-label="Previous slide"
            className="booknook-prev pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#F8F5ED]/30 text-[#F8F5ED] transition-all duration-300 hover:border-[#C8795B] hover:bg-[#C8795B] hover:text-[#FFFDF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8795B]"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            className="booknook-next pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#F8F5ED]/30 text-[#F8F5ED] transition-all duration-300 hover:border-[#C8795B] hover:bg-[#C8795B] hover:text-[#FFFDF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8795B]"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
