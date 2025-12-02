'use client'
import React from "react";

const GoverningLaw = () => {
  return (
    <section
      aria-labelledby="governing-law-heading"
      className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-16 my-[-30px]"
    >
      <h2
        id="governing-law-heading"
        className="mb-8 select-text text-3xl sm:text-4xl font-bold text-gray-900"
      >
        Governing Law
      </h2>

      <p className="max-w-3xl mx-auto mb-4 text-base sm:text-lg leading-relaxed font-light text-gray-800">
        These Terms & Conditions are governed by and interpreted according to the laws of the
        jurisdiction where NovaHealth operates, without regard to any conflict of law rules.
      </p>

      <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light text-gray-800">
        By continuing to use our services, you agree to submit to the exclusive jurisdiction of
        the courts located in that jurisdiction for any disputes related to these terms.
      </p>
    </section>
  );
};

export default GoverningLaw;
