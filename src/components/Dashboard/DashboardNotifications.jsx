'use client';

import React, { useState } from 'react';
import {
  HiBell,
  HiCheckCircle,
  HiOutlineBell,
  HiX,
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

// Sample notification data
const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New appointment booked',
    description: 'Patient John Doe booked a General appointment.',
    time: '2 minutes ago',
    read: false,
    icon: <HiBell className="w-6 h-6 text-indigo-600" />,
  },
  {
    id: '2',
    title: 'Lab results ready',
    description: 'Lab results for patient Jane Smith are now available.',
    time: '15 minutes ago',
    read: false,
    icon: <HiCheckCircle className="w-6 h-6 text-green-600" />,
  },
  {
    id: '3',
    title: 'Appointment canceled',
    description: 'Patient Mark Lee canceled his Dental appointment.',
    time: '1 hour ago',
    read: true,
    icon: <HiX className="w-6 h-6 text-red-600" />,
  },
  {
    id: '4',
    title: 'System maintenance',
    description: 'Scheduled maintenance on August 15th from 1am-3am.',
    time: 'Yesterday',
    read: true,
    icon: <HiOutlineBell className="w-6 h-6 text-yellow-600" />,
  },
];

const DashboardNotifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [markingAll, setMarkingAll] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mark all notifications as read
  const handleMarkAllRead = () => {
    if (markingAll) return;
    setMarkingAll(true);
    setTimeout(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setMarkingAll(false);
    }, 1000);
  };

  // Toggle read/unread for a single notification
  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <section
      aria-labelledby="notifications-title"
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-12 my-10"
      style={{ fontFamily: "'Inter', sans-serif", color: '#111827' }}
    >
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-5 mb-8">
        <h2
          id="notifications-title"
          className="text-3xl font-extrabold tracking-tight text-gray-900 select-none"
        >
          Notifications
        </h2>

        <button
          onClick={handleMarkAllRead}
          disabled={markingAll || unreadCount === 0}
          aria-label="Mark all notifications as read"
          className={`mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition
            ${
              markingAll || unreadCount === 0
                ? 'cursor-not-allowed bg-indigo-100 text-indigo-400'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
        >
          {markingAll ? (
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
          ) : (
            <HiCheckCircle className="w-5 h-5" aria-hidden="true" />
          )}
          Mark All Read
        </button>
      </header>

      <div
        className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        role="list"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        <AnimatePresence>
          {notifications.map(({ id, title, description, time, read, icon }) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              layout
              role="listitem"
              tabIndex={0}
              onClick={() => toggleReadStatus(id)}
              className={`flex items-start gap-4 p-4 rounded-lg shadow-sm cursor-pointer transition
                ${
                  read
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-white text-gray-900 font-semibold shadow-md hover:shadow-lg'
                }
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1`}
              aria-label={`${title}. ${read ? 'Read' : 'Unread'}. Click to mark as ${
                read ? 'unread' : 'read'
              }.`}
            >
              <div
                className={`flex-shrink-0 rounded-full p-2 ${
                  read ? 'bg-gray-300' : 'bg-indigo-600 text-white'
                }`}
                aria-hidden="true"
              >
                {icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg">{title}</h3>
                <p className="text-sm mt-1">{description}</p>
                <time className="text-xs text-gray-500 mt-1 block" dateTime={time}>
                  {time}
                </time>
              </div>
              <div className="ml-4 flex items-center">
                {read ? (
                  <HiCheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                ) : (
                  <HiOutlineBell className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DashboardNotifications;
