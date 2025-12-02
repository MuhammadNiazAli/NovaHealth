// DashboardHero.full.jsx
"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  HiUserGroup,
  HiCalendar,
  HiCurrencyDollar,
  HiOutlineBell,
  HiOutlineUserCircle,
  HiArrowPath,
  HiExclamationTriangle,
  HiXMark,
  HiArrowRightOnRectangle,
  HiCog6Tooth,
} from "react-icons/hi2";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

/*
  Full working frontend-only dashboard:
  - modular components
  - simulated realtime (mockRealtimeService)
  - optimistic UI, retry/backoff, accessibility
  - notifications: dismiss, mark-read, counter
  - account sidebar with focus-trap
  - loading / error states
*/

/* -------------------------
   Mock realtime service (simulates WebSocket / SSE)
   - subscribe(callback) returns unsubscribe()
   - emits: stats, growth, dept, notification
   ------------------------- */
function createMockRealtimeService() {
  let listeners = new Set();

  // initial seed data
  let stats = {
    totalPatients: 1245,
    appointmentsToday: 38,
    revenueMonthly: 5340,
    newRegistrations: 14,
  };

  let growth = [
    { name: "Jan", Patients: 400 },
    { name: "Feb", Patients: 300 },
    { name: "Mar", Patients: 500 },
    { name: "Apr", Patients: 450 },
    { name: "May", Patients: 600 },
    { name: "Jun", Patients: 700 },
  ];

  let dept = [
    { name: "General", Appointments: 240 },
    { name: "Dental", Appointments: 139 },
    { name: "Cardiology", Appointments: 98 },
    { name: "Orthopedics", Appointments: 120 },
    { name: "Pediatrics", Appointments: 180 },
  ];

  let notificationId = 100;

  function emit(event) {
    listeners.forEach((cb) => {
      try {
        cb(event);
      } catch (e) {
        // ignore individual listener errors
      }
    });
  }

  // simulate regular updates
  const interval = setInterval(() => {
    // small random patient increment
    const addPatients = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 5);
    if (addPatients > 0) {
      stats.totalPatients += addPatients;
      growth = growth.slice(1).concat([{ name: `M${Date.now() % 100}`, Patients: 600 + Math.floor(Math.random() * 200) }]);
      emit({ type: "stats", payload: { ...stats } });
      emit({ type: "growth", payload: growth });
    }

    // occasionally change departments
    if (Math.random() < 0.3) {
      const idx = Math.floor(Math.random() * dept.length);
      dept = dept.map((d, i) => (i === idx ? { ...d, Appointments: Math.max(0, d.Appointments + Math.floor(Math.random() * 8) - 3) } : d));
      emit({ type: "dept", payload: dept });
    }

    // occasionally emit a notification
    if (Math.random() < 0.25) {
      notificationId++;
      const n = {
        id: notificationId,
        title: ["New patient registered", "Appointment confirmed", "Billing issue detected", "Lab result ready"][Math.floor(Math.random() * 4)],
        body: ["A new patient signed up.", "A patient confirmed their appointment.", "A billing discrepancy was found.", "A lab result is available."][Math.floor(Math.random() * 4)],
        time: new Date().toLocaleString(),
        read: false,
        iconIndex: Math.floor(Math.random() * 3),
      };
      emit({ type: "notification", payload: n });
    }
  }, 3500);

  // public subscribe
  function subscribe(cb) {
    listeners.add(cb);
    // send initial snapshot
    setTimeout(() => {
      try {
        cb({ type: "init", payload: { stats, growth, dept } });
      } catch {}
    }, 200);
    return () => listeners.delete(cb);
  }

  function shutdown() {
    clearInterval(interval);
    listeners.clear();
  }

  return { subscribe, shutdown };
}

const mockRealtimeService = createMockRealtimeService();

