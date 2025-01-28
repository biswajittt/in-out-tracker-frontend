import React from 'react'


const users = [
    { id: 1, name: "John Doe", email: "john@example.com", checkIn: "9:00 AM", checkOut: "5:00 PM", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", checkIn: "9:00 AM", checkOut: "5:00 PM", status: "Active" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", checkIn: "9:00 AM", checkOut: "5:00 PM", status: "InActive" },
  ];
  
function Table() {
  return (
    <>
        <div className="mt-36 w-full p-3">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400">
          <thead>
            <tr className="bg-gray-300 text-gray-700 uppercase text-sm leading-normal">
              <th className="border px-4 py-3 text-left">Name</th>
              <th className="border px-4 py-3 text-left">Email</th>
              <th className="border px-4 py-3 text-left">Check In</th>
              <th className="border px-4 py-3 text-left">Check Out</th>
              <th className="border px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 text-gray-800 text-sm">
                <td className="border px-4 py-3">{user.name}</td>
                <td className="border px-4 py-3">{user.email}</td>
                <td className="border px-4 py-3">{user.checkIn}</td>
                <td className="border px-4 py-3">{user.checkOut}</td>
                <td className={`border px-4 py-3 font-bold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Table
