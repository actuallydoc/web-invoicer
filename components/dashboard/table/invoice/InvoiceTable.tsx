import type { Customer, Invoice, Provider, Service, User } from '@/pages/dashboard/types';
import React, { useEffect, useState } from 'react'
import { any } from 'zod';
export enum InvoiceStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}
const InvoiceTableHeaderNames = ['Invoice Date', 'Invoice Number', 'Invoice Amount', 'Invoice Status', "Provider", "Customer"]; //This stays here
const customer1: Customer = {
  id: 1,
  CustomerName: "John Doe",
  CustomerEmail: "john.doe@example.com",
  CustomerPhone: "+1 555-555-5555",
  CustomerAddress: "123 Main St",
  CustomerCity: "New York",
  CustomerCountry: "USA",
  CustomerPostalCode: "10001",
  CustomerTaxID: "123456789",
};

const service1: Service = {
  id: 1,
  name: "Web Design",
  description: "Custom website design and development",
  price_tax: 1000,
  quantity: 1,
};

const provider1: Provider = {
  id: 1,
  ProviderName: "Acme Web Solutions",
  ProviderEmail: "contact@acmewebsolutions.com",
  ProviderPhone: "+1 555-555-5555",
  ProviderAddress: "456 Broadway",
  ProviderCity: "New York",
  ProviderCountry: "USA",
  ProviderPostalCode: "10001",
  services: [service1],
};

const user1: User = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "+1 555-555-5555",
  address: "789 Main St",
  city: "New York",
  country: "USA",
  postalCode: "10001",
  invoices: [],
  services: [service1],
  customers: [customer1],
  providers: [provider1],
};

const invoice1: Invoice = {
  id: 1,
  user: user1,
  invoiceDate: "2025-01-01",
  invoiceNumber: "INV-001",
  invoiceAmount: "$1000.00",
  invoiceStatus: InvoiceStatus.PAID,
  provider: provider1,
  customer: customer1,
  services: [service1],
  vat_rate: 0.2,
  price_tax: 1200,
};

const invoice2: Invoice = {
  id: 2,
  user: user1,
  invoiceDate: "2022-01-01",
  invoiceNumber: "INV-002",
  invoiceAmount: "$1000.00",
  invoiceStatus: InvoiceStatus.UNPAID,
  provider: provider1,
  customer: customer1,
  services: [service1],
  vat_rate: 0.2,
  price_tax: 1200,
};

let TableDataRows: Invoice[] = [
  invoice1, invoice2
]
let temp: any[] = [];
export default function InvoiceTable({ InvoiceDataState, IvoiceDataCallBack, toggleInvoiceModal, InvoiceModalState, datepickerFromState, datepickerToState, datepickerFrom, datepickerTo }: { IvoiceDataCallBack: React.Dispatch<React.SetStateAction<Invoice>>, InvoiceDataState: Invoice | undefined, toggleInvoiceModal: React.Dispatch<React.SetStateAction<boolean>>, InvoiceModalState: boolean, datepickerFromState: string, datepickerToState: string, datepickerFrom: React.Dispatch<React.SetStateAction<string>>, datepickerTo: React.Dispatch<React.SetStateAction<string>> }) {

  const [tableData, setTableData] = useState<Invoice[]>(TableDataRows);
  const [filteredData, setFilteredData] = useState<Invoice[]>(TableDataRows);

  const handleChangeFrom = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    // console.log("datepickerFrom: " + e.target.value);
    datepickerFrom(e.target.value);
  }
  const handleChangeTo = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    // console.log("datepickerTo: " + e.target.value);
    datepickerTo(e.target.value);
  }
  const handleModalEdit = (index: Invoice) => {
    console.log("handleModalEdit: " + index.id);
    IvoiceDataCallBack(index);
    toggleInvoiceModal(true);
  }
  useEffect(() => {
    TableDataRows.forEach((row) => {
      let date = new Date(row.invoiceDate).toISOString().slice(0, 10);
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
            <input type='date' onChange={handleChangeFrom} value={datepickerFromState} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
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
  const rowKey = `${rowData.invoiceNumber}-${index}`; // create a unique key for each row

  return (
    <tr key={rowKey} className="bg-white hover:scale-105 duration-150 space-y-3 cursor-pointer">
      <td onClick={() => handleModalEdit(rowData)} className="px-6 py-4 whitespace-nowrap">{rowData.invoiceDate}</td>
      <td onClick={() => handleModalEdit(rowData)} className="px-6 py-4 whitespace-nowrap">{rowData.invoiceNumber}</td>
      <td onClick={() => handleModalEdit(rowData)} className="px-6 py-4 whitespace-nowrap">{rowData.invoiceAmount}</td>
      <td onClick={() => handleModalEdit(rowData)} className="px-6 py-4 whitespace-nowrap">{rowData.invoiceStatus}</td>
      <td onClick={() => handleModalEdit(rowData)} className="px-6 py-4 whitespace-nowrap">{rowData.provider.ProviderName}</td>
      <td onClick={() => handleModalEdit(rowData)} className="px-6 py-4 whitespace-nowrap">{rowData.customer.CustomerName}</td>
    </tr>
  )
})}
        </tbody>
      </table>
    </div>
  )
}
