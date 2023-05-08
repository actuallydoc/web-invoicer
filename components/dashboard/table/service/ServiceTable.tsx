import React from 'react'
const ServiceHeaderNames = ['Name', 'Description', 'Price'];

const ServiceTableDataRows = [
  ['test', "towing", '$100'],
  ['test', "towing", '$100'],
  ['test', "towing", '$100'],
]

export default function ServiceTable() {
    return (
        <table className="min-w-[60%] divide-y divide-gray-200">
          <thead>
            <tr>
              {ServiceHeaderNames.map((name) => {
                return (
                  <th key={name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{name}</th>
                )
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ServiceTableDataRows.map((rowData, index) => {
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
