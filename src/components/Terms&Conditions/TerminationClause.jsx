'use client'
import React from "react";

const TerminationClause = () => {
  return (
    <section
      aria-labelledby="termination-clause-heading"
      className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-16"
    >
      <h2
        id="termination-clause-heading"
        className="mb-8 select-text text-3xl sm:text-4xl font-bold text-gray-900"
      >
        Termination Clause
      </h2>

      <p className="mb-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light text-gray-800">
        NovaHealth reserves the right to suspend or terminate your access to our services at
        any time, without prior notice, should you breach these Terms & Conditions or
        engage in unlawful or harmful conduct.
      </p>

      <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light text-gray-800">
        Once terminated, your access rights will end immediately, though any obligations or
        liabilities accrued beforehand will continue to apply.
      </p>
    </section>
  );
};

export default TerminationClause;
