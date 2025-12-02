"use client";

import React from "react";

const guides = [
  {
    id: 1,
    title: "How to Prepare for Your Doctor's Appointment",
    description:
      "Learn how to get the most out of your medical appointments with tips on questions, documents, and follow-ups.",
    image: "https://plus.unsplash.com/premium_photo-1702599160474-22e21180b230?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://www.example.com/guide/prepare-appointment",
  },
  {
    id: 2,
    title: "Understanding Your Medical Bills",
    description:
      "A simple guide to help you understand the components of your medical bills and how to manage payments.",
    image: "https://media.istockphoto.com/id/2087258763/photo/from-above-photo-of-a-senior-man-using-a-laptop-computer-and-paying-bills-with-serious-nurse.webp?a=1&b=1&s=612x612&w=0&k=20&c=s9yet_GxWR9LrvAqVkGmgHB768E7lc9iwNt72EzGbzY=",
    url: "https://www.example.com/guide/medical-bills",
  },
  {
    id: 3,
    title: "Managing Chronic Conditions",
    description:
      "Helpful advice and strategies for managing long-term health conditions with ease and confidence.",
    image: "https://media.istockphoto.com/id/2203057449/photo/man-with-pills-organizer.webp?a=1&b=1&s=612x612&w=0&k=20&c=02ypi4T2P5BwnF_GoLV9uz5Hc5zhCYfZH-bejreEMDA=",
    url: "https://www.example.com/guide/chronic-conditions",
  },
  {
    id: 4,
    title: "Nutrition and Wellness Basics",
    description:
      "Essential tips on nutrition, diet, and lifestyle to maintain your overall wellness.",
    image: "https://images.unsplash.com/photo-1590779033823-2aa50ccf7292?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TnV0cml0aW9uJTIwYW5kJTIwV2VsbG5lc3MlMjBCYXNpY3N8ZW58MHx8MHx8fDA%3D",
    url: "https://www.example.com/guide/nutrition-wellness",
  },
];

export default function FaqsGuides() {
  return (
    <section
      aria-label="Helpful health guides"
      className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-16 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-3xl font-extrabold text-blue-700 mb-12 text-center select-text">
        Helpful <span className="text-black">Health Guides</span>
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map(({ id, title, description, image, url }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate" title={title}>
                {title}
              </h3>
              <p className="text-gray-700 font-light leading-relaxed text-sm line-clamp-4">
                {description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
