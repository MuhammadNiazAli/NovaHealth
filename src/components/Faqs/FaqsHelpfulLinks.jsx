"use client";

import React from "react";
import { FaExternalLinkAlt, FaBook, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";

const helpfulLinks = [
  {
    id: 1,
    icon: <FaBook className="w-5 h-5 text-blue-700" />,
    title: "Health Guides",
    url: "https://www.example.com/health-guides",
    description: "Detailed guides on maintaining your health and wellness.",
  },
  {
    id: 2,
    icon: <FaInfoCircle className="w-5 h-5 text-blue-700" />,
    title: "Policies & Privacy",
    url: "https://www.example.com/policies",
    description: "Read about our policies and how we protect your privacy.",
  },
  {
    id: 3,
    icon: <FaPhoneAlt className="w-5 h-5 text-blue-700" />,
    title: "Contact Support",
    url: "https://www.example.com/contact-support",
    description: "Reach out to our support team for any assistance.",
  },
  {
    id: 4,
    icon: <FaExternalLinkAlt className="w-5 h-5 text-blue-700" />,
    title: "External Resources",
    url: "https://www.example.com/external-resources",
    description: "Access curated external resources and healthcare tools.",
  },
];

export default function FaqsHelpfulLinks() {
  return (
    <section
      aria-label="Helpful FAQ links"
      className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-12 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-extrabold text-blue-700 mb-8 text-center select-text">
        Helpful Links & Resources
      </h2>

      <ul className="space-y-6">
        {helpfulLinks.map(({ id, icon, title, url, description }) => (
          <li key={id} className="group border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow cursor-pointer">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
            >
              <span className="flex-shrink-0">{icon}</span>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {title}
                </span>
                <span className="text-gray-600 font-light text-sm leading-relaxed max-w-xl">
                  {description}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
