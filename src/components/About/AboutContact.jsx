"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, ease: "easeOut", duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Insert your form submission logic here (e.g., API call)
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      aria-label="Contact Us Section"
      className="bg-white py-20 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Contact Information */}
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Get in <span className="text-blue-700">Touch</span>
          </h2>
          <p className="text-gray-700 text-lg font-light max-w-md">
            We’d love to hear from you! Whether you have questions about our
            services or want to schedule an appointment, reach out and we’ll get
            back to you promptly.
          </p>

          <div className="space-y-6 max-w-md">
            <div className="flex items-center space-x-4 text-gray-800">
              <FaPhoneAlt className="text-blue-700 w-6 h-6" aria-hidden="true" />
              <a
                href="tel:+1234567890"
                className="hover:text-blue-700 transition"
                aria-label="Call us at +1 (234) 567-890"
              >
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center space-x-4 text-gray-800">
              <FaEnvelope className="text-blue-700 w-6 h-6" aria-hidden="true" />
              <a
                href="mailto:contact@novahealth.com"
                className="hover:text-blue-700 transition"
                aria-label="Email us at contact@novahealth.com"
              >
                contact@novahealth.com
              </a>
            </div>
            <div className="flex flex-col space-y-2 text-gray-800 max-w-md">
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt
                  className="text-blue-700 w-6 h-6"
                  aria-hidden="true"
                />
                <address className="not-italic">
                  123 Nova Street, Health City, Country
                </address>
              </div>

              {/* Embedded Google Map */}
              <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-gray-300 shadow-sm mt-12">
                <iframe
                  title="NovaHealth Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019709728927!2d-122.41941508468113!3d37.77492977975943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808cc71deeb1%3A0x2f0956efc3f80f06!2s123%20Nova%20Street%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1691423852000!5m2!1sen!2sus"
                  loading="lazy"
                  className="w-full h-full border-0"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          className="bg-gray-50 rounded-xl shadow-md p-8"
          noValidate
          aria-label="Contact form"
        >
          {submitted && (
            <p
              className="mb-6 text-green-600 font-semibold"
              role="alert"
              aria-live="polite"
            >
              Thank you for reaching out! We will get back to you soon.
            </p>
          )}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="subject"
              className="block text-gray-700 font-semibold mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject of your message"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-400 focus:outline-none focus:ring-4 text-white font-semibold py-3 rounded-lg shadow-lg transition"
          >
            Send Message
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default AboutContact;
