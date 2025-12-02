"use client";

import React from "react";

const ServiceLocationMap = () => {
  return (
    <section
      aria-label="Service Location Map"
      className="max-w-7xl mx-auto px-6 sm:px-12 py-16"
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Our Service <span className="text-blue-600">Locations</span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl leading-relaxed">
          We proudly serve multiple locations across the country. Find the nearest service center on the map below.
        </p>
      </div>

      {/* Map container */}
      <div
        tabIndex={0}
        aria-label="Interactive map showing our service locations"
        className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <iframe
          title="Service Locations Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0194800841866!2d-122.4200493846815!3d37.77928097975752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b0d46210f%3A0xf4f6a1dfcf0e6b1b!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1691476345874!5m2!1sen!2sus"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default ServiceLocationMap;
