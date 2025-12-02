import React, { useState } from "react";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Simulate async subscription process
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setEmail("");
    }, 1400);
  };

  return (
    <section
      aria-label="Newsletter subscription"
      className="max-w-lg mx-auto bg-white rounded-2xl p-10 mb-5"
    >
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 tracking-wide">
        Join Our{" "}
        <span className="text-blue-600 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          Newsletter
        </span>
      </h2>

      <p className="text-center text-gray-900 mb-8">
        Stay updated with the latest blog posts and wellness tips.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4"
        noValidate
      >
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          className={`w-full sm:flex-1 rounded-lg border-2 px-5 py-3 text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 transition ${
            error ? "border-red-400" : "border-gray-300"
          } text-gray-900`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "email-error" : undefined}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
          aria-live="polite"
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {error && (
        <p
          id="email-error"
          className="mt-3 text-center text-red-500 font-medium"
          role="alert"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          className="mt-4 text-center text-green-600 font-semibold flex items-center justify-center gap-2"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Thanks for subscribing!
        </p>
      )}
    </section>
  );
}
