'use client'
import React, { useState } from "react";

const DashboardSettings = () => {
  // Form state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
    confirmPassword: "",
    emailNotifications: true,
    darkMode: false,
    privacy: {
      showEmail: false,
      showProfilePicture: true,
    },
  });

  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "showEmail" || name === "showProfilePicture") {
      setProfile((prev) => ({
        ...prev,
        privacy: { ...prev.privacy, [name]: checked },
      }));
    } else if (type === "checkbox") {
      setProfile((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
    setSaved(false);
  };

  const validate = () => {
    let tempErrors = {};
    if (!profile.name.trim()) tempErrors.name = "Name is required";
    if (!profile.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(profile.email))
      tempErrors.email = "Email is invalid";

    if (profile.password || profile.confirmPassword) {
      if (profile.password.length < 6)
        tempErrors.password = "Password must be at least 6 characters";
      if (profile.password !== profile.confirmPassword)
        tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate saving data, here you could call an API
      setSaved(true);
      setProfile((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
      setErrors({});
    }
  };

  const handleCancel = () => {
    // Reset to initial data (for demo)
    setProfile({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "",
      confirmPassword: "",
      emailNotifications: true,
      darkMode: false,
      privacy: {
        showEmail: false,
        showProfilePicture: true,
      },
    });
    setErrors({});
    setSaved(false);
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "20px auto",
        padding: 24,
        borderRadius: 12,
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      <h2
        style={{
          marginBottom: 24,
          fontWeight: "700",
          fontSize: 28,
          borderBottom: "2px solid #e2e8f0",
          paddingBottom: 8,
        }}
      >
        Dashboard Settings
      </h2>

      <form onSubmit={handleSave} noValidate>
        {/* Profile Section */}
        <section style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 16,
              color: "#374151",
            }}
          >
            Profile Information
          </h3>

          {/* Name */}
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            placeholder="Your full name"
            style={{
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 6,
              border: errors.name
                ? "2px solid #ef4444"
                : "1.5px solid #cbd5e1",
              outline: "none",
              marginBottom: errors.name ? 6 : 16,
              transition: "border-color 0.2s ease-in-out",
            }}
          />
          {errors.name && (
            <p style={{ color: "#ef4444", marginTop: -12, marginBottom: 12 }}>
              {errors.name}
            </p>
          )}

          {/* Email */}
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={{
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 6,
              border: errors.email
                ? "2px solid #ef4444"
                : "1.5px solid #cbd5e1",
              outline: "none",
              marginBottom: errors.email ? 6 : 16,
              transition: "border-color 0.2s ease-in-out",
            }}
          />
          {errors.email && (
            <p style={{ color: "#ef4444", marginTop: -12, marginBottom: 12 }}>
              {errors.email}
            </p>
          )}
        </section>

        {/* Password Section */}
        <section style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 16,
              color: "#374151",
            }}
          >
            Change Password
          </h3>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="New password"
            autoComplete="new-password"
            style={{
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 6,
              border: errors.password
                ? "2px solid #ef4444"
                : "1.5px solid #cbd5e1",
              outline: "none",
              marginBottom: errors.password ? 6 : 16,
              transition: "border-color 0.2s ease-in-out",
            }}
          />
          {errors.password && (
            <p style={{ color: "#ef4444", marginTop: -12, marginBottom: 12 }}>
              {errors.password}
            </p>
          )}

          <label
            htmlFor="confirmPassword"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={profile.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            autoComplete="new-password"
            style={{
              width: "100%",
              padding: 10,
              fontSize: 16,
              borderRadius: 6,
              border: errors.confirmPassword
                ? "2px solid #ef4444"
                : "1.5px solid #cbd5e1",
              outline: "none",
              marginBottom: errors.confirmPassword ? 6 : 16,
              transition: "border-color 0.2s ease-in-out",
            }}
          />
          {errors.confirmPassword && (
            <p style={{ color: "#ef4444", marginTop: -12, marginBottom: 12 }}>
              {errors.confirmPassword}
            </p>
          )}
        </section>

        {/* Notifications Section */}
        <section style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 16,
              color: "#374151",
            }}
          >
            Notifications
          </h3>
          <label
            htmlFor="emailNotifications"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            <input
              id="emailNotifications"
              name="emailNotifications"
              type="checkbox"
              checked={profile.emailNotifications}
              onChange={handleChange}
              style={{ width: 20, height: 20, cursor: "pointer" }}
            />
            Enable email notifications
          </label>
        </section>

        {/* Theme Section */}
        <section style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 16,
              color: "#374151",
            }}
          >
            Theme
          </h3>
          <label
            htmlFor="darkMode"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            <input
              id="darkMode"
              name="darkMode"
              type="checkbox"
              checked={profile.darkMode}
              onChange={handleChange}
              style={{ width: 20, height: 20, cursor: "pointer" }}
            />
            Enable Dark Mode
          </label>
        </section>

        {/* Privacy Section */}
        <section style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginBottom: 16,
              color: "#374151",
            }}
          >
            Privacy Settings
          </h3>
          <label
            htmlFor="showEmail"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            <input
              id="showEmail"
              name="showEmail"
              type="checkbox"
              checked={profile.privacy.showEmail}
              onChange={handleChange}
              style={{ width: 20, height: 20, cursor: "pointer" }}
            />
            Show email on profile
          </label>

          <label
            htmlFor="showProfilePicture"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontWeight: 600,
              fontSize: 16,
              marginTop: 12,
              cursor: "pointer",
            }}
          >
            <input
              id="showProfilePicture"
              name="showProfilePicture"
              type="checkbox"
              checked={profile.privacy.showProfilePicture}
              onChange={handleChange}
              style={{ width: 20, height: 20, cursor: "pointer" }}
            />
            Show profile picture publicly
          </label>
        </section>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 16,
            marginTop: 16,
          }}
        >
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: "10px 24px",
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: "#e5e7eb",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#d1d5db")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              padding: "10px 24px",
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            Save Changes
          </button>
        </div>

        {saved && (
          <p
            style={{
              marginTop: 20,
              fontWeight: 600,
              color: "#16a34a",
              textAlign: "center",
            }}
          >
            Settings saved successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default DashboardSettings;
