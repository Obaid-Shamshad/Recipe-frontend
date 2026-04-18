import React from 'react'

function Model({ onClose, onConfirm, title }) {
    return (
        <div className='flex justify-center h-screen items-center fixed top-0 left-0 w-full bg-black/50 z-10'>
            <div className='fixed p-4 rounded-sm z-10 w-72 bg-gray-200 flex flex-col justify-between  gap-12 shadow-md'>
                <p>{title}</p>
                <div className='flex gap-4 justify-end'>
                    <button onClick={onClose} className='bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 px-4'>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 px-4'>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Model
