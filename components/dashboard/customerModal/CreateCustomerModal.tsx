import { Customer } from '@/pages/dashboard/types'
import Tooltip from '@mui/material/Tooltip'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
export default function CreateCustomerModal({ isModalOpen, toggleModal }: { isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [createCustomerData, setCreateCustomerData] = useState<Customer>({
        CustomerName: '',
        CustomerAddress: '',
        CustomerCity: '',
        CustomerCountry: '',
        CustomerEmail: '',
        CustomerPhone: '',
        CustomerPostalCode: '',
        CustomerTaxID: '',
        id: 0,
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        setCreateCustomerData((prevData) => ({
            ...prevData,
            [name]: value as typeof value,
        }));
    }
    const handleCreateCustomer = () => {
        console.log('create customer')
        //!TODO Make a request to the backend and create a customer for the user and then close the modal
        toggleModal(false)
    }
    const handleCloseModal = () => {
        toggleModal(false)
    }
    useEffect(() => {
        console.log(createCustomerData)
        // Make a request with DDVSearcher and fetch the data and make a dropdown below the field with the data if the user clicks the data from the dropdown then the data will be set to the field
    }, [createCustomerData])

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

                                    <div>
                                        <div className='flex'>
                                            <div className="flex-col items-center justify-between px-4 py-3 bg-gray-200">
                                                <div className='space-y-3 p-3'>
                                                    <h4 className="text-left text-lg font-medium">Customer data</h4>
                                                    <Tooltip placement="top" title="Customer name" arrow>
                                                        <input name='CustomerName' onChange={handleInputChange} type='text' value={createCustomerData?.CustomerName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                    </Tooltip>
                                                    <Tooltip placement="top" title="Customer Address" arrow>
                                                        <input name='CustomerAddress' onChange={handleInputChange} type='text' value={createCustomerData?.CustomerAddress} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                    </Tooltip>
                                                    <Tooltip placement="top" title="Customer City" arrow>
                                                        <input name="CustomerCity" onChange={handleInputChange} type='text' value={createCustomerData?.CustomerCity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                    </Tooltip>
                                                    <Tooltip placement="top" title="Customer Email" arrow>
                                                        <input name='CustomerEmail' onChange={handleInputChange} type='text' value={createCustomerData?.CustomerEmail} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                    </Tooltip>
                                                    <Tooltip placement="top" title="Customer Phone" arrow>
                                                        <input name="CustomerPhone" onChange={handleInputChange} type='text' value={createCustomerData?.CustomerPhone} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                    </Tooltip>
                                                    <Tooltip placement="top" title="Customer Country" arrow>
                                                        <input name="CustomerCountry" onChange={handleInputChange} type='text' value={createCustomerData?.CustomerCountry} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                    </Tooltip>
                                                    <Tooltip placement="top" title="Customer postal code" arrow>
                                                        <input name="CustomerPostalCode" onChange={handleInputChange} type='text' value={createCustomerData?.CustomerPostalCode} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                    </Tooltip>
                                                    {/* Cheeck if the user has tax id aka the customer owns a company so tax isnt calculated */}
                                                    {createCustomerData?.CustomerTaxID && (
                                                        <Tooltip placement="top" title="Customer tax id" arrow>
                                                            <input name="CustomerTaxID" onChange={handleInputChange} type='text' value={createCustomerData?.CustomerTaxID} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="p-4 ml-auto text-right">
                                <div className='flex space-x-5 '>
                                    <div>
                                        <Tooltip title="Create customer">
                                            <button onClick={handleCreateCustomer} className='rounded-2xl border bg-green-400 p-2'>
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
