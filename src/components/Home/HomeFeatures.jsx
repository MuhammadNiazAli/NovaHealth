"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const features = [
  {
    id: 1,
    title: "24/7 Emergency",
    description: "Round-the-clock emergency services for immediate and critical care.",
    icon: (
      <img
        src="https://img.icons8.com/ios-filled/50/fa314a/ambulance.png"
        alt="24/7 Emergency icon"
        className="h-14 w-14 object-contain"
        loading="lazy"
        draggable={false}
        aria-hidden="true"
      />
    ),
  },
  {
    id: 2,
    title: "Qualified Doctors",
    description: "Experienced specialists and general physicians you can trust.",
    icon: (
      <img
        src="https://img.icons8.com/ios-filled/50/4a90e2/doctor-male.png"
        alt="Qualified Doctors icon"
        className="h-14 w-14 object-contain"
        loading="lazy"
        draggable={false}
        aria-hidden="true"
      />
    ),
  },
  {
    id: 3,
    title: "Modern Equipment",
    description: "State-of-the-art medical tools for precise diagnostics and treatments.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h6m-3-6v6m-1-8h2m1-2a1 1 0 011 1v2a1 1 0 01-1 1m-4-4a1 1 0 00-1 1v2a1 1 0 001 1m2-4v2m4 0v2m-4 0h4m-4 0a2 2 0 01-2-2v-1a2 2 0 012-2m0 0h4m-4 0v-2"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Patient-Centered Care",
    description: "Compassionate, personalized services focused on your health journey.",
    icon: (
      <img
        src="https://img.icons8.com/ios-filled/50/f9a825/heart-health.png"
        alt="Patient-Centered Care icon"
        className="h-14 w-14 object-contain"
        loading="lazy"
        draggable={false}
        aria-hidden="true"
      />
    ),
  },
];

// Animation variants for container and cards
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HomeFeatures() {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  // Animate when the section scrolls into view
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [controls]);

  return (
    <section
      aria-labelledby="features-title"
      ref={sectionRef}
      className="bg-white py-20 px-6 md:px-12 my-[-90px] mb-[-50px]"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          id="features-title"
          className="text-3xl md:text-4xl font-extrabold mb-6"
          style={{ color: "#000" }}
          initial="hidden"
          animate={controls}
          variants={headingVariants}
        >
          <span style={{ color: "#1D4ED8" }}>Why</span> Choose Us?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-16"
          initial="hidden"
          animate={controls}
          variants={headingVariants}
          transition={{ delay: 0.2 }}
        >
          We provide expert healthcare services with compassion, modern technology, and personalized care.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map(({ id, title, description, icon }) => (
            <motion.article
              key={id}
              role="group"
              aria-labelledby={`feature-title-${id}`}
              tabIndex={0}
              variants={cardVariants}
              className="feature-card bg-gray-50 rounded-xl shadow-md p-7 border border-gray-200 hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-default"
            >
              <div className="flex justify-center mb-5">{icon}</div>
              <h3
                id={`feature-title-${id}`}
                className="text-xl font-semibold text-gray-900 mb-2"
              >
                {title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
