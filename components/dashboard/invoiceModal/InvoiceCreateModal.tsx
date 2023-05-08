import React from 'react'

export default function InvoiceCreateModal({isModalOpen, toggleModal}: {isModalOpen: boolean, toggleModal: React.Dispatch<React.SetStateAction<boolean>>}) {
    const handleCloseModal = () => {
        toggleModal(false)
    }

  return (
    <>
    {isModalOpen && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg relative w-full max-w-md">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-200">
              <h3 className="text-lg font-medium">Create invoice tab</h3>
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
            </div>

            <div className="p-4">{/* Modal content goes here */}</div>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
