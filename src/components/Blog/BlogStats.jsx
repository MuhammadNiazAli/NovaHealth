import React from "react";

const statsData = [
  {
    id: 1,
    title: "Total Posts",
    value: "128",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20h9M12 4h9M3 10h18M3 14h18M3 6h.01M3 18h.01"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Total Readers",
    value: "48K+",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Average Rating",
    value: "4.8 / 5",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.947c.3.92-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.947a1 1 0 00-.364-1.118L2.034 9.373c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Categories Covered",
    value: "7+",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    ),
  },
];

export default function BlogStats() {
  return (
    <section
      aria-label="Blog statistics overview"
      className="max-w-5xl mx-auto px-6 py-16 -my-8"
    >
      <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-900">
        <span className="text-blue-700">Blog at a</span> Glance
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {statsData.map(({ id, title, value, icon }) => (
          <article
            key={id}
            className="flex flex-col items-center bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            aria-label={`${title}: ${value}`}
          >
            <div className="mb-4">{icon}</div>
            <p className="text-4xl font-extrabold text-gray-900">{value}</p>
            <p className="mt-2 text-lg text-gray-600 font-medium">{title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
