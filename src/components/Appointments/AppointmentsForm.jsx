"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const PRIMARY_BLUE = "#2563eb";
const INPUT_BORDER = "#d1d5db";
const ERROR_RED = "#ef4444";
const TEXT_DARK = "#111827";

export default function AppointmentsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim()))
      errs.email = "Invalid email address";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.trim()))
      errs.phone = "Invalid phone number";
    if (!formData.date.trim()) errs.date = "Date is required";
    if (!formData.time.trim()) errs.time = "Time is required";
    if (!formData.message.trim()) errs.message = "Please add a message";

    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Utility function to get styles for inputs and textarea
  const getInputStyles = (field) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: errors[field]
      ? `2px solid ${ERROR_RED}`
      : `1.8px solid ${INPUT_BORDER}`,
    backgroundColor: "#fff",
    fontSize: 16,
    color: TEXT_DARK,
    outline: "none",
    boxShadow: errors[field]
      ? `0 0 6px ${ERROR_RED}66`
      : "0 0 4px rgba(0,0,0,0.06)",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  });

  // Handles focus & blur for input styles
  const handleFocus = (e) => {
    e.target.style.borderColor = PRIMARY_BLUE;
    e.target.style.boxShadow = `0 0 8px ${PRIMARY_BLUE}88`;
  };
  const handleBlur = (e) => {
    const field = e.target.name;
    e.target.style.borderColor = errors[field] ? ERROR_RED : INPUT_BORDER;
    e.target.style.boxShadow = errors[field]
      ? `0 0 6px ${ERROR_RED}66`
      : "0 0 4px rgba(0,0,0,0.06)";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: "",
      });
      setErrors({});
    }, 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundColor: "#fff",
        maxWidth: 600,
        margin: "-1px auto 2rem auto",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        fontFamily: "'Inter', sans-serif",
        color: TEXT_DARK,
        userSelect: "none",
      }}
      aria-label="NovaHealth Appointment Form"
    >
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 24,
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        <span style={{ color: "black" }}>Book Your </span>
        <span style={{ color: PRIMARY_BLUE }}>Appointment</span>
      </h2>

      {submitted && (
        <div
          role="alert"
          style={{
            backgroundColor: "#d1fae5",
            color: "#065f46",
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Thank you! Your appointment request has been submitted.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="fullName"
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: 6,
              fontSize: 15,
            }}
          >
            Full Name <span style={{ color: ERROR_RED }}>*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            style={getInputStyles("fullName")}
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby="fullName-error"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              style={{ color: ERROR_RED, marginTop: 6, fontSize: 14 }}
            >
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: 6,
              fontSize: 15,
            }}
          >
            Email <span style={{ color: ERROR_RED }}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            style={getInputStyles("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-error"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              style={{ color: ERROR_RED, marginTop: 6, fontSize: 14 }}
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="phone"
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: 6,
              fontSize: 15,
            }}
          >
            Phone Number <span style={{ color: ERROR_RED }}>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1234567890"
            value={formData.phone}
            onChange={handleChange}
            style={getInputStyles("phone")}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby="phone-error"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.phone && (
            <p
              id="phone-error"
              role="alert"
              style={{ color: ERROR_RED, marginTop: 6, fontSize: 14 }}
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* Date & Time side by side */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 50%", minWidth: 140 }}>
            <label
              htmlFor="date"
              style={{
                display: "block",
                fontWeight: 600,
                marginBottom: 6,
                fontSize: 15,
              }}
            >
              Date <span style={{ color: ERROR_RED }}>*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              style={getInputStyles("date")}
              aria-invalid={errors.date ? "true" : "false"}
              aria-describedby="date-error"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.date && (
              <p
                id="date-error"
                role="alert"
                style={{ color: ERROR_RED, marginTop: 6, fontSize: 14 }}
              >
                {errors.date}
              </p>
            )}
          </div>

          <div style={{ flex: "1 1 50%", minWidth: 140 }}>
            <label
              htmlFor="time"
              style={{
                display: "block",
                fontWeight: 600,
                marginBottom: 6,
                fontSize: 15,
              }}
            >
              Time <span style={{ color: ERROR_RED }}>*</span>
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              style={getInputStyles("time")}
              aria-invalid={errors.time ? "true" : "false"}
              aria-describedby="time-error"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.time && (
              <p
                id="time-error"
                role="alert"
                style={{ color: ERROR_RED, marginTop: 6, fontSize: 14 }}
              >
                {errors.time}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="message"
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: 6,
              fontSize: 15,
            }}
          >
            Message <span style={{ color: ERROR_RED }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="How can we help you?"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            style={{
              ...getInputStyles("message"),
              resize: "vertical",
            }}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby="message-error"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              style={{ color: ERROR_RED, marginTop: 6, fontSize: 14 }}
            >
              {errors.message}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={submitting ? {} : { scale: 1.05 }}
          whileTap={submitting ? {} : { scale: 0.95 }}
          style={{
            width: "80%",
            padding: "10px 12px",
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            backgroundColor: submitting ? "#9ca3af" : PRIMARY_BLUE,
            border: "none",
            borderRadius: 8,
            cursor: submitting ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
            letterSpacing: 0.3,
            display: "block",
            margin: "0 auto",
            userSelect: "none",
          }}
          aria-busy={submitting}
        >
          {submitting ? "Submitting..." : "Book Appointment"}
        </motion.button>
      </form>
    </motion.section>
  );
}
