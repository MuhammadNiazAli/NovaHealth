"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

// --- Testimonial Data ---
const testimonials = [
  {
    id: 1,
    author: "Lucas Anderson",
    text: "An outstanding experience with a truly dedicated team. Their professionalism shines through every step.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1605684954998-685c79d6a018?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    author: "Maria Gonzales",
    text: "Their attention to detail and personalized care exceeded my expectations. Highly recommend!",
    rating: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    author: "David Lee",
    text: "A seamless and supportive journey from start to finish. Truly top-notch service.",
    rating: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1661578535048-7a30e3a71d25?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    author: "Sophia Patel",
    text: "Professional, caring, and efficient. I felt valued and well looked after at every visit.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1662837775286-7e6258c7c595?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    author: "James Kim",
    text: "Highly skilled team with a personal touch. They made all the difference.",
    rating: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1661478177049-f8569388e0c5?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    author: "Emma Brown",
    text: "I appreciated the warm environment and expert care. A wonderful experience overall.",
    rating: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1661722577924-5493be567c61?w=400&auto=format&fit=crop&q=60",
  },
];

// Utility to wrap index within bounds
const wrapIndex = (index, length) => ((index % length) + length) % length;

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = testimonials.length;

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Responsive updates
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  // Card sizes
  const cardWidth = isMobile ? Math.min(windowWidth - 64, 280) : 320;
  const cardHeight = 360;

  // Desktop transform factors
  const translateFactor = 0.7;
  const rotationFactor = -25;

  // Navigation controls
  const goPrev = useCallback(
    () => setActiveIndex((prev) => wrapIndex(prev - 1, totalSlides)),
    [totalSlides]
  );
  const goNext = useCallback(
    () => setActiveIndex((prev) => wrapIndex(prev + 1, totalSlides)),
    [totalSlides]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  return (
    <section
      aria-label="Testimonials Carousel"
      className="py-16 bg-white select-none my-[-80px]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-12 text-gray-900">
          Our{" "}
          <span className="text-blue-700 underline decoration-blue-400 decoration-4 underline-offset-4">
            Testimonials
          </span>
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Prev Button */}
          <CarouselArrow
            direction="left"
            onClick={goPrev}
            className="absolute left-3 sm:left-0"
          />

          {/* Carousel */}
          <div
            className="relative w-full flex justify-center items-center overflow-visible"
            style={{
              perspective: isMobile ? "none" : 1200,
              height: cardHeight,
              paddingLeft: isMobile ? 32 : 0,
              paddingRight: isMobile ? 32 : 0,
              transformStyle: isMobile ? "flat" : "preserve-3d",
              willChange: "transform",
            }}
          >
            {testimonials.map((t, i) =>
              isMobile
                ? renderMobileCard(t, i, activeIndex, cardWidth, cardHeight, setActiveIndex)
                : renderDesktopCard(
                    t,
                    i,
                    activeIndex,
                    totalSlides,
                    cardWidth,
                    cardHeight,
                    translateFactor,
                    rotationFactor,
                    setActiveIndex
                  )
            )}
          </div>

          {/* Next Button */}
          <CarouselArrow
            direction="right"
            onClick={goNext}
            className="absolute right-3 sm:right-0"
          />
        </div>

        {/* Dot Navigation */}
        <div className="mt-10 flex justify-center space-x-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition ${
                activeIndex === idx ? "bg-blue-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Components ---

function CarouselArrow({ direction, onClick, className }) {
  const isLeft = direction === "left";
  return (
    <button
      aria-label={isLeft ? "Previous testimonial" : "Next testimonial"}
      onClick={onClick}
      className={`${className} z-20 p-2 sm:p-3 bg-blue-700 rounded-full shadow-lg hover:bg-blue-800 transition`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 sm:h-6 sm:w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            isLeft
              ? "M15 19l-7-7 7-7"
              : "M9 5l7 7-7 7"
          }
        />
      </svg>
    </button>
  );
}

function renderMobileCard(t, index, activeIndex, width, height, setActiveIndex) {
  if (index !== activeIndex) return null;
  return (
    <motion.div
      key={t.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col p-6 mx-auto cursor-pointer"
      style={{ width, height }}
      onClick={() => setActiveIndex(index)}
    >
      <TestimonialCardContent testimonial={t} />
    </motion.div>
  );
}

function renderDesktopCard(
  t,
  index,
  activeIndex,
  totalSlides,
  width,
  height,
  translateFactor,
  rotationFactor,
  setActiveIndex
) {
  let offset = index - activeIndex;
  if (offset < -totalSlides / 2) offset += totalSlides;
  if (offset > totalSlides / 2) offset -= totalSlides;

  const absOffset = Math.abs(offset);
  const scale = Math.max(absOffset === 0 ? 1 : 0.75 - 0.1 * Math.min(absOffset, 3), 0.85);
  const opacity = absOffset > 3 ? 0 : 1 - 0.3 * Math.min(absOffset, 3);

  return (
    <motion.div
      key={t.id}
      initial={false}
      animate={{
        x: offset * (width * translateFactor),
        scale,
        rotateY: offset * rotationFactor,
        opacity,
        zIndex: absOffset === 0 ? 10 : 10 - absOffset,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute top-0 left-1/2 bg-white rounded-3xl shadow-2xl border border-gray-300 flex flex-col p-5 cursor-pointer"
      style={{ width, height, transformOrigin: "50% 50%" }}
      onClick={() => setActiveIndex(index)}
    >
      <TestimonialCardContent testimonial={t} />
    </motion.div>
  );
}

function TestimonialCardContent({ testimonial }) {
  return (
    <>
      <img
        src={testimonial.image}
        alt={`Photo of ${testimonial.author}`}
        className="w-20 h-20 rounded-full object-cover mb-5 mx-auto border-4 border-blue-200"
        loading="lazy"
      />
      <blockquote className="text-gray-800 italic text-base mb-5 flex-grow text-center leading-relaxed">
        “{testimonial.text}”
      </blockquote>
      <footer className="text-gray-900 font-semibold text-lg mb-3 text-center">
        — {testimonial.author}
      </footer>
      <div className="flex justify-center space-x-1">
        {[...Array(5)].map((_, idx) => (
          <FaStar
            key={idx}
            className={`w-5 h-5 ${
              idx < testimonial.rating ? "text-yellow-500 drop-shadow-sm" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
}
