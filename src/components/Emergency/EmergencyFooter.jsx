"use client";

import React from "react";
import { motion } from "framer-motion";

const EmergencyFooter = () => {
  return (
    <motion.section
      aria-label="Emergency information footer"
      className="max-w-5xl mx-auto mt-16 px-6 sm:px-8 md:px-12 py-8 rounded-3xl bg-gradient-to-r from-white via-gray-50 to-white shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Left section: Gratitude and info */}
        <motion.div
          className="max-w-lg text-center md:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-2 select-none leading-tight">
            Thank You for Trusting Your Emergency Team
          </h3>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            We’re dedicated to providing rapid and expert emergency assistance
            whenever you need it. Your safety and care are our top priorities.
          </p>
        </motion.div>

        {/* Right section: Contact details and call-to-action */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-12 mt-6 md:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Contact info */}
          <div className="flex flex-col space-y-3 text-gray-700 text-sm sm:text-base">
            <div className="flex items-center space-x-2 sm:space-x-3 select-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h1l3 3-1.5 1.5a11 11 0 005 5L12 21l3-3 3-3v-1"
                />
              </svg>
              <a
                href="tel:911"
                className="hover:text-blue-700 transition-colors break-words"
                aria-label="Call emergency phone number"
              >
                911
              </a>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 select-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12H8m8 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6"
                />
              </svg>
              <a
                href="mailto:emergency@yourcarecenter.com"
                className="hover:text-blue-700 transition-colors break-words"
                aria-label="Email emergency support"
              >
                emergency@yourcarecenter.com
              </a>
            </div>
          </div>

          {/* Contact button */}
          <motion.button
            type="button"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 whitespace-nowrap"
            aria-label="Contact emergency response team"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Contact Emergency Team
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EmergencyFooter;
