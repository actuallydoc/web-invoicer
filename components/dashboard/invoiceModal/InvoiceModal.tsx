import { Invoice } from '@/pages/dashboard/types'
import Tooltip from '@mui/material/Tooltip'
import React, { useEffect } from 'react'

export default function InvoiceModal({ InvoiceModalData, isModalOpen, toggleModal }: { InvoiceModalData: Invoice | undefined, isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  //!TODO - Add on change events to modify the temp invoice and update the invoice
  const handleCloseModal = () => {
    toggleModal(false)
  }
  useEffect(() => {
    console.log(InvoiceModalData) //Only for debug
  }, [])
  return (
    <>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-gray-200 rounded-lg shadow-lg relative w-auto">
            <button onClick={handleCloseModal} className="text-gray-700 hover:text-gray-800 focus:outline-none">
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 8.586L6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 001.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 00-1.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              <div className="flex-col items-center justify-between px-4 py-">
                <h3 className="text-lg font-medium">Invoice tab</h3>
                
                <div className='flex'>
                  <div className='flex space-x-5'>

                  <Tooltip placement="top" title="Invoice date" arrow>
                    <input type='date' value={InvoiceModalData?.invoiceDate} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                  </Tooltip>
                  <Tooltip placement="top" title="Invoice Number" arrow>
                    <input type='text' value={InvoiceModalData?.invoiceNumber} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                  </Tooltip>
                  <Tooltip placement="top" title="Invoice Status" arrow>
                    <select value={InvoiceModalData?.invoiceStatus} className="flex justify-center align-middle bg">{InvoiceModalData?.invoiceStatus}</select>
                  </Tooltip>
                  </div>
                </div>
                <div>
                  {/* Provider data */}
                  <div className='flex'>
                    <div className="flex-col items-center justify-between px-4 py-3 bg-gray-200">
                      <div className='space-y-3 p-3'>
                        <h4 className="text-left pl-3 text-lg font-medium">Provider data</h4>
                        <Tooltip placement="top" title="Provider name" arrow>
                          <input type='text' value={InvoiceModalData?.provider.name} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                        </Tooltip>
                        <Tooltip placement="top" title="Provider address" arrow>
                          <input type='text' value={InvoiceModalData?.provider.address} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                        </Tooltip>
                        <Tooltip placement="top" title="Provider phone" arrow>
                          <input type='text' value={InvoiceModalData?.provider.phone} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                        </Tooltip>
                        <Tooltip placement="top" title="Provider email" arrow>
                          <input type='text' value={InvoiceModalData?.provider.email} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                        </Tooltip>
                        <Tooltip placement="top" title="Provider phone" arrow>
                          <input type='text' value={InvoiceModalData?.provider.phone} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                        </Tooltip>
                        <Tooltip placement="top" title="Provider city" arrow>
                          <input type='text' value={InvoiceModalData?.provider.city} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                        </Tooltip>
                        <Tooltip placement="top" title="Provider postal code" arrow>
                          <input type='text' value={InvoiceModalData?.provider.postalCode} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                        </Tooltip>
                      </div>
                     
                      <div> {/* Client data end */}
                      </div>
                    </div>

                    <div> {/* Company data end */}
                        {/* Customer data */}
                        <div className='flex'>
                          <div className="flex-col items-center justify-between px-4 py-3 bg-gray-200">
                            <div className='space-y-3 p-3'>
                              <h4 className="text-left text-lg font-medium">Customer data</h4>
                              <Tooltip placement="top" title="Customer name" arrow>
                                <input type='text' value={InvoiceModalData?.customer.name} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Customer address" arrow>
                                <input type='text' value={InvoiceModalData?.customer.address} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Customer phone" arrow>
                                <input type='text' value={InvoiceModalData?.customer.phone} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Customer email" arrow>
                                <input type='text' value={InvoiceModalData?.customer.email} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Customer phone" arrow>
                                <input type='text' value={InvoiceModalData?.customer.phone} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Customer city" arrow>
                                <input type='text' value={InvoiceModalData?.customer.city} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Customer postal code" arrow>
                                <input type='text' value={InvoiceModalData?.customer.postalCode} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                                </Tooltip>
                                {/* Cheeck if the user has tax id */}
                                {InvoiceModalData?.customer?.tax_id && (
                                  <Tooltip placement="top" title="Customer tax id" arrow>
                                    <input type='text' value={InvoiceModalData?.customer.tax_id} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                                  </Tooltip>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              <div className="p-4">{/* Modal content goes here */}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
