import { Provider } from '@/types/database/types'
import Tooltip from '@mui/material/Tooltip'
import React, { useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import supabase from "@/db/client"
//!TODO Signature state stays the same when u remove the signature and reopen the modal!
export default function EditProviderModal({ refetchCallback, refetchState, isModalOpen, providerDataCallback, providerModalState, toggleModal }: { refetchState: boolean, refetchCallback: React.Dispatch<React.SetStateAction<boolean>>, isModalOpen: boolean, providerDataCallback: React.Dispatch<React.SetStateAction<Provider>>, toggleModal: React.Dispatch<React.SetStateAction<boolean>>, providerModalState: Provider }) {
    // const [isSignature, setIsSignature] = React.useState<boolean>(false)
    const [isImage, setIsImage] = React.useState<string | null>(providerModalState?.Signature as string)
    const [editProvider, setEditProvider] = React.useState<Provider>(providerModalState);
    const handleRemoveSignature = () => {

        setIsImage(null);
        editProvider.Signature = undefined
    }
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, files } = e.target
        if (files == null || files == undefined) {
            return;
        }
        if (files.length === 0) {
            return;
        }
        // Check if the file has a valid extension
        let file = files[0];
        if (file == null || file.name == null) {
            return;
        }
        const validExtensions = ["jpg", "jpeg", "png"];
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (!validExtensions.includes(extension as string)) {
            console.log("Invalid file type. Please select a JPG or PNG image.");
            return;
        }
        let reader = new FileReader();
        // Add an event listener to the FileReader to listen for when the file is loaded
        reader.addEventListener("load", handleFileLoad, false);
        // Read the contents of the file as a data URL (base64-encoded string)
        reader.readAsDataURL(file);
    }
    const handleFileLoad = (e: any) => {
        setIsImage(e.target.result) // base64 string of the signature   
        editProvider.Signature = e.target.result
    }
    const handleCloseModal = () => {

        toggleModal(false);
    }

    useEffect(() => {
        setIsImage(providerModalState.Signature as string)
    }, [providerModalState])

    const handleEditProvider = () => {
        console.log(editProvider);
        const updateProvider = async () => {
            const { data, error } = await supabase.from('providers').update({
                ProviderName: editProvider.ProviderName,
                ProviderAddress: editProvider.ProviderAddress,
                ProviderCity: editProvider.ProviderCity,
                ProviderCountry: editProvider.ProviderCountry,
                ProviderEmail: editProvider.ProviderEmail,
                ProviderPhone: editProvider.ProviderPhone,
                ProviderPostalCode: editProvider.ProviderPostalCode,
                Signature: editProvider.Signature,
            }).eq('id', editProvider.id);
            if (error) {

                return error;
            }
            if (data) {
                console.log(data);

                return data;
            }
        }
        updateProvider().then(() => {
            refetchCallback(!refetchState);
            toggleModal(false)

        }).catch((err) => {
            console.log(err);
        })
    }
    const handleDeleteProvider = () => {
        const deleteProvider = async () => {
            const { data, error } = await supabase.from('providers').delete().eq('id', editProvider.id);
            if (error) {

                return error;
            }
            if (data) {
                console.log(data);

                return data;
            }
        }
        deleteProvider().then(() => {
            refetchCallback(!refetchState);
            toggleModal(false)
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditProvider((prevData) => ({
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
                                                <h4 className="text-left pl-3 text-lg font-medium">Provider data</h4>
                                                <Tooltip placement="top" title="Provider name" arrow>
                                                    <input onChange={handleInputChange} name='ProviderName' type='text' value={editProvider?.ProviderName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Provider Address" arrow>
                                                    <input onChange={handleInputChange} name='ProviderAddress' type='text' value={editProvider?.ProviderAddress} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Provider City" arrow>
                                                    <input onChange={handleInputChange} name='ProviderCity' type='text' value={editProvider?.ProviderCity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Provider Country" arrow>
                                                    <input onChange={handleInputChange} name='ProviderCountry' type='text' value={editProvider?.ProviderCountry} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Provider Email" arrow>
                                                    <input onChange={handleInputChange} name='ProviderEmail' type='text' value={editProvider?.ProviderEmail} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Provider Phone" arrow>
                                                    <input onChange={handleInputChange} name='ProviderPhone' type='text' value={editProvider?.ProviderPhone} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>
                                                <Tooltip placement="top" title="Provider PostalCode" arrow>
                                                    <input onChange={handleInputChange} name='ProviderPostalCode' type='text' value={editProvider?.ProviderPostalCode} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                                </Tooltip>

                                                {!isImage ? (
                                                    <Tooltip placement="top" title="Provider signature" arrow>
                                                        <div className="flex items-center justify-center">

                                                            <label
                                                                className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-black">
                                                                <AttachFileIcon />
                                                                <span className="mt-2 text-base leading-normal">Select a file</span>
                                                                <input onChange={handleFileInput} type='file' className="hidden" />

                                                            </label>

                                                        </div>
                                                    </Tooltip>

                                                ) : (
                                                    <div className='flex'>
                                                        <div>

                                                            <Tooltip placement="top" title="Provider signature" arrow>
                                                                <div className="flex items-center justify-center">
                                                                    <img src={isImage as string} className='w-32 max-h-20' alt="" />
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip placement="top" title="Remove signature" arrow>
                                                                <button onClick={handleRemoveSignature} className='rounded-2xl border bg-red-400 p-3 ml-10'>
                                                                    <RemoveIcon />
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                )}
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
                                        <Tooltip title="Edit Provider">
                                            <button onClick={handleEditProvider} className='rounded-2xl border bg-green-400 p-2'>
                                                <EditIcon />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className='p-2 bg-red-500 rounded-2xl border'>
                                        <Tooltip title="Delete Provider">
                                            <button onClick={handleDeleteProvider}>
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
