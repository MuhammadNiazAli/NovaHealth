"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

// Data of doctors grouped by their specialty service
const doctorsData = [
  {
    service: "Cardiology",
    doctors: [
      {
        id: 1,
        name: "Dr. Emily Thompson",
        specialty: "Heart Specialist",
        rating: 4.8,
        photo:
          "https://plus.unsplash.com/premium_photo-1664392363342-47dcc1c5e631?q=80&w=1068&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        name: "Dr. Michael Lee",
        specialty: "Cardiologist",
        rating: 4.6,
        photo:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        name: "Dr. Sarah Kim",
        specialty: "Interventional Cardiologist",
        rating: 4.7,
        photo:
          "https://plus.unsplash.com/premium_photo-1661341423936-40b48564a5bf?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    service: "Dermatology",
    doctors: [
      {
        id: 4,
        name: "Dr. Sophia Patel",
        specialty: "Skin Specialist",
        rating: 4.9,
        photo:
          "https://plus.unsplash.com/premium_photo-1661436275595-e6a8a3943f7a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
      },
      {
        id: 5,
        name: "Dr. James Wilson",
        specialty: "Dermatologist",
        rating: 4.7,
        photo:
          "https://images.unsplash.com/photo-1659353888357-75e5858a5bc5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
      },
      {
        id: 6,
        name: "Dr. Lily Anderson",
        specialty: "Cosmetic Dermatologist",
        rating: 4.8,
        photo:
          "https://plus.unsplash.com/premium_photo-1681996428751-93e0294fe98d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
      },
    ],
  },
  {
    service: "Neurology",
    doctors: [
      {
        id: 7,
        name: "Dr. Olivia Martinez",
        specialty: "Neurologist",
        rating: 4.9,
        photo:
          "https://plus.unsplash.com/premium_photo-1661713606200-2832945b8d3f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
      },
      {
        id: 8,
        name: "Dr. Daniel Garcia",
        specialty: "Neurosurgeon",
        rating: 4.7,
        photo:
          "https://images.unsplash.com/photo-1620293023555-272e1a661b26?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
      },
      {
        id: 9,
        name: "Dr. Grace Lee",
        specialty: "Pediatric Neurologist",
        rating: 4.8,
        photo:
          "https://plus.unsplash.com/premium_photo-1702599071585-c929589036c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8",
      },
    ],
  },
];

// Helper to render stars based on rating (out of 5)
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <FaStar
          key={i}
          className="text-yellow-400 inline-block mr-0.5 drop-shadow-sm"
          aria-hidden="true"
          size={16}
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          className="text-yellow-400 inline-block mr-0.5 drop-shadow-sm"
          aria-hidden="true"
          size={16}
        />
      );
    }
  }
  return <div aria-label={`Rating: ${rating} out of 5 stars`} role="img">{stars}</div>;
};

