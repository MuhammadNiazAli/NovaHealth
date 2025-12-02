"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaStar,
  FaHospitalAlt,
  FaHeart,
  FaMicroscope,
  FaShieldAlt,
} from "react-icons/fa";

const reasons = [
  {
    id: 1,
    icon: <FaUserMd className="text-blue-600" size={28} aria-hidden="true" />,
    title: "Certified Medical Experts",
    description:
      "Our team of doctors and specialists are internationally trained with years of real-world experience.",
  },
  {
    id: 2,
    icon: <FaStar className="text-blue-600" size={28} aria-hidden="true" />,
    title: "Top-Rated Patient Care",
    description:
      "We consistently receive 5-star ratings for personalized, compassionate, and effective treatments.",
  },
  {
    id: 3,
    icon: <FaHospitalAlt className="text-blue-600" size={28} aria-hidden="true" />,
    title: "Modern Infrastructure",
    description:
      "Enjoy treatment in state-of-the-art facilities equipped with the latest technology and safety standards.",
  },
  {
    id: 4,
    icon: <FaHeart className="text-blue-600" size={28} aria-hidden="true" />,
    title: "Compassion-Driven Philosophy",
    description:
      "We treat every patient like family — because healing starts with human connection.",
  },
  {
    id: 5,
    icon: <FaMicroscope className="text-blue-600" size={28} aria-hidden="true" />,
    title: "Cutting-Edge Diagnostics",
    description:
      "From lab tests to imaging, we use the most advanced diagnostic tools available today.",
  },
  {
    id: 6,
    icon: <FaShieldAlt className="text-blue-600" size={28} aria-hidden="true" />,
    title: "100% Safety & Privacy",
    description:
      "Your data, health, and comfort are protected by strict protocols and full confidentiality.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const WhyChooseUs = () => {
  return (
    <section
      role="region"
      aria-label="Why Choose Us"
      className="bg-white py-20 px-6 md:px-12 my-[-50px]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Why{" "}
            <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
              Choose Us
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            A rare blend of technology, empathy, and expertise — discover the deep
            care that sets us apart.
          </p>
        </div>

        {/* Reason Cards */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              variants={item}
              className="bg-white hover:bg-blue-50 transition-all duration-300 rounded-xl p-6 shadow-md text-center flex flex-col items-center border border-gray-200"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
