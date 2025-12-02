import React from 'react';

function DataCollectionSection() {
  return (
    <section
      aria-labelledby="data-collection-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20 my-[-30px]"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="data-collection-heading"
          className="text-3xl font-extrabold text-blue-700 mb-6"
        >
          Data Collection
        </h2>

        <p className="text-gray-800 text-lg leading-relaxed mb-6">
          We gather information to enhance our services for all users. This includes:
        </p>

        <ul className="max-w-xl list-disc list-inside space-y-3 text-gray-800 text-lg">
          <li>
            <strong>Personal Information:</strong> your name, email, and contact details provided when registering or reaching out.
          </li>
          <li>
            <strong>Usage Data:</strong> details on how you use our site and services to help improve your experience.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> used to customize your experience and analyze site traffic.
          </li>
        </ul>
      </div>
    </section>
  );
}

export default DataCollectionSection;
