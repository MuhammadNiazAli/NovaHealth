"use client";

import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Project Manager",
    photo:
      "https://images.unsplash.com/photo-1659353888906-adb3e0041693?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Passionate about delivering projects on time with quality and excellence.",
    socials: {
      linkedin: "https://linkedin.com/in/alicejohnson",
      twitter: "https://twitter.com/alicejohnson",
      github: "https://github.com/alicejohnson",
    },
  },
  {
    name: "Mark Williams",
    role: "Lead Developer",
    photo:
      "https://images.unsplash.com/photo-1659353887617-8cf154b312c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Coding wizard crafting clean and efficient code for scalable applications.",
    socials: {
      linkedin: "https://linkedin.com/in/markwilliams",
      twitter: "https://twitter.com/markwilliams",
      github: "https://github.com/markwilliams",
    },
  },
  {
    name: "Sophia Lee",
    role: "UX/UI Designer",
    photo:
      "https://plus.unsplash.com/premium_photo-1682089874677-3eee554feb19?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Designing intuitive and delightful user experiences with a creative touch.",
    socials: {
      linkedin: "https://linkedin.com/in/sophialee",
      twitter: "https://twitter.com/sophialee",
      github: "https://github.com/sophialee",
    },
  },
  {
    name: "David Kim",
    role: "QA Engineer",
    photo:
      "https://images.unsplash.com/photo-1612363584451-cd060fb62018?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Ensuring the highest quality standards through meticulous testing.",
    socials: {
      linkedin: "https://linkedin.com/in/davidkim",
      twitter: "https://twitter.com/davidkim",
      github: "https://github.com/davidkim",
    },
  },
];

export default function OurteamMembers() {
  return (
    <section
      aria-label="Meet Our Team Members"
      className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-20 bg-white my-[-30px]"
    >
      <h2 className="text-4xl font-extrabold text-blue-700 mb-12 text-center">
        <span className="text-black">Meet Our</span> Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {teamMembers.map(({ name, role, photo, bio, socials }, index) => (
          <article
            key={index}
            tabIndex={0}
            role="group"
            aria-label={`Team member: ${name}, ${role}`}
            className="bg-gray-50 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center transition-transform transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 border border-gray-200"
          >
            <img
              src={photo}
              alt={`Portrait of ${name}`}
              className="w-32 h-32 rounded-full object-cover mb-6 shadow-md"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
            <p className="text-blue-700 font-medium mb-4">{role}</p>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{bio}</p>
            <div className="flex gap-5 text-blue-600 justify-center">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} LinkedIn`}
                  className="text-2xl hover:text-blue-800 transition"
                >
                  <FaLinkedin />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} Twitter`}
                  className="text-2xl hover:text-blue-500 transition"
                >
                  <FaTwitter />
                </a>
              )}
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} GitHub`}
                  className="text-2xl hover:text-gray-900 transition"
                >
                  <FaGithub />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
