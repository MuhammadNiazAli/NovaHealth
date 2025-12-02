import React from 'react';

const ChildrenPrivacySection = () => {
  return (
    <section
      aria-labelledby="children-privacy-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="children-privacy-heading"
          className="text-3xl font-extrabold text-blue-700 mb-6"
        >
          Children’s Privacy
        </h2>
        <p className="text-gray-800 text-lg leading-relaxed mb-6">
          We take children’s privacy seriously. Our platform isn’t meant for anyone under 13, and we don’t intentionally collect personal info from kids without permission from a parent or guardian.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed">
          If it ever comes to our attention that we’ve collected data from a child without parental approval, we’ll act quickly to remove that information.
        </p>
      </div>
    </section>
  );
};

export default ChildrenPrivacySection;
