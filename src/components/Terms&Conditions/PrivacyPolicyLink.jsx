'use client'
import React from "react";

const PrivacyPolicyLink = () => {
  return (
    <section
      aria-label="Privacy policy information"
      className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-12 bg-white rounded-lg"
    >
      <h2 className="mb-4 select-text text-2xl sm:text-3xl font-semibold text-blue-900">
        Your Privacy Matters
      </h2>

      <p className="mb-6 max-w-3xl text-lg sm:text-xl font-light leading-relaxed text-blue-800">
        Protecting your personal information is a priority for us. Please take a moment to
        review our Privacy Policy to learn how we collect, use, and safeguard your data.
      </p>

      <a
        href="/privacy-policy"
        aria-label="Read our Privacy Policy"
        className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow transition-colors hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Read Privacy Policy
      </a>
    </section>
  );
};

export default PrivacyPolicyLink;