// Modal component for booking appointment
const AppointmentModal = ({ isOpen, onClose, doctor }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  // Trap focus inside modal & disable background scroll
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const focusableSelectors =
      'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const modalElement = modalRef.current;
    const focusableElements = modalElement.querySelectorAll(focusableSelectors);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    function handleKeyDown(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    firstFocusable?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email address is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    )
      errors.email = "Invalid email address";
    if (!formData.date) errors.date = "Please select a date";
    if (!formData.time) errors.time = "Please select a time";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Update form state & clear errors on change
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      setAppointmentSuccess(true);
    }, 1300);
  };

  // Reset form and close modal
  const handleModalClose = () => {
    setFormData({
      fullName: "",
      email: "",
      date: "",
      time: "",
      notes: "",
    });
    setFormErrors({});
    setSubmitting(false);
    setAppointmentSuccess(false);
    onClose();
  };

  // Do not render modal if not open
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Overlay background */}
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000]"
        aria-hidden="true"
      />

      {/* Modal panel */}
      <motion.div
        key="modal-panel"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-[1001] flex items-center justify-center px-4 py-8 sm:py-12"
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl max-w-lg w-full shadow-2xl p-8 sm:p-10 max-h-[90vh] overflow-auto focus:outline-none"
        >
          <header className="flex justify-between items-center mb-8">
            <h3
              id="modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight"
            >
              Book Appointment
            </h3>
            <button
              type="button"
              onClick={handleModalClose}
              aria-label="Close modal"
              className="text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-full p-2 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>

          {appointmentSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-700 space-y-4"
            >
              <p className="text-lg sm:text-xl font-semibold">
                Your appointment with{" "}
                <span className="font-bold">{doctor?.name || "the doctor"}</span>{" "}
                has been successfully booked!
              </p>
              <button
                type="button"
                onClick={handleModalClose}
                className="inline-block bg-blue-600 hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-400 focus:outline-none text-white rounded-xl px-8 py-3 font-semibold shadow-lg transition text-base"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <>
              <p className="mb-6 text-blue-800 font-medium text-sm sm:text-base">
                Booking with{" "}
                <span className="font-semibold">{doctor?.name || "---"}</span> -{" "}
                <span>{doctor?.specialty || "---"}</span>
              </p>

              <form
                onSubmit={handleFormSubmit}
                noValidate
                className="space-y-6 text-sm sm:text-base"
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-blue-900 font-semibold mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    aria-invalid={!!formErrors.fullName}
                    aria-describedby="fullName-error"
                    required
                    placeholder="Your full name"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 ${
                      formErrors.fullName
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400"
                    } shadow-sm transition`}
                  />
                  {formErrors.fullName && (
                    <p
                      id="fullName-error"
                      role="alert"
                      className="mt-1 text-red-600 text-xs sm:text-sm"
                    >
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-blue-900 font-semibold mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={!!formErrors.email}
                    aria-describedby="email-error"
                    required
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 ${
                      formErrors.email
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400"
                    } shadow-sm transition`}
                  />
                  {formErrors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1 text-red-600 text-xs sm:text-sm"
                    >
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Date and Time inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-blue-900 font-semibold mb-2"
                    >
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      aria-invalid={!!formErrors.date}
                      aria-describedby="date-error"
                      required
                      className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 ${
                        formErrors.date
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-300 focus:ring-blue-400"
                      } shadow-sm transition`}
                    />
                    {formErrors.date && (
                      <p
                        id="date-error"
                        role="alert"
                        className="mt-1 text-red-600 text-xs sm:text-sm"
                      >
                        {formErrors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-blue-900 font-semibold mb-2"
                    >
                      Appointment Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      aria-invalid={!!formErrors.time}
                      aria-describedby="time-error"
                      required
                      className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 ${
                        formErrors.time
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-300 focus:ring-blue-400"
                      } shadow-sm transition`}
                    />
                    {formErrors.time && (
                      <p
                        id="time-error"
                        role="alert"
                        className="mt-1 text-red-600 text-xs sm:text-sm"
                      >
                        {formErrors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-blue-900 font-semibold mb-2"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 resize-y shadow-sm transition"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 text-white font-semibold rounded-xl px-6 py-3 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition text-lg sm:text-xl"
                >
                  {submitting ? "Booking..." : "Confirm Appointment"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main component displaying doctors grouped by service with modal for booking
const DoctorsByService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState(null);

  // Open modal and set selected doctor
  const handleOpenModal = (doctor) => {
    setActiveDoctor(doctor);
    setIsModalOpen(true);
  };

  // Close modal and clear selected doctor
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveDoctor(null);
  };

  return (
    <section
      aria-labelledby="doctors-by-service-heading"
      className="bg-white py-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto rounded-3xl shadow-lg select-none my-[-30px]"
    >
      <h2
        id="doctors-by-service-heading"
        className="text-5xl sm:text-6xl font-extrabold mb-16 text-center tracking-wide drop-shadow-md"
      >
        <span className="text-black">Our Doctors </span>
        <span className="text-blue-600">by Service</span>
      </h2>

      {doctorsData.map(({ service, doctors }) => (
        <div key={service} className="mb-20">
          <h3 className="text-3xl font-semibold text-blue-800 mb-10 border-b border-blue-300 pb-3 tracking-wide ">
            {service}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {doctors.map(({ id, name, specialty, rating, photo }) => (
              <motion.article
                key={id}
                tabIndex={0}
                role="button"
                aria-label={`${name}, ${specialty}, rated ${rating} out of 5 stars`}
                onClick={() => handleOpenModal({ id, name, specialty })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenModal({ id, name, specialty });
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: id * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-7 flex flex-col items-center text-center cursor-pointer hover:shadow-2xl focus:shadow-2xl focus:outline-none transition-shadow duration-300 border border-gray-200"
              >
                <div className="w-28 h-28 rounded-full border-8 border-blue-100 shadow-md mb-6 overflow-hidden transform transition-transform hover:scale-105">
                  <img
                    src={photo}
                    alt={`Photo of ${name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-1">{name}</h4>
                <p className="text-blue-700 mb-4  italic tracking-wide">{specialty}</p>
                <StarRating rating={rating} />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal({ id, name, specialty });
                  }}
                  className="mt-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl px-5 py-2 sm:px-8 sm:py-3 shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 transition whitespace-nowrap text-sm sm:text-base "
                >
                  Book Appointment
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      ))}

      <AppointmentModal isOpen={isModalOpen} onClose={handleCloseModal} doctor={activeDoctor} />
    </section>
  );
};

export default DoctorsByService;
