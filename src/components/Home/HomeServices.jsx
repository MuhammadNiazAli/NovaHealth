"use client";

import React from "react";
import Link from "next/link";
import {
  FaStethoscope,
  FaHeartbeat,
  FaUserMd,
  FaCapsules,
  FaXRay,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { motion } from "framer-motion";


const MotionLink = motion(
  React.forwardRef(({ href, children, ...rest }, ref) => (
    <Link href={href} ref={ref} {...rest}>
      {children}
    </Link>
  ))
);

const services = [
  {
    title: "General Checkup",
    description: "Routine health exams and personalized consultations.",
    icon: <FaStethoscope className="text-4xl text-blue-700" />,
  },
  {
    title: "Cardiology",
    description: "Comprehensive heart care and diagnostics.",
    icon: <FaHeartbeat className="text-4xl text-red-600" />,
  },
  {
    title: "Expert Physicians",
    description: "Certified doctors with years of experience.",
    icon: <FaUserMd className="text-4xl text-emerald-700" />,
  },
  {
    title: "Pharmacy Services",
    description: "Access to trusted medications & refills.",
    icon: <FaCapsules className="text-4xl text-purple-700" />,
  },
  {
    title: "Radiology & Imaging",
    description: "Advanced diagnostic equipment and care.",
    icon: <FaXRay className="text-4xl text-sky-700" />,
  },
  {
    title: "Emergency Services",
    description: "24/7 emergency support and fast response.",
    icon: <FaBriefcaseMedical className="text-4xl text-rose-600" />,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
};

const HomeServices = () => {
  return (
    <section
      className="flex flex-col justify-center items-center bg-white px-6 md:px-12 lg:px-24 my-20"
      style={{ textAlign: "center" }}
      aria-label="Our Medical Services Section"
    >
      {/* Heading & Paragraph Container */}
      <motion.div
        className="max-w-4xl mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-sm"
          style={{ color: "#1D4ED8" }}
          variants={textVariants}
        >
          Our Medical <span style={{ color: "#000" }}>Services</span>
        </motion.h2>

        <motion.p
          className="mt-5 text-lg sm:text-xl md:text-2xl max-w-xl mx-auto md:mx-0 font-light"
          style={{ color: "#222" }}
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          We offer a wide range of healthcare services provided by licensed
          professionals using the latest medical technologies.
        </motion.p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className="relative group bg-white border border-gray-300 rounded-3xl p-7 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
            tabIndex={0}
            role="button"
            aria-label={`Service: ${service.title}`}
          >
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-70 transition-opacity duration-500 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col items-start">
              <div className="mb-5">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Explore All Services Button */}
      <motion.div
        className="mt-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <MotionLink
          href="/services"
          className="inline-block bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300 font-semibold px-10 py-4 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
          variants={buttonVariants}
          whileHover="hover"
          aria-label="Explore all services"
          tabIndex={0}
        >
          Explore All Services
        </MotionLink>
      </motion.div>
    </section>
  );
};

export default HomeServices;
