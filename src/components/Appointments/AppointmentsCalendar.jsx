"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Helpers for date calculations
function getDaysInMonth(year, month) {
  // Get number of days in a given month/year
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekdayOfMonth(year, month) {
  // Returns 0 (Sun) to 6 (Sat) for the first day of the month
  return new Date(year, month, 1).getDay();
}

function areDatesEqual(date1, date2) {
  // Compare two Date objects by year, month, and day only
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Component to render a single date cell in the calendar grid
function DateCell({ day, isSelected, isToday, isDisabled, onSelect }) {
  // Compose class names conditionally for styling and interactivity
  const baseClasses =
    "aspect-square w-full rounded-md text-sm flex items-center justify-center transition";
  let stateClasses = "";

  if (isSelected) {
    stateClasses = "bg-indigo-600 text-white shadow-lg";
  } else if (isToday) {
    stateClasses = "border border-indigo-600 text-indigo-600 font-semibold";
  } else if (day.isCurrentMonth) {
    stateClasses = "text-gray-900 hover:bg-indigo-50";
  } else {
    stateClasses = "text-gray-400 cursor-default";
  }

  if (isDisabled) {
    stateClasses += " cursor-not-allowed opacity-50 pointer-events-none";
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${stateClasses}`}
      onClick={() => !isDisabled && onSelect(day)}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      aria-disabled={isDisabled}
      role="gridcell"
      aria-label={`${day.date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })} ${isDisabled ? "not selectable" : "selectable"}`}
    >
      {day.date.getDate()}
    </button>
  );
}

const AppointmentsCalendar = ({ onDateSelect }) => {
  // State to keep track of current month/year shown and selected date
  const [displayDate, setDisplayDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Refs for animation and grid keyboard focus
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const animationControls = useAnimation();

  // Extract year and month for convenience
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();

  // Today’s date for reference
  const today = new Date();

  // Calculate days in current, previous, and next months
  const daysThisMonth = getDaysInMonth(year, month);
  const firstWeekday = getFirstWeekdayOfMonth(year, month);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  // Build calendar grid days including previous and next month to fill 6 weeks (42 days)
  const calendarDays = [];

  // Fill in last few days of previous month if needed
  for (let i = firstWeekday - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(prevYear, prevMonth, daysPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Add all days of the current month
  for (let day = 1; day <= daysThisMonth; day++) {
    calendarDays.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
    });
  }

  // Fill remaining cells with days from next month
  while (calendarDays.length < 42) {
    const nextDayNumber = calendarDays.length - (firstWeekday + daysThisMonth) + 1;
    calendarDays.push({
      date: new Date(nextYear, nextMonth, nextDayNumber),
      isCurrentMonth: false,
    });
  }

  // Handlers for navigating months
  function goToPreviousMonth() {
    setDisplayDate((prev) => {
      const y = prev.getFullYear();
      const m = prev.getMonth();
      return new Date(m === 0 ? y - 1 : y, m === 0 ? 11 : m - 1, 1);
    });
  }

  function goToNextMonth() {
    setDisplayDate((prev) => {
      const y = prev.getFullYear();
      const m = prev.getMonth();
      return new Date(m === 11 ? y + 1 : y, m === 11 ? 0 : m + 1, 1);
    });
  }

  // When user clicks a date, select it only if it's part of the current month
  function onDateClick(day) {
    if (!day.isCurrentMonth) return;
    setSelectedDate(day.date);
    if (onDateSelect) onDateSelect(day.date);
  }

  // Keyboard navigation inside the calendar grid (arrow keys)
  function onGridKeyDown(event) {
    if (!selectedDate) return;

    const newDate = new Date(selectedDate);

    switch (event.key) {
      case "ArrowLeft":
        newDate.setDate(newDate.getDate() - 1);
        break;
      case "ArrowRight":
        newDate.setDate(newDate.getDate() + 1);
        break;
      case "ArrowUp":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "ArrowDown":
        newDate.setDate(newDate.getDate() + 7);
        break;
      default:
        return; // Ignore other keys
    }

    // Only update selection if new date stays in the displayed month
    if (newDate.getMonth() === month) {
      event.preventDefault();
      setSelectedDate(newDate);
      if (onDateSelect) onDateSelect(newDate);
    }
  }

  // Animate calendar container when it scrolls into view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationControls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" },
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [animationControls]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={animationControls}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg select-none mb-10 border border-gray-200"
      aria-label="Appointments Calendar"
    >
      {/* Calendar Header with month navigation */}
      <header className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          aria-label="Previous Month"
          className="p-2 rounded-full hover:bg-indigo-100 transition"
        >
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <h2
          className="text-lg font-semibold text-gray-900 select-none"
          aria-live="polite"
        >
          {displayDate.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button
          onClick={goToNextMonth}
          aria-label="Next Month"
          className="p-2 rounded-full hover:bg-indigo-100 transition"
        >
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </header>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 select-none">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Dates Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-7 gap-1 mt-2"
        role="grid"
        tabIndex={0}
        onKeyDown={onGridKeyDown}
        aria-label="Calendar dates"
      >
        {calendarDays.map((day, index) => {
          const isToday = areDatesEqual(day.date, today);
          const isSelected = selectedDate && areDatesEqual(day.date, selectedDate);

          // Disable dates from previous months and past dates in current month
          const isDateInPast =
            day.date <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());

          const isDisabled = !day.isCurrentMonth || isDateInPast;

          return (
            <DateCell
              key={index}
              day={day}
              isSelected={isSelected}
              isToday={isToday}
              isDisabled={isDisabled}
              onSelect={onDateClick}
            />
          );
        })}
      </div>
    </motion.section>
  );
};

export default AppointmentsCalendar;
