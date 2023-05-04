import React from 'react'

export default function ProfileModal({callback}: {callback: React.Dispatch<React.SetStateAction<boolean>>}) {
  const handleClick = () => {
    callback(false);
  }
  return (
    <div className='bg-slate-300 border-4 rounded-2xl p-5'> 
      <form className="box-border w-auto h-auto p-2 bg-slate-300 space-y-3">
        <label className='text-2xl text-slate-500 font-bold '>Profile</label>
        <div>
        <input className='p-2' type="text" placeholder='Name' />
        </div>
        <div>
        <input className='p-2' type="text" placeholder='Company'/>
        </div>
        <div>
        <input className='p-2' type="text" placeholder='Email' />
        </div>
        <div>
        <input className='p-2' type="text" placeholder='Password'/>
        </div>
        
      </form>

      <button className='ml-10 bg-slate-500 p-2 rounded-xl text-white' onClick={handleClick}>Close me</button>

    </div>
  )
}
