"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function HomeContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const controls = useAnimation();
  const sectionRef = useRef(null);

  // Simple validation
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone)) {
      errs.phone = "Invalid phone number";
    }
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) errs.message = "Message cannot be empty";
    return errs;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setErrorMsg("");
    setSuccessMsg(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg(false);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate async form submission
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setSuccessMsg(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch {
      setErrorMsg("Oops! Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animate when section is visible in viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [controls]);

  // Animation variants
  const container = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, delayChildren: 0.2, ease: "easeOut" },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      ref={sectionRef}
      aria-labelledby="contact-title"
      initial="hidden"
      animate={controls}
      variants={container}
      className="max-w-4xl mx-auto bg-white p-10 rounded-lg my-16 sm:my-24 mb-5"
    >
      <motion.h2
        id="contact-title"
        variants={item}
        className="text-3xl font-extrabold text-gray-900 mb-8 text-center"
      >
        Get In <span className="text-blue-700">Touch</span>
      </motion.h2>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8 bg-green-100 border border-green-400 text-green-700 px-5 py-3 rounded-md text-center font-semibold"
          >
            Thank you! Your message has been sent successfully.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {errorMsg && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8 bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-md text-center font-semibold"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        variants={container}
        className="grid gap-6 sm:grid-cols-2"
      >
        {/* Name */}
        <motion.div variants={item}>
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-red-600 mt-1 text-sm font-medium">
              {errors.name}
            </p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div variants={item}>
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-red-600 mt-1 text-sm font-medium">
              {errors.email}
            </p>
          )}
        </motion.div>

        {/* Phone */}
        <motion.div className="sm:col-span-2" variants={item}>
          <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1234567890"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="text-red-600 mt-1 text-sm font-medium">
              {errors.phone}
            </p>
          )}
        </motion.div>

        {/* Subject */}
        <motion.div className="sm:col-span-2" variants={item}>
          <label htmlFor="subject" className="block mb-2 font-semibold text-gray-700">
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Brief subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            required
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          />
          {errors.subject && (
            <p id="subject-error" role="alert" className="text-red-600 mt-1 text-sm font-medium">
              {errors.subject}
            </p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div className="sm:col-span-2" variants={item}>
          <label htmlFor="message" className="block mb-2 font-semibold text-gray-700">
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            required
            className={`w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-red-600 mt-1 text-sm font-medium">
              {errors.message}
            </p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div className="sm:col-span-2" variants={item}>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            aria-live="polite"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            whileFocus={{ scale: 1.03 }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.section>
  );
}
