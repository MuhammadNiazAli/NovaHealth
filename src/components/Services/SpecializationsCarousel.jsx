"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaStethoscope,
  FaHeartbeat,
  FaXRay,
  FaSyringe,
  FaTooth,
  FaUserNurse,
  FaProcedures,
  FaBaby,
  FaSocks,
} from "react-icons/fa";

const specializations = [
  { id: 1, title: "Neurology", icon: FaBrain },
  { id: 2, title: "General Medicine", icon: FaStethoscope },
  { id: 3, title: "Cardiology", icon: FaHeartbeat },
  { id: 4, title: "Radiology", icon: FaXRay },
  { id: 5, title: "Immunology", icon: FaSyringe },
  { id: 6, title: "Dentistry", icon: FaTooth },
  { id: 7, title: "Nursing", icon: FaUserNurse },
  { id: 8, title: "Pediatrics", icon: FaBaby },
  { id: 9, title: "Oncology", icon: FaProcedures },
  { id: 10, title: "Orthopedics", icon: FaSocks },
];

const CARD_WIDTH = 280; // px

const clampIndex = (index, length) => ((index % length) + length) % length;

export default function SpecializationsCoverflow() {
  const [current, setCurrent] = useState(0);
  const length = specializations.length;

  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = windowWidth < 640;

  // Navigation handlers
  const prev = useCallback(() => {
    setCurrent((prev) => clampIndex(prev - 1, length));
  }, [length]);

  const next = useCallback(() => {
    setCurrent((prev) => clampIndex(prev + 1, length));
  }, [length]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next]);

  return (
    <section
      aria-label="Specializations Coverflow Carousel"
      className="py-20 bg-white select-none mb-[-50px]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
          Our{" "}
          <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
            Specializations
          </span>
        </h2>

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            aria-label="Previous specialization"
            onClick={prev}
            className="absolute left-0 z-10 p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div
            className="relative w-full max-w-[900px] h-[360px] flex justify-center items-center overflow-visible"
            style={{ perspective: isMobile ? "none" : 1200 }}
          >
            <AnimatePresence initial={false} mode="wait">
              {isMobile ? (
                // Mobile: show only current card
                <motion.div
                  key={specializations[current].id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-gray-50 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 cursor-pointer select-none mx-auto border border-gray-200"
                  style={{ width: CARD_WIDTH, height: 320, userSelect: "none" }}
                  role="listitem"
                  aria-label={specializations[current].title}
                  tabIndex={0}
                  onClick={() => setCurrent(current)}
                >
                  {React.createElement(specializations[current].icon, {
                    className: "text-blue-600 mb-5",
                    size: 64,
                    "aria-hidden": true,
                  })}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {specializations[current].title}
                  </h3>
                </motion.div>
              ) : (
                specializations.map((spec, i) => {
                  let offset = i - current;

                  // Infinite loop effect
                  if (offset < -length / 2) offset += length;
                  if (offset > length / 2) offset -= length;

                  const absOffset = Math.abs(offset);

                  const scale = absOffset === 0 ? 1.1 : 0.8 - 0.1 * Math.min(absOffset, 3);
                  const opacity = absOffset > 3 ? 0 : 1 - 0.3 * Math.min(absOffset, 3);
                  const translateX = offset * (CARD_WIDTH * 0.7);
                  const rotateY = offset * -25;

                  return (
                    <motion.div
                      key={spec.id}
                      initial={false}
                      animate={{
                        x: translateX,
                        scale,
                        rotateY,
                        opacity,
                        zIndex: absOffset === 0 ? 10 : 10 - absOffset,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute top-0 left-1/2 w-[280px] h-[320px] bg-gray-50 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 cursor-pointer select-none border border-gray-200"
                      style={{ transformOrigin: "50% 50%", userSelect: "none" }}
                      role="listitem"
                      aria-label={spec.title}
                      tabIndex={absOffset === 0 ? 0 : -1}
                      onClick={() => setCurrent(i)}
                    >
                      {React.createElement(spec.icon, {
                        className: "text-blue-600 mb-5",
                        size: 64,
                        "aria-hidden": true,
                      })}
                      <h3 className="text-xl font-semibold text-gray-900">{spec.title}</h3>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            aria-label="Next specialization"
            onClick={next}
            className="absolute right-0 z-10 p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="mt-10 flex justify-center space-x-3">
          {specializations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to specialization ${specializations[idx].title}`}
              className={`w-3 h-3 rounded-full transition ${
                current === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-current={current === idx ? "true" : undefined}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
