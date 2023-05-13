import React, { useEffect } from 'react';
import InvoiceTable from './invoice/InvoiceTable';
import ProviderTable from './provider/ProviderTable';
import ServiceTable from './service/ServiceTable';
import CustomerTable from './customer/CustomerTable';
import { Customer, Invoice, Service } from '@/types/database/types';
import { useSession } from 'next-auth/react';
import { Provider } from '@/types/database/types';


export default function Table({ customers, services, providers, InvoiceDataCallBack, InvoiceDataState, toggleInvoiceModal, InvoiceModalState, datepickerFromState, datepickerToState, datepickerFrom, datepickerTo, invoiceState, providerState, serviceState, customerState }: { providers: Provider[] | null, customers: Customer[] | null, services: Service[] | null, InvoiceDataCallBack: React.Dispatch<React.SetStateAction<Invoice>>, InvoiceDataState: Invoice | undefined, toggleInvoiceModal: React.Dispatch<React.SetStateAction<boolean>>, InvoiceModalState: boolean, datepickerFromState: string, datepickerToState: string, datepickerFrom: React.Dispatch<React.SetStateAction<string>>, datepickerTo: React.Dispatch<React.SetStateAction<string>>, invoiceState: boolean, providerState: boolean, serviceState: boolean, customerState: boolean }) {



  if (invoiceState) {
    return (
      <div className=''>
        <InvoiceTable InvoiceDataState={InvoiceDataState} IvoiceDataCallBack={InvoiceDataCallBack} toggleInvoiceModal={toggleInvoiceModal} InvoiceModalState={InvoiceModalState} datepickerToState={datepickerToState} datepickerFromState={datepickerFromState} datepickerFrom={datepickerFrom} datepickerTo={datepickerTo} />
      </div>)
  }
  else if (providerState) {
    return (
      <div>
        <ProviderTable providers={providers} />
      </div>
    )
  }
  else if (serviceState) {
    return (
      <div>
        <ServiceTable services={services} />
      </div>
    )
  }
  else if (customerState) {
    return (
      <div>
        <CustomerTable customers={customers} />
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
