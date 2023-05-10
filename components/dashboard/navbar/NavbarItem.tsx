import React, { useEffect, useState } from 'react';
import ProfileModal from './profile/ProfileModal';
import { useSession, signOut } from 'next-auth/react';
export default function NavbarItem({
  tab,
  invoiceCallback,
  providerCallback,
  serviceCallback,
  customerCallback,
}: {
  tab: string;
  invoiceCallback: React.Dispatch<React.SetStateAction<boolean>>;
  providerCallback: React.Dispatch<React.SetStateAction<boolean>>;
  serviceCallback: React.Dispatch<React.SetStateAction<boolean>>;
  customerCallback: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: session } = useSession({ required: true });
  const [activeProfile, setActiveProfile] = useState(false);
  const handleInvoiceClick = () => {

    providerCallback(false);
    serviceCallback(false);
    customerCallback(false);
    invoiceCallback(true);
  };
  const handleCustomerClick = () => {
    providerCallback(false);
    serviceCallback(false);
    invoiceCallback(false);
    customerCallback(true);
  };

  const handleProviderClick = () => {
    serviceCallback(false);
    invoiceCallback(false);
    customerCallback(false);
    providerCallback(true);
  };
  const handleServiceClick = () => {
    console.log("Service clicked");

    providerCallback(false);
    invoiceCallback(false);
    customerCallback(false);
    serviceCallback(true);
  };
  const handleClick = () => {
    setActiveProfile(!activeProfile);

  };
  useEffect(() => {
    //*Todo check for auth and fetch invoices
  }, []);
  if (tab === 'Profile')
    return (
      <div className='flex-col justify-between'>
        <div>
          <div className='space-x-5 ml-auto hover:scale-105 duration-150 p-2 hover:rounded-xl'>
            <img
              onClick={handleClick}
              src={session?.user?.image || undefined}
              alt='profile'
              className='rounded-full h-10 w-10'
            />
          </div>
        </div>

        {activeProfile && (
          <div>
            {/* Fix this button its ugly */}
            <button onClick={signOut} className='text-white hover:text-red-700 border rounded-lg p-1'>Signout</button>
          </div>)
        }
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
