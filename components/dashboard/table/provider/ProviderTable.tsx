import React, { useEffect, useState } from 'react'
const ProviderHeaderNames = ['Name', 'Address', 'City', 'Country', 'Phone', 'Email'];
import supabase from "@/db/client"
import { Provider } from '@/types/database/types';
const ProviderTableDataRows = [
  ['Provider Joe', '123 Main Street', 'New York', 'USA', '1234567890', 'anpch@example.com'],
  ['Jane Doe', '123 Main Street', 'New York', 'USA', '1234567890', 'anpch@example.com'],
]

export default function ProviderTable({ providers, providerDataCallback, toggleProviderModal, providerModalState }: { providers: Provider[] | null, providerDataCallback: React.Dispatch<React.SetStateAction<Provider>>, toggleProviderModal: React.Dispatch<React.SetStateAction<boolean>>, providerModalState: Provider }) {
  const handleModalEdit = (index: Provider) => {
    providerDataCallback(index);
    toggleProviderModal(true);
  }
  useEffect(() => {

  }, []);
  return (
    <div>
      <div className='flex-col bg-blue-500 text-black py-2  px-4 rounded'></div>
      <h1 className="flex text-xl justify-center align-middle text-white font-bold bg-blue-500 p-3">Provider Table</h1>
      <div className='flex space-x-5'>
        <table className="min-w-[60%] divide-y divide-gray-200">
          <thead>
            <tr>
              {ProviderHeaderNames.map((name) => {
                return (
                  <th key={name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{name}</th>
                )
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers?.map((provider) => {
              return (
                <tr key={provider.id} className='text-black bg-white hover:scale-105 duration-150 space-y-3 cursor-pointer' onClick={() => {
                  handleModalEdit(provider)
                }}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{provider.ProviderName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">{provider.ProviderAddress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">{provider.ProviderCity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">{provider.ProviderCountry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">{provider.ProviderPhone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{provider.ProviderEmail}</td>
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
