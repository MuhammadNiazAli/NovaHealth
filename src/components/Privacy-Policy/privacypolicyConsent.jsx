import React from 'react';

function PrivacyConsentSection() {
  return (
    <section
      aria-labelledby="privacy-consent-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="privacy-consent-heading"
          className="text-3xl font-extrabold text-blue-700 mb-6"
        >
          Your Consent
        </h2>
        <p className="text-gray-800 text-lg leading-relaxed">
          By continuing to use our website and services, you acknowledge and agree to our Privacy Policy. 
          We take your trust seriously and handle your personal information with care and responsibility.
          If you disagree with any part of this policy, we kindly ask that you refrain from using our services.
        </p>
      </div>
    </section>
  );
}

export default PrivacyConsentSection;
