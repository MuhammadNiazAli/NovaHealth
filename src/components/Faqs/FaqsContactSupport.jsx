"use client";

import React, { useState } from "react";

export default function FaqsContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      aria-label="Contact support section"
      className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16"
    >
      <h2 className="text-3xl font-extrabold text-black mb-8 text-center select-text">
        Need More Help? <span className="text-blue-700">Contact Support</span>
      </h2>

      <p className="text-center text-gray-700 mb-12 max-w-xl mx-auto">
        Our dedicated support team is here to assist you with any questions or
        concerns. Fill out the form below or reach us directly via phone or
        email.
      </p>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left side: Contact Info + text + map */}
        <div className="flex-1 flex flex-col bg-blue-50 rounded-xl p-8 shadow-md select-text">
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-6">
              Contact Information
            </h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-blue-700 hover:underline"
                aria-label="Call support phone number"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@yourhealthcare.com"
                className="text-blue-700 hover:underline"
                aria-label="Send email to support"
              >
                support@yourhealthcare.com
              </a>
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              <strong>Live Chat:</strong>{" "}
              <a
                href="#"
                className="text-blue-700 hover:underline"
                aria-label="Open live chat support"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Live chat feature coming soon!");
                }}
              >
                Start a live chat
              </a>
            </p>
          </div>

          <p className="text-gray-600 italic mb-6">
            Our support team is available 24/7 to assist you.
          </p>

          {/* Map */}
          <div className="w-full aspect-[4/3] rounded-md overflow-hidden shadow-inner">
            <iframe
              title="Support Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0193981155386!2d-122.41941538468132!3d37.77492927975985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a1a4f2eb%3A0x8f63db167c38bbd1!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1691660000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right side: Contact form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex-1 bg-white p-8 rounded-xl shadow-md"
        >
          {submitted && (
            <div
              className="mb-6 p-4 bg-green-100 text-green-800 rounded border border-green-300 select-text"
              role="alert"
            >
              Thank you for contacting us! We will get back to you shortly.
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-1 select-text"
            >
              Name<span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                setErrors((prev) => ({ ...prev, name: undefined }));
                setSubmitted(false);
              }}
              className={`w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p
                id="name-error"
                className="mt-1 text-xs text-red-600 select-text"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 mb-1 select-text"
            >
              Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                setErrors((prev) => ({ ...prev, email: undefined }));
                setSubmitted(false);
              }}
              className={`w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-xs text-red-600 select-text"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-900 mb-1 select-text"
            >
              Subject<span className="text-red-600">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, subject: e.target.value }));
                setErrors((prev) => ({ ...prev, subject: undefined }));
                setSubmitted(false);
              }}
              className={`w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Brief summary"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && (
              <p
                id="subject-error"
                className="mt-1 text-xs text-red-600 select-text"
                role="alert"
              >
                {errors.subject}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-900 mb-1 select-text"
            >
              Message<span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, message: e.target.value }));
                setErrors((prev) => ({ ...prev, message: undefined }));
                setSubmitted(false);
              }}
              className={`w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition resize-none ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Write your detailed message here..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p
                id="message-error"
                className="mt-1 text-xs text-red-600 select-text"
                role="alert"
              >
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md py-3 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
