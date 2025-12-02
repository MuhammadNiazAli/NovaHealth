"use client";

import React, { useState } from "react";

const defaultMedications = [
  {
    id: 1,
    name: "Atorvastatin",
    dosage: "20 mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Emily Clark",
    startDate: "2024-06-01",
    notes: "Take with food",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500 mg",
    frequency: "Twice daily",
    prescribedBy: "Dr. John Smith",
    startDate: "2023-11-15",
    notes: "",
  },
];

const PatientMedications = () => {
  const [medList, setMedList] = useState(defaultMedications);
  const [formValues, setFormValues] = useState(getEmptyForm());
  const [formErrors, setFormErrors] = useState({});
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getEmptyForm() {
    return {
      name: "",
      dosage: "",
      frequency: "",
      prescribedBy: "",
      startDate: "",
      notes: "",
    };
  }

  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = "Medication name is required.";
    if (!formValues.dosage.trim()) errors.dosage = "Dosage is required.";
    if (!formValues.frequency.trim()) errors.frequency = "Frequency is required.";
    if (!formValues.prescribedBy.trim()) errors.prescribedBy = "Prescriber is required.";
    if (!formValues.startDate) errors.startDate = "Start date is required.";
    return errors;
  };

  const clearForm = () => {
    setFormValues(getEmptyForm());
    setFormErrors({});
    setCurrentlyEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate async save
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (currentlyEditingId !== null) {
        // Update existing medication
        setMedList((prev) =>
          prev.map((med) =>
            med.id === currentlyEditingId ? { ...formValues, id: currentlyEditingId } : med
          )
        );
      } else {
        // Add new medication with unique ID
        const newId = medList.length ? medList[medList.length - 1].id + 1 : 1;
        setMedList((prev) => [...prev, { ...formValues, id: newId }]);
      }

      clearForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (id) => {
    const medToEdit = medList.find((med) => med.id === id);
    if (medToEdit) {
      setFormValues(medToEdit);
      setCurrentlyEditingId(id);
      setFormErrors({});
    }
  };

  const removeMedication = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this medication from your list?"
    );
    if (!confirmed) return;

    setMedList((prev) => prev.filter((med) => med.id !== id));

    if (currentlyEditingId === id) {
      clearForm();
    }
  };

  return (
    <section className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold mb-8 text-center">
        <span className="text-black">Current </span>
        <span className="text-blue-700">Medications</span>
      </h2>

      {/* Medications Table */}
      {medList.length === 0 ? (
        <p className="text-center text-gray-600 mb-10">No medications added yet.</p>
      ) : (
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse text-left min-w-[600px]">
            <thead>
              <tr className="bg-blue-100 text-blue-800 font-semibold">
                <th className="p-3 border border-blue-200 rounded-tl-lg">Medication</th>
                <th className="p-3 border border-blue-200">Dosage</th>
                <th className="p-3 border border-blue-200">Frequency</th>
                <th className="p-3 border border-blue-200">Prescribed By</th>
                <th className="p-3 border border-blue-200">Start Date</th>
                <th className="p-3 border border-blue-200">Notes</th>
                <th className="p-3 border border-blue-200 rounded-tr-lg text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medList.map(
                ({ id, name, dosage, frequency, prescribedBy, startDate, notes }) => (
                  <tr
                    key={id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-3 border border-blue-200">{name}</td>
                    <td className="p-3 border border-blue-200">{dosage}</td>
                    <td className="p-3 border border-blue-200">{frequency}</td>
                    <td className="p-3 border border-blue-200">{prescribedBy}</td>
                    <td className="p-3 border border-blue-200">{startDate}</td>
                    <td className="p-3 border border-blue-200 whitespace-pre-wrap">
                      {notes || "-"}
                    </td>
                    <td className="p-3 border border-blue-200 text-center space-x-2">
                      <button
                        type="button"
                        onClick={() => startEditing(id)}
                        aria-label={`Edit medication ${name}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeMedication(id)}
                        aria-label={`Delete medication ${name}`}
                        className="text-red-600 hover:text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Medication Form */}
      <div className="border-t border-gray-300 pt-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          {currentlyEditingId !== null ? "Edit Medication" : "Add New Medication"}
        </h3>

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
        >
          {/* Medication Name */}
          <FormInput
            id="name"
            label="Medication Name"
            value={formValues.name}
            onChange={handleInputChange}
            error={formErrors.name}
            placeholder="Atorvastatin"
            disabled={isSubmitting}
            required
          />

          {/* Dosage */}
          <FormInput
            id="dosage"
            label="Dosage"
            value={formValues.dosage}
            onChange={handleInputChange}
            error={formErrors.dosage}
            placeholder="20 mg"
            disabled={isSubmitting}
            required
          />

          {/* Frequency */}
          <FormInput
            id="frequency"
            label="Frequency"
            value={formValues.frequency}
            onChange={handleInputChange}
            error={formErrors.frequency}
            placeholder="Once daily"
            disabled={isSubmitting}
            required
          />

          {/* Prescribed By */}
          <FormInput
            id="prescribedBy"
            label="Prescribed By"
            value={formValues.prescribedBy}
            onChange={handleInputChange}
            error={formErrors.prescribedBy}
            placeholder="Dr. John Doe"
            disabled={isSubmitting}
            required
          />

          {/* Start Date */}
          <FormDateInput
            id="startDate"
            label="Start Date"
            value={formValues.startDate}
            onChange={handleInputChange}
            error={formErrors.startDate}
            disabled={isSubmitting}
            max={new Date().toISOString().split("T")[0]}
            required
          />

          {/* Notes */}
          <div className="sm:col-span-2">
            <label htmlFor="notes" className="block font-semibold mb-2 text-gray-900">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formValues.notes}
              onChange={handleInputChange}
              disabled={isSubmitting}
              rows={3}
              placeholder="Any additional info or instructions"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  Saving...
                </>
              ) : currentlyEditingId !== null ? (
                "Update Medication"
              ) : (
                "Add Medication"
              )}
            </button>

            {currentlyEditingId !== null && (
              <button
                type="button"
                onClick={clearForm}
                className="ml-4 py-3 px-6 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

// Reusable controlled input component
const FormInput = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  disabled,
  required,
}) => (
  <div>
    <label htmlFor={id} className="block font-semibold mb-2 text-gray-900">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      required={required}
      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p
        id={`${id}-error`}
        role="alert"
        className="text-red-600 mt-1 text-sm font-medium"
      >
        {error}
      </p>
    )}
  </div>
);

// Reusable controlled date input component
const FormDateInput = ({
  id,
  label,
  value,
  onChange,
  error,
  disabled,
  max,
  required,
}) => (
  <div>
    <label htmlFor={id} className="block font-semibold mb-2 text-gray-900">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      type="date"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      max={max}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      required={required}
      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p
        id={`${id}-error`}
        role="alert"
        className="text-red-600 mt-1 text-sm font-medium"
      >
        {error}
      </p>
    )}
  </div>
);

// Spinner SVG for loading state
const SpinnerIcon = () => (
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

export default PatientMedications;
