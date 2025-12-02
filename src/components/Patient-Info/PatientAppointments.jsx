"use client";

import React, { useState } from "react";

// Initial dummy data for appointments
const defaultAppointments = [
  {
    id: 1,
    date: "2025-09-15",
    time: "10:30",
    doctor: "Dr. Sarah Connor",
    department: "Cardiology",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "2025-09-25",
    time: "14:00",
    doctor: "Dr. John Smith",
    department: "Neurology",
    status: "Pending",
  },
];

// Component to show list of appointments (table for desktop, cards for mobile)
function AppointmentList({ appointments, onCancelRequest }) {
  if (!appointments.length) {
    return (
      <p className="text-center text-gray-600 mb-10">
        You have no scheduled appointments.
      </p>
    );
  }

  // Helper to get status color classes
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      {/* Desktop view */}
      <table className="hidden md:table w-full mb-12 border-collapse">
        <thead>
          <tr className="bg-blue-100 text-blue-800 font-semibold">
            <th className="p-3 border border-blue-200 text-left rounded-tl-lg">Date</th>
            <th className="p-3 border border-blue-200 text-left">Time</th>
            <th className="p-3 border border-blue-200 text-left">Doctor</th>
            <th className="p-3 border border-blue-200 text-left">Department</th>
            <th className="p-3 border border-blue-200 text-left">Status</th>
            <th className="p-3 border border-blue-200 text-center rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(({ id, date, time, doctor, department, status }) => (
            <tr
              key={id}
              className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="p-3 border border-blue-200">{date}</td>
              <td className="p-3 border border-blue-200">{time}</td>
              <td className="p-3 border border-blue-200">{doctor}</td>
              <td className="p-3 border border-blue-200">{department}</td>
              <td className={`p-3 border border-blue-200 font-semibold ${getStatusColor(status)}`}>
                {status}
              </td>
              <td className="p-3 border border-blue-200 text-center">
                <button
                  type="button"
                  onClick={() => onCancelRequest(id)}
                  className="text-red-600 hover:text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  aria-label={`Cancel appointment on ${date} with ${doctor}`}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile view */}
      <div className="md:hidden space-y-6 mb-12">
        {appointments.map(({ id, date, time, doctor, department, status }) => (
          <article
            key={id}
            role="listitem"
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-semibold text-blue-700 text-lg">{date}</p>
                <p className="text-gray-700">{time}</p>
              </div>
              <div
                className={`font-semibold ${getStatusColor(status)}`}
                aria-label={`Status: ${status}`}
              >
                {status}
              </div>
            </div>
            <p>
              <span className="font-semibold">Doctor: </span>
              {doctor}
            </p>
            <p>
              <span className="font-semibold">Department: </span>
              {department}
            </p>
            <button
              type="button"
              onClick={() => onCancelRequest(id)}
              aria-label={`Cancel appointment on ${date} with ${doctor}`}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 transition-colors duration-200"
            >
              Cancel Appointment
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

// Form input component with label, error and accessibility support
function TextInput({ label, id, name, type = "text", value, placeholder, error, onChange, disabled, min, max }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold mb-2 text-gray-900">
        {label} <span className="text-red-600">*</span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        min={min}
        max={max}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="text-red-600 mt-1 text-sm font-medium" role="alert" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

// Modal for confirming cancellation
function CancelConfirmModal({ onCancel, onDismiss }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-dialog-title"
      aria-describedby="cancel-dialog-desc"
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onDismiss();
      }}
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
        <h3 id="cancel-dialog-title" className="text-xl font-semibold mb-4 text-gray-900">
          Cancel Appointment
        </h3>
        <p id="cancel-dialog-desc" className="mb-6 text-gray-700">
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onDismiss}
            className="py-2 px-6 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            No, Keep
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-6 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Yes, Cancel
          </button>
        </div>
        <button
          type="button"
          aria-label="Close cancel confirmation"
          onClick={onDismiss}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState(defaultAppointments);
  const [form, setForm] = useState({
    date: "",
    time: "",
    doctor: "",
    department: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  // Validation logic for appointment form
  function validateForm() {
    const validationErrors = {};
    const todayStr = new Date().toISOString().split("T")[0];

    if (!form.date) {
      validationErrors.date = "Date is required";
    } else if (form.date < todayStr) {
      validationErrors.date = "Date cannot be in the past";
    }

    if (!form.time) {
      validationErrors.time = "Time is required";
    }

    if (!form.doctor.trim()) {
      validationErrors.doctor = "Doctor name is required";
    }

    if (!form.department.trim()) {
      validationErrors.department = "Department is required";
    }

    return validationErrors;
  }

  // Handles input changes, clears error for that field if any
  function handleInputChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  // Handles form submission for new appointment
  async function handleFormSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Mimic network/API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setAppointments((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        date: form.date,
        time: form.time,
        doctor: form.doctor.trim(),
        department: form.department.trim(),
        status: "Pending",
      },
    ]);

    // Reset form state after booking
    setForm({
      date: "",
      time: "",
      doctor: "",
      department: "",
    });

    setIsSubmitting(false);
  }

  // User clicked cancel on appointment
  function requestCancel(id) {
    setAppointmentToCancel(id);
  }

  // Confirm cancellation action
  function confirmCancel() {
    setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentToCancel));
    setAppointmentToCancel(null);
  }

  // Cancel cancellation process
  function dismissCancel() {
    setAppointmentToCancel(null);
  }

  return (
    <section className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold mb-8 text-center">
        <span className="text-black">Your </span>
        <span className="text-blue-700">Appointments</span>
      </h2>

      <AppointmentList appointments={appointments} onCancelRequest={requestCancel} />

      {/* Booking form */}
      <div className="border-t border-gray-300 pt-10">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Book a New Appointment
        </h3>

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <TextInput
            label="Date"
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleInputChange}
            error={errors.date}
            disabled={isSubmitting}
            min={new Date().toISOString().split("T")[0]}
          />

          <TextInput
            label="Time"
            id="time"
            name="time"
            type="time"
            value={form.time}
            onChange={handleInputChange}
            error={errors.time}
            disabled={isSubmitting}
            min="08:00"
            max="18:00"
          />
          <p className="text-xs text-gray-500 mt-1 select-none md:col-span-2">
            Available hours: 08:00 AM - 06:00 PM
          </p>

          <TextInput
            label="Doctor"
            id="doctor"
            name="doctor"
            type="text"
            value={form.doctor}
            onChange={handleInputChange}
            error={errors.doctor}
            disabled={isSubmitting}
            placeholder="Dr. Jane Doe"
          />

          <TextInput
            label="Department"
            id="department"
            name="department"
            type="text"
            value={form.department}
            onChange={handleInputChange}
            error={errors.department}
            disabled={isSubmitting}
            placeholder="Cardiology"
          />

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
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
                  Booking...
                </>
              ) : (
                "Book Appointment"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Cancel confirmation modal */}
      {appointmentToCancel !== null && (
        <CancelConfirmModal onCancel={confirmCancel} onDismiss={dismissCancel} />
      )}
    </section>
  );
}
