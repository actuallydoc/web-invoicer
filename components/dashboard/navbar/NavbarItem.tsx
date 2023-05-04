import React, {useEffect, useState} from 'react'
import ProfileModal from './profile/ProfileModal';

export default function NavbarItem({tab, callback}: {tab: string, callback: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [profile, setProfile] = useState(false);
    const handleClick = () => {
        callback(true);
    }
    useEffect(() => {
     //*Todo check for auth and fetch invoices
    }, [])
    if (tab === "Profile") return (
        <div className='justify-end'>
        <div className='space-x-5 hover:scale-105 duration-150 p-2 hover:rounded-xl'>
            <img onClick={handleClick} src="https://avatars.githubusercontent.com/u/53470309?v=4" alt="profile" className="rounded-full h-10 w-10"/>
        </div>
        </div>
    )
    else
  return (
    <div className='space-x-5 hover:scale-105 duration-150 p-3 hover:rounded-xl'>
        <p className="">{tab}</p>
    </div>
  )
}
