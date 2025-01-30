import React from 'react';
import Popup from './Popup';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", checkIn: "9:00 AM", checkOut: "5:00 PM", status: "Active",stats:<Popup/>},
  { id: 2, name: "Jane Smith", email: "jane@example.com", checkIn: "10:00 AM", checkOut: "5:00 PM", status: "Active" ,stats:<Popup/>},
  { id: 3, name: "Alice Johnson", email: "alice@example.com", checkIn: "", checkOut: "", status: "InActive",stats:<Popup/>  },
];
function timePrase(timeStr){
  if(!timeStr){
    return null
  }
  let [time,modifier]=timeStr.split(" ")
  let [hours,minutes]=time.split(":").map(Number)

  if (modifier==='PM' && hours!==12){
    hours+=12
  }
  else if(modifier==='AM' && hours===12){
    hours =0
  }
  return hours*60+minutes
}

users.forEach((element) => {
  let checkInTime=timePrase(element.checkIn)
  let checkOutTime=timePrase(element.checkOut)
  let startTime=timePrase('9:00 AM')
  let endTime=timePrase('5:00 PM')

  if(checkInTime===null ||checkOutTime===null){
    console.log('red');
    return
  }
  else if(checkInTime<=startTime && checkOutTime>=endTime){
    console.log('green');
    
  }
  else if(checkInTime>startTime || checkOutTime<endTime){
    console.log('yellow');
    
  }
  else{
    console.log('red');
    
  }

});
function WorkingEmployees() {
  return (
<div
  className="w-full p-3 h-screen"
  style={{
    background: "linear-gradient(125deg, #1c2025, #303740, #011e3a, #1a1d21)"
  }}
>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-800 text-gray-400 uppercase leading-normal ">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Check In</th>
              <th className="px-4 py-3 text-left">Check Out</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">stats</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-gray-700 text-gray-400 hover:bg-gray-600 font-bold ">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.checkIn}</td>
                <td className="px-4 py-3">{user.checkOut}</td>
                <td className={`px-4 py-3 font-bold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {user.status}
                </td>
                <td className="px-4 py-3">{user.stats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkingEmployees;
