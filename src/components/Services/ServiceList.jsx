"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaStethoscope,
  FaHeartbeat,
  FaSyringe,
  FaUserMd,
  FaPills,
  FaXRay,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaStethoscope className="text-blue-600" size={32} aria-hidden="true" />,
    title: "General Consultation",
    description:
      "Personalized health assessments and expert guidance for all age groups.",
  },
  {
    id: 2,
    icon: <FaHeartbeat className="text-blue-600" size={32} aria-hidden="true" />,
    title: "Cardiology",
    description:
      "Advanced heart care, diagnostics, and monitoring with cutting-edge equipment.",
  },
  {
    id: 3,
    icon: <FaSyringe className="text-blue-600" size={32} aria-hidden="true" />,
    title: "Vaccination Services",
    description:
      "Routine and travel immunizations administered by certified professionals.",
  },
  {
    id: 4,
    icon: <FaUserMd className="text-blue-600" size={32} aria-hidden="true" />,
    title: "Specialist Referrals",
    description:
      "Access to trusted specialists for complex health needs and chronic care.",
  },
  {
    id: 5,
    icon: <FaPills className="text-blue-600" size={32} aria-hidden="true" />,
    title: "Pharmacy & Prescriptions",
    description:
      "Fast and reliable medication services, plus detailed dosage instructions.",
  },
  {
    id: 6,
    icon: <FaXRay className="text-blue-600" size={32} aria-hidden="true" />,
    title: "Radiology & Imaging",
    description:
      "Modern diagnostic tools including X-rays, ultrasounds, and more.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.6 },
  },
};

const ServiceList = () => {
  return (
    <section
      role="region"
      aria-label="Services Offered"
      className="bg-white py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            What We{" "}
            <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
              Offer
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Explore a wide range of patient-centered medical services designed to support your health journey.
          </p>
        </header>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map(({ id, icon, title, description }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-xl p-6 shadow-md text-center flex flex-col items-center h-full border border-gray-200"
              tabIndex={0}
              aria-label={`${title}: ${description}`}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceList;
