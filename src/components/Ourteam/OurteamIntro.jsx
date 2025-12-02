"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaLightbulb, FaUsers, FaStar } from "react-icons/fa";

const coreValues = [
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

export default function OurteamIntro() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      aria-label="Introduction to Our Team"
      className="bg-white text-black py-20 px-5 sm:px-8 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-stretch">
        {/* Text content on the left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex-1 flex flex-col justify-center h-full"
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4 relative inline-block max-w-max"
            variants={itemVariants}
          >
            <span className="text-black">Meet the Heart of Our</span> Success
            <span
              aria-hidden="true"
              className="absolute left-0 bottom-[-8px] h-1.5 w-28 bg-blue-200 rounded-full"
            />
          </motion.h2>

          <motion.p
            className="text-gray-700 max-w-xl text-lg font-light mb-10 leading-relaxed"
            variants={itemVariants}
          >
            Our team combines passion, expertise, and a collaborative spirit to
            deliver outstanding results. We are dedicated to innovation and
            excellence in every project, ensuring the best outcomes for our
            clients and community.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {coreValues.map(({ icon, title, description }, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-4"
                variants={itemVariants}
                tabIndex={0}
                role="group"
                aria-label={`${title} value`}
              >
                <div className="flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-black">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image on the right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 rounded-xl shadow-lg overflow-hidden h-full"
          aria-hidden="true"
        >
          <img
            src="https://images.unsplash.com/photo-1703809047946-7842d5c6734b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team members collaborating in office"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
}