/* -------------------------
   Sample notifications (initial)
   ------------------------- */
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "New patient registered",
    body: "John Doe has registered as a new patient.",
    time: new Date().toLocaleString(),
    icon: <HiUserGroup className="w-6 h-6 text-blue-600" aria-hidden="true" />,
    read: false,
  },
  {
    id: 2,
    title: "Appointment confirmed",
    body: "Jane Smith - Cardiology appointment confirmed.",
    time: new Date().toLocaleString(),
    icon: <HiCalendar className="w-6 h-6 text-green-600" aria-hidden="true" />,
    read: false,
  },
  {
    id: 3,
    title: "Revenue report ready",
    body: "Monthly revenue report has been generated.",
    time: new Date().toLocaleString(),
    icon: <HiCurrencyDollar className="w-6 h-6 text-yellow-600" aria-hidden="true" />,
    read: true,
  },
];

/* -------------------------
   Small presentational pieces
   ------------------------- */

function Spinner() {
  return (
    <div role="status" aria-label="Loading" className="flex justify-center py-10">
      <svg
        className="animate-spin h-10 w-10 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  );
}

function InlineError({ children }) {
  return (
    <div
      role="alert"
      className="max-w-5xl mx-auto p-6 bg-red-50 border border-red-400 rounded-lg flex items-center gap-4 text-red-700"
    >
      <HiExclamationTriangle className="w-8 h-8 flex-shrink-0" aria-hidden="true" />
      <p className="text-lg font-semibold">{children}</p>
    </div>
  );
}

/* -------------------------
   Notifications Modal
   - supports dismissing single, mark all read, keyboard nav
   ------------------------- */

function NotificationsModal({ open, onClose, items, onDismiss, onMarkAllRead }) {
  // close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notifications-heading"
      className="fixed inset-0 z-50 flex justify-center items-start pt-16 px-4 sm:px-6"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <section
        tabIndex={0}
        className="relative bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto ring-1 ring-black ring-opacity-5 p-4 sm:p-6"
      >
        <header className="flex items-center justify-between mb-3">
          <h3 id="notifications-heading" className="text-lg font-semibold text-gray-900 select-none">
            Notifications
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 focus:outline focus:outline-indigo-500"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              aria-label="Close notifications"
              className="text-gray-600 hover:text-gray-900 rounded focus:outline focus:outline-indigo-600 focus:ring-2 focus:ring-indigo-600"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>
        </header>

        {items.length === 0 ? (
          <p className="text-center text-gray-500 py-6">You're all caught up.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((n) => (
              <li key={n.id} className="py-3 flex gap-4 items-start">
                <div className="flex-shrink-0">{n.icon ?? (n.iconIndex === 1 ? <HiCalendar className="w-6 h-6 text-green-600" /> : n.iconIndex === 2 ? <HiCurrencyDollar className="w-6 h-6 text-yellow-600" /> : <HiUserGroup className="w-6 h-6 text-blue-600" />)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className={`text-gray-800 font-semibold ${n.read ? "opacity-70" : ""}`}>{n.title}</p>
                      <p className="text-gray-600 text-sm truncate">{n.body}</p>
                    </div>
                    <div className="text-right">
                      <time className="text-gray-400 text-xs block">{n.time}</time>
                      <button
                        onClick={() => onDismiss(n.id)}
                        className="text-xs mt-2 text-indigo-600 hover:underline focus:outline focus:outline-indigo-500"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* -------------------------
   Account sidebar with focus trap
   ------------------------- */

function AccountSidebar({ open, onClose, userName }) {
  const elRef = useRef(null);

  // keyboard shortcuts
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // simple focus trap
  useEffect(() => {
    if (!open || !elRef.current) return;
    const container = elRef.current;
    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    const onKey = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", onKey);
    return () => container.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <aside
      ref={elRef}
      aria-label="Account panel"
      className={`fixed top-0 right-0 z-50 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <header className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 select-none">Account</h3>
        <button
          onClick={onClose}
          aria-label="Close account sidebar"
          className="text-gray-600 hover:text-gray-900 rounded focus:outline focus:outline-indigo-600 focus:ring-2 focus:ring-indigo-600"
        >
          <HiXMark className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2 select-none">Profile</h4>
          <p className="text-gray-700">
            Name: <span className="font-medium">{userName}</span>
          </p>
          <p className="text-gray-700">
            Email: <span className="font-medium">dr.admin@novahealth.com</span>
          </p>
          <p className="text-gray-700">
            Role: <span className="font-medium">Administrator</span>
          </p>
        </div>

        <div>
          <button
            type="button"
            className="w-full flex items-center gap-2 px-4 py-3 rounded-md text-indigo-700 font-semibold hover:bg-indigo-50 focus:outline focus:outline-indigo-600 "
          >
            <HiCog6Tooth className="w-5 h-5" aria-hidden="true" />
            Account settings
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              // realistic placeholder for logout
              alert("Logged out successfully.");
              onClose();
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md px-4 py-3 focus:outline focus:outline-red-500  flex items-center justify-center gap-2"
          >
            <HiArrowRightOnRectangle className="w-5 h-5" aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

/* -------------------------
   Main Dashboard
   - uses mockRealtimeService for live updates
   - handles errors with retry/backoff
   ------------------------- */

export default function DashboardHeroFull() {
  // data
  const [kpiCards, setKpiCards] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // backoff state (in case of simulated failure)
  const retryRef = useRef({ attempts: 0, timer: null });

  // on-mount: subscribe to mock realtime
  useEffect(() => {
    let unsub = null;
    let failed = false;

    function startSubscription() {
      try {
        unsub = mockRealtimeService.subscribe((event) => {
          // handle events
          if (event.type === "init") {
            const { stats, growth, dept } = event.payload;
            setKpiCards([
              {
                id: 1,
                label: "Total Patients",
                value: stats.totalPatients,
                icon: <HiUserGroup className="text-indigo-600 w-6 h-6" aria-hidden="true" />,
                bgClass: "bg-blue-50",
              },
              {
                id: 2,
                label: "Appointments Today",
                value: stats.appointmentsToday,
                icon: <HiCalendar className="text-green-600 w-6 h-6" aria-hidden="true" />,
                bgClass: "bg-green-50",
              },
              {
                id: 3,
                label: "Revenue (Monthly)",
                value: `$${stats.revenueMonthly.toLocaleString()}`,
                icon: <HiCurrencyDollar className="text-yellow-600 w-6 h-6" aria-hidden="true" />,
                bgClass: "bg-yellow-50",
              },
              {
                id: 4,
                label: "New Registrations",
                value: stats.newRegistrations,
                icon: <HiUserGroup className="text-pink-600 w-6 h-6" aria-hidden="true" />,
                bgClass: "bg-pink-50",
              },
            ]);
            setGrowthData(growth);
            setDeptData(dept);
            setLoading(false);
            // reset retry attempts
            retryRef.current.attempts = 0;
          } else if (event.type === "stats") {
            // update KPIs (optimistic)
            setKpiCards((prev) =>
              prev.map((c) => {
                if (c.label === "Total Patients") return { ...c, value: event.payload.totalPatients };
                if (c.label === "Appointments Today") return { ...c, value: event.payload.appointmentsToday };
                if (c.label === "Revenue (Monthly)") return { ...c, value: `$${event.payload.revenueMonthly.toLocaleString()}` };
                if (c.label === "New Registrations") return { ...c, value: event.payload.newRegistrations };
                return c;
              })
            );
          } else if (event.type === "growth") {
            setGrowthData(event.payload);
          } else if (event.type === "dept") {
            setDeptData(event.payload);
          } else if (event.type === "notification") {
            // user-focused: push to top and keep unread count
            const raw = event.payload;
            const n = {
              id: raw.id,
              title: raw.title,
              body: raw.body,
              time: raw.time,
              read: false,
              iconIndex: raw.iconIndex,
            };
            setNotifications((prev) => [n, ...prev].slice(0, 50)); // cap
          }
        });
      } catch (err) {
        failed = true;
        setError("Connection failed. Retrying...");
        // backoff retry
        retryRef.current.attempts++;
        const backoff = Math.min(30000, 1000 * 2 ** retryRef.current.attempts);
        clearTimeout(retryRef.current.timer);
        retryRef.current.timer = setTimeout(() => startSubscription(), backoff);
      }
    }

    startSubscription();

    return () => {
      if (unsub) unsub();
      clearTimeout(retryRef.current.timer);
    };
  }, []);

  // manual refresh (rebuild state from simulated snapshot)
  const fetchAllData = useCallback(() => {
    setLoading(true);
    setError(null);

    // simulate a "fetch" by reading the latest snapshot via a short timeout
    setTimeout(() => {
      // rogue simulation of occasional failure (10%)
      if (Math.random() < 0.08) {
        setError("Temporary network error — please try again.");
        setLoading(false);
        return;
      }

      // use the most recent values from the kpiCards/growthState if available (already live); if empty, use defaults
      setKpiCards((prev) =>
        prev.length
          ? prev
          : [
              {
                id: 1,
                label: "Total Patients",
                value: 1245,
                icon: <HiUserGroup className="text-indigo-600 w-6 h-6" aria-hidden="true" />,
                bgClass: "bg-blue-50",
              },
              {
                id: 2,
                label: "Appointments Today",
                value: 38,
                icon: <HiCalendar className="text-green-600 w-6 h-6" aria-hidden="true" />,
                bgClass: "bg-green-50",
              },
              {
                id: 3,
                label: "Revenue (Monthly)",
                value: "$52,340",
                icon: <HiCurrencyDollar className="text-yellow-600 w-6 h-6" aria-hidden="true" />,
                bgClass: "bg-yellow-50",
              },
              {
                id: 4,
                label: "New Registrations",
                value: 14,
                icon: <HiUserGroup className="text-pink-600 w-6 h-6" aria-hidden="true" />,
                bgClass: "bg-pink-50",
              },
            ]
      );

      setGrowthData((g) => (g.length ? g : [
        { name: "Jan", Patients: 400 },
        { name: "Feb", Patients: 300 },
        { name: "Mar", Patients: 500 },
        { name: "Apr", Patients: 450 },
        { name: "May", Patients: 600 },
        { name: "Jun", Patients: 700 },
      ]));

      setDeptData((d) => (d.length ? d : [
        { name: "General", Appointments: 240 },
        { name: "Dental", Appointments: 139 },
        { name: "Cardiology", Appointments: 98 },
        { name: "Orthopedics", Appointments: 120 },
        { name: "Pediatrics", Appointments: 180 },
      ]));

      setLoading(false);
    }, 700);
  }, []);

  // on mount initial fetch if needed
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // notification handlers
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // small accessibility: pressing 'n' opens notifications, 'a' opens account
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "n") setNotificationsOpen((s) => !s);
      if (e.key === "a") setAccountOpen((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className=" bg-white py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
      <main className="w-full max-w-7xl space-y-10 relative">
        {/* Header */}
        <header className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 tabIndex={-1} className="text-3xl font-extrabold tracking-tight text-gray-900 select-none leading-tight">
            NovaHealth Dashboard
          </h1>

          <nav className="flex items-center space-x-6" aria-label="User navigation">
            <button
              onClick={() => {
                setNotificationsOpen((s) => !s);
                setAccountOpen(false);
              }}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              className="relative p-2 rounded-full hover:bg-gray-200 transition focus:outline focus:outline-indigo-500 "
              type="button"
              title="Notifications (press 'n')"
            >
              <HiOutlineBell className="w-6 h-6 text-gray-700" aria-hidden="true" />
              <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5" aria-live="polite">
                {unreadCount}
              </span>
            </button>

            <button
              onClick={() => {
                setAccountOpen((s) => !s);
                setNotificationsOpen(false);
              }}
              aria-label="Account"
              aria-expanded={accountOpen}
              className="p-2 rounded-full hover:bg-gray-200 transition focus:outline focus:outline-indigo-500 "
              type="button"
              title="Account (press 'a')"
            >
              <HiOutlineUserCircle className="w-8 h-8 text-gray-700" aria-hidden="true" />
            </button>
          </nav>
        </header>

        {/* Welcome card */}
        <section className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto" aria-labelledby="welcome">
          <h2 id="welcome" className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 leading-snug">
            Welcome back, Dr. Admin!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl leading-relaxed">
            Here’s a quick overview of real-time activities and statistics. This demo simulates live updates — you can interact with notifications, refresh, or open the account panel.
          </p>
        </section>

        {error && <InlineError>{error}</InlineError>}

        {/* KPI grid */}
        <section aria-label="Key performance indicators" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {loading && !error
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse flex items-center gap-4 rounded-xl shadow-md p-5 bg-gray-100" aria-hidden="true">
                  <div className="w-12 h-12 rounded-lg bg-gray-300" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-6 bg-gray-400 rounded w-1/3" />
                  </div>
                </div>
              ))
            : kpiCards.map(({ id, label, value, icon, bgClass }) => (
                <div
                  key={id}
                  role="group"
                  tabIndex={0}
                  aria-labelledby={`kpi-label-${id}`}
                  aria-describedby={`kpi-value-${id}`}
                  className={`${bgClass} cursor-default select-none flex items-center gap-5 rounded-xl shadow-md p-5 transform transition duration-300 hover:scale-[1.03] focus-within:scale-[1.03] focus-within:outline focus-within:outline-indigo-600`}
                >
                  <div className="p-3 rounded-lg bg-white drop-shadow flex items-center justify-center">{icon}</div>
                  <div>
                    <h3 id={`kpi-label-${id}`} className="text-gray-700 font-semibold text-base leading-snug">
                      {label}
                    </h3>
                    <p id={`kpi-value-${id}`} className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none tabular-nums">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
        </section>

        {/* Charts */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10" aria-label="Charts">
          <article className="bg-white rounded-xl shadow-lg p-6" aria-labelledby="growth-title">
            <h3 id="growth-title" className="text-gray-800 font-semibold mb-4 text-xl select-none">
              Patient Growth (Recent)
            </h3>

            {loading && !growthData.length ? (
              <Spinner />
            ) : growthData.length === 0 && !error ? (
              <p className="text-center text-gray-500">No patient data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={growthData} margin={{ top: 15, right: 30, bottom: 15, left: 0 }}>
                  <CartesianGrid stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#555" tickLine={false} tick={{ fontSize: 13 }} />
                  <YAxis stroke="#555" tickLine={false} tick={{ fontSize: 13 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#f9fafb", borderRadius: 8, borderColor: "#ddd", fontSize: 14 }}
                    cursor={{ stroke: "#6366f1", strokeWidth: 2 }}
                  />
                  <Line type="monotone" dataKey="Patients" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 7 }} dot={{ r: 4 }} isAnimationActive animationDuration={800} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </article>

          <article className="bg-white rounded-xl shadow-lg p-6" aria-labelledby="dept-title">
            <h3 id="dept-title" className="text-gray-800 font-semibold mb-4 text-xl select-none">
              Appointments by Department (Live)
            </h3>

            {loading && !deptData.length ? (
              <Spinner />
            ) : deptData.length === 0 && !error ? (
              <p className="text-center text-gray-500">No appointment data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={deptData} margin={{ top: 15, right: 30, bottom: 15, left: 0 }}>
                  <CartesianGrid stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#555" tickLine={false} tick={{ fontSize: 13 }} />
                  <YAxis stroke="#555" tickLine={false} tick={{ fontSize: 13 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: 8, borderColor: "#ddd", fontSize: 14 }} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 14, fontWeight: "600" }} />
                  <Bar dataKey="Appointments" fill="#10b981" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </article>
        </section>

        {/* Refresh */}
        <section className="max-w-6xl mx-auto flex justify-center">
          <button
            onClick={fetchAllData}
            disabled={loading}
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700 focus:outline focus:outline-indigo-500  transition"
            aria-label="Refresh dashboard data"
          >
            {loading ? (
              <>
                <HiArrowPath className="w-5 h-5 animate-spin" aria-hidden="true" />
                Refreshing...
              </>
            ) : (
              "Refresh Data"
            )}
          </button>
        </section>

        {/* Overlays / panels */}
        <NotificationsModal
          open={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
          items={notifications}
          onDismiss={dismissNotification}
          onMarkAllRead={markAllNotificationsRead}
        />

        {/* Sidebar slides in, but does NOT render a blocking backdrop */}
        <AccountSidebar open={accountOpen} onClose={() => setAccountOpen(false)} userName="Dr. Admin" />
      </main>
    </div>
  );
}
