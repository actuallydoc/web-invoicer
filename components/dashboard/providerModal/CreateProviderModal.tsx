import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { Provider } from '@/pages/dashboard/types'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import RemoveIcon from '@mui/icons-material/Remove';
export default function CreateProviderModal({ isModalOpen, toggleModal }: { isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isSignature, setIsSignature] = React.useState<boolean>(false)
    const [isImage, setIsImage] = React.useState<string>()
    const [createdProvider, setCreatedProvider] = React.useState<Provider>({
        ProviderName: '',
        ProviderAddress: '',
        ProviderPhone: '',
        ProviderEmail: '',
        ProviderCountry: '',
        ProviderCity: '',
        ProviderPostalCode: '',
        id: 0,
        Signature: undefined,
    })
    const handleCloseModal = () => {
        toggleModal(false)
    }
    let img = new Image();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCreatedProvider((prevData) => ({
            ...prevData,
            [name]: value as typeof value,
        }));
    }
    const handleRemoveSignature = () => {
        setIsSignature(false)
        setIsImage(undefined)
        createdProvider.Signature = undefined
    }
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, files } = e.target
        if (files == null || files == undefined) {
            return
        }
        if (files === null || files === undefined) {
            return
        }
        if (files.length === 0) {
            return
        }
        if (files[0] === null || files[0] === undefined) {
            return
        }
        // Check if the file has a valid extension
        //!TODO Check if the file name is empty? can cause crash idk?.
        let file = files[0];
        const validExtensions = ["jpg", "jpeg", "png"];
        const extension = files[0].name.split(".").pop().toLowerCase(); //Get rid of this  idk xd
        if (!validExtensions.includes(extension)) {
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
        setIsSignature(true)
        createdProvider.Signature = e.target.result
    }
    const handleCreateProvider = () => {
        console.log(createdProvider)
        //!TODO Create provider in the database and refresh the table and refetch
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
                                                <input onChange={handleInputChange} name='ProviderName' type='text' value={createdProvider?.ProviderName} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Provider address" arrow>
                                                <input onChange={handleInputChange} name='ProviderAddress' type='text' value={createdProvider?.ProviderAddress} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Provider phone" arrow>
                                                <input onChange={handleInputChange} name='ProviderPhone' type='text' value={createdProvider?.ProviderPhone} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Provider email" arrow>
                                                <input onChange={handleInputChange} name='ProviderEmail' type='text' value={createdProvider?.ProviderEmail} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Provider country" arrow>
                                                <input onChange={handleInputChange} name='ProviderCountry' type='text' value={createdProvider?.ProviderCountry} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Provider city" arrow>
                                                <input onChange={handleInputChange} name='ProviderCity' type='text' value={createdProvider?.ProviderCity} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>
                                            <Tooltip placement="top" title="Provider postal code" arrow>
                                                <input onChange={handleInputChange} name='ProviderPostalCode' type='text' value={createdProvider?.ProviderPostalCode} className="flex p-1 justify-center align-middle bg-white border rounded-md text-black px-3" />
                                            </Tooltip>

                                            {/* Make a file picker for a signature jpg , png */}
                                            {!isSignature ? (
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
                                            ) : null}
                                            {isSignature ? (
                                                <div className='flex'>
                                                    <div>
                                                        <Tooltip placement="top" title="Provider signature" arrow>
                                                            <div className="flex items-center justify-center">
                                                                <img src={isImage} className='w-32 max-h-20' alt="" />
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
                                            ) : null}
                                        </div>
                                        <div>
                                        </div>
                                    </div>
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
        )}
        </>
    )
}
