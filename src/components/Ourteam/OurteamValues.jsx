"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaUsers, FaLightbulb, FaStar } from "react-icons/fa";

const values = [
  {
    icon: <FaHandsHelping className="text-blue-700 w-8 h-8" aria-hidden="true" />,
    title: "Passion",
    description:
      "Our team is driven by a deep passion to make a positive impact every day.",
  },
  {
    icon: <FaUsers className="text-blue-700 w-8 h-8" aria-hidden="true" />,
    title: "Collaboration",
    description:
      "We believe in teamwork and open communication to achieve outstanding results.",
  },
  {
    icon: <FaLightbulb className="text-blue-700 w-8 h-8" aria-hidden="true" />,
    title: "Innovation",
    description:
      "Constantly pushing boundaries to bring fresh ideas and creative solutions.",
  },
  {
    icon: <FaStar className="text-blue-700 w-8 h-8" aria-hidden="true" />,
    title: "Excellence",
    description:
      "Committed to delivering the highest quality work with integrity and care.",
  },
];

export default function OurteamValues() {
  return (
    <section
      aria-label="Our Team Values"
      className="bg-white py-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-blue-700 mb-12 text-center"
      >
      What <span className="text-black">Drives Us</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {values.map(({ icon, title, description }, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            tabIndex={0}
            role="group"
            aria-label={`${title} value`}
            className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform hover:-translate-y-2"
          >
            <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-blue-50">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
