import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calender.css";

// Employees data
const users = [
  { id: 1, name: "John Doe", checkIn: "9:00 AM", checkOut: "5:00 PM", status: "Active" },
  { id: 2, name: "Jane Smith", checkIn: "10:00 AM", checkOut: "5:00 PM", status: "Active" },
  { id: 3, name: "Alice Johnson", checkIn: "", checkOut: "", status: "Inactive" },
];

// Function to convert time to minutes
function timeParse(timeStr) {
  if (!timeStr) return null;
  let [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  
  return hours * 60 + minutes;
}

// Function to get attendance status for a specific date
const getDateColor = (dateStr) => {
  let checkInTime = timeParse(users[0].checkIn);
  let checkOutTime = timeParse(users[0].checkOut);
  let startTime = timeParse("9:00 AM");
  let endTime = timeParse("5:00 PM");

  if (checkInTime === null || checkOutTime === null) {
    return "red-date"; // Employee inactive
  } else if (checkInTime <= startTime && checkOutTime >= endTime) {
    return "green-date"; // Full-time work
  } else {
    return "yellow-date"; // Partial work (late or early checkout)
  }
};

// Calendar Component
const Calendar = () => {
  const specificDate = "2025-01-31"; // Target Date

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-black mt-18 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          height="auto"
          dayCellClassNames={(info) =>
            info.date.toISOString().split("T")[0] === specificDate ? getDateColor(specificDate) : ""
          }
        />
      </div>
    </div>
  );
};

export default Calendar;
