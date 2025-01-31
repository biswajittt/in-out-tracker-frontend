import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calender.css"; 

// Employees data
const usersdata = [
  { id: 1, name: "John Doe", checkIn: "9:00 AM", checkOut: "5:00 PM", date: "2025-01-12" },
  { id: 2, name: "Jane Smith", checkIn: "10:00 AM", checkOut: "5:00 PM", date: "2025-01-13" },
  { id: 3, name: "Alice Johnson", checkIn: "", checkOut: "", date: "2025-01-14" },
];

// Function to convert time to minutes
const timeParse = (timestr) => {
  if (!timestr) return null;
  let [time, modifier] = timestr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "AM" && hours === 12) hours = 0;
  if (modifier === "PM" && hours !== 12) hours += 12;

  return hours * 60 + minutes;
};

// Function to get event color
const getEventColor = (checkIn, checkOut) => {
  let checkInTime = timeParse(checkIn);
  let checkOutTime = timeParse(checkOut);
  let startTime = timeParse("9:00 AM");
  let endTime = timeParse("5:00 PM");

  if (checkInTime === null || checkOutTime === null) return "crimson"; // Absent
  if (checkInTime <= startTime && checkOutTime >= endTime) return "yellowgreen"; // Full day
  return "yellow"; // Partial work
};

// Function to return custom text (work status)
const getCustomText = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) {
    return "Absent"; // If no checkIn or checkOut time, show "Absent"
  }
  
  const checkInTime = timeParse(checkIn);
  const checkOutTime = timeParse(checkOut);
  const startTime = timeParse("9:00 AM");
  const endTime = timeParse("5:00 PM");

  if (checkInTime <= startTime && checkOutTime >= endTime) {
    return "On Time"; 
  }

  return "Late";
};

// Calendar Component
const Calender = () => {
  const dateColors = {};

  usersdata.forEach((user) => {
    dateColors[user.date] = getEventColor(user.checkIn, user.checkOut);
  });

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
          events={usersdata.map((user) => ({
            title: getCustomText(user.checkIn, user.checkOut), // Custom text
            start: user.date,
            color: getEventColor(user.checkIn, user.checkOut), // Event color based on work status
          }))}
          dayCellDidMount={(info) => {
            const dateStr = info.date.toLocaleDateString("en-CA"); // YYYY-MM-DD format
            if (dateColors[dateStr]) {
              info.el.style.setProperty("background", dateColors[dateStr], "important"); // Apply bg color
            }
          }}
        />
      </div>
    </div>
  );
};

export default Calender;
