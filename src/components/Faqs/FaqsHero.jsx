"use client";

import React from "react";
import { motion } from "framer-motion";

const heroTextVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
  }),
};

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.4 } },
};

export default function FaqsHero() {
  return (
    <section
      aria-label="FAQs Hero Section"
      className="relative bg-white w-full flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left max-w-lg"
          initial="hidden"
          animate="visible"
          aria-labelledby="faqs-hero-heading"
          aria-describedby="faqs-hero-subtext"
        >
          <motion.h1
            id="faqs-hero-heading"
            className="text-[clamp(2.75rem,6vw,4.25rem)] font-extrabold leading-tight tracking-tight text-blue-700 select-text"
            custom={0}
            variants={heroTextVariants}
          >
            Find Answers
            <br />
            <span className="text-black" aria-label="To Your Questions" role="text">
              To Your Questions
            </span>
          </motion.h1>
          <motion.p
            id="faqs-hero-subtext"
            className="mt-6 text-lg sm:text-xl font-light text-gray-900 max-w-3xl mx-auto lg:mx-0"
            custom={1}
            variants={heroTextVariants}
          >
            We’ve gathered the most common questions to help you quickly find the information you
            need about our services, policies, and more. Can’t find what you’re looking for? Reach
            out to our support team anytime.
          </motion.p>

          <motion.button
            custom={2}
            variants={heroTextVariants}
            onClick={() => {
              // Example: open a FAQ search modal or scroll to FAQ section
              alert("Open FAQ search or scroll to FAQs");
            }}
            className="mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors w-full sm:w-auto"
            aria-label="Search FAQs"
          >
            Search FAQs
          </motion.button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end max-w-xl w-full"
          initial="hidden"
          animate="visible"
          variants={heroImageVariants}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1678000616499-2f27d9bc0c78?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Person reading FAQ or looking at information on a tablet"
            className="rounded-3xl shadow-2xl w-full max-w-[540px] h-auto object-cover select-none"
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
