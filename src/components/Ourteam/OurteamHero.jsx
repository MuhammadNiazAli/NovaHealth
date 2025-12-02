"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OurteamHero() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      aria-label="Our Team Hero Section"
      className="bg-white text-black min-h-[440px] flex items-center px-5 sm:px-8 md:px-12 my-16 md:my-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center w-full gap-10 md:gap-16">
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            custom={0}
            variants={fadeUpVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-blue-700">Meet</span>{" "}
            <span className="text-black">Our Dedicated Team</span>
          </motion.h1>

          <motion.p
            custom={1}
            variants={fadeUpVariants}
            className="mt-4 text-base sm:text-lg md:text-xl font-light max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            Our team of professionals is committed to providing the best care and
            support. Get to know the people who make everything possible.
          </motion.p>

          <motion.button
            custom={2}
            variants={fadeUpVariants}
            type="button"
            aria-label="Explore Our Team"
            className="mt-7 px-8 py-2.5 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => alert("Take action here!")}
          >
            Explore Team
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 max-w-sm mx-auto md:mx-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our team smiling and working together"
            loading="lazy"
            decoding="async"
            className="rounded-xl shadow-xl w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
