import React from 'react';

function PrivacyPolicyIntroduction() {
  return (
    <section
      aria-labelledby="privacy-policy-intro-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          id="privacy-policy-intro-heading"
          className="mb-4 text-3xl font-extrabold text-blue-700"
        >
          Introduction
        </h2>

        <p className="max-w-3xl mx-auto leading-relaxed text-gray-800 text-lg">
          At NovaHealth, protecting your personal data is a responsibility we take seriously. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website. We encourage you to read it carefully to understand your rights and our commitment to your privacy.
        </p>
      </div>
    </section>
  );
}

export default PrivacyPolicyIntroduction;
