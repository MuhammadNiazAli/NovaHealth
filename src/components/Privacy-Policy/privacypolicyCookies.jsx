import React from 'react';

function CookiesPolicySection() {
  return (
    <section
      aria-labelledby="cookies-policy-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20 my-[-30px]"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="cookies-policy-heading"
          className="text-3xl font-extrabold text-blue-700 mb-6"
        >
          Cookies and Tracking Technologies
        </h2>

        <p className="text-gray-800 text-lg leading-relaxed mb-6">
          We use cookies and similar tracking technologies to enhance your experience, analyze site traffic, and deliver personalized content. Cookies are small text files stored on your device that help us recognize you and remember your preferences.
        </p>

        <h3 className="text-xl font-semibold text-blue-600 mb-3">
          Types of Cookies We Use:
        </h3>

        <ul className="max-w-xl list-disc list-inside space-y-3 text-gray-800 text-lg">
          <li>
            <strong>Essential Cookies:</strong> Required for the basic functioning of the website.
          </li>
          <li>
            <strong>Performance Cookies:</strong> Help us understand how visitors interact with our site.
          </li>
          <li>
            <strong>Functional Cookies:</strong> Remember your preferences and settings.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Used to deliver relevant ads based on your interests.
          </li>
        </ul>

        <p className="mt-6 text-gray-800 text-lg leading-relaxed">
          You can control or disable cookies through your browser settings, but this may affect the functionality of the website.
        </p>
      </div>
    </section>
  );
}

export default CookiesPolicySection;
