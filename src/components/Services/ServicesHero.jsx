"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.18, ease: "easeOut", duration: 0.7 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
  },
};

const ServicesHero = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  // Focus the heading for accessibility when component mounts
  useEffect(() => {
    const heading = document.getElementById("services-hero-heading");
    if (heading) heading.focus({ preventScroll: true });
  }, []);

  // Intersection observer to trigger animation when in viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [controls]);

  // Scroll smoothly to the section with id "explore-services"
  const scrollToExplore = () => {
    const target = document.getElementById("explore-services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Services Hero Section"
      role="region"
      className="bg-white overflow-hidden"
      ref={sectionRef}
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row items-center min-h-[520px] md:min-h-[600px]"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Left Text Section */}
        <motion.div
          className="flex-1 text-center md:text-left"
          variants={itemVariants}
        >
          <motion.h1
            id="services-hero-heading"
            tabIndex={-1}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded"
          >
            Our{" "}
            <span className="text-blue-700 underline decoration-blue-300 decoration-4 underline-offset-4">
              Services
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl mx-auto md:mx-0 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-gray-700 tracking-wide"
            variants={itemVariants}
          >
            From routine checkups to specialized treatments, we offer
            comprehensive healthcare services tailored to your individual needs.
          </motion.p>

          <motion.button
            type="button"
            onClick={scrollToExplore}
            aria-label="Explore our services"
            className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 focus-visible:ring-indigo-400 focus:outline-none focus:ring-4 text-white font-semibold px-10 py-4 rounded-lg shadow-lg select-none tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            Explore Services
          </motion.button>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          className="flex-1 mt-14 md:mt-0 md:ml-16 flex justify-center md:justify-end"
          variants={itemVariants}
        >
          <motion.img
            src="https://plus.unsplash.com/premium_photo-1681996356237-db488ab30eb6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Healthcare Services Illustration"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="rounded-xl shadow-xl max-w-full w-80 sm:w-96 object-cover"
            variants={imageVariants}
            initial="hidden"
            animate={controls}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesHero;
