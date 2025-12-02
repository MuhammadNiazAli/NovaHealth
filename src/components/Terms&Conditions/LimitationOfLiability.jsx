'use client'
import React from "react";

const LimitationOfLiability = () => {
  return (
    <section
      aria-labelledby="limitation-of-liability-heading"
      className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-16"
    >
      <h2
        id="limitation-of-liability-heading"
        className="mb-8 select-text text-3xl sm:text-4xl font-bold text-gray-900"
      >
        Limitation of Liability
      </h2>

      <p className="mb-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light text-gray-800">
        NovaHealth and its affiliates are not responsible for any direct, indirect, incidental,
        consequential, or punitive damages that may result from your use of our services. This
        includes, but is not limited to, errors, omissions, or service interruptions.
      </p>

      <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light text-gray-800">
        By using our services, you acknowledge and accept that you do so at your own risk. While
        we aim to provide accurate and timely information, we cannot guarantee the completeness
        or reliability of all content.
      </p>
    </section>
  );
};

export default LimitationOfLiability;
