"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaProjectDiagram, FaAward, FaClock } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers className="text-blue-500 w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />,
    number: 250,
    suffix: "+",
    label: "Dedicated Team Members",
  },
  {
    icon: <FaProjectDiagram className="text-green-500 w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />,
    number: 1200,
    suffix: "+",
    label: "Successful Projects",
  },
  {
    icon: <FaAward className="text-yellow-500 w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />,
    number: 35,
    suffix: "+",
    label: "Industry Awards Won",
  },
  {
    icon: <FaClock className="text-purple-500 w-8 h-8 md:w-10 md:h-10 " aria-hidden="true" />,
    number: 15,
    suffix: "+",
    label: "Years of Experience",
  },
];

export default function OurteamStats() {
  return (
    <section
      aria-label="Our Team Achievements Statistics"
      className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 py-16 md:py-20 my-[-50px] mb-0"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-blue-600"
          >
            <span className="text-black">Our Team</span> Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
          >
            A quick glance at the numbers that showcase our dedication, expertise, and success over the years.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {stats.map(({ icon, number, suffix, label }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              role="region"
              aria-labelledby={`stat-label-${idx}`}
            >
              <div className="flex justify-center mb-4">{icon}</div>
              <motion.h3
                id={`stat-label-${idx}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-gray-900"
              >
                {number}
                <span className="text-blue-600">{suffix}</span>
              </motion.h3>
              <p className="mt-2 text-sm md:text-base text-gray-600">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
