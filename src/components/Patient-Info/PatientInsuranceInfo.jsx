"use client";

import React from "react";

const insuranceData = {
  provider: "HealthFirst Insurance",
  policyNumber: "HF-123456789",
  groupNumber: "GRP-987654",
  planType: "Preferred Provider Organization (PPO)",
  coverageStart: "2023-01-01",
  coverageEnd: "2024-12-31",
  phone: "+1 (800) 555-1234",
  email: "support@healthfirst.com",
  claimsAddress: `123 Insurance Blvd.
Suite 400
New York, NY 10001`,
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const InfoItem = ({ label, children, link }) => (
  <div className="mb-4">
    <dt className="font-semibold text-gray-700">{label}</dt>
    <dd className={`mt-1 ${link ? "text-blue-700 underline" : "text-gray-900"}`}>
      {link ? <a href={link}>{children}</a> : children}
    </dd>
  </div>
);

const PatientInsuranceInfo = () => {
  return (
    <section
      aria-labelledby="insurance-info-title"
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md my-10"
    >
      <h2
        id="insurance-info-title"
        className="text-3xl font-extrabold mb-6 text-center"
      >
        <span className="text-black">Insurance </span>
        <span className="text-blue-700">Information</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left Column */}
        <dl>
          <InfoItem label="Provider">{insuranceData.provider}</InfoItem>
          <InfoItem label="Policy Number">{insuranceData.policyNumber}</InfoItem>
          <InfoItem label="Group Number">{insuranceData.groupNumber}</InfoItem>
          <InfoItem label="Plan Type">{insuranceData.planType}</InfoItem>
        </dl>

        {/* Right Column */}
        <dl>
          <InfoItem label="Coverage Period">
            {formatDate(insuranceData.coverageStart)} - {formatDate(insuranceData.coverageEnd)}
          </InfoItem>
          <InfoItem label="Customer Service Phone" link={`tel:${insuranceData.phone.replace(/[^\d+]/g, "")}`}>
            {insuranceData.phone}
          </InfoItem>
          <InfoItem label="Customer Service Email" link={`mailto:${insuranceData.email}`}>
            {insuranceData.email}
          </InfoItem>
          <InfoItem label="Claims Address">
            <pre className="whitespace-pre-line max-w-sm text-gray-900">{insuranceData.claimsAddress}</pre>
          </InfoItem>
        </dl>
      </div>
    </section>
  );
};

export default PatientInsuranceInfo;
