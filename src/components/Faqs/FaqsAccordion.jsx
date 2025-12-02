"use client";

import React from "react";

const faqData = [
  {
    id: 1,
    question: "What healthcare services do you provide?",
    answer:
      "We provide a comprehensive range of healthcare services including general check-ups, specialized treatments, diagnostics, emergency care, and telemedicine services tailored to meet your needs.",
  },
  {
    id: 2,
    question: "How do I book or reschedule an appointment?",
    answer:
      "Booking or rescheduling can be done easily through our online scheduling system or by contacting our support team via phone or email at your convenience.",
  },
  {
    id: 3,
    question: "Can I access my medical records online?",
    answer:
      "Yes, you can securely access your medical records anytime through our patient portal, where you can view, download, and request updates to your records.",
  },
  {
    id: 4,
    question: "What payment and insurance options do you accept?",
    answer:
      "We accept most major insurance providers and offer flexible payment options. For detailed information about coverage and billing, please contact our billing department.",
  },
  {
    id: 5,
    question: "How can I get support or assistance with billing?",
    answer:
      "Our dedicated billing support team is available 24/7 to assist you with any questions or concerns regarding your bills, insurance claims, or patient assistance programs.",
  },
];

export default function FaqsAccordion() {
  return (
    <section
      aria-label="Frequently Asked Questions"
      className="max-w-3xl mx-auto px-6 py-16 my-[-30px]"
    >
      <h2 className="text-4xl font-extrabold text-gray-900 mb-14 text-center select-text">
        Frequently Asked <span className="text-blue-700">Questions</span>
      </h2>

      <div className="divide-y divide-gray-300">
        {faqData.map(({ id, question, answer }) => (
          <article key={id} className="py-6">
            <h3
              className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-3 select-text"
              tabIndex={0}
              aria-label={`Question: ${question}`}
            >
              {question}
            </h3>
            <p
              className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-prose select-text"
              tabIndex={0}
              aria-label={`Answer: ${answer}`}
            >
              {answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
