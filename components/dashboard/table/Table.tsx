import React, { useEffect } from 'react';
import InvoiceTable from './invoice/InvoiceTable';
import ProviderTable from './provider/ProviderTable';
import ServiceTable from './service/ServiceTable';
import CustomerTable from './customer/CustomerTable';
import { Customer, Invoice, Service } from '@/types/database/types';
import { useSession } from 'next-auth/react';
import { Provider } from '@/types/database/types';

//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              providerDataCallback, providerModalState, toggleProviderModal
export default function Table({ providerDataCallback, providerModalState, toggleProviderModal, serviceDataCallback, toggleServiceModal, serviceModalState, customerDataCallback, toggleCustomerModal, customerModalState, customers, services, providers, InvoiceDataCallBack, InvoiceDataState, toggleInvoiceModal, InvoiceModalState, datepickerFromState, datepickerToState, datepickerFrom, datepickerTo, invoiceState, providerState, serviceState, customerState }: { providerDataCallback: React.Dispatch<React.SetStateAction<Provider>>, toggleProviderModal: React.Dispatch<React.SetStateAction<boolean>>, providerModalState: Provider, customerDataCallback: React.Dispatch<React.SetStateAction<Customer>>, toggleCustomerModal: React.Dispatch<React.SetStateAction<boolean>>, customerModalState: Customer, providers: Provider[] | null, customers: Customer[] | null, services: Service[] | null, InvoiceDataCallBack: React.Dispatch<React.SetStateAction<Invoice>>, InvoiceDataState: Invoice | undefined, toggleInvoiceModal: React.Dispatch<React.SetStateAction<boolean>>, InvoiceModalState: boolean, datepickerFromState: string, datepickerToState: string, datepickerFrom: React.Dispatch<React.SetStateAction<string>>, datepickerTo: React.Dispatch<React.SetStateAction<string>>, invoiceState: boolean, providerState: boolean, serviceState: boolean, customerState: boolean, serviceDataCallback: React.Dispatch<React.SetStateAction<Service>>, toggleServiceModal: React.Dispatch<React.SetStateAction<boolean>>, serviceModalState: Service }) {



  if (invoiceState) {
    return (
      <div className=''>
        <InvoiceTable InvoiceDataState={InvoiceDataState} IvoiceDataCallBack={InvoiceDataCallBack} toggleInvoiceModal={toggleInvoiceModal} InvoiceModalState={InvoiceModalState} datepickerToState={datepickerToState} datepickerFromState={datepickerFromState} datepickerFrom={datepickerFrom} datepickerTo={datepickerTo} />
      </div>)
  }
  else if (providerState) {
    return (
      <div>
        <ProviderTable providerDataCallback={providerDataCallback} providerModalState={providerModalState} toggleProviderModal={toggleProviderModal} providers={providers} />
      </div>
    )
  }
  else if (serviceState) {
    return (
      <div>
        <ServiceTable serviceDataCallback={serviceDataCallback} serviceModalState={serviceModalState} toggleServiceModal={toggleServiceModal} services={services} />
      </div>
    )
  }
  else if (customerState) {
    return (
      <div>
        <CustomerTable customerDataCallback={customerDataCallback} customers={customers} toggleCustomerModal={toggleCustomerModal} customerModalState={customerModalState} />
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
