'use client';

import React, { useState, useMemo } from 'react';
import {
  HiUserGroup,
  HiUserAdd,
  HiUserRemove,
  HiUserCircle,
  HiRefresh,
} from 'react-icons/hi';
import { motion } from 'framer-motion';

const PATIENT_STATUSES = [
  {
    id: 'active',
    name: 'Active',
    count: 180,
    icon: <HiUserGroup />,
    color: '#3b82f6', // blue-500
  },
  {
    id: 'inactive',
    name: 'Inactive',
    count: 65,
    icon: <HiUserRemove />,
    color: '#6b7280', // gray-500
  },
  {
    id: 'pending',
    name: 'Pending',
    count: 25,
    icon: <HiUserAdd />,
    color: '#f59e0b', // amber-500
  },
  {
    id: 'discharged',
    name: 'Discharged',
    count: 40,
    icon: <HiUserCircle />,
    color: '#10b981', // emerald-500
  },
];

// Utility to simulate random refresh
function generateRandomPatientCounts() {
  return PATIENT_STATUSES.map((status) => ({
    ...status,
    count: Math.max(5, status.count + (Math.floor(Math.random() * 40) - 20)),
  }));
}

const progressVariants = {
  initial: { width: 0 },
  animate: (percent) => ({
    width: `${percent}%`,
    transition: { duration: 0.8, ease: 'easeInOut' },
  }),
};

const DashboardPatients = () => {
  const [patients, setPatients] = useState(PATIENT_STATUSES);
  const [loading, setLoading] = useState(false);

  const totalPatients = useMemo(
    () => patients.reduce((sum, p) => sum + p.count, 0),
    [patients]
  );

  const handleRefresh = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setPatients(generateRandomPatientCounts());
      setLoading(false);
    }, 1200);
  };

  return (
    <section
      aria-labelledby="patients-title"
      className="max-w-5xl mx-auto bg-white  rounded-xl p-8 sm:p-12"
      style={{ fontFamily: "'Inter', sans-serif", color: '#111827' }}
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-5 mb-8">
        <h2
          id="patients-title"
          className="text-3xl font-extrabold tracking-tight text-gray-900 select-none"
        >
          Patient Overview
        </h2>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          aria-label="Refresh patient data"
          className={`mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition ${
            loading
              ? 'cursor-not-allowed bg-blue-100 text-blue-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <HiRefresh
            className={`w-5 h-5 ${
              loading ? 'animate-spin text-blue-600' : 'text-white'
            }`}
            aria-hidden="true"
          />
          Refresh
        </button>
      </header>

      <div className="flex flex-col md:flex-row md:space-x-10 gap-8">
        {/* Total Patients Card */}
        <article
          className="flex-1 bg-blue-50 rounded-xl p-8 flex flex-col justify-center items-center shadow-md hover:shadow-lg transition-shadow"
          style={{ minWidth: 240 }}
          aria-label="Total Patients"
        >
          <HiUserGroup
            className="w-16 h-16 text-blue-600 mb-4"
            aria-hidden="true"
          />
          <p
            className="text-gray-700 text-xl font-semibold tracking-wide mb-2"
            style={{ letterSpacing: '0.03em' }}
          >
            Total Patients
          </p>
          <p
            className="text-5xl font-extrabold text-blue-700"
            style={{ lineHeight: 1.1 }}
          >
            {totalPatients}
          </p>
        </article>

        {/* Breakdown Cards */}
        <section className="flex-2 flex flex-col space-y-6 w-full md:w-auto">
          {patients.map(({ id, name, count, icon, color }) => {
            const percent = totalPatients
              ? Math.round((count / totalPatients) * 100)
              : 0;

            return (
              <article
                key={id}
                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-default select-none"
                style={{ minWidth: 280 }}
                tabIndex={0}
                aria-label={`${name} patients: ${count}, which is ${percent}% of total`}
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
                    aria-label={`${count} patients in ${name}`}
                  >
                    {count}
                  </span>
                </div>

                {/* Progress bar */}
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
                    key={percent}
                    initial="initial"
                    animate="animate"
                    variants={progressVariants}
                    custom={percent}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
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

export default DashboardPatients;
