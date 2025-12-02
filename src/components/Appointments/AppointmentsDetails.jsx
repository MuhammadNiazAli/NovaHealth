"use client";

import React, { useState, useEffect, useRef } from "react";

const exampleAppointment = {
  patient: "John Doe",
  type: "Consultation",
  datetime: new Date("2025-08-10T09:30"),
  status: "Confirmed",
  notes: "Patient has a history of hypertension.\nDiscuss medication adjustments.",
};

const statusStyles = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function AppointmentDetailsPanel() {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const detailsRef = useRef(null);

  // Automatically focus the details panel when it becomes visible for accessibility
  useEffect(() => {
    if (isDetailsVisible && detailsRef.current) {
      detailsRef.current.focus();
    }
  }, [isDetailsVisible]);

  // Toggle details visibility
  const toggleDetails = () => setIsDetailsVisible((visible) => !visible);

  return (
    <main className="my-10 flex justify-center p-6">
      {!isDetailsVisible ? (
        <button
          type="button"
          onClick={toggleDetails}
          className="bg-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
          aria-label="Show appointment details"
        >
          Show Appointment Details
        </button>
      ) : (
        <section
          ref={detailsRef}
          tabIndex={-1}
          role="dialog"
          aria-label="Appointment Details"
          className="max-w-xl mx-auto rounded-3xl bg-white p-10 shadow-2xl select-none outline-none focus:ring-4 focus:ring-indigo-300"
        >
          {/* Header */}
          <header className="mb-8 flex items-center justify-between">
            <h2 className="leading-tight text-3xl font-extrabold text-gray-900">
              Appointment <span className="text-blue-600">Details</span>
            </h2>

            <button
              type="button"
              onClick={toggleDetails}
              aria-label="Close appointment details"
              className="rounded-full p-2 text-gray-500 transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>

          {/* Appointment Content */}
          <div className="space-y-8 text-gray-800 text-lg">
            <section>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Patient</h3>
              <p>{exampleAppointment.patient}</p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Appointment Type</h3>
              <p className="font-semibold text-blue-600">{exampleAppointment.type}</p>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Date &amp; Time</h3>
              <time
                dateTime={exampleAppointment.datetime.toISOString()}
                className="font-mono text-base text-gray-700"
              >
                {exampleAppointment.datetime.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at{" "}
                {exampleAppointment.datetime.toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Status</h3>
              <span
                className={`inline-block select-none rounded-full px-5 py-2 text-sm font-semibold ${
                  statusStyles[exampleAppointment.status] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {exampleAppointment.status}
              </span>
            </section>

            <section>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Notes</h3>
              <p className="whitespace-pre-line text-gray-700">{exampleAppointment.notes}</p>
            </section>
          </div>
        </section>
      )}
    </main>
  );
}
