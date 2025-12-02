"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import {
  HiUserGroup,
  HiCalendar,
  HiCurrencyDollar,
  HiBell,
  HiXMark,
  HiArrowPath,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiSun,
  HiMoon,
} from "react-icons/hi2";

const formatValue = (value, isCurrency = false, currency = "USD") => {
  if (isCurrency) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
  }
  if (typeof value === "number") {
    return value.toLocaleString();
  }
  return value;
};

const useCountUp = (end, duration = 1500) => {
  const [count, setCount] = useState(0);
  const startTimestamp = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = timestamp - startTimestamp.current;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return count;
};

const Tooltip = ({ children, text }) => (
  <div className="relative inline-block group">
    {children}
    <div
      role="tooltip"
      className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 rounded bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-20 whitespace-nowrap select-none"
    >
      {text}
    </div>
  </div>
);

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevFocused = document.activeElement;
    modalRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      prevFocused?.focus();
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
    >
      <div className="relative bg-white rounded-lg max-w-lg w-full shadow-lg focus:outline-none">
        <header className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <HiXMark className="w-6 h-6" />
          </button>
        </header>
        <main className="p-6 text-gray-700">{children}</main>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const StatCard = ({
  id,
  title,
  value,
  icon,
  description,
  onClick,
  isCurrency,
  hasBadgePulse,
  loading,
  disabled,
}) => {
  const displayValue = useCountUp(loading ? 0 : value);

  return (
    <button
      type="button"
      aria-labelledby={`stat-title-${id} stat-value-${id}`}
      aria-describedby={`stat-desc-${id}`}
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center space-x-5 rounded-lg bg-white p-5 shadow-md transition-shadow duration-300 w-full text-left
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      hover:shadow-xl
      ${disabled ? "cursor-wait opacity-70" : "cursor-pointer"}`}
    >
      <div className="relative p-3 rounded-full bg-gray-100 flex-shrink-0">
        {icon}
        {hasBadgePulse && value > 0 && (
          <>
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-ping"
            />
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600"
            />
          </>
        )}
      </div>

      <div className="flex flex-col flex-grow min-w-0">
        <h3
          id={`stat-title-${id}`}
          className="text-sm font-medium text-gray-600 truncate"
          title={title}
        >
          {title}
        </h3>

        <Tooltip text={description}>
          <p
            id={`stat-value-${id}`}
            className="text-3xl font-extrabold text-gray-900 truncate select-text"
            title={formatValue(value, isCurrency)}
          >
            {loading ? (
              <span className="animate-pulse text-gray-400">Loading...</span>
            ) : (
              formatValue(displayValue, isCurrency)
            )}
          </p>
        </Tooltip>

        <p
          id={`stat-desc-${id}`}
          className="mt-1 text-xs text-gray-400 truncate"
          title={description}
        >
          {description}
        </p>
      </div>
    </button>
  );
};

StatCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isCurrency: PropTypes.bool,
  hasBadgePulse: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

StatCard.defaultProps = {
  isCurrency: false,
  hasBadgePulse: false,
  loading: false,
  disabled: false,
};

const initialStatsData = [
  {
    id: 1,
    title: "Users",
    value: 3580,
    icon: <HiUserGroup className="w-8 h-8 text-indigo-600" aria-hidden="true" />,
    description: "Active users this month",
  },
  {
    id: 2,
    title: "Appointments",
    value: 248,
    icon: <HiCalendar className="w-8 h-8 text-green-600" aria-hidden="true" />,
    description: "Scheduled appointments",
  },
  {
    id: 3,
    title: "Revenue",
    value: 45120,
    icon: (
      <HiCurrencyDollar className="w-8 h-8 text-yellow-500" aria-hidden="true" />
    ),
    description: "Total revenue generated",
    isCurrency: true,
  },
  {
    id: 4,
    title: "Notifications",
    value: 12,
    icon: <HiBell className="w-8 h-8 text-red-600" aria-hidden="true" />,
    description: "Unread notifications",
    hasBadgePulse: true,
  },
];

const DashboardStats = () => {
  const [stats, setStats] = useState(initialStatsData);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(loadTimeout);
  }, []);

  const handleCardClick = useCallback((stat) => {
    setModalContent(stat);
    setModalOpen(true);
  }, []);

  const closeModal = () => setModalOpen(false);

  const handleRefresh = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const updatedStats = stats.map((stat) => {
        const changePercent = (Math.random() - 0.5) * 0.2; // +/-10%
        const newValue = Math.max(
          0,
          Math.floor(stat.value + stat.value * changePercent)
        );
        return { ...stat, value: newValue };
      });
      setStats(updatedStats);
      setLoading(false);
    }, 1500);
  };

  const sortedStats = useMemo(() => {
    const copy = [...stats];
    return copy.sort((a, b) =>
      sortDirection === "asc" ? a.value - b.value : b.value - a.value
    );
  }, [stats, sortDirection]);

  const toggleSortDirection = () =>
    setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));

  return (
    <>
      <section
        aria-label="Dashboard statistics"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Dashboard Overview
          </h2>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading}
              aria-label="Refresh statistics data"
              className={`inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm
                hover:bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <HiArrowPath
                className={`w-5 h-5 transition-transform ${
                  loading ? "animate-spin" : ""
                }`}
                aria-hidden="true"
              />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={toggleSortDirection}
              aria-label={`Sort statistics ${
                sortDirection === "asc" ? "descending" : "ascending"
              }`}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              {sortDirection === "asc" ? (
                <>
                  <HiArrowTrendingUp className="w-5 h-5 mr-1" />
                  Ascending
                </>
              ) : (
                <>
                  <HiArrowTrendingDown className="w-5 h-5 mr-1" />
                  Descending
                </>
              )}
            </button>
          </div>
        </header>

        <div
          role="list"
          aria-live="polite"
          aria-busy={loading}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`loading-skeleton-${i}`}
                  className="flex animate-pulse items-center space-x-5 rounded-lg bg-gray-200 p-5"
                  aria-hidden="true"
                >
                  <div className="h-12 w-12 rounded-full bg-gray-300" />
                  <div className="flex flex-col flex-grow space-y-3">
                    <div className="h-5 w-24 rounded bg-gray-300" />
                    <div className="h-8 w-32 rounded bg-gray-300" />
                    <div className="h-3 w-20 rounded bg-gray-300" />
                  </div>
                </div>
              ))
            : sortedStats.map((stat) => (
                <StatCard
                  key={stat.id}
                  {...stat}
                  onClick={() => handleCardClick(stat)}
                  loading={loading}
                  disabled={loading}
                />
              ))}
        </div>
      </section>

      <Modal isOpen={modalOpen} onClose={closeModal} title={modalContent?.title || ""}>
        {modalContent ? (
          <>
            <p className="mb-4 text-gray-600">{modalContent.description}</p>
            <p className="text-2xl font-semibold mb-2">
              {formatValue(modalContent.value, modalContent.isCurrency)}
            </p>
            <p className="mb-4 text-sm text-gray-500 italic">
              Last updated:{" "}
              {new Date().toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <button
              type="button"
              onClick={() =>
                alert(`Navigating to detailed ${modalContent.title} page...`)
              }
              className="inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              View More Details
            </button>
          </>
        ) : (
          <p>No detail available</p>
        )}
      </Modal>
    </>
  );
};

export default DashboardStats;
