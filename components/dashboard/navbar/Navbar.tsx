import React from 'react';
import NavbarItem from './NavbarItem';
const Tabs = ["Dashboard", "Invoices", "Clients", "Products", "Settings", "Profile"];


const Navbar = ({callback}:{callback: any}) => {
    return (
        <div className="flex space-x-10 bg-blue-500 text-slate-200 w-[100vw]">
            {
                Tabs.map((tab, index) => {
                    return (
                        <div className='hover:scale-105 cursor-pointer'>
                            <div>
                                <NavbarItem tab={tab} callback={callback}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Navbar;