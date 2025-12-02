"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Spinner component for loading state
const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 mr-2 text-white"
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
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);

// Modal wrapper with backdrop and focus trap
const ModalWrapper = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save last focused element to restore focus on close
    lastFocusedElement.current = document.activeElement;

    // Focus the modal after a slight delay
    const focusTimeout = setTimeout(() => {
      modalRef.current?.focus();
    }, 150);

    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Focus trap and keyboard handling
    const onFocus = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        e.preventDefault();
        modalRef.current.focus();
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("focus", onFocus, true);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(focusTimeout);
      window.removeEventListener("focus", onFocus, true);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus();
    };
  }, [isOpen, onClose]);

  // Animation variants for backdrop and modal
  const backdropAnim = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalAnim = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 15,
      scale: 0.95,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropAnim}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white rounded-lg max-w-md w-full p-5 relative shadow-xl ring-1 ring-black ring-opacity-10 focus:outline-none"
            variants={modalAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="document"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Emergency Contact Form component with validation & submission logic
const EmergencyForm = ({ onSuccess }) => {
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    emergencyType: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  // Validate inputs and return errors object
  const validateInputs = () => {
    const errs = {};

    if (!inputs.name.trim()) errs.name = "Name is required";

    if (!inputs.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\+?\d{7,15}$/.test(inputs.phone.trim())) {
      errs.phone = "Enter a valid phone number";
    }

    if (!inputs.emergencyType) errs.emergencyType = "Please select emergency type";

    if (!inputs.description.trim()) errs.description = "Please describe the emergency";

    return errs;
  };

  // Update form state and clear errors for the field on change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }

    if (submissionError) setSubmissionError("");
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmissionError("");

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate server delay
      await new Promise((res) => setTimeout(res, 1500));

      // Simulate random failure with 15% chance
      if (Math.random() < 0.15) throw new Error("Simulated server error");

      // On success: reset form & notify parent
      setInputs({
        name: "",
        phone: "",
        emergencyType: "",
        description: "",
      });

      onSuccess();
    } catch (err) {
      setSubmissionError("Failed to submit emergency request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2
        id="emergency-modal-title"
        tabIndex={-1}
        className="text-xl font-bold mb-4 text-blue-700"
      >
        Emergency Contact Form
      </h2>

      <p
        id="emergency-modal-desc"
        className="mb-5 text-gray-700 text-sm sm:text-base"
      >
        Please provide accurate information so our emergency team can assist you
        immediately.
      </p>

      <form onSubmit={handleFormSubmit} noValidate>
        {/* Name Field */}
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block font-semibold mb-1 text-gray-800 text-sm sm:text-base"
          >
            Full Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleInputChange}
            className={`w-full px-2.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm sm:text-base ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="John Doe"
            disabled={isSubmitting}
            autoComplete="name"
            required
          />
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              className="text-red-600 text-xs sm:text-sm mt-1"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-3">
          <label
            htmlFor="phone"
            className="block font-semibold mb-1 text-gray-800 text-sm sm:text-base"
          >
            Phone Number<span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={inputs.phone}
            onChange={handleInputChange}
            className={`w-full px-2.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm sm:text-base ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="+1234567890"
            disabled={isSubmitting}
            autoComplete="tel"
            required
          />
          {errors.phone && (
            <p
              id="phone-error"
              role="alert"
              className="text-red-600 text-xs sm:text-sm mt-1"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* Emergency Type */}
        <div className="mb-3">
          <label
            htmlFor="emergencyType"
            className="block font-semibold mb-1 text-gray-800 text-sm sm:text-base"
          >
            Emergency Type<span className="text-red-600">*</span>
          </label>
          <select
            id="emergencyType"
            name="emergencyType"
            value={inputs.emergencyType}
            onChange={handleInputChange}
            className={`w-full px-2.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors text-sm sm:text-base ${
              errors.emergencyType ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.emergencyType}
            aria-describedby={errors.emergencyType ? "emergencyType-error" : undefined}
            disabled={isSubmitting}
            required
          >
            <option value="">Select Emergency Type</option>
            <option value="medical">Medical</option>
            <option value="fire">Fire</option>
            <option value="police">Police</option>
            <option value="other">Other</option>
          </select>
          {errors.emergencyType && (
            <p
              id="emergencyType-error"
              role="alert"
              className="text-red-600 text-xs sm:text-sm mt-1"
            >
              {errors.emergencyType}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block font-semibold mb-1 text-gray-800 text-sm sm:text-base"
          >
            Description<span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={inputs.description}
            onChange={handleInputChange}
            className={`w-full px-2.5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors resize-none text-sm sm:text-base ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
            placeholder="Briefly describe the emergency..."
            disabled={isSubmitting}
            required
          />
          {errors.description && (
            <p
              id="description-error"
              role="alert"
              className="text-red-600 text-xs sm:text-sm mt-1"
            >
              {errors.description}
            </p>
          )}
        </div>

        {/* Submission Error */}
        {submissionError && (
          <p
            role="alert"
            className="text-red-600 mb-4 font-semibold text-center text-sm sm:text-base"
          >
            {submissionError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center text-sm sm:text-base"
        >
          {isSubmitting ? (
            <>
              <Spinner />
              Sending...
            </>
          ) : (
            "Send Request"
          )}
        </button>
      </form>
    </>
  );
};

const EmergencyHero = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Animation for heading and paragraph with stagger
  const staggerTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  // Called when form submission is successful
  const onFormSuccess = () => {
    setHasSubmitted(true);
  };

  // Close modal and reset submission state
  const closeModalHandler = () => {
    setIsModalVisible(false);
    setHasSubmitted(false);
  };

  return (
    <>
      <section
        aria-label="Emergency Services Hero"
        className="bg-white text-black min-h-[440px] flex items-center px-5 sm:px-8 md:px-12 my-16 md:my-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center w-full gap-10 md:gap-16">
          {/* Left content: Title, description, and button */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              custom={0}
              variants={staggerTextVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              <span className="text-blue-700">Immediate</span>{" "}
              <span className="text-black">Emergency Assistance</span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={staggerTextVariants}
              className="mt-4 text-base sm:text-lg md:text-xl font-light max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              If you are facing an emergency, please fill out the form below so
              our team can respond quickly and effectively.
            </motion.p>

            <motion.button
              custom={2}
              variants={staggerTextVariants}
              type="button"
              onClick={() => setIsModalVisible(true)}
              className="mt-7 px-8 py-2.5 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Open Emergency Contact Form"
            >
              Request Help Now
            </motion.button>
          </motion.div>

          {/* Right content: Image */}
          <motion.div
            className="flex-1 max-w-sm mx-auto md:mx-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1612574935301-af13ccce9258?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Emergency medical responders assisting patient"
              className="rounded-xl shadow-xl w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* Modal with form */}
      <ModalWrapper isOpen={isModalVisible} onClose={closeModalHandler}>
        {hasSubmitted ? (
          <div
            role="alert"
            className="text-green-600 font-semibold text-center my-5 animate-fadeIn text-sm sm:text-base"
          >
            Your request has been received. Help is on the way.
          </div>
        ) : (
          <EmergencyForm onSuccess={onFormSuccess} />
        )}
        {/* Close button */}
        <button
          type="button"
          onClick={closeModalHandler}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Close emergency contact form"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </ModalWrapper>
    </>
  );
};

export default EmergencyHero;
