"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaClock,
  FaPhoneAlt,
  FaShieldAlt,
} from "react-icons/fa";

const FEATURES = [
  {
    icon: <FaShieldAlt className="text-blue-600 w-6 h-6" />,
    title: "Trusted Care",
    description: "Certified medical professionals you can rely on.",
  },
  {
    icon: <FaCalendarAlt className="text-blue-600 w-6 h-6" />,
    title: "Flexible Scheduling",
    description: "Book appointments at your convenience, anytime.",
  },
  {
    icon: <FaClock className="text-blue-600 w-6 h-6" />,
    title: "Extended Hours",
    description: "Open weekdays 8:00 AM - 6:00 PM & weekends by request.",
  },
  {
    icon: <FaPhoneAlt className="text-blue-600 w-6 h-6" />,
    title: "24/7 Support",
    description: "Reach out anytime with our dedicated support line.",
  },
];

export default function HomeHero() {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const lastFocusRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Manage modal open/close focus and keyboard trap
  useEffect(() => {
    if (!modalOpen) return;

    lastFocusRef.current = document.activeElement;
    setTimeout(() => firstInputRef.current?.focus(), 150);
    document.body.style.overflow = "hidden";

    const handleFocusTrap = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        e.preventDefault();
        firstInputRef.current?.focus();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
      if (e.key === "Tab") {
        const focusableEls = modalRef.current?.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableEls || focusableEls.length === 0) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("focus", handleFocusTrap, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("focus", handleFocusTrap, true);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocusRef.current?.focus();
    };
  }, [modalOpen]);

  // Simple form validation function
  function validate() {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.date) errors.date = "Please select a date";
    if (!formData.time) errors.time = "Please select a time";
    return errors;
  }

  // Handle input changes & clear related errors
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    setSubmitError("");
  };

  // Handle form submission with simulated delay & random failure
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitError("");
    setSubmitSuccess(false);

    const errors = validate();
    if (Object.keys(errors).length) return setFormErrors(errors);

    setSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1800));
      if (Math.random() < 0.3) throw new Error("Simulated failure");
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", date: "", time: "" });
    } catch {
      setSubmitError("Oops! Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Close modal and reset all form & state
  const closeModal = () => {
    setModalOpen(false);
    setFormErrors({});
    setSubmitError("");
    setSubmitSuccess(false);
    setFormData({ name: "", email: "", date: "", time: "" });
  };

  // Animation variants for hero texts, features, and modal
  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  const heroImageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.4 } },
  };

  const featuresVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 1 + i * 0.25, duration: 0.6, ease: "easeOut" },
    }),
  };

  const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContentVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* Hero Section */}
      <section
        aria-label="Healthcare Hero Section"
        className="relative bg-white w-full flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-lg"
            initial="hidden"
            animate="visible"
            aria-labelledby="hero-heading"
            aria-describedby="hero-subtext"
          >
            <motion.h1
              id="hero-heading"
              className="text-[clamp(2.75rem,6vw,4.25rem)] font-extrabold leading-tight tracking-tight text-blue-700 select-text"
              custom={0}
              variants={heroTextVariants}
            >
              Your Health,
              <br />
              <span className="text-black" aria-label="Our Priority" role="text">
                Our Priority
              </span>
            </motion.h1>
            <motion.p
              id="hero-subtext"
              className="mt-6 text-lg sm:text-xl font-light text-gray-900 max-w-3xl mx-auto lg:mx-0"
              custom={1}
              variants={heroTextVariants}
            >
              At NovaHealth, we know that everyone’s health journey is different. Our caring team
              listens closely and combines genuine compassion with the latest technology to give
              you care you can trust. Whether it’s a routine checkup or specialized advice, we’re
              here to help you feel comfortable and supported. Because for us, healthcare is about
              treating you like family.
            </motion.p>

            <motion.button
              custom={2}
              variants={heroTextVariants}
              onClick={() => setModalOpen(true)}
              className="mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors w-full sm:w-auto"
              aria-haspopup="dialog"
              aria-controls="appointment-modal"
            >
              Schedule Appointment
            </motion.button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end max-w-xl w-full"
            initial="hidden"
            animate="visible"
            variants={heroImageVariants}
          >
            <img
              src="https://images.unsplash.com/photo-1597807037496-c56a1d8bc29a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Healthcare professional assisting a patient"
              className="rounded-3xl shadow-2xl w-full max-w-[540px] h-auto object-cover select-none"
              loading="lazy"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Features Row */}
        <motion.div
          className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center"
          initial="hidden"
          animate="visible"
          aria-label="Key features of our healthcare services"
        >
          {FEATURES.map(({ icon, title, description }, i) => (
            <motion.div
              key={title}
              className="flex flex-col items-center"
              custom={i}
              variants={featuresVariants}
            >
              <div className="bg-blue-100 rounded-full p-4 mb-4">{icon}</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-1">{title}</h3>
              <p className="text-gray-700 font-light max-w-xs">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Appointment Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            id="appointment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalBackdropVariants}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              className="bg-white rounded-2xl w-full max-w-4xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={modalContentVariants}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-900 text-2xl font-semibold focus:outline-none"
                aria-label="Close appointment form"
              >
                ×
              </button>

              {/* Left: Image + Info */}
              <div className="flex flex-col justify-center items-center rounded-xl overflow-hidden shadow-lg bg-blue-50 p-6 select-none">
                <img
                  src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1094&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Doctor consulting patient"
                  className="rounded-xl mb-6 object-cover w-full max-w-sm shadow-lg"
                  loading="lazy"
                  draggable={false}
                />
                <h3 className="text-2xl font-bold text-blue-700 mb-3 text-center">
                  Book Your Appointment
                </h3>
                <p className="text-gray-700 text-center font-light max-w-xs">
                  Choose a date and time convenient for you. Our team is ready to assist you with
                  expert healthcare services.
                </p>
              </div>

              {/* Right: Form */}
              <div className="flex flex-col">
                {submitSuccess ? (
                  <div
                    className="flex flex-col items-center justify-center gap-3 text-green-700 p-8 border border-green-300 rounded-lg"
                    role="alert"
                    tabIndex={0}
                  >
                    <FaCheckCircle className="w-12 h-12" aria-hidden="true" />
                    <p className="text-lg font-semibold">
                      Your appointment request has been sent successfully!
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-4 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <h2 id="modal-title" className="text-3xl font-extrabold text-blue-700 mb-2">
                      Schedule an Appointment
                    </h2>
                    <p id="modal-desc" className="text-gray-600 mb-6 font-light">
                      Fill out the form below, and we’ll contact you to confirm your appointment.
                    </p>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-1">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        ref={firstInputRef}
                        disabled={submitting}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                          formErrors.name
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                        }`}
                        aria-invalid={!!formErrors.name}
                        aria-describedby={formErrors.name ? "name-error" : undefined}
                        required
                        autoComplete="name"
                      />
                      {formErrors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-600" role="alert">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-1">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={submitting}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                          formErrors.email
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                        }`}
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                        required
                        autoComplete="email"
                      />
                      {formErrors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Date */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-semibold mb-1">
                        Preferred Date <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        disabled={submitting}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                          formErrors.date
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                        }`}
                        aria-invalid={!!formErrors.date}
                        aria-describedby={formErrors.date ? "date-error" : undefined}
                        required
                      />
                      {formErrors.date && (
                        <p id="date-error" className="mt-1 text-xs text-red-600" role="alert">
                          {formErrors.date}
                        </p>
                      )}
                    </div>

                    {/* Time */}
                    <div>
                      <label htmlFor="time" className="block text-sm font-semibold mb-1">
                        Preferred Time <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        disabled={submitting}
                        min="08:00"
                        max="18:00"
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                          formErrors.time
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                        }`}
                        aria-invalid={!!formErrors.time}
                        aria-describedby={formErrors.time ? "time-error" : undefined}
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500 select-none">
                        Available between 08:00 and 18:00
                      </p>
                      {formErrors.time && (
                        <p id="time-error" className="mt-1 text-xs text-red-600" role="alert">
                          {formErrors.time}
                        </p>
                      )}
                    </div>

                    {/* Submission Error */}
                    {submitError && (
                      <div
                        className="flex items-center gap-2 text-red-600 font-semibold justify-center"
                        role="alert"
                      >
                        <FaTimesCircle aria-hidden="true" className="w-5 h-5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 transition-colors text-white font-semibold py-4 rounded-lg flex justify-center items-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      aria-live="polite"
                    >
                      {submitting ? (
                        <>
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
                          Scheduling...
                        </>
                      ) : (
                        "Confirm Appointment"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
