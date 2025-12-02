"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AppointmentsLoading() {
  return (
    <motion.section
      aria-label="Loading appointments"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-5xl mx-auto p-6 sm:p-10 lg:p-20 bg-white rounded-lg"
    >
      <div className="space-y-6 animate-pulse">
        {/* Placeholder for the section title */}
        <div className="mx-auto mb-10 h-12 w-3/5 rounded-md bg-gray-300"></div>

        {/* Simulated loading items */}
        {[1, 2, 3, 4].map((item) => (
          <article
            key={item}
            className="rounded-xl border border-gray-200 bg-gray-50 p-5"
            aria-hidden="true"
          >
            {/* Placeholder for a question */}
            <div className="mb-4 h-6 w-4/5 rounded bg-gray-300"></div>

            {/* Placeholder for answer lines */}
            <div className="max-w-lg rounded bg-gray-200 h-4"></div>
            <div className="mt-2 w-5/6 rounded bg-gray-200 h-4"></div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
