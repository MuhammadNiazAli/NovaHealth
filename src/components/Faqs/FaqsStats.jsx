"use client";

import React from "react";
import { FaUsers, FaHeadset, FaCheckCircle, FaClock } from "react-icons/fa";

const statsData = [
  {
    id: 1,
    icon: <FaUsers className="text-blue-700 w-10 h-10" />,
    value: "25K+",
    label: "Patients Served",
  },
  {
    id: 2,
    icon: <FaHeadset className="text-blue-700 w-10 h-10" />,
    value: "24/7",
    label: "Support Availability",
  },
  {
    id: 3,
    icon: <FaCheckCircle className="text-blue-700 w-10 h-10" />,
    value: "98%",
    label: "Satisfaction Rate",
  },
  {
    id: 4,
    icon: <FaClock className="text-blue-700 w-10 h-10" />,
    value: "15+ Years",
    label: "Experience",
  },
];

export default function FaqsStats() {
  return (
    <section
      aria-label="FAQ statistics"
      className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 bg-white"
    >
      <h2 className="text-center text-3xl font-extrabold mb-12 text-gray-900 select-text">
        Trusted by Thousands – <span className="text-blue-700">Our Stats</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {statsData.map(({ id, icon, value, label }) => (
          <div
            key={id}
            className="flex flex-col items-center p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            role="group"
            tabIndex={0}
            aria-label={`${value} ${label}`}
          >
            <div
              className="mb-4"
              aria-hidden="true"
              style={{ fontSize: "2.5rem" }}
            >
              {icon}
            </div>
            <p className="text-4xl font-extrabold text-blue-700 leading-none select-text">
              {value}
            </p>
            <p className="mt-2 text-gray-700 font-medium select-text">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
