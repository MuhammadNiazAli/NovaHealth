"use client";

import React, { useState } from "react";

const defaultAllergies = [
  {
    id: 1,
    allergen: "Peanuts",
    reaction: "Hives, swelling",
    severity: "Severe",
    notes: "Carry epinephrine auto-injector",
  },
  {
    id: 2,
    allergen: "Penicillin",
    reaction: "Rash",
    severity: "Moderate",
    notes: "",
  },
];

const severityLevels = ["Mild", "Moderate", "Severe"];

export default function PatientAllergies() {
  const [allergies, setAllergies] = useState(defaultAllergies);

  const [formData, setFormData] = useState({
    allergen: "",
    reaction: "",
    severity: "",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Basic validation for required fields
  function validateForm() {
    const errors = {};
    if (!formData.allergen.trim()) errors.allergen = "Allergen is required";
    if (!formData.reaction.trim()) errors.reaction = "Reaction is required";
    if (!formData.severity) errors.severity = "Severity is required";
    return errors;
  }

  // Reset form to initial state
  function resetForm() {
    setFormData({
      allergen: "",
      reaction: "",
      severity: "",
      notes: "",
    });
    setFormErrors({});
    setEditingId(null);
  }

  // Handle form field updates and clear errors on change
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  }

  // Add new allergy or update existing one
  async function handleFormSubmit(e) {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((res) => setTimeout(res, 800));

    if (editingId !== null) {
      setAllergies((prev) =>
        prev.map((entry) =>
          entry.id === editingId ? { ...formData, id: editingId } : entry
        )
      );
    } else {
      const nextId = allergies.length
        ? allergies[allergies.length - 1].id + 1
        : 1;

      setAllergies((prev) => [...prev, { ...formData, id: nextId }]);
    }

    resetForm();
    setIsSubmitting(false);
  }

  // Load data into form for editing
  function startEditing(id) {
    const allergy = allergies.find((item) => item.id === id);
    if (allergy) {
      setFormData({ ...allergy });
      setEditingId(id);
      setFormErrors({});
    }
  }

  // Remove allergy entry after user confirmation
  function removeAllergy(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this allergy record?"
    );

    if (!confirmed) return;

    setAllergies((prev) => prev.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <section className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="mb-8 text-center text-3xl font-extrabold">
        <span className="text-black">Allergy </span>
        <span className="text-blue-700">Information</span>
      </h2>

      {/* Allergy table or no data message */}
      {allergies.length === 0 ? (
        <p className="mb-12 text-center text-gray-600">No allergies recorded.</p>
      ) : (
        <div className="mb-12 overflow-x-auto">
          <table className="min-w-[600px] w-full border-collapse text-left">
            <thead>
              <tr className="bg-blue-100 font-semibold text-blue-800">
                <th className="border-blue-200 rounded-tl-lg border p-3">Allergen</th>
                <th className="border-blue-200 border p-3">Reaction</th>
                <th className="border-blue-200 border p-3">Severity</th>
                <th className="border-blue-200 border p-3">Notes</th>
                <th className="border-blue-200 rounded-tr-lg border p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allergies.map(({ id, allergen, reaction, severity, notes }) => (
                <tr
                  key={id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="border-blue-200 border p-3">{allergen}</td>
                  <td className="border-blue-200 border p-3 whitespace-pre-wrap">
                    {reaction}
                  </td>
                  <td className="border-blue-200 border p-3">{severity}</td>
                  <td className="border-blue-200 border p-3 whitespace-pre-wrap">
                    {notes || "-"}
                  </td>
                  <td className="border-blue-200 border p-3 text-center space-x-2">
                    <button
                      type="button"
                      onClick={() => startEditing(id)}
                      aria-label={`Edit allergy ${allergen}`}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAllergy(id)}
                      aria-label={`Delete allergy ${allergen}`}
                      className="focus:outline-none focus:ring-2 focus:ring-red-400 rounded font-semibold text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Allergy Form */}
      <div className="mx-auto max-w-3xl border-t border-gray-300 pt-8">
        <h3 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          {editingId !== null ? "Edit Allergy" : "Add New Allergy"}
        </h3>

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="grid gap-6 gap-x-8 sm:grid-cols-2"
        >
          {/* Allergen input */}
          <div>
            <label
              htmlFor="allergen"
              className="mb-2 block font-semibold text-gray-900"
            >
              Allergen <span className="text-red-600">*</span>
            </label>
            <input
              id="allergen"
              name="allergen"
              type="text"
              placeholder="Peanuts"
              value={formData.allergen}
              onChange={handleInputChange}
              disabled={isSubmitting}
              aria-invalid={!!formErrors.allergen}
              aria-describedby={formErrors.allergen ? "allergen-error" : undefined}
              required
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.allergen ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.allergen && (
              <p
                id="allergen-error"
                role="alert"
                className="mt-1 text-sm font-medium text-red-600"
              >
                {formErrors.allergen}
              </p>
            )}
          </div>

          {/* Reaction input */}
          <div>
            <label
              htmlFor="reaction"
              className="mb-2 block font-semibold text-gray-900"
            >
              Reaction <span className="text-red-600">*</span>
            </label>
            <input
              id="reaction"
              name="reaction"
              type="text"
              placeholder="Hives, swelling"
              value={formData.reaction}
              onChange={handleInputChange}
              disabled={isSubmitting}
              aria-invalid={!!formErrors.reaction}
              aria-describedby={formErrors.reaction ? "reaction-error" : undefined}
              required
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.reaction ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.reaction && (
              <p
                id="reaction-error"
                role="alert"
                className="mt-1 text-sm font-medium text-red-600"
              >
                {formErrors.reaction}
              </p>
            )}
          </div>

          {/* Severity select */}
          <div>
            <label
              htmlFor="severity"
              className="mb-2 block font-semibold text-gray-900"
            >
              Severity <span className="text-red-600">*</span>
            </label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              disabled={isSubmitting}
              aria-invalid={!!formErrors.severity}
              aria-describedby={formErrors.severity ? "severity-error" : undefined}
              required
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.severity ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Select severity
              </option>
              {severityLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {formErrors.severity && (
              <p
                id="severity-error"
                role="alert"
                className="mt-1 text-sm font-medium text-red-600"
              >
                {formErrors.severity}
              </p>
            )}
          </div>

          {/* Notes textarea */}
          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="mb-2 block font-semibold text-gray-900"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Additional information or precautions"
              value={formData.notes}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full resize-none rounded-lg border px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit / Cancel buttons */}
          <div className="sm:col-span-2 mt-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
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
                  Saving...
                </>
              ) : editingId !== null ? (
                "Update Allergy"
              ) : (
                "Add Allergy"
              )}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="ml-4 rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
