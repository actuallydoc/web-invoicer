import { Invoice, InvoiceStatus, Service } from '@/pages/dashboard/types'
import Tooltip from '@mui/material/Tooltip'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'
import Fab from '@mui/material/Fab'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function InvoiceModal({ InvoiceModalData, isModalOpen, toggleModal }: { InvoiceModalData: Invoice, isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  //!TODO - Add on change events to modify the temp invoice and update the invoice
  const [editInvoiceData, setEditInvoiceData] = useState<Invoice>(InvoiceModalData)
  const handleCloseModal = () => {
    toggleModal(false)
  }
  useEffect(() => {
  }, [])
  // {`absolute bottom-0 left-0 w-full h-24 bg-gray-300 transition duration-500 transform ${
  //   invoiceModal ? "-translate-y-1/2" : "translate-y-0"
  // }`}
  //Push a new serivce to the invoice
  const handleAddService = () => {
    let tempService: Service = {
      ServiceDescription: "test",
      ServiceQuantity: 1,
      ServicePriceTax: 2,
      ServiceName: "test",
      id: 11,
    }
    setEditInvoiceData((prevData) => ({
      ...prevData,
      services: [...prevData.services, tempService]
    }))

  }


  const handleEditInvoice = () => {
    //Update the invoice in the database and show the user a success message and a new modal to let the user choose if he wants to install or open it in a blob etc
    console.log(editInvoiceData)
    let doc = new jsPDF()
    doc.text('Hello world!', 10, 10)
    let file = doc.output('blob') // This is the key, get the blob
    //Replace the blob inside the database with the new one and update the invoice data
    var blobUrl = URL.createObjectURL(file) // Show the blob directly
    window.open(blobUrl)
  }
  const handleDeleteInvoice = () => {
    console.log(editInvoiceData)
    //Delete the invoice from the database and show the user a success message maybe show a promp to ask if he is sure
  }

  //Delete the service from the servicse array
  const handleDeleteService = (index: number) => {
    setEditInvoiceData((prevData) => ({
      ...prevData,
      services: prevData.services.filter((_, i) => i !== index)
    }))
  }
  //Handle service quantity and price change
  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
  //Handle service description
  const handleServiceTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
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
  //This is for the input fields but not for the service fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
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
        <div className={`fixed z-10 inset-0 overflow-y-auto `}>
          <div className="flex items-center justify-center min-h-screen ">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>
            <div className="bg-gray-200 rounded-lg shadow-lg relative w-auto">
              <Tooltip placement="top" title="Close modal" arrow>
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
              </Tooltip>
              <div className="flex-col items-center justify-between px-4 py-">
                <div>
                  <div className='flex'>
                    <div className='ml-7'>
                      <div className='flex space-x-5'>

                      </div>
                    </div>
                  </div>
                  <div>
                  </div>
                  {/* Provider data */}
                  <div className='flex'>
                    <div className="flex-col items-center justify-between px-4 py-3 bg-gray-200">
                      <div className='space-y-3 p-3'>
                        <h4 className="text-left pl-3 text-lg font-medium">Provider data</h4>
                        <Tooltip placement="top" title="Provider name" arrow>
                          <input onChange={handleInputChange} name='ProviderName' type='text' value={editInvoiceData?.provider.ProviderName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider address" arrow>
                          <input onChange={handleInputChange} name='ProviderAddress' type='text' value={editInvoiceData?.provider.ProviderAddress} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider phone" arrow>
                          <input onChange={handleInputChange} name='ProviderPhone' type='text' value={editInvoiceData?.provider.ProviderPhone} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider email" arrow>
                          <input onChange={handleInputChange} name='ProviderEmail' type='text' value={editInvoiceData?.provider.ProviderEmail} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider country" arrow>
                          <input onChange={handleInputChange} name='ProviderCountry' type='text' value={editInvoiceData?.provider.ProviderCountry} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider city" arrow>
                          <input onChange={handleInputChange} name='ProviderCity' type='text' value={editInvoiceData?.provider.ProviderCity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider postal code" arrow>
                          <input onChange={handleInputChange} name='ProviderPostalCode' type='text' value={editInvoiceData?.provider.ProviderPostalCode} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
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
                              <input name='CustomerName' onChange={handleInputChange} type='text' value={editInvoiceData?.customer?.CustomerName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Address" arrow>
                              <input name='CustomerAddress' onChange={handleInputChange} type='text' value={editInvoiceData?.customer?.CustomerAddress} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer City" arrow>
                              <input name="CustomerCity" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerCity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Email" arrow>
                              <input name='CustomerEmail' onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerEmail} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Phone" arrow>
                              <input name="CustomerPhone" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerPhone} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Country" arrow>
                              <input name="CustomerCountry" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerCountry} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer postal code" arrow>
                              <input name="CustomerPostalCode" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerPostalCode} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            {/* Cheeck if the user has tax id aka the customer owns a company so tax isnt calculated */}
                            {editInvoiceData?.customer?.CustomerTaxID && (
                              <Tooltip placement="top" title="Customer tax id" arrow>
                                <input name="CustomerTaxID" onChange={handleInputChange} type='text' value={editInvoiceData?.customer.CustomerTaxID} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                              </Tooltip>
                            )}
                          </div>
                        </div>
                        {/* Customer data end */}
                        {/* Invoice data */}
                        <div>
                          <div className="flex-col items-center justify-between px-4 py-3 bg-gray-200">
                            <div className='space-y-3 p-3'>
                              <h4 className="text-left text-lg font-medium">Invoice data</h4>
                              <Tooltip placement="top" title="Invoice number" arrow>
                                <input name="InvoiceNumber" onChange={handleInputChange} type='text' value={editInvoiceData?.invoiceNumber} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                              </Tooltip>
                              <Tooltip placement="top" title="Invoice date" arrow>
                                <input type='date' name='invoiceDate' onChange={handleInputChange} value={editInvoiceData.invoiceDate} className="p-2 flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Invoice Service Date" arrow>
                                <input type='date' name='invoiceServiceDate' onChange={handleInputChange} value={editInvoiceData.invoiceServiceDate} className="p-2 flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Invoice Due Date" arrow>
                                <input type='date' name='invoiceDueDate' onChange={handleInputChange} value={editInvoiceData.invoiceDueDate} className="p-2 flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
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
                                  className="flex p-2 justify-center align-middle bg"
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
                              <Fab onClick={() => {
                                handleDeleteService(index)
                              }} className="bg-red-500" size='small' color="error" aria-label="option 2">
                                <CloseIcon />
                              </Fab>
                            </Tooltip>

                          </div>
                          <div>
                            <Tooltip placement="top" title="Service Description" arrow>
                              <textarea className='p-3 border rounded-md text-black px-3 ' onChange={(e) => {
                                handleServiceTextAreaChange(e, index)
                              }} name="ServiceDescription" rows={4} cols={30} value={service.ServiceDescription} />
                            </Tooltip>
                          </div>

                          <div>
                            <Tooltip placement="top" title="Service Quantity" arrow>
                              <input name="ServiceQuantity" onChange={(e) => {
                                handleServiceInputChange(e, index)
                              }} type='number' value={service.ServiceQuantity} className="p-3 bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                          </div>

                          <div>
                            <Tooltip placement="top" title="Service Price" arrow>
                              <input name="ServicePriceTax" onChange={(e) => {
                                handleServiceInputChange(e, index)
                              }} type='number' value={service.ServicePriceTax} className="p-3 bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                          </div>

                        </div>))}
                      <div className='w-64'>
                        <Tooltip placement="top" title="Add service" arrow>
                          <button onClick={handleAddService} className='bg-green-400 p-2 rounded-md w-full ml-16'>Add service</button>
                        </Tooltip>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="p-4 ml-auto text-right">
                <div className='flex space-x-5 '>
                  <div>
                    <Tooltip title="Edit invoice">
                      <button onClick={handleEditInvoice} className='rounded-2xl border bg-green-400 p-2'>
                        <EditIcon />
                      </button>
                    </Tooltip>
                  </div>
                  <div className='p-2 bg-red-500 rounded-2xl border'>
                    <Tooltip title="Delete invoice">
                      <button onClick={handleDeleteInvoice}>
                        <DeleteIcon />
                      </button>
                    </Tooltip>
                  </div>
                </div>


              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
