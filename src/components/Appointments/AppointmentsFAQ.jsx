"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqItems = [
  {
    question: "What services does NovaHealth offer?",
    answer:
      "NovaHealth provides general checkups, diagnostics, emergency care, specialist consultations, and online appointments with certified doctors.",
  },
  {
    question: "Are your doctors certified and experienced?",
    answer:
      "Yes, all NovaHealth doctors are board-certified with proven clinical experience and a strong commitment to patient care.",
  },
  {
    question: "Is online appointment booking available?",
    answer:
      "Yes, you can easily book appointments online through our website or mobile app. Same-day options are also available for urgent needs.",
  },
  {
    question: "Do you accept insurance plans?",
    answer:
      "We accept a wide range of insurance providers. Please visit our insurance info page or contact us directly for more details.",
  },
];

// Animation variants for container and individual FAQ items
const containerAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, ease: "easeOut", duration: 0.6 },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AppointmentsFAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="my-[-30px] bg-white py-20 px-6 sm:px-10 lg:px-20"
    >
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerAnimation}
      >
        <motion.h2
          className="mb-12 text-center text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl"
          variants={itemAnimation}
        >
          Frequently Asked <span className="text-blue-700">Questions</span>
        </motion.h2>

        <div className="space-y-6">
          {faqItems.map((faq, idx) => {
            const isOpen = expandedIndex === idx;

            return (
              <motion.div
                key={idx}
                layout
                variants={itemAnimation}
                className="rounded-xl bg-gray-50 shadow-md transition hover:bg-gray-100"
              >
                <button
                  id={`faq-header-${idx}`}
                  aria-controls={`faq-content-${idx}`}
                  aria-expanded={isOpen}
                  onClick={() => handleToggle(idx)}
                  className="flex w-full select-none items-center justify-between rounded-xl px-6 py-5 text-base font-medium text-gray-800 transition hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:text-lg"
                  type="button"
                >
                  {faq.question}
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-gray-500"
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>

                <motion.div
                  id={`faq-content-${idx}`}
                  role="region"
                  aria-labelledby={`faq-header-${idx}`}
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0,
                    marginTop: isOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                  className="select-text px-6 pb-5 text-sm leading-relaxed text-gray-700 sm:text-base font-light"
                >
                  {faq.answer}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
