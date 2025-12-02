"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Emily Carter",
    role: "Patient - Cardiology",
    rating: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFkeSUyMGRvY3RvcmV8ZW58MHx8MHx8fDA%3D",
    message:
      "The staff was so kind and professional. My diagnosis was explained clearly, and I felt genuinely cared for. Highly recommended!",
  },
  {
    id: 2,
    name: "Dr. Kevin Moore",
    role: "Family Member - Surgery",
    rating: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1661578535048-7a30e3a71d25?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbiUyMGRvY3RvcmV8ZW58MHx8MHx8fDA%3D",
    message:
      "From admission to discharge, everything was smooth and stress-free. The facility is top-notch and very clean.",
  },
  {
    id: 3,
    name: "Sara Lopez",
    role: "Mother - Pediatrics",
    rating: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1664392363342-47dcc1c5e631?q=80&w=1068&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    message:
      "They took excellent care of my daughter. The pediatricians are incredibly warm and understanding brelliant.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ServiceTestimonials = () => {
  return (
    <section
      role="region"
      aria-label="Service Testimonials"
      className="bg-white py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            What{" "}
            <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
              People Say
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Real stories from patients and their families sharing their care experiences.
          </p>
        </header>

        {/* Testimonials Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map(({ id, name, role, rating, image, message }) => (
            <motion.article
              key={id}
              variants={cardVariants}
              className="bg-gray-50 hover:bg-blue-50 transition-colors duration-300 p-6 rounded-xl shadow-md text-center flex flex-col items-center border border-gray-200"
              tabIndex={0}
              aria-label={`Testimonial from ${name}, ${role}. Rating: ${rating} out of 5 stars`}
            >
              <FaQuoteLeft className="text-blue-600 text-2xl mb-4" aria-hidden="true" />
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic max-w-xs">
                &ldquo;{message}&rdquo;
              </p>
              <img
                src={image}
                alt={`Photo of ${name}`}
                className="w-14 h-14 rounded-full object-cover mb-2 border-2 border-blue-600"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <h4 className="text-md font-semibold text-gray-800">{name}</h4>
              <p className="text-sm text-gray-500 mb-2">{role}</p>
              <div className="flex gap-1 text-yellow-500" aria-label={`Rating: ${rating} stars`}>
                {[...Array(rating)].map((_, i) => (
                  <FaStar key={i} aria-hidden="true" />
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
