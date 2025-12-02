"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const STATUSES = ["All", "Confirmed", "Pending", "Cancelled"];

const statusBadgeClasses = {
  Confirmed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

const sampleAppointments = [
  {
    id: "a1",
    datetime: new Date("2025-08-10T09:30"),
    patientName: "John Doe",
    appointmentType: "Consultation",
    status: "Confirmed",
  },
  {
    id: "a2",
    datetime: new Date("2025-08-10T11:00"),
    patientName: "Alice Smith",
    appointmentType: "Therapy",
    status: "Pending",
  },
  {
    id: "a3",
    datetime: new Date("2025-08-11T14:00"),
    patientName: "Michael Johnson",
    appointmentType: "Check-up",
    status: "Cancelled",
  },
  {
    id: "a4",
    datetime: new Date("2025-08-12T10:15"),
    patientName: "Emma Brown",
    appointmentType: "Surgery",
    status: "Confirmed",
  },
  {
    id: "a5",
    datetime: new Date("2025-08-13T08:45"),
    patientName: "Liam Wilson",
    appointmentType: "Emergency",
    status: "Confirmed",
  },
];

function StatusBadge({ status }) {
  const classes = statusBadgeClasses[status] || "bg-gray-100 text-gray-700";
  return (
    <span
      className={`ml-0 sm:ml-4 inline-block px-4 py-1.5 rounded-full text-xs font-semibold select-none ${classes}`}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}

function AppointmentItem({ appointment, onSelect }) {
  const { datetime, patientName, appointmentType, status } = appointment;

  const dateStr = datetime.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeStr = datetime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(appointment);
    }
  }

  return (
    <li
      key={appointment.id}
      tabIndex={0}
      role="button"
      onClick={() => onSelect(appointment)}
      onKeyDown={handleKeyDown}
      aria-label={`Appointment with ${patientName} on ${datetime.toLocaleString()}, status ${status}`}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 hover:bg-indigo-50 focus:bg-indigo-100 focus:outline-none cursor-pointer transition rounded-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 flex-1 min-w-0">
        <time
          dateTime={datetime.toISOString()}
          className="text-gray-700 font-mono text-sm whitespace-nowrap"
          title={datetime.toLocaleString()}
        >
          {dateStr} &bull; {timeStr}
        </time>

        <p className="text-gray-900 font-semibold truncate" title={patientName}>
          {patientName}
        </p>

        <p
          className="text-indigo-600 font-semibold whitespace-nowrap"
          title={appointmentType}
        >
          {appointmentType}
        </p>
      </div>

      <StatusBadge status={status} />
    </li>
  );
}

export default function AppointmentsList({ appointments = sampleAppointments }) {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const visibleAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          selectedStatus === "All" || appointment.status === selectedStatus
      )
      .sort((a, b) => a.datetime - b.datetime);
  }, [appointments, selectedStatus]);

  function showDetails(appointment) {
    alert(
      `Appointment Details:\n` +
        `Patient: ${appointment.patientName}\n` +
        `Type: ${appointment.appointmentType}\n` +
        `Date & Time: ${appointment.datetime.toLocaleString()}\n` +
        `Status: ${appointment.status}`
    );
  }

  return (
    <motion.section
      aria-label="Appointments List"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg select-none"
    >
      {/* Title & Filter */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Upcoming{" "}
          <span className="text-blue-600" aria-hidden="true">
            Appointments
          </span>
        </h1>

        <div className="flex items-center gap-3">
          <label
            htmlFor="filterStatus"
            className="font-semibold text-gray-700 whitespace-nowrap"
          >
            Filter by Status:
          </label>
          <select
            id="filterStatus"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {STATUSES.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Appointments List */}
      <ul className="divide-y divide-gray-200 max-h-[480px] overflow-y-auto rounded-lg">
        {visibleAppointments.length === 0 ? (
          <li className="py-8 text-center text-gray-500 italic select-text">
            No appointments found.
          </li>
        ) : (
          visibleAppointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onSelect={showDetails}
            />
          ))
        )}
      </ul>
    </motion.section>
  );
}
