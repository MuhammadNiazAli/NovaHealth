'use client'
import React from "react";

const TermsConditionsHero = () => {
  return (
    <section
      aria-label="Terms and Conditions hero section"
      className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1
          tabIndex={-1}
          className="select-text mb-4 text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-tight tracking-tight"
        >
          Terms & Conditions
        </h1>

        <p className="mx-auto max-w-3xl text-lg sm:text-xl font-light leading-relaxed opacity-90">
          Before using NovaHealth, please take a moment to read these Terms & Conditions
          carefully. By accessing or using our services, you agree to abide by these terms.
          Our promise to you is transparency, fairness, and prioritizing your safety.
        </p>
      </div>
    </section>
  );
};

export default TermsConditionsHero;
