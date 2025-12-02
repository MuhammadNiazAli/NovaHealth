'use client';

import React, { useState } from 'react';
import { HiMail, HiPencilAlt, HiCheckCircle, HiOutlineMail } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_MESSAGES = [
  {
    id: '1',
    sender: 'John Doe',
    avatar: 'https://i.pravatar.cc/40?u=john',
    preview: 'Hi Dr. Admin, I wanted to check my appointment status...',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    sender: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/40?u=jane',
    preview: 'Thank you for your help during my last visit.',
    time: '1 hour ago',
    read: true,
  },
  {
    id: '3',
    sender: 'Mark Lee',
    avatar: 'https://i.pravatar.cc/40?u=mark',
    preview: 'Could you please reschedule my dental cleaning?',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    sender: 'Anna Johnson',
    avatar: 'https://i.pravatar.cc/40?u=anna',
    preview: 'I have some questions about my recent lab results.',
    time: 'Yesterday',
    read: true,
  },
];

const DashboardMessages = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const toggleReadStatus = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: !msg.read } : msg))
    );
  };

  return (
    <section
      aria-labelledby="messages-title"
      className="max-w-4xl mx-auto bg-white rounded-xl my-10 p-8 sm:p-12"
      style={{ fontFamily: "'Inter', sans-serif", color: '#111827' }}
    >
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-5 mb-8">
        <h2
          id="messages-title"
          className="text-3xl font-extrabold tracking-tight text-gray-900 select-none"
        >
          Messages
        </h2>
        <button
          type="button"
          aria-label="Compose new message"
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
        >
          <HiPencilAlt className="w-5 h-5" aria-hidden="true" />
          New Message
        </button>
      </header>

      <div
        className="max-h-[420px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        role="list"
      >
        <AnimatePresence>
          {messages.map(({ id, sender, avatar, preview, time, read }) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              layout
              role="listitem"
              tabIndex={0}
              onClick={() => toggleReadStatus(id)}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition shadow-sm
                ${
                  read
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-white font-semibold text-gray-900 shadow-md hover:shadow-lg'
                }
                focus:outline-none   focus:ring-offset-1`}
              aria-label={`Message from ${sender}, ${
                read ? 'read' : 'unread'
              }. Click to mark as ${read ? 'unread' : 'read'}.`}
            >
              <img
                src={avatar}
                alt={`Avatar of ${sender}`}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-grow min-w-0">
                <p className="truncate">{sender}</p>
                <p className="truncate text-sm mt-0.5">{preview}</p>
              </div>
              <div className="flex flex-col items-end flex-shrink-0 text-xs text-gray-500 min-w-[60px]">
                <time dateTime={time}>{time}</time>
                {read ? (
                  <HiCheckCircle className="w-5 h-5 mt-1 text-green-600" aria-hidden="true" />
                ) : (
                  <HiOutlineMail className="w-5 h-5 mt-1 text-indigo-600" aria-hidden="true" />
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DashboardMessages;
