import React from 'react';

function ThirdPartyServicesSection() {
  return (
    <section
      aria-labelledby="third-party-services-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20 my-[-30px]"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="third-party-services-heading"
          className="mb-6 text-3xl font-extrabold text-blue-700"
        >
          Third-Party Services
        </h2>

        <p className="mb-6 leading-relaxed text-gray-800 text-lg">
          We may share your information with trusted third-party providers who assist us in operating our website, running our business, or serving you. These partners are contractually obligated to protect your data and keep it confidential.
        </p>

        <p className="mb-6 leading-relaxed text-gray-800 text-lg">
          Examples of such third parties include:
        </p>

        <ul className="max-w-xl list-disc list-inside space-y-3 text-gray-800 text-lg">
          <li>Payment processors</li>
          <li>Analytics and marketing services</li>
          <li>Customer support platforms</li>
          <li>Cloud hosting providers</li>
        </ul>

        <p className="mt-6 leading-relaxed text-gray-800 text-lg">
          We carefully select these partners and regularly review their privacy practices to ensure your data remains secure.
        </p>
      </div>
    </section>
  );
}

export default ThirdPartyServicesSection;
