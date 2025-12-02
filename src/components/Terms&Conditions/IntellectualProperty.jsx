'use client'
import React from "react";

const IntellectualProperty = () => {
  return (
    <section
      aria-labelledby="intellectual-property-heading"
      className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-16 my-[-30px]"
    >
      <h2
        id="intellectual-property-heading"
        className="mb-8 select-text text-3xl sm:text-4xl font-bold text-gray-900"
      >
        Intellectual Property
      </h2>

      <p className="mb-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light text-gray-800">
        All content, trademarks, logos, and other intellectual property featured on NovaHealth
        are either owned or properly licensed by NovaHealth. You may not reproduce, distribute,
        modify, or use any of this material without obtaining prior written permission.
      </p>

      <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light text-gray-800">
        Unauthorized use of our intellectual property could infringe copyright, trademark, or
        other laws and may result in legal consequences.
      </p>
    </section>
  );
};

export default IntellectualProperty;
