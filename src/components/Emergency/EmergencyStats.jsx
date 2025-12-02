import React from "react";

const statsData = [
  { label: "Emergency Calls Handled", value: "24,000+" },
  { label: "Ambulance Dispatches", value: "8,500+" },
  { label: "Lives Saved", value: "12,300+" },
  { label: "Avg. Response Time", value: "6 mins" },
];

const EmergencyStats = () => {
  return (
    <section
      aria-label="Statistics about emergency response"
      className="bg-white text-black py-10 px-4 sm:px-8 md:px-16 lg:px-24 my-5"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-8">
          <span className="text-black">Emergency</span> Response Statistics
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {statsData.map(({ label, value }, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-md border border-gray-200 shadow-sm"
            >
              <p className="text-3xl sm:text-4xl font-bold text-blue-700 leading-tight">
                {value}
              </p>
              <p className="mt-1 text-gray-700 text-xs sm:text-sm font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmergencyStats;
