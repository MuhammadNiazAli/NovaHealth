"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { FaChevronDown } from "react-icons/fa"

// Animation settings for the entire FAQ container
const containerAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, ease: "easeOut", duration: 0.6 },
  },
}

// Animation for each FAQ item
const faqItemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// List of FAQ entries, could be extracted elsewhere if needed
const faqEntries = [
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
]

// Individual FAQ item as a separate reusable component
function FaqItem({ faq, isExpanded, onToggle, index }) {
  return (
    <motion.div
      className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-md"
      variants={faqItemAnimation}
      layout
    >
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-base sm:text-lg font-medium text-gray-800 hover:text-blue-700 transition select-none"
      >
        {faq.question}

        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-500"
        >
          <FaChevronDown />
        </motion.span>
      </button>

      {/* Animate height and opacity for smooth expand/collapse */}
      <motion.div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        initial={false}
        animate={{
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? "auto" : 0,
          marginTop: isExpanded ? 8 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
        className="px-6 pb-5 text-gray-700 text-sm sm:text-base font-light leading-relaxed"
      >
        {faq.answer}
      </motion.div>
    </motion.div>
  )
}

export default function AboutFAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  // Toggle expand/collapse of a FAQ item
  function handleToggle(index) {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index))
  }

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="bg-white py-20 px-6 sm:px-10 lg:px-20 my-[-50px]"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight"
          variants={faqItemAnimation}
        >
          Frequently Asked{" "}
          <span className="text-blue-700">Questions</span>
        </motion.h2>

        <div className="space-y-6">
          {faqEntries.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isExpanded={expandedIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
