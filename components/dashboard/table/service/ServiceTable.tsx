import { Service } from '@/types/database/types';
import React from 'react'
const ServiceHeaderNames = ['Name', 'Description', 'Price'];

const ServiceTableDataRows = [
  ['test', "towing", '$100'],
  ['test', "towing", '$100'],
  ['test', "towing", '$100'],
]

export default function ServiceTable({ services, serviceDataCallback, toggleServiceModal, serviceModalState }: { serviceDataCallback: React.Dispatch<React.SetStateAction<Service>>, services: Service[] | null, toggleServiceModal: React.Dispatch<React.SetStateAction<boolean>>, serviceModalState: Service }) {
  const handleModalEdit = (index: Service) => {
    serviceDataCallback(index);
    toggleServiceModal(true);
  }
  return (
    <div>
      <div className='flex-col bg-blue-500 text-black py-2  px-4 rounded'></div>
      <h1 className="flex text-xl justify-center align-middle text-white font-bold bg-blue-500 p-3">Service Table</h1>
      <div className='flex space-x-5'>
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
          <tbody className="bg-white">
            {services?.map((service) => {
              return (
                <tr key={service.id} className='text-black hover:scale-105 duration-150 space-y-3 cursor-pointer' onClick={() => {
                  handleModalEdit(service);
                }}>
                  <td className="px-6 py-4 whitespace-nowrap">{service.ServiceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{service.ServiceDescription}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{service.ServicePriceTax}</td>
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
