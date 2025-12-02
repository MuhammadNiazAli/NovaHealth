"use client";

import React, { useState } from "react";

const PatientPersonalDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation function
  const validate = (data) => {
    const errs = {};

    if (!data.fullName.trim()) {
      errs.fullName = "Full Name is required";
    }

    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
    ) {
      errs.email = "Invalid email address";
    }

    if (!data.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\+?\d{7,15}$/.test(data.phone.trim())) {
      errs.phone = "Enter a valid phone number";
    }

    if (!data.dob) {
      errs.dob = "Date of Birth is required";
    }

    if (!data.gender) {
      errs.gender = "Please select your gender";
    }

    if (!data.address.trim()) {
      errs.address = "Address is required";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((res) => setTimeout(res, 1500));
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
      });
    } catch {
      setErrors({ submit: "Submission failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="personal-details-title"
      className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md"
    >
      <h2
        id="personal-details-title"
        className="text-3xl font-bold mb-6 text-center"
      >
        <span className="text-black">Patient </span>
        <span className="text-blue-700">Personal Details</span>
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            type="text"
            placeholder="Jane Doe"
            required
            disabled={submitting}
            autoComplete="name"
          />
          <FormField
            label="Email Address"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            type="email"
            placeholder="jane@example.com"
            required
            disabled={submitting}
            autoComplete="email"
          />
          <FormField
            label="Phone Number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            type="tel"
            placeholder="+1234567890"
            required
            disabled={submitting}
            autoComplete="tel"
          />
          <FormField
            label="Date of Birth"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
            type="date"
            required
            disabled={submitting}
            max={new Date().toISOString().split("T")[0]}
          />
          <SelectField
            label="Gender"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            error={errors.gender}
            disabled={submitting}
            required
            options={[
              { value: "", label: "Select Gender" },
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "nonbinary", label: "Non-binary" },
              { value: "other", label: "Other" },
              { value: "preferNotToSay", label: "Prefer not to say" },
            ]}
          />
          <TextAreaField
            label="Address"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="123 Main St, City, Country"
            required
            disabled={submitting}
            rows={3}
            className="md:col-span-2"
          />
        </div>

        {errors.submit && (
          <p className="mt-4 text-red-600 font-semibold text-center" role="alert">
            {errors.submit}
          </p>
        )}

        {success && (
          <p className="mt-4 text-green-600 font-semibold text-center" role="alert">
            Details submitted successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          aria-live="polite"
          className="mt-8 w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center"
        >
          {submitting ? (
            <>
              <Spinner />
              <span className="ml-2">Submitting...</span>
            </>
          ) : (
            "Submit Details"
          )}
        </button>
      </form>
    </section>
  );
};

// Reusable input component
const FormField = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  autoComplete,
  max,
}) => (
  <div>
    <label htmlFor={id} className="block font-semibold mb-1 text-gray-800">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      max={max}
      autoComplete={autoComplete}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      required={required}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p id={`${id}-error`} className="text-red-600 mt-1 text-sm" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Select dropdown component
const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  options,
  disabled,
  required,
}) => (
  <div>
    <label htmlFor={id} className="block font-semibold mb-1 text-gray-800">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      required={required}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      {options.map(({ value: val, label: lbl }) => (
        <option key={val} value={val}>
          {lbl}
        </option>
      ))}
    </select>
    {error && (
      <p id={`${id}-error`} className="text-red-600 mt-1 text-sm" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Textarea component
const TextAreaField = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  rows = 3,
  className = "",
}) => (
  <div className={className}>
    <label htmlFor={id} className="block font-semibold mb-1 text-gray-800">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      rows={rows}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      required={required}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors resize-none ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p id={`${id}-error`} className="text-red-600 mt-1 text-sm" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Spinner component
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
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

export default PatientPersonalDetails;
