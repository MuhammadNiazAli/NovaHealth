"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaUserMd, FaHospital, FaHeartbeat, FaClock } from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: <FaUserMd className="text-4xl text-white" aria-hidden="true" />,
    title: "Qualified Doctors",
    count: 1200,
    suffix: "+",
    bg: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
  {
    id: 2,
    icon: <FaHospital className="text-4xl text-white" aria-hidden="true" />,
    title: "Successful Surgeries",
    count: 350,
    bg: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
  {
    id: 3,
    icon: <FaHeartbeat className="text-4xl text-white" aria-hidden="true" />,
    title: "Patients Treated",
    count: 5000,
    suffix: "+",
    bg: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
  {
    id: 4,
    icon: <FaClock className="text-4xl text-white" aria-hidden="true" />,
    title: "Hours Emergency Care",
    count: 24,
    bg: "bg-gradient-to-r from-blue-600 to-blue-700",
  },
];

// Custom hook to animate count up when element is in view
const useCountUp = (target, inView, duration = 2000) => {
  const [count, setCount] = useState(0);
  const frame = useRef();

  useEffect(() => {
    if (!inView) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      }
    };

    frame.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame.current);
  }, [inView, target, duration]);

  return count;
};

const ServicesStats = () => {
  return (
    <section
      aria-label="Why Choose Our Services"
      className="py-20 px-4 sm:px-6 lg:px-12 bg-gray-50 my-[-100px] mb-0"
    >
      <div className="max-w-7xl mx-auto text-center mb-12 px-4 sm:px-0">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
        >
          Why Choose{" "}
          <span className="text-blue-600">Our Services</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          We provide world-class medical care with a team of dedicated
          professionals, ensuring you get the best treatment possible.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, index) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-100px" });
          const count = useCountUp(stat.count, inView);

          return (
            <motion.div
              key={stat.id}
              ref={ref}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className={`rounded-2xl p-8 text-white shadow-lg flex flex-col items-center justify-center ${stat.bg} aspect-square cursor-default`}
              tabIndex={0}
              aria-label={`${stat.count}${stat.suffix || ""} ${stat.title}`}
            >
              <div className="mb-5">{stat.icon}</div>
              <h3 className="text-5xl font-extrabold leading-none">
                {count.toLocaleString()}
                {stat.suffix || ""}
              </h3>
              <p className="text-sm font-semibold mt-2 tracking-wide text-white/90 text-center max-w-[180px]">
                {stat.title}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesStats;
