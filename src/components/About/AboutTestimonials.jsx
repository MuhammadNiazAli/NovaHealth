"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Emily Carter",
    role: "Patient",
    avatar:
      "https://images.unsplash.com/photo-1659353887871-b0ba4b84dad5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
    rating: 5,
    feedback:
      "The care I received was exceptional. The doctors were attentive and truly cared about my recovery.",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Patient",
    avatar:
      "https://images.unsplash.com/photo-1620293023555-272e1a661b26?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
    rating: 4.5,
    feedback:
      "Amazing staff and facilities. The process was smooth and I felt supported every step of the way.",
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Patient",
    avatar:
      "https://plus.unsplash.com/premium_photo-1674499074395-5277fdd707ee?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
    rating: 4,
    feedback:
      "Professional, caring, and knowledgeable team. Highly recommend their services for anyone seeking quality healthcare.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className="text-yellow-400" aria-hidden="true" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" aria-hidden="true" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" aria-hidden="true" />);
    }
  }
  return stars;
};

const AboutTestimonials = () => {
  return (
    <section
      aria-label="Client Testimonials"
      className="bg-white py-20 px-6 sm:px-12 max-w-7xl mx-auto my-[-30px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          What Our <span className="text-blue-600">Clients Say</span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl font-light">
          Hear from some of the patients who trusted us for their care.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {testimonials.map(({ id, name, role, avatar, rating, feedback }) => (
          <motion.article
            key={id}
            className="bg-white rounded-2xl p-8 shadow-md flex flex-col cursor-default select-none border border-gray-200"
            variants={cardVariants}
            whileHover="hover"
            tabIndex={0}
            aria-label={`Testimonial from ${name}, ${role}`}
          >
            <div className="flex items-center mb-6 space-x-4">
              <img
                src={avatar}
                alt={`${name} avatar`}
                className="w-16 h-16 rounded-full object-cover shadow-sm"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-blue-600 text-sm font-medium">{role}</p>
                <div
                  className="flex mt-1 space-x-1"
                  aria-label={`${rating} out of 5 stars`}
                  role="img"
                >
                  {renderStars(rating)}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{feedback}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutTestimonials;
