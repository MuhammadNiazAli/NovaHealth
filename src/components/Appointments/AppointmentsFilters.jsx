"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = [
  {
    id: "consultation",
    label: "Consultation",
    descriptionTitle: "Personalized Medical Consultations",
    description: [
      "Book personalized medical consultations with certified doctors specializing in various fields. Receive expert advice tailored specifically to your health needs and concerns.",
      "Our healthcare professionals are dedicated to providing compassionate and thorough guidance, ensuring you feel heard and understood every step of the way.",
      "Whether you need a second opinion or ongoing health management, our consultations offer clarity and peace of mind.",
    ],
    highlights: [
      "Certified and experienced doctors",
      "Tailored health advice",
      "Flexible scheduling options",
    ],
    image:
      "https://images.unsplash.com/photo-1496048212478-63d05be2a8bb?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "checkup",
    label: "Check-up",
    descriptionTitle: "Comprehensive Health Check-ups",
    description: [
      "Schedule routine health check-ups to proactively monitor your wellness and detect potential issues early.",
      "Our detailed health assessments include physical exams, lab tests, and personalized health reports, empowering you with knowledge about your body.",
      "Stay ahead of health risks with expert recommendations tailored to your unique profile.",
    ],
    highlights: [
      "Thorough physical examinations",
      "Advanced diagnostic testing",
      "Personalized wellness reports",
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1744347378317-04951e5f96bf?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "therapy",
    label: "Therapy",
    descriptionTitle: "Physical and Emotional Therapy Sessions",
    description: [
      "Access specialized physical and emotional therapy designed to support your recovery and promote holistic wellness.",
      "Our licensed therapists work with you to develop customized treatment plans addressing pain management, mobility improvement, mental health, and stress relief.",
      "Experience compassionate care focused on restoring your quality of life.",
    ],
    highlights: [
      "Licensed and experienced therapists",
      "Customized recovery programs",
      "Support for mental and physical health",
    ],
    image:
      "https://images.unsplash.com/photo-1592947945242-69312358628b?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "surgery",
    label: "Surgery",
    descriptionTitle: "Expert Surgical Consultations",
    description: [
      "Consult with expert surgeons specializing in minimally invasive and traditional surgical procedures.",
      "Our surgical team provides thorough pre-operative evaluations and post-operative care plans to ensure optimal recovery.",
      "We prioritize patient safety, comfort, and clear communication throughout the surgical journey.",
    ],
    highlights: [
      "Experienced surgical specialists",
      "Minimally invasive techniques",
      "Comprehensive pre- and post-op support",
    ],
    image:
      "https://images.unsplash.com/photo-1640876777002-badf6aee5bcc?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "emergency",
    label: "Emergency",
    descriptionTitle: "24/7 Emergency Medical Services",
    description: [
      "Immediate access to 24/7 emergency medical services with rapid response care.",
      "Our emergency team is equipped to handle urgent and critical situations with speed and expertise, ensuring you get the care you need, when you need it.",
      "Trust in our round-the-clock readiness to protect your health and safety.",
    ],
    highlights: [
      "Rapid response and care",
      "Experienced emergency specialists",
      "Available 24 hours, 7 days a week",
    ],
    image:
      "https://images.unsplash.com/photo-1599700403969-f77b3aa74837?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function PremiumFilters() {
  const [activeFilter, setActiveFilter] = useState("consultation");
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const currentFilter = FILTERS.find((filter) => filter.id === activeFilter);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.getBoundingClientRect().height);
    }
  }, [activeFilter]);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 select-none">
      {/* Section Title */}
      <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-900">
        Our Appointment <span className="text-blue-600">Types</span>
      </h2>

      {/* Filter Buttons */}
      <div className="mb-12 flex flex-wrap justify-center gap-8">
        {FILTERS.map(({ id, label }) => {
          const isSelected = id === activeFilter;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveFilter(id)}
              aria-pressed={isSelected}
              aria-label={`Select ${label} appointment type`}
              className={`relative rounded-full px-6 py-3 font-semibold text-lg transition-colors duration-300 whitespace-nowrap
                ${
                  isSelected
                    ? "bg-blue-600 shadow-lg text-white"
                    : "bg-indigo-100 text-blue-600 hover:bg-indigo-200"
                }
              `}
            >
              {label}
              {isSelected && (
                <span className="absolute -bottom-3 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content & Image */}
      <div className="flex flex-col items-start gap-12 md:flex-row">
        {/* Text Content */}
        <motion.div
          key={currentFilter.id}
          ref={contentRef}
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-live="polite"
        >
          <h3 className="text-3xl font-bold text-gray-900">
            {currentFilter.descriptionTitle}
          </h3>

          {currentFilter.description.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-gray-700 text-lg">
              {paragraph}
            </p>
          ))}

          {currentFilter.highlights && (
            <ul className="space-y-1 list-inside list-disc font-semibold text-blue-700">
              {currentFilter.highlights.map((highlight, i) => (
                <li key={i} className="text-lg">
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Image Panel */}
        <motion.div
          aria-hidden="true"
          className="md:w-1/2 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 shadow-lg"
          style={{ height: contentHeight }}
          animate={{ height: contentHeight }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentFilter.id}
              src={currentFilter.image}
              alt={`${currentFilter.label} appointment`}
              loading="lazy"
              draggable={false}
              className="h-full w-full rounded-xl object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
