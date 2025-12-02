"use client";

import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaUserMd,
  FaFileMedical,
  FaHandsHelping,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqsByCategory = {
  1: [
    {
      id: 101,
      question: "What services do you offer?",
      answer:
        "We offer a wide range of healthcare services including primary care, specialist consultations, diagnostics, and telehealth.",
    },
    {
      id: 102,
      question: "How can I contact support?",
      answer:
        "You can contact our support team 24/7 via phone, email, or live chat on our website.",
    },
  ],
  2: [
    {
      id: 201,
      question: "How do I book an appointment?",
      answer:
        "You can book an appointment using our online scheduler or by calling our support line.",
    },
    {
      id: 202,
      question: "Can I reschedule my appointment?",
      answer:
        "Yes, appointments can be rescheduled up to 24 hours before the scheduled time via your account dashboard.",
    },
  ],
  3: [
    {
      id: 301,
      question: "How do I access my medical records?",
      answer:
        "Medical records can be accessed securely through your patient portal after logging in.",
    },
    {
      id: 302,
      question: "Can I update my medical information?",
      answer:
        "Yes, you can update certain medical information via your portal or by contacting your healthcare provider directly.",
    },
  ],
  4: [
    {
      id: 401,
      question: "What support options are available?",
      answer:
        "We offer billing support, patient assistance programs, and 24/7 customer service.",
    },
    {
      id: 402,
      question: "How do I get financial assistance?",
      answer:
        "Financial assistance is available based on eligibility. Contact support to learn more.",
    },
  ],
};

const categories = [
  {
    id: 1,
    icon: <FaQuestionCircle className="w-8 h-8 text-blue-900" />,
    title: "General Questions",
    description:
      "Answers to common inquiries about our healthcare services and policies.",
  },
  {
    id: 2,
    icon: <FaUserMd className="w-8 h-8 text-blue-900" />,
    title: "Appointments",
    description: "How to book, reschedule or cancel your appointments with ease.",
  },
  {
    id: 3,
    icon: <FaFileMedical className="w-8 h-8 text-blue-900" />,
    title: "Medical Records",
    description: "Learn how to access, request, or update your medical records securely.",
  },
  {
    id: 4,
    icon: <FaHandsHelping className="w-8 h-8 text-blue-900" />,
    title: "Support & Assistance",
    description:
      "Find out about support options, billing, and patient assistance programs.",
  },
];

const faqItemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

export default function FaqsCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCategoryClick = (id) => {
    if (id === selectedCategory) {
      setSelectedCategory(null);
      setError("");
      return;
    }
    setError("");
    setLoading(true);
    setSelectedCategory(null);

    setTimeout(() => {
      if (Math.random() < 0.1) {
        setError("Failed to load FAQs. Please try again.");
        setLoading(false);
        setSelectedCategory(null);
      } else {
        setSelectedCategory(id);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <section
      aria-label="FAQ categories"
      className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16"
    >
      <h2 className="text-3xl font-extrabold text-black mb-12 text-center select-text">
        Explore <span className="text-blue-900">FAQ Categories</span>
      </h2>

      {/* Grid of perfectly square cards */}
      <div
        className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4"
        style={{ gridAutoRows: "1fr" }}
      >
        {categories.map(({ id, icon, title, description }) => (
          <article
            key={id}
            tabIndex={0}
            role="button"
            aria-pressed={selectedCategory === id}
            onClick={() => handleCategoryClick(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCategoryClick(id);
              }
            }}
            className={`cursor-pointer rounded-xl border p-5 sm:p-6 bg-white shadow-sm transition-transform focus:outline-none focus:ring-4 focus:ring-blue-300
              aspect-square flex flex-col items-center justify-center
              ${
                selectedCategory === id
                  ? "border-blue-900 shadow-lg scale-[1.04]"
                  : "border-gray-300 hover:shadow-lg hover:scale-[1.03]"
              }
            `}
          >
            <div className="mb-3 sm:mb-4">{icon}</div>
            <h3
              className="text-base sm:text-lg font-semibold text-gray-900 mb-1 text-center truncate"
              title={title}
            >
              {title}
            </h3>
            <p
              className="text-gray-700 font-light leading-snug text-xs sm:text-sm text-center"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
              }}
              title={description}
            >
              {description}
            </p>
          </article>
        ))}
      </div>

      {/* FAQ Details Panel */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-12">
        {loading && (
          <p className="text-center text-blue-900 font-semibold animate-pulse select-none">
            Loading FAQs...
          </p>
        )}

        {error && (
          <p
            className="text-center text-red-700 font-semibold select-none"
            role="alert"
            tabIndex={-1}
          >
            {error}
          </p>
        )}

        <AnimatePresence initial={false}>
          {!loading && !error && selectedCategory && (
            <motion.div
              key={selectedCategory}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={faqItemVariants}
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                {categories.find((cat) => cat.id === selectedCategory)?.title} FAQs
              </h3>
              <dl className="space-y-6">
                {faqsByCategory[selectedCategory]?.map(({ id, question, answer }) => (
                  <div key={id} className="border-b border-gray-200 pb-4 last:border-none">
                    <dt className="font-semibold text-gray-900 mb-2">{question}</dt>
                    <dd className="text-gray-700 font-light leading-relaxed">{answer}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
