'use client'
import React from "react";

const userResponsibilitiesList = [
  "Provide accurate and truthful information during registration and usage.",
  "Use our services responsibly and follow all applicable laws and guidelines.",
  "Maintain the confidentiality of your account credentials.",
  "Notify us promptly of any unauthorized use or security breaches.",
  "Respect other users and do not engage in abusive or harmful behavior.",
];

const ResponsibilityItem = ({ text }) => {
  return (
    <li
      tabIndex={0}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition ease-in-out duration-200"
      aria-label={text}
    >
      {text}
    </li>
  );
};

const UserResponsibilities = () => {
  return (
    <section
      aria-labelledby="user-responsibilities-heading"
      className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-16 my-[-50px]"
    >
      <h2
        id="user-responsibilities-heading"
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 select-text"
      >
        User Responsibilities
      </h2>

      <ul className="max-w-3xl mx-auto list-disc list-inside space-y-4 text-lg sm:text-xl leading-relaxed text-gray-800 font-light">
        {userResponsibilitiesList.map((responsibility, idx) => (
          <ResponsibilityItem key={idx} text={responsibility} />
        ))}
      </ul>
    </section>
  );
};

export default UserResponsibilities;
