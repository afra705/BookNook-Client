
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Every Book Opens a New World",
    description:
      "Discover wonderful stories, explore new ideas, and find your next favorite book in our growing collection.",
    badge: "Your next adventure starts here",
    image: "/images/1.png",
    imageAlt: "BookNook book collection",
  },
  {
    subtitle: "DISCOVER YOUR NEXT READ",
    title: "Find Stories That Stay With You",
    description:
      "From timeless classics to modern favorites, explore books that inspire your imagination and curiosity.",
    badge: "A little reading, a lot of magic",
    image: "/images/2.png",
    imageAlt: "A selection of books for readers",
  },
  {
    subtitle: "YOUR PERSONAL READING CORNER",
    title: "Make Every Chapter Count",
    description:
      "Build your reading journey, discover new authors, and make more room for the stories you love.",
    badge: "Turn the page to something new",
    image: "/images/3.png",
    imageAlt: "Books for your next reading adventure",
  },
];

export default function Banner() {
  return (
    <section className="bg-[#F8F5ED] px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation
          className="booknook-swiper overflow-hidden rounded-3xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.title}>
              <div className="relative flex min-h-[490px] items-center overflow-hidden bg-[#283D32] px-6 py-12 sm:px-10 md:min-h-[520px] md:px-12 lg:min-h-[560px] lg:px-16">
                {/* Background decorations */}
                <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#879878]/20 blur-3xl" />

                <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#879878]/15 blur-3xl" />

                {/* Slide text */}
                <div className="relative z-10 w-full max-w-xl pb-10 md:w-[58%] md:pb-0">
                  {/* Badge */}
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F8F5ED]/20 bg-[#FFFDF8]/10 px-4 py-2 text-xs font-medium tracking-wide text-[#E5E9DC] sm:text-sm">
                    {index === 0 ? (
                      <Sparkles size={16} />
                    ) : (
                      <BookOpen size={16} />
                    )}

                    <span>{slide.badge}</span>
                  </div>

                  {/* Subtitle */}
                  <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#C8795B] sm:text-sm">
                    {slide.subtitle}
                  </p>

                  {/* Heading */}
                  <h1 className="max-w-2xl font-serif text-4xl font-bold leading-tight text-[#FFFDF8] sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-6 max-w-lg text-sm leading-7 text-[#E1E5D9] sm:text-base sm:leading-8">
                    {slide.description}
                  </p>

                  {/* Browse Books Button */}
                  <Link
                    href="/books"
                    className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#C8795B] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#B86B4F] hover:shadow-lg sm:px-7 sm:py-4"
                  >
                    Browse Books

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  {/* Bottom text */}
                  <div className="mt-7 flex items-center gap-2 text-xs text-[#D7DFD0] sm:text-sm">
                    <BookOpen size={16} className="text-[#C8795B]" />

                    <span>Discover. Read. Repeat.</span>
                  </div>
                </div>

                {/* Right-side book image */}
                <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[42%] items-center justify-center md:flex">
                  {/* Background glow */}
                  <div className="absolute right-10 h-72 w-72 rounded-full bg-[#DCE3D0]/20 blur-2xl lg:right-16 lg:h-96 lg:w-96" />

                  {/* Image container */}
                  <div className="relative h-[300px] w-[250px] overflow-hidden rounded-2xl border-4 border-[#F8F5ED]/20 shadow-2xl lg:h-[370px] lg:w-[300px]">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 250px, 300px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority={index === 0}
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#283D32]/90 via-[#283D32]/10 to-transparent" />

                    {/* Image label */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#E4E9D7]">
                        Your Reading Journey
                      </p>

                      <p className="mt-2 font-serif text-xl font-bold text-white lg:text-2xl">
                        Find Your Next Chapter
                      </p>

                      <div className="mt-3 h-1 w-12 rounded-full bg-[#C8795B]" />
                    </div>
                  </div>

                  {/* Decorative accent */}
                  <div className="absolute bottom-14 right-4 h-16 w-16 rotate-12 rounded-2xl border border-[#F8F5ED]/20 bg-[#C8795B]/80 shadow-lg lg:right-8 lg:h-20 lg:w-20" />

                  {/* Floating book icon */}
                  <div className="absolute right-8 top-16 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F8F5ED]/20 bg-[#FFFDF8] text-[#283D32] shadow-xl lg:right-12 lg:top-20">
                    <BookOpen size={27} />
                  </div>
                </div>

                {/* Bottom decorative line */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-[#879878]/30">
                  <div className="h-full w-1/3 bg-[#C8795B]" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper custom styling */}
      <style jsx global>{`
        .booknook-swiper .swiper-button-next,
        .booknook-swiper .swiper-button-prev {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 253, 248, 0.95);
          color: #283d32;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
          transition: all 0.3s ease;
        }

        .booknook-swiper .swiper-button-next:hover,
        .booknook-swiper .swiper-button-prev:hover {
          background: #c8795b;
          color: white;
        }

        .booknook-swiper .swiper-button-next::after,
        .booknook-swiper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }

        .booknook-swiper .swiper-pagination {
          bottom: 22px !important;
          text-align: left;
          padding-left: 40px;
        }

        .booknook-swiper .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: #f8f5ed;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .booknook-swiper .swiper-pagination-bullet-active {
          width: 25px;
          border-radius: 10px;
          background: #c8795b;
          opacity: 1;
        }

        @media (max-width: 767px) {
          .booknook-swiper .swiper-button-next,
          .booknook-swiper .swiper-button-prev {
            display: none;
          }

          .booknook-swiper .swiper-pagination {
            bottom: 18px !important;
            padding-left: 24px;
          }
        }
      `}</style>
    </section>
  );
}
