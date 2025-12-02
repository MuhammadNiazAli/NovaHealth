"use client";

import React from "react";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.7 },
  },
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ease: "easeOut", duration: 0.8 },
  },
};

export default function HomeAbout() {
  const featuresList = [
    "Trusted by 50,000+ patients worldwide",
    "Award-winning diagnostic labs",
    "Multi-language care & support staff",
    "Fully integrated online booking system",
  ];

  return (
    <section
      aria-label="About Section"
      className="bg-white py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto mb-[-30px]"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[520px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Image side */}
        <motion.div variants={scaleFade} className="w-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Healthcare Professionals"
            loading="lazy"
            className="w-full rounded-lg object-cover h-[320px] sm:h-[400px] md:h-[480px]"
          />
        </motion.div>

        {/* Text side */}
        <motion.div variants={staggerContainer} className="text-left">
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-extrabold text-blue-700 mb-6"
          >
            Dedicated to <span className="text-black">Exceptional Care</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-lg text-gray-900 text-base sm:text-lg font-light mb-8"
          >
            At our core, we blend technology with empathy—ensuring every
            patient receives the attention they deserve. From telehealth to
            in-person consultations, our facilities and staff are tailored for
            you.
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="max-w-md space-y-4 font-semibold text-gray-800"
          >
            {featuresList.map((feature, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3"
              >
                <span className="text-blue-700 text-xl select-none">✓</span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10">
            <a
              href="/services"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Explore Our Services
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
