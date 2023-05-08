import React from 'react'

const InvoiceTableHeaderNames = ['Invoice Date', 'Invoice Number', 'Invoice Amount', 'Invoice Status', "Provider", "Customer"];

const TableDataRows = [
  ['2022-01-01', '001', '$100', 'Paid', 'Provider 1', 'Customer 1'],
  ['2022-01-02', '002', '$200', 'Unpaid', 'Provider 2', 'Customer 2'],
  ['2022-01-03', '003', '$300', 'Paid', 'Provider 3', 'Customer 3']
];


export default function InvoiceTable() {
    return (
      <div>
      <div className='flex-col bg-blue-500 text-white font-bold py-2 px-4 rounded'>
      <h1 className="flex text-xl justify-center align-middle">Invoice Table</h1>
      <div className='flex space-x-5'>
        <div>
          <input type='date' className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
        </div>
        <div>
          <p>to</p>
        </div>
        <div>
          <input type='date' className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
        </div>
      </div>
      
    </div>
        <table className="min-w-[80%] divide-y divide-gray-200">
          <thead>
            <tr>
              {InvoiceTableHeaderNames.map((name) => {
                return (
                  <th key={name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{name}</th>
                )
              })}
            </tr> 
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {TableDataRows.map((rowData, index) => {
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
        </div>
      )
}
