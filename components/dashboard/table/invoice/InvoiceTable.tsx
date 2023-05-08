import React, { useEffect, useState } from 'react'
import { any } from 'zod';

const InvoiceTableHeaderNames = ['Invoice Date', 'Invoice Number', 'Invoice Amount', 'Invoice Status', "Provider", "Customer"]; //This stays here

let TableDataRows = [
  ['2022-01-01', '001', '$100', 'Paid', 'Provider 1', 'Customer 1'],//
  ['2022-01-02', '002', '$200', 'Unpaid', 'Provider 2', 'Customer 2'],//
  ['2022-01-03', '003', '$300', 'Paid', 'Provider 3', 'Customer 3']// This all goes away and is replaced by the data from the database from the index.tsx
];
let temp: any[] = [];
export default function InvoiceTable({datepickerFromState, datepickerToState,datepickerFrom, datepickerTo}: {datepickerFromState: string, datepickerToState: string,datepickerFrom: React.Dispatch<React.SetStateAction<string>>, datepickerTo: React.Dispatch<React.SetStateAction<string>>}) {

  const [tableData, setTableData] = useState(TableDataRows);
  const [filteredData, setFilteredData] = useState(TableDataRows);

  const handleChangeFrom = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    // console.log("datepickerFrom: " + e.target.value);
    datepickerFrom(e.target.value);
  }
  const handleChangeTo = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    // console.log("datepickerTo: " + e.target.value);
    datepickerTo(e.target.value);
  }
  useEffect(() => {
    TableDataRows.forEach((row) => {
      let date = new Date(row[0]).toISOString().slice(0, 10);
      if (
        (datepickerFromState === '' || date >= datepickerFromState) &&
        (datepickerToState === '' || date <= datepickerToState)
      ) {
        temp.push(row);
      }
    });
    setFilteredData(temp);
    temp = [];
  }, [tableData, datepickerFromState, datepickerToState]);

  return (
      <div>
      <div className='flex-col bg-blue-500 text-white font-bold py-2 px-4 rounded'>
      <h1 className="flex text-xl justify-center align-middle">Invoice Table</h1>
      <div className='flex space-x-5'>
        <div>
          <input type='date' onChange={handleChangeFrom} value={datepickerFromState}  className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
        </div>
        <div>
          <p>to</p>
        </div>
        <div>
          <input type='date' onChange={handleChangeTo} value={datepickerToState} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
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
            {filteredData.map((rowData, index) => {
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
