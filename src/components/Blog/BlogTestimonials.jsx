import React, { useState, useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sophia Johnson",
    role: "Health Enthusiast",
    photo:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWFufGVufDB8fDB8fHww",
    rating: 5,
    text:
      "This blog has completely transformed how I approach my wellness routine. The tips are practical and easy to follow!",
  },
  {
    id: 2,
    name: "James Smith",
    role: "Fitness Trainer",
    photo:
      "https://plus.unsplash.com/premium_photo-1725022935609-585e3f42b992?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1hbiU1Q3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4,
    text:
      "I appreciate the well-researched articles and genuine advice. A go-to resource for fitness and health topics.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Nutritionist",
    photo:
      "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdvbWFufGVufDB8fDB8fHww",
    rating: 5,
    text:
      "The balanced diet tips and recipes here are fantastic. I've recommended this blog to all my clients!",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Yoga Instructor",
    photo:
      "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbiU1Q3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4,
    text:
      "Great insights on mental health and mindfulness. The articles are very relatable and helpful.",
  },
  {
    id: 5,
    name: "Olivia Wilson",
    role: "Lifestyle Blogger",
    photo:
      "https://plus.unsplash.com/premium_photo-1689266188052-704d33673e69?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvbWFufGVufDB8fDB8fHww",
    rating: 5,
    text:
      "I love how this blog combines science and simplicity. The content always motivates me to live better.",
  },
];

const Stars = ({ count }) => (
  <div className="flex mt-1" aria-label={`${count} out of 5 stars`} role="img">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.947c.3.92-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.947a1 1 0 00-.364-1.118L2.034 9.373c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z" />
      </svg>
    ))}
  </div>
);

export default function BlogTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = TESTIMONIALS.length;
  const timeoutRef = useRef(null);

  // Auto slide every 8 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, length]);

  // Swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
    } else if (touchEndX.current - touchStartX.current > 50) {
      setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
    }
  };

  return (
    <section
      className="max-w-4xl mx-auto px-6 py-16 bg-white rounded-3xl -my-10 mb-0"
      aria-label="User testimonials section"
    >
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 relative inline-block">
        <span className="text-blue-700">What Our Readers</span> Say
        <span className="block h-1.5 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded mt-2 mx-auto"></span>
      </h2>

      {/* Desktop carousel (md+) */}
      <div
        className="relative overflow-hidden hidden md:block"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials carousel"
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / length)}%)`,
          }}
        >
          {TESTIMONIALS.map(({ id, name, role, photo, rating, text }) => (
            <article
              key={id}
              className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-10 mx-auto flex-shrink-0 w-full max-w-3xl border border-gray-200"
              aria-label={`Testimonial by ${name}`}
            >
              <div className="flex items-center mb-6">
                <div className="relative w-24 h-24 rounded-full ring-4 ring-blue-300 shadow-lg overflow-hidden">
                  <img
                    src={photo}
                    alt={`${name} photo`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="ml-8">
                  <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
                  <p className="text-indigo-700 font-semibold">{role}</p>
                  <Stars count={rating} />
                </div>
              </div>
              <p className="text-gray-800 italic text-xl leading-relaxed">&ldquo;{text}&rdquo;</p>
            </article>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1))}
          aria-label="Previous testimonial"
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-4 text-indigo-600 transition"
          style={{ zIndex: 10 }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1))}
          aria-label="Next testimonial"
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-4 text-indigo-600 transition"
          style={{ zIndex: 10 }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile carousel (below md) */}
      <div
        className="relative overflow-hidden block md:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials carousel"
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / length)}%)`,
          }}
        >
          {TESTIMONIALS.map(({ id, name, role, photo, rating, text }) => (
            <article
              key={id}
              className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-8 mx-auto flex-shrink-0 w-full max-w-xs"
              aria-label={`Testimonial by ${name}`}
            >
              <div className="flex items-center mb-5">
                <div className="relative w-20 h-20 rounded-full ring-4 ring-blue-300 shadow-md overflow-hidden">
                  <img
                    src={photo}
                    alt={`${name} photo`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                  <p className="text-indigo-700 font-semibold">{role}</p>
                  <Stars count={rating} />
                </div>
              </div>
              <p className="text-gray-800 italic text-base leading-relaxed">&ldquo;{text}&rdquo;</p>
            </article>
          ))}
        </div>

        {/* Navigation arrows for mobile */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1))}
          aria-label="Previous testimonial"
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 text-indigo-600 transition"
          style={{ zIndex: 10 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1))}
          aria-label="Next testimonial"
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 text-indigo-600 transition"
          style={{ zIndex: 10 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
