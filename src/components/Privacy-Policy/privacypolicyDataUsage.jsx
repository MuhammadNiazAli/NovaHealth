import React from 'react';

function DataUsageSection() {
  return (
    <section
      aria-labelledby="data-usage-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="data-usage-heading"
          className="text-3xl font-extrabold text-blue-700 mb-6"
        >
          How We Use Your Data
        </h2>

        <p className="text-gray-800 text-lg leading-relaxed mb-6">
          The information we gather serves several key purposes, such as:
        </p>

        <ul className="max-w-xl list-disc list-inside space-y-3 text-gray-800 text-lg">
          <li>
            <strong>Providing and maintaining our services:</strong> to ensure smooth operation and availability.
          </li>
          <li>
            <strong>Enhancing user experience:</strong> by analyzing usage patterns to customize content and features.
          </li>
          <li>
            <strong>Communication:</strong> delivering important updates, notifications, and customer support.
          </li>
          <li>
            <strong>Legal compliance:</strong> meeting our obligations under relevant laws and regulations.
          </li>
          <li>
            <strong>Marketing:</strong> with your consent, sending promotional materials and offers.
          </li>
        </ul>
      </div>
    </section>
  );
}

export default DataUsageSection;
