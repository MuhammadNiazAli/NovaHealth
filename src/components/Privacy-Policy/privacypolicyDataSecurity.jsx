import React from 'react';

function DataSecuritySection() {
  return (
    <section
      aria-labelledby="data-security-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20 my-[-30px]"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="data-security-heading"
          className="text-3xl font-extrabold text-blue-700 mb-6"
        >
          Data Security
        </h2>

        <p className="text-gray-800 text-lg leading-relaxed mb-6">
          We follow industry-leading security practices to protect your personal data from unauthorized access, alteration, disclosure, or destruction. Our approach includes:
        </p>

        <ul className="max-w-xl list-disc list-inside space-y-3 text-gray-800 text-lg">
          <li>
            <strong>Encryption:</strong> Securing data transmission using SSL/TLS protocols.
          </li>
          <li>
            <strong>Access Controls:</strong> Limiting data access exclusively to authorized personnel.
          </li>
          <li>
            <strong>Regular Audits:</strong> Performing routine security assessments and updates.
          </li>
          <li>
            <strong>Data Minimization:</strong> Collecting only what is necessary for our services.
          </li>
          <li>
            <strong>Secure Storage:</strong> Protecting stored data with firewalls, anti-malware, and secure servers.
          </li>
        </ul>

        <p className="mt-6 text-gray-800 text-lg leading-relaxed">
          Despite our efforts, no system is completely foolproof. Please exercise caution when sharing sensitive information online.
        </p>
      </div>
    </section>
  );
}

export default DataSecuritySection;
