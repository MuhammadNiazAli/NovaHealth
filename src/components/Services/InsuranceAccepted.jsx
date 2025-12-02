"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  FaShieldAlt,
  FaHospitalUser,
  FaHeartbeat,
  FaUserMd,
  FaClinicMedical,
  FaHandsHelping,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, ease: "easeOut", duration: 0.7 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const insurances = [
  { id: 1, name: "Blue Cross Blue Shield", icon: <FaShieldAlt className="text-blue-600 w-12 h-12" /> },
  { id: 2, name: "UnitedHealthcare", icon: <FaHospitalUser className="text-purple-600 w-12 h-12" /> },
  { id: 3, name: "Aetna", icon: <FaHeartbeat className="text-red-500 w-12 h-12" /> },
  { id: 4, name: "Cigna", icon: <FaUserMd className="text-green-600 w-12 h-12" /> },
  { id: 5, name: "Humana", icon: <FaClinicMedical className="text-indigo-600 w-12 h-12" /> },
  { id: 6, name: "Kaiser Permanente", icon: <FaHandsHelping className="text-teal-600 w-12 h-12" /> },
];

export default function InsuranceAccepted() {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);

  const initialFormData = {
    insuranceProvider: "",
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [controls]);

  const validate = () => {
    const errors = {};

    if (!formData.insuranceProvider) errors.insuranceProvider = "Please select your insurance provider.";
    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = "Invalid phone number format.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      errors.email = "Invalid email address.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setFormSubmitted(false);
    setTimeout(() => setFormSubmitted(true), 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field on change
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormSubmitted(false);
    setFormData(initialFormData);
    setFormErrors({});
  };

  return (
    <section
      aria-label="Insurance Accepted"
      role="region"
      className="bg-white py-20 px-6 sm:px-12 lg:px-24 my-[-30px]"
      ref={sectionRef}
    >
      <motion.div
        className="max-w-7xl mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-6"
          variants={itemVariants}
          tabIndex={-1}
        >
          We Accept{" "}
          <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
            Your Insurance
          </span>
        </motion.h2>

        <motion.p
          className="max-w-3xl text-center text-lg sm:text-xl text-gray-700 font-light mb-14"
          variants={itemVariants}
        >
          NovaHealth partners with leading insurance providers to make your healthcare easy and affordable. Check below if your insurance is accepted.
        </motion.p>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 w-full max-w-5xl"
          variants={containerVariants}
          aria-label="List of accepted insurance providers"
        >
          {insurances.map(({ id, name, icon }) => (
            <motion.li
              key={id}
              className="flex flex-col items-center bg-white rounded-xl shadow-md p-8 cursor-default select-none focus-within:ring-4 focus-within:ring-blue-400 focus-within:outline-none transition-transform duration-300 border border-gray-200"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
              aria-label={`Accepted insurance: ${name}`}
            >
              <motion.div variants={iconVariants} aria-hidden="true">
                {icon}
              </motion.div>
              <span className="mt-6 text-center text-gray-900 font-semibold text-xl leading-snug">{name}</span>
              <FaCheckCircle className="mt-4 text-green-500 w-7 h-7" aria-hidden="true" />
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          type="button"
          className="mt-16 bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-400 focus:outline-none focus:ring-4 text-white font-semibold px-14 py-5 rounded-lg shadow-lg select-none tracking-wide transition-transform duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-haspopup="dialog"
          aria-expanded={modalOpen}
          aria-controls="eligibility-modal"
          onClick={() => setModalOpen(true)}
        >
          Check Your Eligibility
        </motion.button>
      </motion.div>

      {modalOpen && (
        <div
          id="eligibility-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 relative"
          >
            <button
              onClick={closeModal}
              aria-label="Close eligibility form"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <h3 id="modal-title" className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Check Your Insurance Eligibility
            </h3>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Insurance Provider <span className="text-red-500">*</span>
                </label>
                <select
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${
                    formErrors.insuranceProvider ? "border-red-500" : ""
                  }`}
                  required
                >
                  <option value="">-- Select --</option>
                  {insurances.map(({ id, name }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {formErrors.insuranceProvider && (
                  <p className="text-red-600 text-sm mb-2" role="alert">
                    {formErrors.insuranceProvider}
                  </p>
                )}

                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${
                    formErrors.fullName ? "border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.fullName && (
                  <p className="text-red-600 text-sm mb-2" role="alert">
                    {formErrors.fullName}
                  </p>
                )}

                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${
                    formErrors.dateOfBirth ? "border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.dateOfBirth && (
                  <p className="text-red-600 text-sm mb-2" role="alert">
                    {formErrors.dateOfBirth}
                  </p>
                )}

                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${
                    formErrors.phoneNumber ? "border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-600 text-sm mb-2" role="alert">
                    {formErrors.phoneNumber}
                  </p>
                )}

                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${
                    formErrors.email ? "border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-600 text-sm mb-2" role="alert">
                    {formErrors.email}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-400 focus:outline-none focus:ring-4 text-white font-semibold px-5 py-3 rounded-lg shadow-lg select-none tracking-wide transition-transform duration-200"
                  aria-label="Submit eligibility check form"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="text-center p-6">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="text-xl font-semibold mb-2 text-gray-900">
                  Eligibility Check Submitted!
                </h4>
                <p className="text-gray-700 mb-6">
                  Thank you for submitting your insurance eligibility check. Our team will review your information and contact you shortly.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-400 focus:outline-none focus:ring-4 text-white font-semibold px-6 py-3 rounded-lg shadow-lg select-none tracking-wide transition-transform duration-200"
                  aria-label="Close eligibility confirmation"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
