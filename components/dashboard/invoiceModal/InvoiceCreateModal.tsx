import { Invoice, InvoiceStatus, Service } from '@/types/database/types'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import React, { ChangeEvent, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
export default function InvoiceCreateModal({ refetchCallback, refetchState, isModalOpen, toggleModal }: { refetchState: boolean, refetchCallback: React.Dispatch<React.SetStateAction<boolean>>, isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>> }) {

  //!TODO Make if the user has providers, customers and services then show them in the select fields and autofill the form so its much easier

  const [createdInvoiceData, setCreatedInvoiceData] = useState<Invoice>({
    id: 1,
    invoiceAmount: 0,
    invoiceDate: "",
    invoiceDueDate: "",
    invoiceNumber: "",
    invoiceServiceDate: "",
    invoiceStatus: InvoiceStatus.DRAFT,
    priceVat: 0,
    vatRate: 0,
    user: {
      address: "",
      city: "",
      country: "",
      customers: [],
      email: "",
      invoices: [],
      name: "",
      phone: "",
      postalCode: "",
      providers: [],
      services: [],
    },
    customer: {
      CustomerName: "",
      CustomerAddress: "",
      CustomerPhone: "",
      CustomerCity: "",
      CustomerCountry: "",
      CustomerEmail: "",
      CustomerPostalCode: "",
      id: 1,
      CustomerTaxID: "",
    },
    provider: {
      ProviderName: "",
      ProviderAddress: "",
      ProviderPhone: "",
      ProviderCity: "",
      ProviderCountry: "",
      ProviderPostalCode: "",
      ProviderEmail: "",
      Signature: undefined,
      id: 1,
    },
    services: [
      {
        ServiceDescription: "",
        ServiceQuantity: 1,
        ServicePriceTax: 1,
        ServiceName: "",
        id: 0,
      }]
  })

  const handleDeleteService = (index: number) => {
    setCreatedInvoiceData((prevData) => ({
      ...prevData,
      services: prevData.services.filter((_, i) => i !== index)
    }))
  }
  const handleAddService = () => {
    let tempService: Service = {
      ServiceDescription: "test",
      ServiceQuantity: 1,
      ServicePriceTax: 2,
      ServiceName: "test",
      id: 11,
    }
    setCreatedInvoiceData((prevData) => ({
      ...prevData,
      services: [...prevData.services, tempService]
    }))

  }
  //Handle service quantity and price change
  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target
    console.log(name, value)
    setCreatedInvoiceData((prevData) => ({
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
    setCreatedInvoiceData((prevData) => ({
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
    console.log(name, value)
    setCreatedInvoiceData((prevData) => ({
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
  //Close modal handle
  const handleCloseModal = () => {
    toggleModal(false)
  }
  const handleCreateInvoice = () => {
    console.log(createdInvoiceData)
    toggleModal(false)
    refetchCallback(!refetchState);
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
                <button onClick={handleCloseModal} className="text-gray-700 p-3 hover:text-gray-800 focus:outline-none">
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
                          <input onChange={handleInputChange} name='ProviderName' type='text' value={createdInvoiceData?.provider.ProviderName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider address" arrow>
                          <input onChange={handleInputChange} name='ProviderAddress' type='text' value={createdInvoiceData?.provider.ProviderAddress} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider phone" arrow>
                          <input onChange={handleInputChange} name='ProviderPhone' type='text' value={createdInvoiceData?.provider.ProviderPhone} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider email" arrow>
                          <input onChange={handleInputChange} name='ProviderEmail' type='text' value={createdInvoiceData?.provider.ProviderEmail} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider country" arrow>
                          <input onChange={handleInputChange} name='ProviderCountry' type='text' value={createdInvoiceData?.provider.ProviderCountry} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider city" arrow>
                          <input onChange={handleInputChange} name='ProviderCity' type='text' value={createdInvoiceData?.provider.ProviderCity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                        </Tooltip>
                        <Tooltip placement="top" title="Provider postal code" arrow>
                          <input onChange={handleInputChange} name='ProviderPostalCode' type='text' value={createdInvoiceData?.provider.ProviderPostalCode} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
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
                              <input name='CustomerName' onChange={handleInputChange} type='text' value={createdInvoiceData?.customer?.CustomerName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Address" arrow>
                              <input name='CustomerAddress' onChange={handleInputChange} type='text' value={createdInvoiceData?.customer?.CustomerAddress} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer City" arrow>
                              <input name="CustomerCity" onChange={handleInputChange} type='text' value={createdInvoiceData?.customer.CustomerCity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Email" arrow>
                              <input name='CustomerEmail' onChange={handleInputChange} type='text' value={createdInvoiceData?.customer.CustomerEmail} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Phone" arrow>
                              <input name="CustomerPhone" onChange={handleInputChange} type='text' value={createdInvoiceData?.customer.CustomerPhone} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer Country" arrow>
                              <input name="CustomerCountry" onChange={handleInputChange} type='text' value={createdInvoiceData?.customer.CustomerCountry} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            <Tooltip placement="top" title="Customer postal code" arrow>
                              <input name="CustomerPostalCode" onChange={handleInputChange} type='text' value={createdInvoiceData?.customer.CustomerPostalCode} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                            </Tooltip>
                            {/* Cheeck if the user has tax id aka the customer owns a company so tax isnt calculated */}
                            {createdInvoiceData?.customer?.CustomerTaxID && (
                              <Tooltip placement="top" title="Customer tax id" arrow>
                                <input name="CustomerTaxID" onChange={handleInputChange} type='text' value={createdInvoiceData?.customer.CustomerTaxID} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
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
                                <input name="invoiceNumber" onChange={handleInputChange} type='text' value={createdInvoiceData?.invoiceNumber} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                              </Tooltip>
                              <Tooltip placement="top" title="Invoice date" arrow>
                                <input type='date' name='invoiceDate' onChange={handleInputChange} value={createdInvoiceData.invoiceDate} className="p-2 flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Invoice Service Date" arrow>
                                <input type='date' name='invoiceServiceDate' onChange={handleInputChange} value={createdInvoiceData.invoiceServiceDate} className="p-2 flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Invoice Due Date" arrow>
                                <input type='date' name='invoiceDueDate' onChange={handleInputChange} value={createdInvoiceData.invoiceDueDate} className="p-2 flex justify-center align-middle bg-white border rounded-md text-black px-3"></input>
                              </Tooltip>
                              <Tooltip placement="top" title="Invoice Status" arrow>
                                {/* This is spitting an error because it does not have a onChange handler */}
                                <select
                                  name="InvoiceStatus"
                                  value={createdInvoiceData?.invoiceStatus}
                                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                                    setCreatedInvoiceData({
                                      ...createdInvoiceData,
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
                      {createdInvoiceData?.services?.map((service, index) => (
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
                    <Tooltip title="Create invoice">
                      <button onClick={handleCreateInvoice} className='rounded-2xl border bg-green-400 p-2'>
                        <CheckIcon />
                      </button>
                    </Tooltip>
                  </div>
                  <div className=''>

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
