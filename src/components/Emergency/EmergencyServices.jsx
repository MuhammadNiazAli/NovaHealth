'use client'
import React from "react";

const EmergencyServices = () => {
  // Emergency services section with details and call-to-action button
  return (
    <section
      aria-label="Overview of Emergency Services"
      className="bg-white text-black py-12 px-6 sm:px-12 md:px-20 lg:px-32 my-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Left side content: heading, description, services list and button */}
        <div className="md:flex-1 max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6 leading-tight">
            <span className="text-black">Our Emergency</span> Services
          </h2>

          <p className="text-gray-800 text-base sm:text-lg mb-8 leading-relaxed">
            We provide round-the-clock emergency care with a dedicated team ready
            to assist you in critical situations. Our services include:
          </p>

          <ul className="space-y-5 text-gray-700 text-sm sm:text-base">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-blue-700 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                ),
                label: "24/7 Emergency Room Access",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-blue-700 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M3 10h1l2 7h11l2-7h1" />
                    <path d="M5 10V7a7 7 0 0114 0v3" />
                    <path d="M3 10a1 1 0 001 1h16a1 1 0 001-1" />
                  </svg>
                ),
                label: "Ambulance and Medical Transport",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-blue-700 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="7" r="4" />
                    <path d="M5.5 21a8.38 8.38 0 0113 0" />
                  </svg>
                ),
                label: "Trauma and Critical Care",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 text-blue-700 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 12v6m0 0v-6m0 0a4 4 0 114 4" />
                  </svg>
                ),
                label: "Cardiac and Stroke Care",
              },
            ].map(({ icon, label }, idx) => (
              <li key={idx} className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-10 px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Call Emergency Services"
            onClick={() => window.open("tel:911")}
          >
            Contact Emergency Services
          </button>
        </div>

        {/* Right side content: illustrative image */}
        <div className="md:flex-1 flex justify-center md:justify-end">
          <img
            src="https://images.unsplash.com/photo-1619719341796-44c4d2e0eb5a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Emergency responders assisting a patient"
            className="rounded-xl shadow-lg object-cover h-auto max-w-full"
            loading="lazy"
            decoding="async"
            width={600}
            height={400}
            style={{ minHeight: 0, minWidth: 0 }}
          />
        </div>
      </div>
    </section>
  );
};

export default EmergencyServices;
