"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

// Testimonial data — videos and content
const testimonialData = [
  {
    id: 1,
    videoUrl: "https://cuberto.com/assets/showreel/short.mp4",
    name: "Lucas Anderson",
    feedback:
      "An outstanding experience with a truly dedicated team. Their professionalism shines through every step.",
    rating: 5,
  },
  {
    id: 2,
    videoUrl: "https://cuberto.com/assets/projects/puntopago/cover.mp4",
    name: "Maria Gonzales",
    feedback:
      "Their attention to detail and personalized care exceeded my expectations. Highly recommend!",
    rating: 4,
  },
  {
    id: 3,
    videoUrl: "https://cuberto.com/assets/projects/kzero/cover.mp4",
    name: "David Lee",
    feedback:
      "A seamless and supportive journey from start to finish. Truly top-notch service.",
    rating: 5,
  },
  {
    id: 4,
    videoUrl: "https://cuberto.com/assets/projects/daoway/cover.mp4",
    name: "Sophia Patel",
    feedback:
      "Professional, caring, and efficient. I felt valued and well looked after at every visit.",
    rating: 5,
  },
  {
    id: 5,
    videoUrl: "https://cuberto.com/assets/projects/magma/cover.mp4",
    name: "James Kim",
    feedback:
      "Highly skilled team with a personal touch. They made all the difference.",
    rating: 4,
  },
  {
    id: 6,
    videoUrl: "https://cuberto.com/assets/projects/riyadh/cover.mp4",
    name: "Emma Brown",
    feedback:
      "I appreciated the warm environment and expert care. A wonderful experience overall.",
    rating: 5,
  },
];

// Subtle fade & slide animation for appearance
const appearFromBottom = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

// Single testimonial block with video + text
function TestimonialBlock({ entry, videoOnLeft }) {
  const videoElement = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const playVideoPreview = () => {
    setIsVideoPlaying(true);
    videoElement.current?.play();
  };

  const stopVideoPreview = () => {
    setIsVideoPlaying(false);
    if (videoElement.current) {
      videoElement.current.pause();
      videoElement.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto my-12 ${
        videoOnLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={appearFromBottom}
    >
      {/* Video container */}
      <div
        className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
        onMouseEnter={playVideoPreview}
        onMouseLeave={stopVideoPreview}
        onFocus={playVideoPreview} // Accessibility for keyboard users
        onBlur={stopVideoPreview}
        tabIndex={0} // Make focusable
        aria-label={`Video testimonial by ${entry.name}`}
      >
        <video
          ref={videoElement}
          src={entry.videoUrl}
          muted
          loop
          preload="metadata"
          playsInline
          className="w-full h-auto object-cover rounded-3xl"
          controls={false}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text content */}
      <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
        <p className="text-lg sm:text-xl italic text-gray-800 leading-relaxed mb-4">
          “{entry.feedback}”
        </p>
        <h3 className="text-xl font-semibold text-gray-900">{entry.name}</h3>
        <div className="flex justify-center md:justify-start mt-2 space-x-1">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <FaStar
              key={starIndex}
              className={`w-5 h-5 ${
                starIndex < entry.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Main testimonial section
export default function TestimonialsVideoContent() {
  return (
    <section
      aria-label="Customer Video Testimonials"
      className="bg-white py-16 px-5 sm:px-8 md:px-12"
    >
      {testimonialData.map((testimonial, index) => (
        <TestimonialBlock
          key={testimonial.id}
          entry={testimonial}
          videoOnLeft={index % 2 === 0}
        />
      ))}
    </section>
  );
}
