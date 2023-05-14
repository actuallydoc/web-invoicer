import React from 'react';
import NavbarItem from './NavbarItem';
const Tabs = ["Invoices", "Customers", "Providers", "Services", "Settings", "Profile"];


const Navbar = ({ invoiceCallback, providerCallback, serviceCallback, customerCallback }: { invoiceCallback: React.Dispatch<React.SetStateAction<boolean>>, providerCallback: React.Dispatch<React.SetStateAction<boolean>>, serviceCallback: React.Dispatch<React.SetStateAction<boolean>>, customerCallback: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <div className="flex pl-10 space-x-10 bg-blue-500 text-slate-200 w-[100vw]">
            {
                Tabs.map((tab) => {
                    return (

                        <div className='flex ml-auto  hover:scale-105 cursor-pointer'>
                            <div>
                                <NavbarItem tab={tab} customerCallback={customerCallback} invoiceCallback={invoiceCallback} providerCallback={providerCallback} serviceCallback={serviceCallback} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};
export default Navbar;