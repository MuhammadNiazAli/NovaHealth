import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

function ContactInfoSection() {
  return (
    <section
      aria-labelledby="contact-info-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          id="contact-info-heading"
          className="text-3xl font-extrabold text-blue-700 mb-8"
        >
          Contact Information
        </h2>

        <div className="grid max-w-3xl mx-auto grid-cols-1 gap-10 sm:grid-cols-2 text-gray-800 text-lg">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="flex-shrink-0 w-6 h-6 text-blue-600" />
            <address className="not-italic">
              123 NovaHealth Ave,
              <br />
              Amsterdam, Netherlands
            </address>
          </div>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="flex-shrink-0 w-6 h-6 text-blue-600" />
            <a href="tel:+31201234567" className="hover:underline">
              +31 20 123 4567
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="flex-shrink-0 w-6 h-6 text-blue-600" />
            <a href="mailto:support@novahealth.com" className="hover:underline">
              support@novahealth.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <FaClock className="flex-shrink-0 w-6 h-6 text-blue-600" />
            <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactInfoSection;
