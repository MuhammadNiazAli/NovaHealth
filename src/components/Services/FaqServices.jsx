"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqsData = [
  {
    question: "What types of healthcare services do you provide?",
    answer:
      "We provide comprehensive healthcare services including routine checkups, specialized treatments, diagnostics, emergency care, and telehealth consultations.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Appointments can be booked easily online via our website or by calling our support team. We offer both in-person and virtual visit options.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Yes, we accept most major insurance plans. Please check our insurance page or contact us directly for more details on accepted providers.",
  },
  {
    question: "Are your medical professionals certified?",
    answer:
      "Absolutely. All our doctors and specialists are fully certified, licensed, and have extensive experience in their respective fields.",
  },
  {
    question: "Is telehealth available?",
    answer:
      "Yes, we offer telehealth consultations for your convenience, allowing you to access healthcare services remotely.",
  },
];

const containerAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FaqServices = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq-services"
      aria-label="Frequently Asked Questions about Services"
      className="bg-white py-20 px-6 sm:px-10 lg:px-20"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerAnimation}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-center text-black mb-12 leading-tight"
          variants={itemAnimation}
        >
          Frequently Asked <span className="text-blue-600">Questions</span>
        </motion.h2>

        <div className="space-y-5">
          {faqsData.map(({ question, answer }, index) => {
            const isOpen = index === activeIndex;

            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:bg-blue-50 transition"
                variants={itemAnimation}
                layout
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-lg font-semibold text-blue-600 hover:text-blue-700 rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 select-none transition"
                >
                  {question}
                  <motion.span
                    className="text-blue-500"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FaChevronDown />
                  </motion.span>
                </button>

                <motion.div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0,
                    marginTop: isOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                  className="px-6 pb-6 text-black text-base font-normal leading-relaxed"
                >
                  {answer}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default FaqServices;
