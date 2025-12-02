import React from 'react';

function PolicyUpdatesSection() {
  return (
    <section
      aria-labelledby="policy-updates-heading"
      className="bg-white py-16 px-6 sm:px-12 lg:px-20 my-[-30px]"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="policy-updates-heading"
          className="mb-6 text-3xl font-extrabold text-blue-700"
        >
          Policy Updates
        </h2>

        <p className="mb-6 leading-relaxed text-gray-800 text-lg">
          We may update this Privacy Policy occasionally to reflect changes in our practices or legal obligations. When updates occur, we will revise the effective date at the bottom of this policy.
        </p>

        <p className="leading-relaxed text-gray-800 text-lg">
          We encourage you to check this policy regularly to stay informed about how we protect your information. Continued use of our services after any updates constitutes your acceptance of the revised policy.
        </p>
      </div>
    </section>
  );
}

export default PolicyUpdatesSection;
