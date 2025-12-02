"use client";

import React from "react";
import { motion } from "framer-motion";

// Partner details
const partnerList = [
  {
    id: 1,
    name: "Global Health Inc.",
    logo: "https://globalhealth.co/wp-content/uploads/2023/05/global-health.png",
    website: "https://globalhealth.example.com",
  },
  {
    id: 2,
    name: "MediCorp",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/7/7d/Mediacorp_flat_logo_%282015%29.svg",
    website: "https://medicorp.example.com",
  },
  {
    id: 3,
    name: "Wellness Partners",
    logo:
      "https://wellnesspartnershealth.org/wp-content/uploads/2023/05/WELLNESS_copy-removebg-preview-1.png",
    website: "https://wellnesspartners.example.com",
  },
  {
    id: 4,
    name: "HealthPlus",
    logo: "https://www.healthplus.co.uk/images/simplecms/logo_healthpluslogo.png",
    website: "https://healthplus.example.com",
  },
  {
    id: 5,
    name: "CareConnect",
    logo:
      "https://images.squarespace-cdn.com/content/v1/607d8d759f6f9a4d163f12c4/1621958541204-7NS60OZ2DMEHJVKC0921/logo.png",
    website: "https://careconnect.example.com",
  },
  {
    id: 6,
    name: "LifeLine",
    logo: "https://www.seniorliving.org/app/uploads/2019/01/Lifeline-Logo.png",
    website: "https://lifeline.example.com",
  },
];

// Animation variants for the container
const containerAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

// Each partner logo animation with fade + scale, plus hover effect
const partnerAnimation = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { scale: 1.1, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
};

export default function AboutPartners() {
  return (
    <section
      aria-label="Our Partners"
      className="bg-white py-20 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      {/* Heading and intro */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Trusted <span className="text-blue-600">Partners</span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl font-light">
          Collaborating with industry leaders to deliver excellence.
        </p>
      </motion.div>

      {/* Partners grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerAnimation}
      >
        {partnerList.map(({ id, name, logo, website }) => (
          <motion.a
            key={id}
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center p-4 bg-gray-50 rounded-xl cursor-pointer select-none border border-gray-200"
            variants={partnerAnimation}
            whileHover="hover"
            aria-label={`Visit partner ${name}`}
            tabIndex={0}
          >
            <img
              src={logo}
              alt={`${name} logo`}
              className="max-h-16 max-w-full object-contain"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
