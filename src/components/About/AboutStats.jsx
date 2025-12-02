"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaUsers,
  FaHospital,
  FaAward,
  FaBriefcaseMedical,
} from "react-icons/fa";

const statsData = [
  {
    id: 1,
    icon: <FaUsers className="text-3xl text-white" />,
    label: "Happy Patients",
    number: 52430,
    suffix: "+",
    background: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
  {
    id: 2,
    icon: <FaHospital className="text-3xl text-white" />,
    label: "Hospitals Joined",
    number: 189,
    background: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
  {
    id: 3,
    icon: <FaAward className="text-3xl text-white" />,
    label: "Award Winning",
    number: 26,
    suffix: "+",
    background: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
  {
    id: 4,
    icon: <FaBriefcaseMedical className="text-3xl text-white" />,
    label: "Doctors & Staff",
    number: 3700,
    suffix: "+",
    background: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
];

// Hook to animate number counting when component is in view
function useCountUp(target, isVisible, duration = 2000) {
  const [current, setCurrent] = useState(0);
  const frameRef = useRef();

  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();

    const step = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      setCurrent(value);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(frameRef.current);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameRef.current);
  }, [isVisible, target, duration]);

  return current;
}

const AboutStats = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-12 bg-white">
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          Our Impact in Numbers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          We take pride in delivering top healthcare services to thousands around the world. Here are a few of our proud milestones.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {statsData.map(({ id, icon, label, number, suffix, background }, i) => {
          const ref = useRef(null);
          const isVisible = useInView(ref, { once: true, margin: "-100px" });
          const count = useCountUp(number, isVisible);

          return (
            <motion.div
              key={id}
              ref={ref}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className={`${background} rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col items-center justify-center text-white`}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-3xl font-bold">
                {count.toLocaleString()}
                {suffix || ""}
              </h3>
              <p className="text-sm font-medium mt-1 tracking-wide">{label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutStats;
