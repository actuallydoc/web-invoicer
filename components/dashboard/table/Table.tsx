import React, { useEffect } from 'react';
import InvoiceTable from './invoice/InvoiceTable';
import ProviderTable from './provider/ProviderTable';
import ServiceTable from './service/ServiceTable';
import CustomerTable from './customer/CustomerTable';



export default function Table({invoiceState, providerState, serviceState, customerState}: { invoiceState: boolean, providerState:boolean, serviceState: boolean, customerState: boolean}) {
  useEffect(() => {
    //!Todo - Check if user is logged in
    //!Todo - Check for user data and fetch into a table
  }, [invoiceState, providerState, serviceState, customerState])

  if (invoiceState) {
    return (
    <div className=''>
      <InvoiceTable/>
    </div>)
      }
  else if (providerState) {
    return (
    <div>
      <ProviderTable/>
    </div>
    )
  }
  else if (serviceState) {
    return (
    <div>
      <ServiceTable/>
    </div>
    )
  }
  else if (customerState) {
    return (
    <div>
      <CustomerTable/>
    </div>
    )

  }
  else {
    return (
      <div>
        <div>Error</div>
      </div>
      
    )
  }
}
