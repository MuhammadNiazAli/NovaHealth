"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

// FAQs Data
const faqs = [
  {
    question: "How do you select testimonials for your website?",
    answer:
      "We carefully choose testimonials that reflect genuine experiences from a wide range of clients, focusing on honesty and relevance to our services.",
  },
  {
    question: "Can I submit my own testimonial?",
    answer:
      "Absolutely. We’d love to hear from you! Just head over to our contact page and use the 'Submit Testimonial' form.",
  },
  {
    question: "Are the testimonials verified?",
    answer:
      "Yes — every testimonial is verified to ensure authenticity before it’s featured on our website.",
  },
  {
    question: "How often do you update the testimonials?",
    answer:
      "We update regularly to share the latest client feedback and success stories.",
  },
  {
    question: "Can I use a testimonial from your site for my marketing?",
    answer:
      "Please reach out to us first for permission so we can ensure everything stays compliant.",
  },
];

const TestimonialsFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-label="Testimonials Frequently Asked Questions"
      className="relative max-w-5xl mx-auto px-4 sm:px-8 py-12"
    >
      {/* Card-like Background */}
      <div className="absolute inset-0 bg-white rounded-3xl shadow-xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-12">
          <span className="text-black">Testimonials</span> FAQs
        </h2>

        <ul className="space-y-5">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-header-${index}`}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none  rounded-2xl"
                >
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <FiMinus className="text-blue-700 text-2xl shrink-0" />
                  ) : (
                    <FiPlus className="text-blue-700 text-2xl shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-header-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
                        {item.answer}
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
};

export default TestimonialsFAQ;
