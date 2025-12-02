"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  {
    id: 1,
    title: "How to Book an Appointment",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual video ID
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: 2,
    title: "Accessing Your Medical Records",
    youtubeId: "eVTXPUF4Oz4",
    thumbnail: "https://img.youtube.com/vi/eVTXPUF4Oz4/hqdefault.jpg",
  },
  {
    id: 3,
    title: "Patient Support & Assistance Explained",
    youtubeId: "M7lc1UVf-VE",
    thumbnail: "https://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg",
  },
  {
    id: 4,
    title: "General FAQ Overview",
    youtubeId: "V-_O7nl0Ii0",
    thumbnail: "https://img.youtube.com/vi/V-_O7nl0Ii0/hqdefault.jpg",
  },
];

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
};

export default function FaqsVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const closeModal = () => setSelectedVideo(null);

  return (
    <section
      aria-label="FAQ related videos"
      className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16"
    >
      <h2 className="text-3xl font-extrabold text-black mb-12 text-center select-text">
        FAQ <span className="text-blue-700">Videos</span>
      </h2>

      {/* Video Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map(({ id, title, thumbnail }) => (
          <button
            key={id}
            onClick={() => setSelectedVideo(id)}
            aria-label={`Play video: ${title}`}
            className="relative rounded-lg overflow-hidden shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <img
              src={thumbnail}
              alt={`Thumbnail of video: ${title}`}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="p-3 bg-white">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center truncate">
                {title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Modal for video playback */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
            aria-labelledby="video-modal-title"
            tabIndex={-1}
          >
            <motion.div
              className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                aria-label="Close video modal"
                className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>

              <iframe
                id="video-modal-title"
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${
                  videos.find((v) => v.id === selectedVideo)?.youtubeId
                }?autoplay=1&rel=0`}
                title={videos.find((v) => v.id === selectedVideo)?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
