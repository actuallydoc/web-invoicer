import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import { Service } from "@/types/database/types"
import CheckIcon from '@mui/icons-material/Check';
import { useSession } from 'next-auth/react';
import supabase from '@/db/client'
export default function CreateServiceModal({ refetchCallback, refetchState, userId, isModalOpen, toggleModal }: { refetchState: boolean, refetchCallback: React.Dispatch<React.SetStateAction<boolean>>, userId: string | null, isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [createService, setCreateService] = React.useState<Service>({
        ServiceName: '',
        ServiceDescription: '',
        id: undefined,
        ServicePriceTax: 0,
        ServiceQuantity: 0,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        setCreateService((prevData) => ({
            ...prevData,
            [name]: value as typeof value,
        }));
    }
    const { data: session } = useSession();
    const handleCreateProvider = async () => {
        if (session) {
            const { data, error } = await supabase
                .from('services')
                .insert([
                    { ServiceName: createService.ServiceName, ServiceDescription: createService.ServiceDescription, ServicePriceTax: createService.ServicePriceTax, ServiceQuantity: createService.ServiceQuantity, user_id: userId }
                ])
            if (error) {
                console.log(error)
            }
            else {
                refetchCallback(!refetchState)
                toggleModal(false)
            }
        }
    }
    const handleCloseModal = () => {
        toggleModal(false)
    }
    return (
        <> {isModalOpen && (
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
                                            <Tooltip placement="top" title="Service Name" arrow>
                                                <input onChange={handleInputChange} name='ServiceName' type='text' value={createService?.ServiceName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Service Description" arrow>
                                                <input onChange={handleInputChange} name='ServiceDescription' type='text' value={createService?.ServiceDescription} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Service Price" arrow>
                                                <input onChange={handleInputChange} name='ServicePriceTax' type='number' value={createService?.ServicePriceTax} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Service Quantity" arrow>
                                                <input onChange={handleInputChange} name='ServiceQuantity' type='number' value={createService?.ServiceQuantity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>

                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 ml-auto text-right">
                                    <div className='flex space-x-5 '>
                                        <div>
                                            <Tooltip title="Create Provider">
                                                <button onClick={handleCreateProvider} className='rounded-2xl border bg-green-400 p-2'>
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
                </div>
            </div>
        )}
        </>
    )
}

