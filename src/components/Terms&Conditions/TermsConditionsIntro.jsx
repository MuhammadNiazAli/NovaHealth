'use client'
import React from "react";

const TermsConditionsIntro = () => {
  return (
    <section
      aria-labelledby="terms-intro-heading"
      className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-16"
    >
      <h2
        id="terms-intro-heading"
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 select-text"
      >
        Welcome to Our Terms & Conditions
      </h2>

      <p className="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg leading-relaxed font-light">
        At NovaHealth, your trust means everything to us. These Terms & Conditions outline
        how you can use our website and services, detailing your rights and obligations.
        We recommend reviewing them thoroughly so you know exactly how we operate and how
        we safeguard your interests.
      </p>

      <p className="max-w-3xl mx-auto text-gray-800 text-base sm:text-lg leading-relaxed font-light mt-4">
        By continuing to use our services, you accept these terms. Should you have any
        questions or need further clarity, our support team is here to assist. Your safety
        and satisfaction remain our highest priorities.
      </p>
    </section>
  );
};

export default TermsConditionsIntro;
