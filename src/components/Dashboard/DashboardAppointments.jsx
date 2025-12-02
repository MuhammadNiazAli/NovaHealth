'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  HiCalendar,
  HiClock,
  HiUserGroup,
  HiRefresh,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const APPOINTMENT_CATEGORIES = [
  { id: 'general', name: 'General', count: 125, icon: <HiUserGroup />, color: '#4f46e5' },
  { id: 'dental', name: 'Dental', count: 85, icon: <HiOutlineCheckCircle />, color: '#10b981' },
  { id: 'cardiology', name: 'Cardiology', count: 45, icon: <HiClock />, color: '#ef4444' },
  { id: 'pediatrics', name: 'Pediatrics', count: 70, icon: <HiCalendar />, color: '#f59e0b' },
];

// Utility to simulate random data refresh (new counts)
function generateRandomCounts() {
  return APPOINTMENT_CATEGORIES.map((cat) => ({
    ...cat,
    count: Math.max(5, cat.count + (Math.floor(Math.random() * 40) - 20)),
  }));
}

const progressVariants = {
  initial: { width: 0 },
  animate: (percent) => ({
    width: `${percent}%`,
    transition: { duration: 0.8, ease: 'easeInOut' },
  }),
};

const DashboardAppointments = () => {
  const [appointments, setAppointments] = useState(APPOINTMENT_CATEGORIES);
  const [loading, setLoading] = useState(false);

  // Total appointments count (memoized)
  const totalAppointments = useMemo(
    () => appointments.reduce((sum, a) => sum + a.count, 0),
    [appointments]
  );

  // Refresh data handler
  const handleRefresh = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setAppointments(generateRandomCounts());
      setLoading(false);
    }, 1200);
  };

  return (
    <section
      aria-labelledby="appointments-title"
      className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 sm:p-12"
      style={{ fontFamily: "'Inter', sans-serif", color: '#111827' }}
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-5 mb-8">
        <h2
          id="appointments-title"
          className="text-3xl font-extrabold tracking-tight text-gray-900 select-none"
        >
          Appointment Overview
        </h2>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          aria-label="Refresh appointment data"
          className={`mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition ${
            loading
              ? 'cursor-not-allowed bg-indigo-100 text-indigo-600'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <HiRefresh
            className={`w-5 h-5 ${
              loading ? 'animate-spin text-indigo-600' : 'text-white'
            }`}
            aria-hidden="true"
          />
          Refresh
        </button>
      </header>

      <div className="flex flex-col md:flex-row md:space-x-10 gap-8">
        {/* Total Appointments Card */}
        <article
          className="flex-1 bg-indigo-50 rounded-xl p-8 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-shadow"
          style={{ minWidth: 240 }}
          aria-label="Total Appointments"
        >
          <HiCalendar
            className="w-16 h-16 text-indigo-600 mb-4"
            aria-hidden="true"
          />
          <p
            className="text-gray-700 text-xl font-semibold tracking-wide mb-2"
            style={{ letterSpacing: '0.03em' }}
          >
            Total Appointments
          </p>
          <p
            className="text-5xl font-extrabold text-indigo-700"
            style={{ lineHeight: 1.1 }}
          >
            {totalAppointments}
          </p>
        </article>

        {/* Breakdown Cards */}
        <section className="flex-2 flex flex-col space-y-6 w-full md:w-auto">
          {appointments.map(({ id, name, count, icon, color }) => {
            // Calculate % of total for progress bar
            const percent = totalAppointments
              ? Math.round((count / totalAppointments) * 100)
              : 0;

            return (
              <article
                key={id}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-default select-none"
                style={{ minWidth: 280 }}
                tabIndex={0}
                aria-label={`${name} appointments: ${count}, which is ${percent}% of total`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: color + '33',
                      color: color,
                      flexShrink: 0,
                      fontSize: '1.6rem',
                      lineHeight: 1,
                    }}
                  >
                    {icon}
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-900 flex-grow"
                    style={{ userSelect: 'none' }}
                  >
                    {name}
                  </h3>
                  <span
                    className="ml-auto text-gray-700 font-bold text-lg"
                    aria-label={`${count} appointments in ${name}`}
                  >
                    {count}
                  </span>
                </div>

                {/* Progress bar container with tooltip */}
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percent}
                  className="w-full h-3 rounded-full bg-gray-300 relative"
                  tabIndex={-1}
                  aria-describedby={`${id}-percent-tooltip`}
                >
                  <motion.div
                    key={percent} // re-animate when percent changes
                    initial="initial"
                    animate="animate"
                    variants={progressVariants}
                    custom={percent}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />

                  {/* Tooltip */}
                  <span
                    id={`${id}-percent-tooltip`}
                    role="tooltip"
                    className="absolute -top-7 left-[calc(var(--percent)*1%)] -translate-x-1/2 px-2 py-1 text-xs font-semibold text-white bg-gray-800 rounded opacity-90 select-none pointer-events-none"
                    style={{
                      '--percent': percent,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {percent}%
                  </span>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </section>
  );
};

export default DashboardAppointments;
