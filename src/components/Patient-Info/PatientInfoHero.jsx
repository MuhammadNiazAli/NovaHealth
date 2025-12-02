"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-2 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  );
}

export default function PatientInfoHero() {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const lastFocusedElement = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    dob: "",
    gender: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Focus trap and body scroll lock when modal opens
  useEffect(() => {
    if (!modalOpen) return;

    lastFocusedElement.current = document.activeElement;

    // Focus first input after a short delay
    setTimeout(() => firstInputRef.current?.focus(), 150);

    // Lock body scroll
    document.body.style.overflow = "hidden";

    const handleFocus = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        e.preventDefault();
        firstInputRef.current?.focus();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
      if (e.key === "Tab") {
        const focusableEls = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener("focus", handleFocus, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("focus", handleFocus, true);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus();
    };
  }, [modalOpen]);

  // Simple validation logic
  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone.trim())) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.gender) errors.gender = "Please select your gender";
    return errors;
  };

  // Handle input changes and clear errors for that field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (submitError) setSubmitError("");
  };

  // Simulate form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({});
    setSubmitError("");
    setSubmitSuccess(false);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      // Simulated network delay
      await new Promise((res) => setTimeout(res, 1500));
      // Simulate occasional failure (25%)
      if (Math.random() < 0.25) throw new Error("Simulated error");

      setSubmitSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        dob: "",
        gender: "",
      });
    } catch {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Reset and close modal
  const closeModal = () => {
    setModalOpen(false);
    setFormErrors({});
    setSubmitError("");
    setSubmitSuccess(false);
    setFormData({
      fullName: "",
      phone: "",
      dob: "",
      gender: "",
    });
  };

  // Animation variants for hero texts
  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.25, duration: 0.7, ease: "easeOut" },
    }),
  };

  // Animation for modal backdrop and container
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <>
      <section
        aria-label="Patient Information Hero Section"
        className="bg-white text-black min-h-[480px] flex items-center px-6 md:px-12 my-20 lg:my-0"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center w-full gap-10">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              custom={0}
              variants={heroTextVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-sm"
            >
              Welcome to{" "}
              <span className="text-blue-700" aria-label="Your Care Center">
                Your Care Center
              </span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={heroTextVariants}
              className="mt-5 text-lg sm:text-xl md:text-2xl font-light max-w-xl mx-auto md:mx-0"
            >
              Please provide your details so we can offer personalized patient
              services and care.
            </motion.p>

            <motion.button
              custom={2}
              variants={heroTextVariants}
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-8 px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Provide Patient Information"
            >
              Provide Info
            </motion.button>
          </motion.div>

          <motion.div
            className="flex-1 max-w-sm mx-auto md:mx-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1683121665192-4f1896dd5177?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Patient consulting with healthcare professional"
              className="rounded-xl shadow-xl w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            aria-modal="true"
            role="dialog"
            aria-labelledby="patient-info-modal-title"
            aria-describedby="patient-info-modal-desc"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              role="document"
              className="bg-white rounded-lg max-w-md w-full p-6 mx-4 relative shadow-2xl ring-1 ring-black ring-opacity-10 focus:outline-none"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Close patient information form"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

              <h2
                id="patient-info-modal-title"
                className="text-2xl font-bold mb-4 text-blue-700"
                tabIndex={-1}
              >
                Patient Information
              </h2>

              <p id="patient-info-modal-desc" className="mb-6 text-gray-700">
                Kindly fill out the following details to help us serve you better.
              </p>

              {submitSuccess ? (
                <div
                  role="alert"
                  className="text-green-600 font-semibold text-center my-6 animate-fadeIn"
                >
                  Thank you! Your information was submitted successfully.
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <FormField
                    label="Full Name"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={formErrors.fullName}
                    placeholder="Jane Doe"
                    disabled={submitting}
                    ref={firstInputRef}
                    required
                    autoComplete="name"
                    type="text"
                  />

                  {/* Phone Number */}
                  <FormField
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={formErrors.phone}
                    placeholder="+1234567890"
                    disabled={submitting}
                    required
                    autoComplete="tel"
                    type="tel"
                  />

                  {/* Date of Birth */}
                  <FormField
                    label="Date of Birth"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    error={formErrors.dob}
                    disabled={submitting}
                    required
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                  />

                  {/* Gender Select */}
                  <div className="mb-6">
                    <label
                      htmlFor="gender"
                      className="block font-semibold mb-1 text-gray-800"
                    >
                      Gender<span className="text-red-600">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
                        formErrors.gender ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!formErrors.gender}
                      aria-describedby={formErrors.gender ? "gender-error" : undefined}
                      disabled={submitting}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="nonbinary">Non-binary</option>
                      <option value="other">Other</option>
                      <option value="preferNotToSay">Prefer not to say</option>
                    </select>
                    {formErrors.gender && (
                      <p
                        id="gender-error"
                        className="text-red-600 text-sm mt-1"
                        role="alert"
                      >
                        {formErrors.gender}
                      </p>
                    )}
                  </div>

                  {/* Submit error message */}
                  {submitError && (
                    <p
                      className="text-red-600 mb-4 font-semibold text-center"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center"
                  >
                    {submitting ? (
                      <>
                        <Spinner />
                        Submitting...
                      </>
                    ) : (
                      "Submit Info"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Reusable input field with label and error display
const FormField = React.forwardRef(
  (
    {
      label,
      id,
      name,
      value,
      onChange,
      error,
      placeholder,
      disabled,
      required,
      autoComplete,
      type,
      max,
    },
    ref
  ) => {
    const inputProps = {
      id,
      name,
      value,
      onChange,
      placeholder,
      disabled,
      required,
      autoComplete,
      type,
      max,
      className: `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
        error ? "border-red-500" : "border-gray-300"
      }`,
      "aria-invalid": !!error,
      "aria-describedby": error ? `${id}-error` : undefined,
      ref,
    };

    return (
      <div className="mb-4">
        <label htmlFor={id} className="block font-semibold mb-1 text-gray-800">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <input {...inputProps} />
        {error && (
          <p id={`${id}-error`} className="text-red-600 text-sm mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
