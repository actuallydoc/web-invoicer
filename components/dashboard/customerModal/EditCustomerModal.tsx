import { Customer } from '@/types/database/types'
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import supabase from "@/db/client"
export default function EditCustomerModal({ refetchCallback, refetchState, customerDataCallback, customerModalData, isModalOpen, toggleModal }: { refetchState: boolean, refetchCallback: React.Dispatch<React.SetStateAction<boolean>>, customerModalData: Customer, isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>>, customerDataCallback: React.Dispatch<React.SetStateAction<Customer>> }) {

    const [editCustomerData, setEditCustomerData] = React.useState<Customer>(customerModalData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditCustomerData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleCloseModal = () => {
        toggleModal(false);
    }

    const handleEditCustomer = () => {
        const editCustomer = async () => {
            const { data, error } = await supabase
                .from('customers')
                .update({
                    CustomerName: editCustomerData.CustomerName,
                    CustomerAddress: editCustomerData.CustomerAddress,
                    CustomerPhone: editCustomerData.CustomerPhone,
                    CustomerEmail: editCustomerData.CustomerEmail,
                    CustomerCity: editCustomerData.CustomerCity,
                    CustomerCountry: editCustomerData.CustomerCountry,
                    CustomerPostalCode: editCustomerData.CustomerPostalCode,
                    CustomerTaxID: editCustomerData.CustomerTaxID
                })
                .eq('id', editCustomerData.id)
            if (error) {
                return error;
            }
            else {
                return data
            }
        }
        editCustomer().then((data) => {
            refetchCallback(!refetchState);
            toggleModal(false);
        }
        ).catch((err) => {
            console.log(err);
        }
        )
    }
    const handleDeleteCustomer = () => {
        const deleteCustomer = async () => {
            const { data, error } = await supabase
                .from('customers')
                .delete()
                .eq('id', editCustomerData.id)
            if (error) {
                return error;
            }
            else {
                return data
            }
        }
        deleteCustomer().then((data) => {
            refetchCallback(!refetchState);
            toggleModal(false);
        }
        ).catch((err) => {
            console.log(err);
        });
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
                                                <h4 className="text-left pl-3 text-lg font-medium">Customer data</h4>
                                                <Tooltip placement="top" title="Customer name" arrow>
                                                    <input onChange={handleInputChange} name='CustomerName' type='text' value={editCustomerData?.CustomerName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Customer City" arrow>
                                                    <input onChange={handleInputChange} name='CustomerCity' type='text' value={editCustomerData?.CustomerCity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Customer Address" arrow>
                                                    <input onChange={handleInputChange} name='CustomerAddress' type='text' value={editCustomerData?.CustomerAddress} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Customer Country" arrow>
                                                    <input onChange={handleInputChange} name='CustomerCountry' type='text' value={editCustomerData?.CustomerCountry} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Customer Email" arrow>
                                                    <input onChange={handleInputChange} name='CustomerEmail' type='text' value={editCustomerData?.CustomerEmail} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Customer Phone" arrow>
                                                    <input onChange={handleInputChange} name='CustomerPhone' type='text' value={editCustomerData?.CustomerPhone} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Customer Postal code" arrow>
                                                    <input onChange={handleInputChange} name='CustomerPostalCode' type='text' value={editCustomerData?.CustomerPostalCode} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Customer Tax ID" arrow>
                                                    <input onChange={handleInputChange} name='CustomerTaxID' type='text' value={editCustomerData?.CustomerTaxID as string} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                            </div>
                                            <div> {/* Client data end */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="p-4 ml-auto text-right">
                                <div className='flex space-x-5 '>
                                    <div>
                                        <Tooltip title="Edit Customer">
                                            <button onClick={handleEditCustomer} className='rounded-2xl border bg-green-400 p-2'>
                                                <EditIcon />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className='p-2 bg-red-500 rounded-2xl border'>
                                        <Tooltip title="Delete Customer">
                                            <button onClick={handleDeleteCustomer}>
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
