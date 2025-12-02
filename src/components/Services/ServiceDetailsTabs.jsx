"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeartbeat, FaUserMd, FaSyringe } from "react-icons/fa";

const tabs = [
  {
    id: "cardiology",
    label: "Cardiology",
    icon: FaHeartbeat,
    content:
      "Our cardiology department provides cutting-edge diagnostics, heart health monitoring, and treatment plans tailored to your cardiovascular needs. We use the latest non-invasive technology to ensure accuracy and comfort.",
  },
  {
    id: "consultation",
    label: "Consultation",
    icon: FaUserMd,
    content:
      "Meet with general practitioners and specialists for thorough assessments, second opinions, or preventive advice. Our consultations are patient-first and deeply personalized.",
  },
  {
    id: "vaccination",
    label: "Vaccination",
    icon: FaSyringe,
    content:
      "We offer a wide range of vaccines for children, adults, and travelers — including seasonal flu, COVID-19, and routine immunizations — all administered by licensed staff.",
  },
];

const tabContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const ServiceDetailsTabs = () => {
  const [activeTab, setActiveTab] = useState("cardiology");

  return (
    <section
      aria-label="Service Details Tabs"
      className="bg-white py-20 px-6 md:px-12 my-[-50px] mb-[-80px]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <header className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Service{" "}
            <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
              Details
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Tap into the specifics of each service to understand how we care for
            you.
          </p>
        </header>

        {/* Tabs */}
        <nav
          role="tablist"
          aria-label="Service categories"
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`tabpanel-${id}`}
                id={`tab-${id}`}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 text-sm sm:text-base font-medium shadow-sm select-none focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-600
                  ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                  }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-white" : "text-blue-600"}
                  aria-hidden="true"
                />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <div className="relative min-h-[140px] sm:min-h-[120px]">
          <AnimatePresence mode="wait">
            {tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    role="tabpanel"
                    id={`tabpanel-${tab.id}`}
                    aria-labelledby={`tab-${tab.id}`}
                    tabIndex={0}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={tabContentVariants}
                    className="text-center px-4 sm:px-8"
                  >
                    <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                      {tab.content}
                    </p>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsTabs;
