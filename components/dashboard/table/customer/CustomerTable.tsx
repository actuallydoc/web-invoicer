import React, { useEffect } from 'react'
import { Customer } from '@/types/database/types';
const CustomerHeaderNames = ['Name', 'Address', 'City', 'Country', 'Phone', 'Email'];

const CustomerTableDataRows = [
  ['John Doe', '123 Main Street', 'New York', 'USA', '1234567890', 'anpch@example.com'],
  ['Jane Doe', '123 Main Street', 'New York', 'USA', '1234567890', 'anpch@example.com'],
]



export default function CustomerTable({ customerDataCallback, customers, toggleCustomerModal, customerModalState }: { customerDataCallback: React.Dispatch<React.SetStateAction<Customer>>, customers: Customer[] | null, toggleCustomerModal: React.Dispatch<React.SetStateAction<boolean>>, customerModalState: Customer }) {
  useEffect(() => {
    console.log(customerModalState)
  }, []);

  const handleModalEdit = (index: Customer) => {
    customerDataCallback(index);
    toggleCustomerModal(true);
  }
  return (
    <div>
      <div className='flex-col bg-blue-500 text-black py-2  px-4 rounded'></div>
      <h1 className="flex text-xl justify-center align-middle text-white font-bold bg-blue-500 p-3">Customer Table</h1>
      <div className='flex space-x-5'>
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
          <tbody className="bg-white">
            {customers?.map((customer) => {
              return (
                <tr key={customer.id} className='text-black hover:scale-105 duration-150 space-y-3 cursor-pointer' onClick={() => {
                  handleModalEdit(customer);
                }}>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.CustomerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.CustomerAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.CustomerCity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.CustomerCountry}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.CustomerPhone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.CustomerEmail}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
