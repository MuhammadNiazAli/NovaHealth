import React from "react";

function PrivacyPolicyHero() {
  return (
    <section
      aria-labelledby="privacy-policy-hero-heading"
      className="bg-gradient-to-br from-blue-50 via-white to-white w-full py-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-20">
        {/* Text block */}
        <div className="flex-1 max-w-xl text-center lg:text-left">
          <h1
            id="privacy-policy-hero-heading"
            className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight leading-tight text-gray-900"
          >
            Your Privacy,{" "}
            <span className="text-blue-600 text-xl sm:text-5xl font-semibold align-baseline">
              Our Commitment
            </span>
          </h1>
          <p className="mt-8 max-w-lg mx-auto lg:mx-0 text-lg sm:text-xl font-normal leading-relaxed text-gray-700">
            We prioritize your privacy and protect your personal data with the highest
            standards. Understand how we collect, use, and safeguard your information.
          </p>
          <p className="mt-4 max-w-md mx-auto lg:mx-0 text-sm text-gray-500 tracking-wide">
            Transparency and control are at the core of our privacy policy — because your
            trust matters.
          </p>
        </div>

        {/* Hero image with decorative accent */}
        <div className="flex-1 max-w-lg w-full relative">
          <div className="overflow-hidden rounded-3xl border border-indigo-200 shadow-2xl">
            <img
              src="https://images.squarespace-cdn.com/content/v1/6220ad1db2910108f6cfc24f/46da4dd1-e009-4d51-92bc-7bd013235df1/googlevsprivacy.gif"
              alt="Privacy protection concept with lock and data"
              className="w-full h-auto object-cover select-none"
              loading="lazy"
              draggable={false}
            />
          </div>
          {/* Decorative blurred circle */}
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-100 rounded-full opacity-40 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicyHero;
