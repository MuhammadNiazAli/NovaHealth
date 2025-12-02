"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "What should I do if I witness an emergency?",
    answer:
      "Stay calm, assess the situation carefully, call emergency services immediately, and provide clear details about the location and nature of the emergency.",
  },
  {
    question: "When should I call emergency services?",
    answer:
      "Call emergency services whenever there is an immediate threat to life, health, property, or environment requiring urgent assistance.",
  },
  {
    question: "How do I provide accurate information to responders?",
    answer:
      "Give your exact location, describe the emergency clearly, mention the number of people involved and any injuries, and stay on the line until help arrives.",
  },
  {
    question: "Can I help before emergency responders arrive?",
    answer:
      "Only if it is safe to do so. Avoid putting yourself or others at risk. Follow instructions from emergency personnel once they arrive.",
  },
  {
    question: "What information should I have ready when calling emergency services?",
    answer:
      "Your location, the nature of the emergency, number of people involved, any immediate dangers, and your contact information if asked.",
  },
];

// Single FAQ item with toggle and animation
function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <li className="border border-gray-300 rounded-lg overflow-hidden" key={index}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {item.question}
        <motion.svg
          className="w-6 h-6 text-blue-700 flex-shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <motion.div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "0.5rem" : "0rem",
          paddingLeft: isOpen ? "1.25rem" : 0,
          paddingRight: isOpen ? "1.25rem" : 0,
          paddingBottom: isOpen ? "1rem" : 0,
        }}
        initial={false}
        style={{ overflow: "hidden" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="text-gray-700 text-base leading-relaxed"
      >
        {item.answer}
      </motion.div>
    </li>
  );
}

const EmergencyFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      aria-label="Emergency Frequently Asked Questions"
      className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-xl shadow-lg text-black my-5"
    >
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
        <span className="text-black">Emergency</span> FAQ
      </h2>

      <ul className="space-y-4">
        {faqItems.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isOpen={activeIndex === index}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
      </ul>
    </section>
  );
};

export default EmergencyFAQ;
