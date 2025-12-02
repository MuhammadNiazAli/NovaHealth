'use client'
import React from "react";

const EmergencyInfo = () => {
  return (
    <section
      aria-label="Emergency Instructions and Contact"
      className="bg-white text-black py-12 px-6 sm:px-12 md:px-20 lg:px-32 my-[-30px]"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-stretch gap-12">
        {/* Left Content */}
        <div className="md:flex-1 flex flex-col justify-center max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6 leading-tight">
            <span className="text-black">What To Do</span> In An Emergency
          </h2>

          <p className="text-base sm:text-lg text-gray-800 mb-8 leading-relaxed">
            Emergencies can be stressful and frightening. Knowing the right steps to
            take can save lives. Here’s what you should keep in mind:
          </p>

          <ul className="list-disc list-inside space-y-3 text-gray-700 text-sm sm:text-base">
            <li>Stay calm and assess the situation carefully.</li>
            <li>Call emergency services immediately if needed.</li>
            <li>
              Provide clear and precise information about the location and nature of
              the emergency.
            </li>
            <li>Follow the instructions given by emergency responders.</li>
            <li>Do not put yourself or others in danger.</li>
          </ul>

          <button
            type="button"
            className="mt-10 px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 max-w-max"
            aria-label="Call Emergency Services"
            onClick={() => {
              window.open("tel:911");
            }}
          >
            Call Emergency Services
          </button>
        </div>

        {/* Right Content - Image */}
        <div className="md:flex-1 flex justify-center md:justify-end">
          <img
            src="https://plus.unsplash.com/premium_photo-1661391674538-d1a2bf90a490?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Emergency responders helping a patient"
            className="rounded-xl shadow-lg object-cover h-full max-w-full"
            loading="lazy"
            decoding="async"
            width={600}
            height={400}
            style={{ minHeight: 0, minWidth: 0 }}
          />
        </div>
      </div>
    </section>
  );
};

export default EmergencyInfo;
