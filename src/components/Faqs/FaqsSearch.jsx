"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is NovaHealth?",
    answer:
      "NovaHealth is a comprehensive healthcare platform providing personalized medical services with state-of-the-art technology and compassionate care.",
  },
  {
    question: "How can I book an appointment with NovaHealth?",
    answer:
      "You can book an appointment easily through our website or mobile app by selecting your preferred doctor and time slot.",
  },
  {
    question: "Does NovaHealth offer telehealth consultations?",
    answer:
      "Yes, NovaHealth offers secure telehealth consultations so you can consult with our medical professionals from the comfort of your home.",
  },
  {
    question: "What insurance plans does NovaHealth accept?",
    answer:
      "NovaHealth accepts a wide range of insurance plans. Please check our Insurance page or contact support for details about your specific plan.",
  },
  {
    question: "Are the NovaHealth doctors licensed and experienced?",
    answer:
      "Absolutely! All NovaHealth doctors are fully licensed, certified, and have extensive experience in their respective fields.",
  },
  {
    question: "Can I access my medical records on NovaHealth?",
    answer:
      "Yes, NovaHealth provides a secure patient portal where you can view your medical history, test results, and treatment plans anytime.",
  },
  {
    question: "What specialties are covered by NovaHealth?",
    answer:
      "We cover a broad range of specialties including cardiology, dermatology, pediatrics, orthopedics, mental health, and more.",
  },
  {
    question: "Is NovaHealth available 24/7?",
    answer:
      "Our platform is accessible 24/7 for appointment booking and patient portal access. Emergency services are also available through our partner facilities.",
  },
  {
    question: "How does NovaHealth ensure patient privacy?",
    answer:
      "NovaHealth uses advanced encryption and strict privacy policies to protect your personal and medical information.",
  },
  {
    question: "Can I get prescription refills through NovaHealth?",
    answer:
      "Yes, you can request prescription refills through our platform, which will be reviewed by your doctor before approval.",
  },
  {
    question: "Does NovaHealth provide wellness and preventive care?",
    answer:
      "We offer a variety of wellness programs and preventive care services to help you maintain optimal health.",
  },
  {
    question: "How do I contact NovaHealth customer support?",
    answer:
      "You can contact our support team via phone, email, or live chat available on our website during business hours.",
  },
  {
    question: "Is there a mobile app for NovaHealth?",
    answer:
      "Yes, the NovaHealth app is available on both iOS and Android for easy access to your health records and appointments.",
  },
  {
    question: "Can I manage family members’ accounts on NovaHealth?",
    answer:
      "Our platform allows you to manage accounts for your dependents or family members with appropriate permissions.",
  },
  {
    question: "What measures does NovaHealth take against COVID-19?",
    answer:
      "NovaHealth follows all CDC guidelines, offers COVID-19 testing, and provides virtual consultation options to ensure safety.",
  },
  {
    question: "Are there any discounts or loyalty programs?",
    answer:
      "We occasionally offer special discounts and loyalty programs. Please subscribe to our newsletter to stay updated.",
  },
  {
    question: "How do I update my personal information on NovaHealth?",
    answer:
      "You can update your profile information anytime through the patient portal under account settings.",
  },
  {
    question: "Does NovaHealth support multi-language services?",
    answer:
      "Yes, our platform supports multiple languages to serve our diverse patient community.",
  },
  {
    question: "Can I cancel or reschedule my appointments?",
    answer:
      "Appointments can be canceled or rescheduled up to 24 hours in advance via the patient portal or app.",
  },
  {
    question: "What if I have a medical emergency?",
    answer:
      "In case of emergency, please call your local emergency services immediately. NovaHealth is for non-emergency healthcare needs.",
  },
  // Add more FAQs as needed
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className="border border-gray-300 rounded-md mb-3 shadow-sm"
    >
      <button
        onClick={onClick}
        className="w-full text-left px-5 py-4 flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.question}`}
      >
        <span className="text-gray-900 font-semibold text-lg">{faq.question}</span>
        {isOpen ? (
          <FaChevronUp className="text-gray-600" />
        ) : (
          <FaChevronDown className="text-gray-600" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={`faq-answer-${faq.question}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: 8, padding: "0 20px 20px 20px" },
              collapsed: { opacity: 0, height: 0, marginTop: 0, padding: "0 20px 0 20px" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-gray-700 text-base leading-relaxed"
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function NovaHealthFAQs() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleShowMore = () => {
    setVisibleCount(visibleCount === 5 ? faqs.length : 5);
    setOpenIndex(null); // close any open faq when toggling
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Frequently Asked Questions about <span className="text-blue-700">NovaHealth</span>
      </h2>

      <div>
        {faqs.slice(0, visibleCount).map((faq, idx) => (
          <FAQItem
            key={idx}
            faq={faq}
            isOpen={openIndex === idx}
            onClick={() => toggleOpen(idx)}
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={toggleShowMore}
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          aria-expanded={visibleCount !== 5}
        >
          {visibleCount === 5 ? "Show More" : "Show Less"}
          <span className="ml-2">
            {visibleCount === 5 ? <FaChevronDown /> : <FaChevronUp />}
          </span>
        </button>
      </div>
    </section>
  );
}
