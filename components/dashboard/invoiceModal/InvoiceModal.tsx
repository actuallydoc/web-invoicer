import { Invoice, InvoiceStatus, Service } from '@/pages/dashboard/types'
import Tooltip from '@mui/material/Tooltip'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { TypeOf } from 'zod'
import { jsPDF } from 'jspdf'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close';

export default function InvoiceModal({ InvoiceModalData, isModalOpen, toggleModal }: { InvoiceModalData: Invoice, isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  //!TODO - Add on change events to modify the temp invoice and update the invoice
  const [editInvoiceData, setEditInvoiceData] = useState<Invoice>(InvoiceModalData)

  const handleCloseModal = () => {
    toggleModal(false)
  }
  useEffect(() => {
  }, [])

  const handleDeleteService = (index: number) => {
    setEditInvoiceData((prevData) => ({
      ...prevData,
      services: prevData.services.filter((_, i) => i !== index)
    }))
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target
    console.log(name, value)
    setEditInvoiceData((prevData) => ({
      ...prevData,
      services: prevData.services.map((service, i) => {
        if (i === index) {
          return {
            ...service,
            [name]: value as typeof value
          }
        }
        return service
      })
    }))
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setEditInvoiceData((prevData) => ({
      ...prevData,
      [name]: value as typeof value,
      customer: {
        ...prevData.customer,
        [name]: value as typeof value
      },
      provider: {
        ...prevData.provider,
        [name]: value as typeof value
      },
    }));
  }
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
                      <input type='date' name='invoiceDate' onChange={handleInputChange} value={editInvoiceData.invoiceDate} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                    </Tooltip>
                    <Tooltip placement="top" title="Invoice Number" arrow>
                      <input name="invoiceNumber" type='text' onChange={handleInputChange} value={editInvoiceData.invoiceNumber} className="flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                    </Tooltip>
                    <Tooltip placement="top" title="Invoice Status" arrow>
                      {/* This is spitting an error because it does not have a onChange handler */}
                      <select
                        name="InvoiceStatus"
                        value={editInvoiceData?.invoiceStatus}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                          setEditInvoiceData({
                            ...editInvoiceData,
                            invoiceStatus: event.target.value as InvoiceStatus, // Cast the selected value as InvoiceStatus enum
                          })
                        }
                        className="flex justify-center align-middle bg"
                      >
                        {/* Map over the InvoiceStatus enum and render options for each value */}
                        {Object.values(InvoiceStatus).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
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
                          <input onChange={handleInputChange} name='ProviderName' type='text' value={editInvoiceData?.provider.ProviderName} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider address" arrow>
                          <input onChange={handleInputChange} name='ProviderAddress' type='text' value={editInvoiceData?.provider.ProviderAddress} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider phone" arrow>
                          <input onChange={handleInputChange} name='ProviderPhone' type='text' value={editInvoiceData?.provider.ProviderPhone} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider email" arrow>
                          <input onChange={handleInputChange} name='ProviderEmail' type='text' value={editInvoiceData?.provider.ProviderEmail} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider country" arrow>
                          <input onChange={handleInputChange} name='ProviderCountry' type='text' value={editInvoiceData?.provider.ProviderCountry} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider city" arrow>
                          <input onChange={handleInputChange} name='ProviderCity' type='text' value={editInvoiceData?.provider.ProviderCity} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider postal code" arrow>
                          <input onChange={handleInputChange} name='ProviderPostalCode' type='text' value={editInvoiceData?.provider.ProviderPostalCode} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
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
                              <input name='CustomerName' onChange={handleInputChange} type='text' value={editInvoiceData?.customer?.CustomerName} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Address" arrow>
                              <input name='CustomerAddress' onChange={handleInputChange} type='text' value={editInvoiceData?.customer?.CustomerAddress} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer City" arrow>
                              <input name="CustomerCity" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerCity} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Email" arrow>
                              <input name='CustomerEmail' onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerEmail} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Phone" arrow>
                              <input name="CustomerPhone" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerPhone} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Country" arrow>
                              <input name="CustomerCountry" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerCountry} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer postal code" arrow>
                              <input name="CustomerPostalCode" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerPostalCode} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            {/* Cheeck if the user has tax id aka the customer owns a company so tax isnt calculated */}
                            {editInvoiceData?.customer?.CustomerTaxID && (
                              <Tooltip placement="top" title="Customer tax id" arrow>
                                <input name="CustomerTaxID" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerTaxID} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  {/* Invoice services data */}
                  <div className='flex'>
                    <div className="items-center justify-between px-4 py-3 bg-gray-200">
                      {editInvoiceData?.services?.map((service, index) => (
                        <div key={index} className='flex space-x-3 p-3'>
                          {/* <h4 className="text-left text-lg font-medium">Service {index + 1}</h4> */}
                          <div className='pt-5'>
                            <Tooltip placement='left' title="Delete Service?">
                               <Fab onClick={()=>{
                                handleDeleteService(index)
                               }} className="bg-red-500" size='small' color="error" aria-label="option 2">
                              <CloseIcon />
                            </Fab> 
                            </Tooltip>
                           
                            </div>
                          <div>
                            <Tooltip placement="top" title="Service description" arrow>
                              <textarea onChange={(e) => {
                                handleTextAreaChange(e, index)
                              }} rows={4} cols={30} value={service.description} />
                            </Tooltip>
                          </div>

                          <div>
                            <Tooltip placement="top" title="Service quantity" arrow>
                              <input name="ServiceQuantity" onChange={handleInputChange} type='text' value={service.quantity} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                          </div>

                          <div>
                            <Tooltip placement="top" title="Service price" arrow>
                              <input name="ServicePrice" onChange={handleInputChange} type='text' value={service.price_tax} className="flex justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                          </div>

                        </div>))}
                      {/* <div className='space-y-3 ml-3'>
                        <label>
                          <textarea rows={4} cols={30} />
                        </label>
                      </div> */}
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
