import { Service } from '@/types/database/types'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function EditServiceModal({ serviceDataCallback, serviceModalData, isModalOpen, toggleModal }: { serviceModalData: Service, isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>>, serviceDataCallback: React.Dispatch<React.SetStateAction<Service>> }) {

    const [editServiceData, setEditServiceData] = React.useState<Service>(serviceModalData);

    const handleCloseModal = () => {
        toggleModal(false);
    }

    const handleEditService = () => {
        console.log(editServiceData);
    }
    const handleDeleteService = () => {
        console.log(editServiceData);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditServiceData((prevData) => ({
            ...prevData,
            [name]: value
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
                                                <h4 className="text-left pl-3 text-lg font-medium">Service data</h4>
                                                <Tooltip placement="top" title="Service name" arrow>
                                                    <input onChange={handleInputChange} name='ServiceName' type='text' value={editServiceData?.ServiceName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Service Description" arrow>
                                                    <input onChange={handleInputChange} name='ServiceDescription' type='text' value={editServiceData?.ServiceDescription} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Service Quantity" arrow>
                                                    <input onChange={handleInputChange} name='ServiceQuantity' type='text' value={editServiceData?.ServiceQuantity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Service PriceTax" arrow>
                                                    <input onChange={handleInputChange} name='ServicePriceTax' type='text' value={editServiceData?.ServicePriceTax} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
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
                                        <Tooltip title="Edit Service">
                                            <button onClick={handleEditService} className='rounded-2xl border bg-green-400 p-2'>
                                                <EditIcon />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className='p-2 bg-red-500 rounded-2xl border'>
                                        <Tooltip title="Delete Service">
                                            <button onClick={handleDeleteService}>
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
