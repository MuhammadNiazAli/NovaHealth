"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { motion, useAnimation } from "framer-motion";

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheckCircle,
  FaShareAlt,
  FaCopy,
} from "react-icons/fa";

import "swiper/css";

const testimonials = [
  {
    id: 1,
    name: "Dr. Emma Johnson",
    specialty: "Cardiologist",
    photo:
      "https://media.istockphoto.com/id/96455213/photo/young-medical-girl.webp?a=1&s=612x612&w=0&k=20&c=dae8Fb4n-UyxsDwrr79DRgrBfORqzgoDGzNXK4V_-eM=",
    rating: 4.5,
    testimonial:
      "Dr. Emma provided outstanding cardiac care with professionalism and empathy, focusing on patient comfort and ensuring a smooth recovery.",
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialty: "Pediatrician",
    photo:
      "https://images.unsplash.com/photo-1645066928295-2506defde470?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGRvY3RvcnN8ZW58MHx8MHx8fDA%3D",
    rating: 5,
    testimonial:
      "Dr. Michael’s gentle manner and thorough care made every visit reassuring. He truly cares about children’s well-being and listens carefully to parents.",
  },
  {
    id: 3,
    name: "Dr. Sophia Patel",
    specialty: "Neurologist",
    photo:
      "https://media.istockphoto.com/id/1211631919/photo/friendly-nurse-in-blue-scrubs.webp?a=1&s=612x612&w=0&k=20&c=ifOl1w6Kxua7GrlZjiqeW9-DhOmjtcQvM71v-iZdo6s=",
    rating: 4,
    testimonial:
      "Dr. Sophia’s expert knowledge and approachable demeanor helped me understand my condition clearly. I appreciate her time and professionalism.",
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Orthopedic Surgeon",
    photo:
      "https://plus.unsplash.com/premium_photo-1677165481551-c91ed6e15f09?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
    rating: 4.8,
    testimonial:
      "Dr. David’s surgical expertise and careful follow-up made my treatment successful. His team was professional and supportive throughout my recovery.",
  },
  {
    id: 5,
    name: "Dr. Aisha Rahman",
    specialty: "Dermatologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1681967035389-84aabd80cb1e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    testimonial:
      "Dr. Aisha provided expert skincare advice and treatment that transformed my skin. Her approachable style made every appointment comfortable.",
  },
  {
    id: 6,
    name: "Dr. Carlos Mendes",
    specialty: "ENT Specialist",
    photo:
      "https://images.unsplash.com/photo-1612523138351-4643808db8f3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    rating: 4.2,
    testimonial:
      "Dr. Mendes was very attentive and explained every step of my ENT treatment clearly. I felt well cared for and confident in his expertise.",
  },
  {
    id: 7,
    name: "Dr. Laura Chen",
    specialty: "Psychiatrist",
    photo:
      "https://plus.unsplash.com/premium_photo-1702599029013-883a56a51fdc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    rating: 4.9,
    testimonial:
      "Dr. Laura’s compassionate care helped me regain mental strength. She listens carefully and provides thoughtful guidance every session.",
  },
  {
    id: 8,
    name: "Dr. James Anderson",
    specialty: "Urologist",
    photo:
      "https://images.unsplash.com/photo-1612276529731-4b21494e6d71?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    rating: 4.6,
    testimonial:
      "Dr. James is a skilled and respectful professional who provided clear explanations, helping me feel confident and at ease throughout my treatment.",
  },
  {
    id: 9,
    name: "Dr. Priya Mehta",
    specialty: "Endocrinologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1661436275595-e6a8a3943f7a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
    rating: 4.4,
    testimonial:
      "Dr. Priya offered a clear plan for managing my condition and supported me patiently throughout. Highly professional care.",
  },
  {
    id: 10,
    name: "Dr. Thomas Nguyen",
    specialty: "Gastroenterologist",
    photo:
      "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    rating: 4.7,
    testimonial:
      "Dr. Thomas simplified a complex procedure with clarity and a calm approach, putting me at ease throughout the treatment.",
  },
  {
    id: 11,
    name: "Dr. Fatima Zahra",
    specialty: "Ophthalmologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1661700138215-2ade8dd6f0c9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8",
    rating: 5,
    testimonial:
      "Dr. Fatima was gentle, thorough, and explained every step clearly. Her care made a real difference in my vision.",
  },
  {
    id: 12,
    name: "Dr. Robert Scott",
    specialty: "General Physician",
    photo:
      "https://plus.unsplash.com/premium_photo-1723514536306-26fe5c4adeb7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
    rating: 4.3,
    testimonial:
      "Dr. Scott is approachable and accurate with his diagnoses. I trust his advice and appreciate his professionalism.",
  },
  {
    id: 13,
    name: "Dr. Elena Garcia",
    specialty: "Pulmonologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1661700176531-c8bd4603030f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8",
    rating: 4.8,
    testimonial:
      "Thanks to Dr. Elena’s thorough treatment, my breathing has improved significantly. She is very caring and professional.",
  },
  {
    id: 14,
    name: "Dr. Benjamin Carter",
    specialty: "Oncologist",
    photo:
      "https://media.istockphoto.com/id/2161181257/photo/photo-of-doctor-guy-cross-arms-smiling-isolated-grey-color-background.webp?a=1&s=612x612&w=0&k=20&c=U9syri__PrnlJoIy7f9ABirWpQS9cbtFkwNkHWF4UpU=",
    rating: 4.9,
    testimonial:
      "Dr. Benjamin provided expert guidance and compassion during a challenging time. His skill and dedication are unmatched.",
  },
  {
    id: 15,
    name: "Dr. Hana Yamada",
    specialty: "Rheumatologist",
    photo:
      "https://plus.unsplash.com/premium_photo-1702598649611-725ca8ca3ab6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8",
    rating: 4.5,
    testimonial:
      "Dr. Hana listens attentively and provided me with effective treatment to manage my joint pain. Highly recommended.",
  },
  {
    id: 16,
    name: "Dr. Omar Bashir",
    specialty: "Nephrologist",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    testimonial:
      "Dr. Omar’s knowledge and clear explanations helped me understand my condition and the treatment plan thoroughly.",
  },
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" aria-hidden="true" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" aria-hidden="true" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" aria-hidden="true" />);
    }
  }
  return (
    <div
      className="flex gap-1 mt-2 text-lg"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars}
    </div>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const ModernCard = ({
  id,
  name,
  specialty,
  photo,
  testimonial,
  rating,
  isExpanded,
  onToggle,
  copied,
  onCopy,
  currentUrl,
}) => {
  const words = testimonial.split(" ");
  const shouldTruncate = words.length > 30;
  const displayedText = isExpanded || !shouldTruncate
    ? testimonial
    : words.slice(0, 30).join(" ") + "...";

  return (
    <motion.article
      id={`testimonial-${id}`}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white border border-gray-300 rounded-3xl max-w-3xl mx-auto p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 cursor-default select-none"
      tabIndex={0}
      role="group"
      aria-label={`Testimonial by ${name}`}
    >
      {/* Avatar container */}
      <div className="flex-shrink-0 w-32 h-32 relative">
        <img
          src={photo}
          alt={`Photo of ${name}`}
          className="w-full h-full rounded-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <FaCheckCircle
          className="absolute bottom-1 right-1 text-green-600 text-2xl bg-white rounded-full border border-gray-300"
          title="Verified"
          aria-label="Verified"
        />
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <p
          className="text-gray-900 text-lg italic leading-relaxed mb-4"
          aria-live="polite"
          id={`testimonial-text-${id}`}
        >
          “{displayedText}{" "}
          {shouldTruncate && (
            <button
              onClick={() => onToggle(id)}
              className="text-blue-700 font-semibold underline hover:text-blue-900 transition-colors focus:outline-none"
              aria-expanded={isExpanded}
              aria-controls={`testimonial-text-${id}`}
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </p>

        <StarRating rating={rating} />

        <h3 className="mt-6 font-extrabold text-2xl text-gray-900 flex items-center gap-2">
          {name}
        </h3>
        <p className="text-blue-800 font-semibold tracking-wide">{specialty}</p>

        <div className="mt-6 flex gap-6 flex-wrap">
          <button
            onClick={() => onCopy(id)}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label={`Copy link for testimonial by ${name}`}
            type="button"
          >
            {copied === id ? "Link Copied!" : "Copy Link"} <FaCopy />
          </button>
          <a
            href={`mailto:?subject=Check this testimonial&body=Check this: ${currentUrl}#testimonial-${id}`}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label={`Share testimonial by ${name}`}
          >
            Share <FaShareAlt />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const HomeTestimonials = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [controls]);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(`${currentUrl}#testimonial-${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-white w-full py-16 px-6 sm:px-12 lg:px-24 rounded-3xl"
    >
      <div className="max-w-5xl mx-auto text-center mb-14">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            hidden: { opacity: 0, y: 20 },
          }}
        >
          Trusted Voices{" "}
          <span className="text-blue-700 font-extrabold">From Our Patients</span>
        </motion.h2>
        <motion.p
          className="text-gray-800 mt-4 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.8, ease: "easeOut" },
            },
            hidden: { opacity: 0, y: 20 },
          }}
        >
          Real stories from people who received expert care across various specialties.
        </motion.p>
      </div>

      <motion.div
        className="relative max-w-4xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          allowTouchMove
          spaceBetween={24}
          className="w-full"
        >
          {testimonials.map(({ id, name, specialty, photo, testimonial, rating }) => (
            <SwiperSlide key={id}>
              <ModernCard
                id={id}
                name={name}
                specialty={specialty}
                photo={photo}
                testimonial={testimonial}
                rating={rating}
                isExpanded={expandedId === id}
                onToggle={handleToggle}
                copied={copiedId}
                onCopy={handleCopy}
                currentUrl={currentUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default HomeTestimonials;
