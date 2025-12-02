"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Appointments", href: "/appointments" },
  { label: "Patient Info", href: "/patient-info" },
  { label: "Emergency", href: "/emergency" },
  { label: "Our Team", href: "/ourteam" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
];

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef(null);
  const currentPath = usePathname() || "/";

  // Close drawer and dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
        setIsMoreOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Determine if link is active based on current path
  const checkActive = (href) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  // Divide nav items: first 5 main, rest in "More"
  const mainNav = NAV_ITEMS.slice(0, 5);
  const moreNav = NAV_ITEMS.slice(5);

  return (
    <>
      {/* Header with desktop nav and mobile toggle */}
      <header className="sticky top-0 z-50 bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav
            aria-label="Primary Navigation"
            className="flex items-center justify-between h-16"
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                aria-label="NovaHealth Home"
                onClick={() => setIsDrawerOpen(false)}
                className="text-2xl font-extrabold text-blue-700 select-none hover:text-blue-800 whitespace-nowrap"
              >
                NovaHealth
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-10 font-semibold text-gray-700 text-sm select-none">
              {mainNav.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setIsDrawerOpen(false)}
                  className={`relative py-2 border-b-2 transition-colors duration-300 focus:outline-none focus:border-blue-700 ${
                    checkActive(href)
                      ? "border-blue-700 text-blue-700"
                      : "border-transparent hover:border-blue-700 hover:text-blue-700"
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* "More" dropdown */}
              <div ref={moreDropdownRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isMoreOpen}
                  onClick={() => setIsMoreOpen((prev) => !prev)}
                  className={`flex items-center gap-1 py-2 px-0 text-sm leading-tight border-b-2 border-transparent transition-colors duration-300 focus:outline-none focus:border-blue-700 ${
                    isMoreOpen ? "border-blue-700 text-blue-700" : "text-gray-700 hover:text-blue-700 hover:border-blue-700"
                  }`}
                >
                  <span className="select-none cursor-pointer leading-none">More</span>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isMoreOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMoreOpen && (
                  <ul className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {moreNav.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          onClick={() => {
                            setIsMoreOpen(false);
                            setIsDrawerOpen(false);
                          }}
                          className={`block px-4 py-2 transition-colors duration-300 ${
                            checkActive(href)
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Patient Login Button */}
              <Link
                href="/dashboard"
                onClick={() => setIsDrawerOpen(false)}
                className="ml-6 px-5 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-300 whitespace-nowrap"
              >
                Patient Login
              </Link>
            </nav>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-md text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {isDrawerOpen ? (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Backdrop for drawer */}
      <div
        aria-hidden="true"
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* Mobile drawer */}
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`fixed top-0 right-0 h-full w-72 max-w-full bg-white/95 backdrop-blur-md shadow-xl z-50 transform transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full px-6 py-8 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          {/* Drawer header with logo and close button */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              aria-label="NovaHealth Home"
              onClick={() => setIsDrawerOpen(false)}
              className="text-2xl font-extrabold text-blue-700 select-none hover:text-blue-800 whitespace-nowrap"
            >
              NovaHealth
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <ul className="flex flex-col space-y-6 font-semibold text-gray-900 text-lg select-none">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setIsDrawerOpen(false)}
                  tabIndex={0}
                  className={`block px-6 py-4 rounded-lg border-l-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    checkActive(href)
                      ? "border-blue-700 bg-blue-50 text-blue-700 shadow-lg"
                      : "border-transparent hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom CTA button */}
          <div className="mt-auto px-6 pt-10 pb-6">
            <Link
              href="/dashboard"
              onClick={() => setIsDrawerOpen(false)}
              tabIndex={0}
              aria-label="Patient Login"
              className="block w-full text-center bg-blue-700 text-white font-semibold rounded-md py-3 shadow-md hover:bg-blue-800 transition-colors duration-300"
            >
              Patient Login
            </Link>
          </div>

          {/* Footer text */}
          <footer className="text-center text-sm text-gray-500 select-none border-t border-gray-300 py-3">
            &copy; {new Date().getFullYear()} NovaHealth. All rights reserved.
          </footer>
        </nav>
      </aside>
    </>
  );
}
