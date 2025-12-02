"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqList = [
  {
    question: "Who are the key members of your team?",
    answer:
      "Our team consists of experienced designers, developers, marketers, and project managers — all experts in their fields.",
  },
  {
    question: "What makes your team unique?",
    answer:
      "We blend creativity with technical skills and a collaborative approach to craft solutions that truly fit our clients' needs.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely! We've partnered with clients across 20+ countries, adapting seamlessly to different cultures and markets.",
  },
  {
    question: "How can I join your team?",
    answer:
      "We’re always on the lookout for passionate professionals. Visit our Careers page or reach out directly with your resume and portfolio.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "Our experience spans e-commerce, healthcare, finance, education, and entertainment sectors.",
  },
];

export default function OurteamFAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      aria-label="Frequently Asked Questions about Our Team"
      className="relative max-w-5xl mx-auto px-4 sm:px-8 py-12 my-[-30px] mb-0"
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-white rounded-3xl"></div>

      {/* Foreground content */}
      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 mb-10">
          <span className="text-black">Our Team</span> FAQs
        </h2>

        <ul className="space-y-4">
          {faqList.map(({ question, answer }, i) => {
            const isOpen = activeIndex === i;

            return (
              <li
                key={i}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  onClick={() => handleToggle(i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                >
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">
                    {question}
                  </span>
                  {isOpen ? (
                    <FiMinus className="text-blue-700 text-2xl" aria-hidden="true" />
                  ) : (
                    <FiPlus className="text-blue-700 text-2xl" aria-hidden="true" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 text-base leading-relaxed">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
