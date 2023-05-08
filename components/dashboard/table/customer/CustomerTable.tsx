import React from 'react'

const CustomerHeaderNames = ['Name', 'Address', 'City', 'Country', 'Phone', 'Email'];

const CustomerTableDataRows = [
  ['John Doe', '123 Main Street', 'New York', 'USA', '1234567890', 'anpch@example.com'],
  ['Jane Doe', '123 Main Street', 'New York', 'USA', '1234567890', 'anpch@example.com'],
]

export default function CustomerTable() {
    return (
        <table className="min-w-[60%] divide-y divide-gray-200">
          <thead>
            <tr>
              {CustomerHeaderNames.map((name) => {
                return (
                  <th key={name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{name}</th>
                )
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {CustomerTableDataRows.map((rowData, index) => {
              return (
                <tr key={index} className="bg-white hover:scale-105 duration-150 space-y-3 cursor-pointer">
                  {rowData.map((cellData, index) => {
                    return (
                      <td key={index} className="px-6 py-4 whitespace-nowrap">{cellData}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
}
