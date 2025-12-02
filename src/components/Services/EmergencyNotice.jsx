"use client";

import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const EmergencyNotice = () => {
  return (
    <section
      role="alert"
      aria-live="assertive"
      className="bg-red-700 text-white px-5 sm:px-8 md:px-12 py-6 md:py-7 shadow-lg max-w-full animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
        {/* Icon and message */}
        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
          <FaExclamationTriangle
            className="flex-shrink-0 text-4xl sm:text-5xl md:text-6xl mt-1 sm:mt-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight mb-1">
              Emergency Notice
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Our emergency services operate 24/7 to assist you with urgent
              medical needs.
            </p>
          </div>
        </div>

        {/* Call to action button */}
        <div className="flex-shrink-0 self-center sm:self-auto">
          <a
            href="/emergency"
            className="inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-70 transition-colors duration-300 whitespace-nowrap text-base sm:text-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default EmergencyNotice;
