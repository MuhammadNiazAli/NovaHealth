"use client";

import React from "react";

const teamProfiles = [
  {
    id: 1,
    name: "Emily Carter",
    role: "Marketing Specialist",
    photo:
      "https://images.unsplash.com/photo-1688588162416-f7a7e726e0bf?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Passionate about crafting compelling marketing strategies and brand storytelling.",
    email: "emily.carter@example.com",
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Software Engineer",
    photo:
      "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Expert in full-stack development, building scalable and performant web apps.",
    email: "james.anderson@example.com",
  },
  {
    id: 3,
    name: "Sofia Martinez",
    role: "Product Designer",
    photo:
      "https://images.unsplash.com/photo-1679581356089-e65ea18c7f61?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Designs intuitive user experiences with a keen eye for detail and aesthetics.",
    email: "sofia.martinez@example.com",
  },
  {
    id: 4,
    name: "Liam Johnson",
    role: "Project Manager",
    photo:
      "https://plus.unsplash.com/premium_photo-1723514536306-26fe5c4adeb7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Ensures smooth delivery with agile methodologies and effective communication.",
    email: "liam.johnson@example.com",
  },
  {
    id: 5,
    name: "Olivia Brown",
    role: "QA Engineer",
    photo:
      "https://plus.unsplash.com/premium_photo-1702598606780-7ecee80ef5e1?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Dedicated to maintaining the highest quality standards across projects.",
    email: "olivia.brown@example.com",
  },
  {
    id: 6,
    name: "Noah Wilson",
    role: "DevOps Engineer",
    photo:
      "https://plus.unsplash.com/premium_photo-1661718954553-f775043016d5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Automates infrastructure and deployment pipelines for maximum efficiency.",
    email: "noah.wilson@example.com",
  },
];

export default function OurteamGallery() {
  return (
    <section
      aria-label="Our Team Gallery"
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <h2 className="text-4xl font-extrabold text-blue-700 mb-12 text-center">
        <span className="text-black">Meet Our</span> Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamProfiles.map(({ id, name, role, photo, bio, email }) => (
          <article
            key={id}
            tabIndex={0}
            className="group relative bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 border border-gray-200"
          >
            {/* Member Photo */}
            <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
              <img
                src={photo}
                alt={`Photo of ${name}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Email overlay on hover/focus */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent
                           transform translate-y-full group-hover:translate-y-0 focus-within:translate-y-0
                           transition-transform duration-500 px-6 py-4 flex flex-col text-white"
              >
                <p className="text-sm font-light leading-tight">{email}</p>
              </div>
            </div>

            {/* Member details */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-blue-700 font-medium mb-2">{role}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
