'use client'
import React, { useState } from "react";

const initialTickets = [
  {
    id: 1,
    subject: "Unable to login",
    category: "Account",
    status: "Open",
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    id: 2,
    subject: "Billing discrepancy",
    category: "Billing",
    status: "Closed",
    createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
  },
];

const categories = ["Account", "Billing", "Technical", "Other"];

const DashboardSupport = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: categories[0],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    let errs = {};
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.description.trim()) errs.description = "Description is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    // Add new ticket (demo)
    const newTicket = {
      id: tickets.length + 1,
      subject: form.subject.trim(),
      category: form.category,
      status: "Open",
      createdAt: new Date(),
    };
    setTickets((prev) => [newTicket, ...prev]);
    alert("Support ticket submitted successfully!");
    setForm({ subject: "", description: "", category: categories[0] });
  };

  // Format date to readable string
  const formatDate = (d) =>
    d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: "700", marginBottom: 24 }}>
        Support Center
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 40,
          background: "#f9f9f9",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          userSelect: "none",
        }}
        noValidate
      >
        {/* Subject */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="subject"
            style={{ display: "block", marginBottom: 6, fontWeight: "700" }}
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="Brief summary of your issue"
            style={{
              width: "100%",
              padding: 12,
              fontSize: 16,
              borderRadius: 8,
              border: errors.subject ? "2px solid #d32f2f" : "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {errors.subject && (
            <small style={{ color: "#d32f2f" }}>{errors.subject}</small>
          )}
        </div>

        {/* Category */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="category"
            style={{ display: "block", marginBottom: 6, fontWeight: "700" }}
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 12,
              fontSize: 16,
              borderRadius: 8,
              border: "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="description"
            style={{ display: "block", marginBottom: 6, fontWeight: "700" }}
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Explain your issue in detail"
            rows={5}
            style={{
              width: "100%",
              padding: 12,
              fontSize: 16,
              borderRadius: 8,
              border: errors.description ? "2px solid #d32f2f" : "1px solid #ccc",
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
              fontFamily:
                "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          />
          {errors.description && (
            <small style={{ color: "#d32f2f" }}>{errors.description}</small>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "14px 28px",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: "700",
            cursor: "pointer",
            userSelect: "none",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          Submit Ticket
        </button>
      </form>

      <section>
        <h3 style={{ fontSize: 22, fontWeight: "700", marginBottom: 20 }}>
          Recent Support Tickets
        </h3>

        {tickets.length === 0 ? (
          <p
            style={{
              fontStyle: "italic",
              color: "#999",
              userSelect: "none",
            }}
          >
            No support tickets found.
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {tickets.map(({ id, subject, category, status, createdAt }) => (
              <li
                key={id}
                style={{
                  background: "#f0f0f0",
                  padding: 16,
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  userSelect: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <strong>{subject}</strong> <em>({category})</em>
                  <br />
                  <small style={{ color: "#666" }}>
                    Created on: {formatDate(createdAt)}
                  </small>
                </div>
                <div
                  style={{
                    fontWeight: "700",
                    color: status === "Open" ? "#d32f2f" : "#388e3c",
                    userSelect: "none",
                  }}
                >
                  {status}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DashboardSupport;
