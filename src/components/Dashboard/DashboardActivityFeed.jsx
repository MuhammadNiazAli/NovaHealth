'use client'
import React, { useState, useEffect } from "react";
import {
  FiLogIn,
  FiUpload,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const sampleActivities = [
  {
    id: 1,
    type: "login",
    message: "Logged into the dashboard",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
  },
  {
    id: 2,
    type: "upload",
    message: "Uploaded a new profile picture",
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 mins ago
  },
  {
    id: 3,
    type: "comment",
    message: "Commented on a post",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: 4,
    type: "update",
    message: "Updated account settings",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: 5,
    type: "logout",
    message: "Logged out",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
];

// Map activity types to React Icons components
const iconsMap = {
  login: FiLogIn,
  upload: FiUpload,
  comment: FiMessageCircle,
  update: FiSettings,
  logout: FiLogOut,
};

// Utility: format relative time string
function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

const DashboardActivityFeed = () => {
  const [activities, setActivities] = useState(sampleActivities);

  // Auto-update times every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((a) => [...a]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily:
          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h2
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 24,
          userSelect: "none",
        }}
      >
        Activity Feed
      </h2>

      <div
        style={{
          maxHeight: 360,
          overflowY: "auto",
          background: "#f9f9f9",
          borderRadius: 12,
          boxShadow: "0 4px 15px rgba(0,0,0,0.07)",
          padding: 16,
        }}
        aria-label="User activity feed"
      >
        {activities.length === 0 && (
          <p
            style={{
              color: "#999",
              textAlign: "center",
              fontStyle: "italic",
              marginTop: 40,
              userSelect: "none",
            }}
          >
            No recent activity
          </p>
        )}

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
          {activities.map(({ id, type, message, timestamp }) => {
            const IconComponent = iconsMap[type] || FiSettings;
            return (
              <li
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "#fff",
                  borderRadius: 10,
                  padding: "12px 16px",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
                  userSelect: "none",
                }}
              >
                <IconComponent
                  aria-label={`${type} icon`}
                  size={28}
                  color="#555"
                  style={{ minWidth: 40 }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "600",
                      fontSize: 16,
                      color: "#222",
                    }}
                  >
                    {message}
                  </p>
                  <time
                    dateTime={timestamp.toISOString()}
                    style={{
                      fontSize: 13,
                      color: "#888",
                      marginTop: 4,
                      display: "inline-block",
                    }}
                  >
                    {timeAgo(timestamp)}
                  </time>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardActivityFeed;
