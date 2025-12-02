'use client'
import React, { useState } from "react";

const initialInvoices = [
  {
    id: "INV-1001",
    date: "2025-07-15",
    amount: 250.0,
    status: "Paid",
    pdfUrl: "#",
  },
  {
    id: "INV-1002",
    date: "2025-08-01",
    amount: 400.0,
    status: "Due",
    pdfUrl: "#",
  },
  {
    id: "INV-1003",
    date: "2025-08-10",
    amount: 125.0,
    status: "Upcoming",
    pdfUrl: "#",
  },
];

const DashboardBilling = () => {
  const [invoices] = useState(initialInvoices);

  // Calculate totals
  const totalDue = invoices
    .filter((inv) => inv.status === "Due")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalUpcoming = invoices
    .filter((inv) => inv.status === "Upcoming")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: "700", marginBottom: 24 }}>
        Billing Overview
      </h2>

      {/* Summary Cards */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 40,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          {
            title: "Total Due",
            amount: totalDue,
            color: "#d32f2f",
          },
          {
            title: "Total Paid",
            amount: totalPaid,
            color: "#388e3c",
          },
          {
            title: "Upcoming",
            amount: totalUpcoming,
            color: "#fbc02d",
          },
        ].map(({ title, amount, color }) => (
          <div
            key={title}
            style={{
              flex: "1 1 220px",
              background: "#f5f5f5",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                marginBottom: 8,
                fontWeight: "700",
                color,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: 32,
                fontWeight: "900",
                margin: 0,
                color: "#444",
                letterSpacing: "0.03em",
              }}
            >
              ${amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Invoice List */}
      <div>
        <h3
          style={{
            fontSize: 22,
            fontWeight: "700",
            marginBottom: 20,
            userSelect: "none",
          }}
        >
          Recent Invoices
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          }}
        >
          <thead
            style={{
              backgroundColor: "#f0f0f0",
              userSelect: "none",
            }}
          >
            <tr>
              {["Invoice ID", "Date", "Amount", "Status", "Download"].map(
                (header) => (
                  <th
                    key={header}
                    style={{
                      padding: "14px 12px",
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: 14,
                      borderBottom: "2px solid #ddd",
                      color: "#555",
                    }}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {invoices.map(({ id, date, amount, status, pdfUrl }) => (
              <tr
                key={id}
                style={{
                  backgroundColor: status === "Due" ? "#ffe6e6" : "white",
                  transition: "background-color 0.3s",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  {id}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    color: "#555",
                  }}
                >
                  {new Date(date).toLocaleDateString()}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    fontWeight: "700",
                    color: "#222",
                  }}
                >
                  ${amount.toFixed(2)}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    fontWeight: "700",
                    color:
                      status === "Paid"
                        ? "#388e3c"
                        : status === "Due"
                        ? "#d32f2f"
                        : "#fbc02d",
                  }}
                >
                  {status}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    textAlign: "center",
                  }}
                >
                  <a
                    href={pdfUrl}
                    download
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "8px 14px",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontWeight: "700",
                      userSelect: "none",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#007bff")
                    }
                  >
                    PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardBilling;
