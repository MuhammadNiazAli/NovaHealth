"use client";

import React, { useState, useRef } from "react";
import { FaPaperPlane, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function FaqsAskQuestion() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error" | null
  const [submitting, setSubmitting] = useState(false);
  const successRef = useRef(null);

  // Validation function
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errors.email = "Invalid email address.";
    }
    if (!formData.question.trim())
      errors.question = "Please enter your question.";
    return errors;
  };

  // Handle input changes
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
    if (submitStatus) setSubmitStatus(null);
  };

  // Submit handler with simulated delay
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitStatus(null);

    const errors = validate();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1600));

      // Simulate random failure 15%
      if (Math.random() < 0.15) {
        throw new Error("Submission failed.");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", question: "" });

      // Focus success message for screen readers
      setTimeout(() => {
        successRef.current?.focus();
      }, 100);
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-label="Ask a question form"
      className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md sm:p-12"
    >
      <h2 className="text-2xl font-extrabold text-blue-700 mb-6 text-center select-text">
        Have a Question? Ask Us!
      </h2>

      {submitStatus === "success" && (
        <div
          role="alert"
          tabIndex={-1}
          ref={successRef}
          className="mb-6 flex items-center gap-3 text-green-700 bg-green-100 border border-green-300 rounded-md p-4"
        >
          <FaCheckCircle className="w-6 h-6" aria-hidden="true" />
          <p className="font-medium">Thank you! Your question has been sent.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div
          role="alert"
          className="mb-6 flex items-center gap-3 text-red-700 bg-red-100 border border-red-300 rounded-md p-4"
        >
          <FaTimesCircle className="w-6 h-6" aria-hidden="true" />
          <p className="font-medium">
            Oops! Something went wrong. Please try again later.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <label htmlFor="name" className="block mb-1 font-semibold text-gray-900">
          Full Name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          disabled={submitting}
          aria-invalid={!!formErrors.name}
          aria-describedby={formErrors.name ? "name-error" : undefined}
          className={`w-full rounded-md border px-4 py-3 mb-3 focus:outline-none focus:ring-2 ${
            formErrors.name
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
          autoComplete="name"
        />
        {formErrors.name && (
          <p
            id="name-error"
            className="mb-3 text-sm text-red-600 font-medium"
            role="alert"
          >
            {formErrors.name}
          </p>
        )}

        {/* Email */}
        <label htmlFor="email" className="block mb-1 font-semibold text-gray-900">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={submitting}
          aria-invalid={!!formErrors.email}
          aria-describedby={formErrors.email ? "email-error" : undefined}
          className={`w-full rounded-md border px-4 py-3 mb-3 focus:outline-none focus:ring-2 ${
            formErrors.email
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
          autoComplete="email"
        />
        {formErrors.email && (
          <p
            id="email-error"
            className="mb-3 text-sm text-red-600 font-medium"
            role="alert"
          >
            {formErrors.email}
          </p>
        )}

        {/* Question */}
        <label
          htmlFor="question"
          className="block mb-1 font-semibold text-gray-900"
        >
          Your Question <span className="text-red-600">*</span>
        </label>
        <textarea
          id="question"
          name="question"
          placeholder="Type your question here..."
          rows={5}
          value={formData.question}
          onChange={handleChange}
          disabled={submitting}
          aria-invalid={!!formErrors.question}
          aria-describedby={formErrors.question ? "question-error" : undefined}
          className={`w-full rounded-md border px-4 py-3 mb-4 focus:outline-none focus:ring-2 resize-y ${
            formErrors.question
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {formErrors.question && (
          <p
            id="question-error"
            className="mb-4 text-sm text-red-600 font-medium"
            role="alert"
          >
            {formErrors.question}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 transition-colors text-white font-semibold py-4 rounded-md flex justify-center items-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Send Question
            </>
          )}
        </button>
      </form>
    </section>
  );
}
