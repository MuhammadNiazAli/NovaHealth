"use client";

import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <AboutSection />
        <QuickLinks />
        <ContactDetails />
        <SocialMedia />
      </div>

      <FooterBottom />
    </footer>
  );
}

// About Section: Brief description about NovaHealth
function AboutSection() {
  return (
    <div>
      <h3 className="text-white text-base font-semibold mb-2 tracking-wide">
        NovaHealth
      </h3>
      <p className="text-gray-400 leading-snug text-[12px] sm:text-xs">
        NovaHealth is dedicated to providing the best healthcare solutions with a
        team of expert professionals and cutting-edge technology.
      </p>
    </div>
  );
}

// Quick navigation links displayed in a 2-column grid from medium screen and above
function QuickLinks() {
  // List of links with label and href
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Patient Information", href: "/patient-info" },
    { label: "Emergency", href: "/emergency" },
    { label: "Our Team", href: "/team" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
    { label: "Patient Dashboard", href: "/dashboard" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms&conditions" },
  ];

  return (
    <div>
      <h3 className="text-white text-base font-semibold mb-2 tracking-wide">
        Quick Links
      </h3>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] sm:text-xs">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="block hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  alert(`Navigate to ${label}`);
                }
              }}
              aria-label={`Navigate to ${label} page`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Contact info with clickable phone and email links, and operating hours
function ContactDetails() {
  return (
    <div>
      <h3 className="text-white text-base font-semibold mb-2 tracking-wide">
        Contact Us
      </h3>

      <address className="not-italic space-y-1 text-gray-400 text-[12px] sm:text-xs leading-tight">
        <p>123 Health St., Wellness City, Country</p>
        <p>
          Phone:{" "}
          <a
            href="tel:+1234567890"
            className="hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
            aria-label="Call NovaHealth phone number"
          >
            +1 (234) 567-890
          </a>
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:info@novahealth.com"
            className="hover:text-blue-500 transition-colors duration-200 whitespace-nowrap"
            aria-label="Send email to NovaHealth"
          >
            info@novahealth.com
          </a>
        </p>
        <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
      </address>
    </div>
  );
}

// Social media icons with accessible labels and subtle hover colors
function SocialMedia() {
  return (
    <div>
      <h3 className="text-white text-base font-semibold mb-2 tracking-wide">
        Follow Us
      </h3>

      <div className="flex space-x-5 text-gray-400">
        {/* Facebook */}
        <SocialIcon
          href="#"
          label="Facebook"
          hoverColor="hover:text-blue-600"
          svgPath="M22.675 0h-21.35C.595 0 0 .592 0 1.324v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.675V1.324C24 .592 23.406 0 22.675 0z"
        />

        {/* Twitter */}
        <SocialIcon
          href="#"
          label="Twitter"
          hoverColor="hover:text-sky-400"
          svgPath="M23.954 4.569c-.885.389-1.83.654-2.825.775a4.932 4.932 0 002.163-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.822 4.822 0 001.523 6.574c-.806-.025-1.566-.247-2.229-.616v.061a4.916 4.916 0 003.946 4.817 4.996 4.996 0 01-2.224.084 4.919 4.919 0 004.588 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.209c9.057 0 14.01-7.513 14.01-14.01 0-.213-.004-.425-.014-.636A10.012 10.012 0 0024 4.59z"
        />

        {/* LinkedIn */}
        <SocialIcon
          href="#"
          label="LinkedIn"
          hoverColor="hover:text-blue-700"
          svgPath="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.267 2.37 4.267 5.456v6.285zM5.337 7.433a2.07 2.07 0 11-.001-4.14 2.07 2.07 0 010 4.14zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.543C0 23.227.792 24 1.771 24h20.451c.98 0 1.778-.773 1.778-1.728V1.73C24 .774 23.204 0 22.225 0z"
        />

        {/* Instagram */}
        <a
          href="#"
          aria-label="Instagram"
          className="hover:text-pink-500 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37a4 4 0 11-4.63-4.63 4 4 0 014.63 4.63z" />
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// Social icon as reusable component, renders SVG path inside an <a>
function SocialIcon({ href, label, hoverColor, svgPath }) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`${hoverColor} transition-colors duration-200`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d={svgPath} />
      </svg>
    </a>
  );
}

// Bottom copyright bar
function FooterBottom() {
  return (
    <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500 text-xs sm:text-sm select-none">
      &copy; {new Date().getFullYear()} NovaHealth. All rights reserved.
    </div>
  );
}

export default Footer;
