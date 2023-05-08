import React, { useEffect, useState } from 'react';
import ProfileModal from './profile/ProfileModal';

export default function NavbarItem({
  tab,
  profilecallback,
  invoiceCallback,
  providerCallback,
    serviceCallback,
    customerCallback,
}: {
  tab: string;
  profilecallback: React.Dispatch<React.SetStateAction<boolean>>;
  invoiceCallback: React.Dispatch<React.SetStateAction<boolean>>;
    providerCallback: React.Dispatch<React.SetStateAction<boolean>>;
    serviceCallback: React.Dispatch<React.SetStateAction<boolean>>;
    customerCallback: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const handleInvoiceClick = () => {
        console.log("Invoice clicked");
    profilecallback(false);
    providerCallback(false);
    serviceCallback(false);
    customerCallback(false);
    invoiceCallback(true);
    };
  const handleCustomerClick = () => {
        console.log("Customer clicked");
    profilecallback(false);
    providerCallback(false);
    serviceCallback(false);
    invoiceCallback(false);
    customerCallback(true);
    };

    const handleProviderClick = () => {
        console.log("Provider clicked");
    profilecallback(false);
    serviceCallback(false);
    invoiceCallback(false);
    customerCallback(false);
    providerCallback(true);
    };
    const handleServiceClick = () => {
        console.log("Service clicked");
    profilecallback(false);
    providerCallback(false);
    invoiceCallback(false);
    customerCallback(false);
    serviceCallback(true);
    };
  const handleClick = () => {
    profilecallback(true);

  };
  useEffect(() => {
    //*Todo check for auth and fetch invoices
  }, []);
  if (tab === 'Profile')
    return (
      <div className='flex justify-between'>
        <div className='space-x-5 ml-auto hover:scale-105 duration-150 p-2 hover:rounded-xl'>
          <img
            onClick={handleClick}
            src='https://avatars.githubusercontent.com/u/53470309?v=4' //?Todo - Fetch user profile picture base64 most likely
            alt='profile'
            className='rounded-full h-10 w-10'
          />
        </div>
      </div>
    );
  else
  if (tab === 'Invoices')
    return (
      <div className='space-x-5 hover:scale-105 duration-150 p-3 hover:rounded-xl'>
        <p onClick={handleInvoiceClick}>{tab}</p>
      </div>
    );
    else
    if (tab === 'Customers')
    return (
      <div className='space-x-5 hover:scale-105 duration-150 p-3 hover:rounded-xl'>
        <p onClick={handleCustomerClick}>{tab}</p>
      </div>
    );
    else
    if (tab === 'Providers')
    return (
      <div className='space-x-5 hover:scale-105 duration-150 p-3 hover:rounded-xl'>
        <p onClick={handleProviderClick}>{tab}</p>
      </div>
    );
    else
    if (tab === 'Services')
    return (
      <div className='space-x-5 hover:scale-105 duration-150 p-3 hover:rounded-xl'>
        <p onClick={handleServiceClick}>{tab}</p>
      </div>
    );
    else
    return (
      <div className='space-x-5 hover:scale-105 duration-150 p-3 hover:rounded-xl'>
        <p>{tab}</p>
      </div>
    );

}
