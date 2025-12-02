"use client";

import React, { useState } from "react";

const CONTACT_OPTIONS = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "sms", label: "SMS" },
];

// Checkbox group for contact methods
function ContactMethodCheckbox({ id, label, checked, onToggle }) {
  return (
    <label
      htmlFor={id}
      className="inline-flex items-center cursor-pointer select-none"
    >
      <input
        type="checkbox"
        id={id}
        name="contactMethods"
        value={id}
        checked={checked}
        onChange={onToggle}
        className="form-checkbox h-5 w-5 text-blue-700 transition duration-150 ease-in-out"
      />
      <span className="ml-2 text-gray-900 text-base">{label}</span>
    </label>
  );
}

export default function PatientContactPreferences() {
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [preferredTime, setPreferredTime] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Toggle method selection and clear error if needed
  function handleToggleMethod(methodId) {
    setSelectedMethods((current) => {
      const isSelected = current.includes(methodId);
      return isSelected
        ? current.filter((m) => m !== methodId)
        : [...current, methodId];
    });
    if (formErrors.methods) {
      setFormErrors((errors) => ({ ...errors, methods: undefined }));
    }
  }

  // Handle select change and clear error if needed
  function handleTimeChange(e) {
    setPreferredTime(e.target.value);
    if (formErrors.time) {
      setFormErrors((errors) => ({ ...errors, time: undefined }));
    }
  }

  // Validate before submit, set errors if any
  function validateForm() {
    const errors = {};
    if (selectedMethods.length === 0) {
      errors.methods = "Please select at least one contact method.";
    }
    if (!preferredTime) {
      errors.time = "Please select the best time to contact.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    alert(
      `Preferences saved:\nMethods: ${selectedMethods.join(
        ", "
      )}\nBest time to contact: ${preferredTime}`
    );
  }

  return (
    <section
      aria-labelledby="contact-preferences-title"
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md my-10"
    >
      <h2
        id="contact-preferences-title"
        className="text-3xl font-extrabold text-blue-700 mb-6 text-center"
      >
        Contact Preferences
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Contact Methods */}
        <fieldset className="mb-6">
          <legend className="text-lg font-semibold text-gray-700 mb-3">
            Preferred Contact Methods <span className="text-red-600">*</span>
          </legend>

          <div className="flex flex-wrap gap-6">
            {CONTACT_OPTIONS.map(({ id, label }) => (
              <ContactMethodCheckbox
                key={id}
                id={id}
                label={label}
                checked={selectedMethods.includes(id)}
                onToggle={() => handleToggleMethod(id)}
              />
            ))}
          </div>

          {formErrors.methods && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {formErrors.methods}
            </p>
          )}
        </fieldset>

        {/* Best Time to Contact */}
        <div className="mb-6">
          <label
            htmlFor="preferredTime"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Best Time to Contact <span className="text-red-600">*</span>
          </label>

          <select
            id="preferredTime"
            name="preferredTime"
            value={preferredTime}
            onChange={handleTimeChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
              formErrors.time ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={formErrors.time ? "true" : "false"}
            aria-describedby={formErrors.time ? "preferredTime-error" : undefined}
            required
          >
            <option value="" disabled>
              Select a time
            </option>
            <option value="morning">Morning (8AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 4PM)</option>
            <option value="evening">Evening (4PM - 8PM)</option>
          </select>

          {formErrors.time && (
            <p
              id="preferredTime-error"
              className="mt-2 text-sm text-red-600"
              role="alert"
            >
              {formErrors.time}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Save Preferences
        </button>
      </form>
    </section>
  );
}
