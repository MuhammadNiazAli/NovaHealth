"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const doctors = [
  {
    id: 1,
    name: "Dr. Emma Johnson",
    specialty: "Cardiologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1675807264002-74250202f195?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phone: "+1 (555) 123-4567",
    email: "emma.johnson@healthcare.com",
    experienceYears: 12,
    achievements:
      "Successfully performed over 1000 cardiac surgeries with a 98% success rate.",
    salary: "$220,000 per year",
    bio:
      "Dr. Emma Johnson is a board-certified cardiologist specializing in interventional cardiology and preventive care. She has a compassionate approach and stays updated with the latest cardiac care techniques.",
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialty: "Pediatrician",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvY3RvcnN8ZW58MHx8MHx8fDA%3D",
    phone: "+1 (555) 987-6543",
    email: "michael.lee@healthcare.com",
    experienceYears: 9,
    achievements:
      "Renowned for compassionate pediatric care and development of child wellness programs.",
    salary: "$185,000 per year",
    bio:
      "Dr. Michael Lee has been dedicated to children's health and wellness for almost a decade. He specializes in preventive pediatric medicine and developmental assessments.",
  },
  {
    id: 3,
    name: "Dr. Sophia Patel",
    specialty: "Neurologist",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phone: "+1 (555) 456-7890",
    email: "sophia.patel@healthcare.com",
    experienceYears: 15,
    achievements:
      "Published 30+ papers on neurological disorders and lead neurologist for clinical trials.",
    salary: "$240,000 per year",
    bio:
      "Dr. Sophia Patel specializes in neurological disorders, including stroke and epilepsy. She is passionate about research and improving patient outcomes.",
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Orthopedic Surgeon",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvY3RvcnN8ZW58MHx8MHx8fDA%3D",
    phone: "+1 (555) 321-0987",
    email: "david.kim@healthcare.com",
    experienceYears: 11,
    achievements:
      "Performed 500+ successful joint replacement surgeries with excellent patient recovery.",
    salary: "$210,000 per year",
    bio:
      "Dr. David Kim is an experienced orthopedic surgeon focusing on joint replacement and sports injuries, providing personalized patient care.",
  },
];

// Animation variants for staggering and fade effects
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.25 } },
};

export default function HomeDoctors() {
  const [activeDoctor, setActiveDoctor] = useState(null);
  const modalRef = useRef(null);

  // Close modal on ESC key press
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDoctor(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close modal when clicking on overlay backdrop
  const onBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      setActiveDoctor(null);
    }
  };

  return (
    <section className="bg-white py-16 px-6 sm:px-12 lg:px-24 my-[-60px] mb-[-30px]">
      {/* Heading and subtitle */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          variants={textVariants}
        >
          Meet Our <span className="text-blue-700">Doctors</span>
        </motion.h2>
        <motion.p
          className="text-gray-700 mt-3 max-w-xl mx-auto text-base sm:text-lg"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          Professional care from our certified and experienced medical experts.
        </motion.p>
      </motion.div>

      {/* Doctors Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        aria-live="polite"
      >
        {doctors.map((doctor) => (
          <motion.article
            key={doctor.id}
            className="relative bg-gray-50 rounded-lg border border-gray-200 shadow flex flex-col items-center p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500"
            aria-label={`${doctor.name}, ${doctor.specialty}`}
            variants={cardVariants}
            tabIndex={0}
            role="button"
            onClick={() => setActiveDoctor(doctor)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveDoctor(doctor);
              }
            }}
          >
            <div className="group relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-300 shadow-sm mb-4 transition-transform hover:scale-105 focus-visible:scale-105">
              <img
                src={doctor.photo}
                alt={`Photo of ${doctor.name}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={96}
                height={96}
                aria-hidden="true"
              />
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded bg-black bg-opacity-90 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity select-none whitespace-nowrap z-10">
                View Details
              </span>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 text-center">
              {doctor.name}
            </h3>
            <p className="text-xs text-blue-800 font-semibold text-center mb-3">
              {doctor.specialty}
            </p>

            <div className="flex gap-4 text-gray-700 text-sm">
              <a
                href={`tel:${doctor.phone.replace(/[^0-9+]/g, "")}`}
                className="hover:text-blue-800 transition-colors"
                aria-label={`Call ${doctor.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaPhoneAlt />
              </a>
              <a
                href={`mailto:${doctor.email}`}
                className="hover:text-blue-800 transition-colors"
                aria-label={`Email ${doctor.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeDoctor && (
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="doctor-modal-title"
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 overflow-auto"
            onClick={onBackdropClick}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-xl focus:outline-none"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              tabIndex={0}
            >
              <button
                onClick={() => setActiveDoctor(null)}
                aria-label="Close doctor details"
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={activeDoctor.photo}
                  alt={`Photo of ${activeDoctor.name}`}
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-300 shadow-md mx-auto sm:mx-0 flex-shrink-0"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex-1 min-w-0">
                  <h3
                    id="doctor-modal-title"
                    className="text-2xl font-bold text-gray-900 mb-1 truncate"
                  >
                    {activeDoctor.name}
                  </h3>
                  <p className="text-blue-800 font-semibold text-lg mb-4 truncate">
                    {activeDoctor.specialty}
                  </p>
                  <p className="text-gray-800 mb-4 leading-relaxed break-words">
                    {activeDoctor.bio}
                  </p>

                  <ul className="mb-4 space-y-1 text-gray-700 text-sm leading-snug">
                    <li>
                      <strong>Experience:</strong> {activeDoctor.experienceYears}{" "}
                      years
                    </li>
                    <li>
                      <strong>Achievements:</strong> {activeDoctor.achievements}
                    </li>
                    <li>
                      <strong>Salary:</strong> {activeDoctor.salary}
                    </li>
                  </ul>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-700 text-sm sm:text-base">
                    <a
                      href={`tel:${activeDoctor.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-2 hover:text-blue-800 transition-colors truncate max-w-full"
                      aria-label={`Call ${activeDoctor.name}`}
                    >
                      <FaPhoneAlt className="flex-shrink-0" />
                      <span className="truncate">{activeDoctor.phone}</span>
                    </a>
                    <a
                      href={`mailto:${activeDoctor.email}`}
                      className="flex items-center gap-2 hover:text-blue-800 transition-colors truncate max-w-full"
                      aria-label={`Email ${activeDoctor.name}`}
                    >
                      <FaEnvelope className="flex-shrink-0" />
                      <span className="truncate">{activeDoctor.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
