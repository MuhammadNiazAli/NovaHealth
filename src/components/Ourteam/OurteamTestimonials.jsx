"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaMapMarkerAlt } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Emily Carter",
    role: "Marketing Specialist",
    photo: "https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?q=80&w=1286&auto=format&fit=crop",
    location: "New York, USA",
    date: "July 15, 2025",
    rating: 5,
    text:
      "Working with this team has been an absolute pleasure. Their passion and dedication really shine through in every project. They always deliver on time and exceed expectations.",
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Software Engineer",
    photo: "https://plus.unsplash.com/premium_photo-1661688930817-025934217478?q=80&w=1287&auto=format&fit=crop",
    location: "San Francisco, USA",
    date: "August 1, 2025",
    rating: 4,
    text:
      "Innovative, collaborative, and always aiming for excellence. I highly recommend them for any challenging projects. Communication was clear and effective throughout.",
  },
  {
    id: 3,
    name: "Sofia Martinez",
    role: "Product Designer",
    photo: "https://plus.unsplash.com/premium_photo-1675807264002-74250202f195?q=80&w=1170&auto=format&fit=crop",
    location: "Madrid, Spain",
    date: "June 20, 2025",
    rating: 5,
    text:
      "Their creative solutions and team spirit made all the difference in delivering a top-quality product. The design process was smooth and the final product is stunning.",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex space-x-1" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-500 w-5 h-5" aria-hidden="true" />
      ) : (
        <FaRegStar key={i} className="text-yellow-600 w-5 h-5" aria-hidden="true" />
      )
    )}
  </div>
);

export default function OurteamTestimonials() {
  return (
    <section
      aria-label="Team testimonials"
      className="max-w-5xl mx-auto px-6 py-20 space-y-14 sm:space-y-20 my-[-30px]"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-blue-700 text-center mb-12"
      >
        <span className="text-black">What Our Team</span> Members Say
      </motion.h2>

      {testimonials.map(({ id, name, role, photo, location, date, rating, text }, index) => (
        <motion.article
          key={id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 hover:shadow-xl transition-shadow focus-within:shadow-xl outline-none border border-gray-200"
          tabIndex={0}
        >
          {/* Photo */}
          <div className="flex-shrink-0">
            <img
              src={photo}
              alt={`Portrait of ${name}`}
              className="w-32 h-32 rounded-full object-cover shadow-md"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1">
            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
                <p className="text-blue-700 font-medium text-sm">{role}</p>
              </div>
              <div className="flex items-center text-gray-500 text-sm space-x-4">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="w-4 h-4" aria-hidden="true" />
                  <span>{location}</span>
                </div>
                <time dateTime={new Date(date).toISOString()}>{date}</time>
              </div>
            </header>

            <StarRating rating={rating} />

            <p className="mt-6 text-gray-700 text-base leading-relaxed">{text}</p>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
