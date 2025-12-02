"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const APPOINTMENT_REASONS = [
  "General Consultation",
  "Follow-up Visit",
  "Lab Tests",
  "Vaccination",
  "Emergency Care",
  "Other",
];

const containerMotion = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUpMotion = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

const buttonMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function HomeAppointment() {
  const animationControls = useAnimation();
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Trigger animation when section scrolls into view
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationControls.start("visible");
          observer.disconnect(); // Animate once
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [animationControls]);

  // Validate form fields
  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (new Date(formData.date) < new Date(new Date().toDateString())) {
      newErrors.date = "Date cannot be in the past";
    }

    if (!formData.time) newErrors.time = "Time is required";

    if (!formData.reason) newErrors.reason = "Please select a reason";

    return newErrors;
  }

  // Handle input changes and reset related errors/messages
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));

    setErrorMessage("");
    setSuccessMessage(false);
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage(false);

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate async call (replace with real API request)
      await new Promise((res) => setTimeout(res, 1500));

      setSuccessMessage(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch {
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="appointment-title"
      className="bg-white py-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto"
    >
      <motion.div
        className="max-w-xl mx-auto"
        variants={containerMotion}
        initial="hidden"
        animate={animationControls}
      >
        <motion.h2
          id="appointment-title"
          className="text-3xl font-extrabold text-gray-900 mb-4 text-center"
          variants={fadeUpMotion}
        >
          Schedule an <span className="text-blue-700">Appointment</span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-xl mx-auto mb-12"
          variants={fadeUpMotion}
        >
          Book your appointment easily with our expert medical team. We’re here
          to help you.
        </motion.p>

        {successMessage && (
          <motion.div
            role="alert"
            className="mb-8 max-w-xl mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-center font-semibold"
            variants={fadeUpMotion}
          >
            Your appointment has been scheduled successfully!
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            role="alert"
            className="mb-8 max-w-xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center font-semibold"
            variants={fadeUpMotion}
          >
            {errorMessage}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          variants={containerMotion}
        >
          {/* Full Name */}
          <motion.div className="sm:col-span-2" variants={fadeUpMotion}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Your full name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1 text-red-600 text-sm"
              >
                {errors.name}
              </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div className="sm:col-span-2" variants={fadeUpMotion}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="you@example.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-1 text-red-600 text-sm"
              >
                {errors.email}
              </p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div className="sm:col-span-2" variants={fadeUpMotion}>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="+1234567890"
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p
                id="phone-error"
                role="alert"
                className="mt-1 text-red-600 text-sm"
              >
                {errors.phone}
              </p>
            )}
          </motion.div>

          {/* Date */}
          <motion.div variants={fadeUpMotion}>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Date <span className="text-red-600">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              disabled={isSubmitting}
              min={new Date().toISOString().split("T")[0]}
              required
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "date-error" : undefined}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p
                id="date-error"
                role="alert"
                className="mt-1 text-red-600 text-sm"
              >
                {errors.date}
              </p>
            )}
          </motion.div>

          {/* Time */}
          <motion.div variants={fadeUpMotion}>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Time <span className="text-red-600">*</span>
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              disabled={isSubmitting}
              min="08:00"
              max="18:00"
              required
              aria-invalid={!!errors.time}
              aria-describedby={errors.time ? "time-error" : undefined}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.time
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.time && (
              <p
                id="time-error"
                role="alert"
                className="mt-1 text-red-600 text-sm"
              >
                {errors.time}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Available hours: 08:00 AM - 06:00 PM
            </p>
          </motion.div>

          {/* Reason */}
          <motion.div className="sm:col-span-2" variants={fadeUpMotion}>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reason for Appointment <span className="text-red-600">*</span>
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              aria-invalid={!!errors.reason}
              aria-describedby={errors.reason ? "reason-error" : undefined}
              className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.reason
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Select reason
              </option>
              {APPOINTMENT_REASONS.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            {errors.reason && (
              <p
                id="reason-error"
                role="alert"
                className="mt-1 text-red-600 text-sm"
              >
                {errors.reason}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="sm:col-span-2"
            variants={fadeUpMotion}
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
              variants={buttonMotion}
            >
              {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
