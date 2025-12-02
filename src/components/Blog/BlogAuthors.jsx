import React from "react";

const authorsList = [
  {
    id: 1,
    fullName: "Emma Johnson",
    description: "Health & Wellness expert passionate about holistic living.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8fDA%3D",
    social: {
      twitter: "https://twitter.com/emmajohnson",
      linkedin: "https://linkedin.com/in/emmajohnson",
    },
  },
  {
    id: 2,
    fullName: "Liam Smith",
    description: "Fitness coach and nutrition specialist helping people stay fit.",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    social: {
      twitter: "https://twitter.com/liamsmith",
      linkedin: "https://linkedin.com/in/liamsmith",
    },
  },
  {
    id: 3,
    fullName: "Sophia Lee",
    description: "Mental health advocate and mindfulness teacher.",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8fDA%3D",
    social: {
      twitter: "https://twitter.com/sophialee",
      linkedin: "https://linkedin.com/in/sophialee",
    },
  },
  {
    id: 4,
    fullName: "Mason Davis",
    description: "Expert in natural remedies and holistic health approaches.",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fHww",
    social: {
      twitter: "https://twitter.com/masondavis",
      linkedin: "https://linkedin.com/in/masondavis",
    },
  },
];

// Simple social icon components to keep JSX cleaner
const TwitterIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.96-2.48 9.09 9.09 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.85 12.85 0 013 4.8a4.52 4.52 0 001.4 6.05 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.48 4.48 0 01-2.04.08 4.52 4.52 0 004.22 3.15A9.07 9.07 0 012 19.54a12.82 12.82 0 006.95 2.04c8.35 0 12.92-6.91 12.92-12.91 0-.2 0-.42-.02-.63A9.18 9.18 0 0023 3z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11 19h-3v-9h3zm-1.5-10.3a1.75 1.75 0 111.75-1.75 1.75 1.75 0 01-1.75 1.75zm13.5 10.3h-3v-4.5a1.5 1.5 0 00-3 0v4.5h-3v-9h3v1.25a3.56 3.56 0 016 2.6z" />
  </svg>
);

// Individual author card for clarity and reuse
function AuthorCard({ author }) {
  return (
    <article
      className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-xl border border-gray-200"
      aria-label={`Profile of ${author.fullName}`}
    >
      <img
        src={author.avatarUrl}
        alt={`Portrait of ${author.fullName}`}
        loading="lazy"
        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-600"
      />
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{author.fullName}</h3>
      <p className="text-gray-600 mb-4 text-sm">{author.description}</p>
      <nav className="flex space-x-5" aria-label={`${author.fullName} social media links`}>
        <a
          href={author.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow ${author.fullName} on Twitter`}
          className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors"
        >
          <TwitterIcon />
        </a>
        <a
          href={author.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Connect with ${author.fullName} on LinkedIn`}
          className="text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded transition-colors"
        >
          <LinkedInIcon />
        </a>
      </nav>
    </article>
  );
}

export default function BlogAuthors() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12" aria-labelledby="authors-heading">
      <h2
        id="authors-heading"
        className="text-3xl font-extrabold text-center mb-10 text-gray-900"
      >
        <span className="text-blue-700">Meet Our</span> Authors
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {authorsList.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </section>
  );
}
