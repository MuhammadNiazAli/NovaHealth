'use client'
import React, { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Finish quarterly report",
    due: "2025-08-15",
    completed: false,
  },
  {
    id: 2,
    title: "Update client on project status",
    due: "2025-08-12",
    completed: true,
  },
  {
    id: 3,
    title: "Plan team meeting agenda",
    due: "2025-08-18",
    completed: false,
  },
  {
    id: 4,
    title: "Review budget proposals",
    due: "2025-08-20",
    completed: false,
  },
];

const DashboardTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Calculate progress % of completed tasks
  const progressPercent =
    tasks.length === 0
      ? 0
      : Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily:
          "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
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
        Your Tasks
      </h2>

      {/* Progress Bar */}
      <div
        style={{
          background: "#eee",
          borderRadius: 10,
          overflow: "hidden",
          height: 16,
          marginBottom: 30,
          boxShadow: "inset 0 2px 5px rgba(0,0,0,0.1)",
        }}
        aria-label={`Tasks progress: ${progressPercent}% completed`}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "#4caf50",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Task List */}
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
        {tasks.length === 0 && (
          <li
            style={{
              textAlign: "center",
              fontStyle: "italic",
              color: "#999",
              marginTop: 30,
              userSelect: "none",
            }}
          >
            No tasks remaining! 🎉
          </li>
        )}

        {tasks.map(({ id, title, due, completed }) => (
          <li
            key={id}
            style={{
              background: completed ? "#e6ffe6" : "#f9f9f9",
              borderRadius: 12,
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.07)",
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              userSelect: "none",
            }}
          >
            <div style={{ flex: "1 1 auto" }}>
              <h3
                style={{
                  margin: 0,
                  fontWeight: "700",
                  fontSize: 18,
                  textDecoration: completed ? "line-through" : "none",
                  color: completed ? "#4caf50" : "#222",
                }}
              >
                {title}
              </h3>
              <small
                style={{
                  color: "#666",
                  fontSize: 13,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                Due: {new Date(due).toLocaleDateString()}
              </small>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <button
                onClick={() => toggleComplete(id)}
                aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
                style={{
                  padding: "8px 14px",
                  background: completed ? "#f44336" : "#4caf50",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "background-color 0.3s ease",
                  userSelect: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = completed
                    ? "#d32f2f"
                    : "#388e3c")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = completed
                    ? "#f44336"
                    : "#4caf50")
                }
              >
                {completed ? "Undo" : "Done"}
              </button>

              <button
                onClick={() => deleteTask(id)}
                aria-label="Delete task"
                style={{
                  padding: "8px 14px",
                  background: "#bbb",
                  color: "#444",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: "700",
                  transition: "background-color 0.3s ease",
                  userSelect: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#999")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#bbb")
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardTasks;
