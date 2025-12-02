"use client";

import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

function ContactIcon({ children }) {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-lg text-lg">
      {children}
    </div>
  );
}

function ContactInfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-4">
      <ContactIcon>{icon}</ContactIcon>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-sm sm:text-base font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function SocialLink({ Icon, url, label }) {
  return (
    <a
      href={url}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 rounded-lg shadow hover:bg-blue-600 hover:text-white transition-colors duration-300"
    >
      <Icon />
    </a>
  );
}

const ContactForm = () => {
  // No submit handler for now, just markup
  return (
    <form className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoComplete="name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="Subject"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Write your message..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300"
      >
        Send Message
      </button>
    </form>
  );
};

export default function OurteamContact() {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Get in Touch With <span className="text-blue-600">Our Team</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Whether you have a question, want to collaborate, or simply say hello — we’re here to
            listen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact form panel */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <ContactForm />
          </div>

          {/* Contact details panel */}
          <aside className="flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="space-y-6">
              <ContactInfoItem icon={<FaPhoneAlt />} label="Call Us" value="+1 234 567 890" />
              <ContactInfoItem icon={<FaEnvelope />} label="Email Us" value="contact@ourteam.com" />
              <ContactInfoItem
                icon={<FaMapMarkerAlt />}
                label="Visit Us"
                value="123 Main Street, City, Country"
              />
            </div>

            {/* Map embed */}
            <div className="w-full h-52 rounded-xl overflow-hidden shadow border border-gray-300 mt-4">
              <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086716393178!2d-122.41941568468153!3d37.7749297797588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d3a8fffb%3A0x2d831bdb9fee9604!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2s!4v1693429584035!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social media links */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-3">Follow Us</p>
              <div className="flex space-x-3">
                <SocialLink Icon={FaFacebookF} url="#" label="Facebook" />
                <SocialLink Icon={FaTwitter} url="#" label="Twitter" />
                <SocialLink Icon={FaLinkedinIn} url="#" label="LinkedIn" />
                <SocialLink Icon={FaInstagram} url="#" label="Instagram" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
