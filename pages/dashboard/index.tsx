import React, { useEffect, useRef, useState } from 'react';
import Navbar from "@/components/dashboard/navbar/Navbar";
import Footer from '@/components/footer/Footer';
import Table from '@/components/dashboard/table/Table';
import { User, Customer, Invoice, Provider, Service } from "../../types/database/types"
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InvoiceEditModal from '@/components/dashboard/invoiceModal/InvoiceEditModal';
import { Tooltip } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InvoiceCreateModal from '@/components/dashboard/invoiceModal/InvoiceCreateModal';
import PersonIcon from '@mui/icons-material/Person';
import EditCustomerModal from '@/components/dashboard/customerModal/EditCustomerModal';
import CreateProviderModal from '@/components/dashboard/providerModal/CreateProviderModal';
import CreateCustomerModal from '@/components/dashboard/customerModal/CreateCustomerModal';
import { useSession, getSession, GetSessionParams } from 'next-auth/react';
import supabase from "@/db/client"
import { GetServerSideProps } from 'next';
import { PostgrestError } from '@supabase/supabase-js';
import CreateServiceModal from '@/components/dashboard/serviceModal/CreateServiceModal';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Session } from 'next-auth';
import { set } from 'zod';
import EditServiceModal from '@/components/dashboard/serviceModal/EditServiceModal';
import EditProviderModal from '@/components/dashboard/providerModal/EditProviderModal';
const Index = ({ data, session }: { session: Session, data: string | null | any }) => {

    //!TODO Refetch callback for the table 

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    //Date stuff
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    //Modal stuff
    const [invoiceCreateModal, setInvoiceCreateModal] = useState(false);
    const [invoiceModal, setInvoiceModal] = useState(false);
    const [createProvider, setCreateProvider] = useState(false);
    const [createCustomer, setCreateCustomer] = useState(false);
    const [createService, setCreateService] = useState(false);
    //Button state and navbar state
    const [showButtons, setShowButtons] = useState(false);
    const [profile, setProfile] = useState(false);
    const [invoice, setInvoice] = useState(true);
    const [customer, setCustomer] = useState(false);
    const [provider, setProvider] = useState(false);
    const [service, setService] = useState(false);
    //Edit for invoice
    // const [invoiceEdit, setInvoiceEdit] = useState(false);
    //Temp data for the invoice
    const [invoiceTemp, setInvoiceTemp] = useState<Invoice>({} as Invoice);
    //Edit for customer
    const [customerEdit, setCustomerEdit] = useState(false);
    const [customerTemp, setCustomerTemp] = useState<Customer>({} as Customer);
    const [serviceEdit, setServiceEdit] = useState(false);
    const [serviceTemp, setServiceTemp] = useState<Service>({} as Service);
    const [providerEdit, setProviderEdit] = useState(false);
    const [providerTemp, setProviderTemp] = useState<Provider>({} as Provider);
    //Temp data for the customer
    const handleCreateInvoice = () => {
        console.log("Create invoice button clicked");
        setInvoiceCreateModal(true);
    };
    //This is for Adding a new Customer
    const handleCreateCustomer = () => {
        console.log("Create customer button clicked");
        setCreateCustomer(true);
    };
    //This is for Adding a new invoice
    const handleCreateProvider = () => {
        console.log("Create company button clicked");
        setCreateProvider(true);
    };
    const handleCreateService = () => {
        console.log("Create service button clicked");
        setCreateService(true);
    };
    //This is for Editing an invoice
    const handleOpenFab = () => {
        setShowButtons(!showButtons);
    };
    // const { data: session, status } = useSession({ required: true });
    const [userId, setUserId] = useState(data[0]?.id);
    useEffect(() => {
        setUserId(data[0]?.id);
    }, [userId]);
    const [fetchError, setFetchError] = useState<PostgrestError>();
    useEffect(() => {
        const fetchUserId = async () => {
            if (data) {
                setUserId(data[0]?.id);
                if (userId !== null) {
                    fetchCustomers();
                    fetchProviders();
                    fetchServices();
                }

            };
        };
        const fetchServices = async () => {
            console.log("Fetching services");
            const { data, error } = await supabase.from('services').select('*').eq('user_id', userId);
            if (error) {
                setFetchError(error);
                return;
            }
            if (data !== null) {
                setServices(data as Service[]);
            };
        };
        const fetchCustomers = async () => {
            console.log("Fetching customers");
            const { data, error } = await supabase.from('customers').select('*').eq('user_id', userId);
            if (error) {
                setFetchError(error);
                return;
            }
            if (data !== null) {
                setCustomers(data as Customer[]);
            };
        };

        const fetchProviders = async () => {
            console.log("Fetching providers");
            console.log(userId)
            const { data, error } = await supabase.from('providers').select('*').eq('user_id', userId);
            if (error) {
                setFetchError(error);
                return;
            }
            if (data !== null) {
                setProviders(data as Provider[]);
            };
        };
        if (session) {
            fetchUserId();
        }
    }, []);
    if (!session) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    } else if (session) {
        return (
            <div>
                <header>
                    <title>Nadzorna plošča</title>
                    <div className="flex">
                        <Navbar invoiceCallback={setInvoice} customerCallback={setCustomer} providerCallback={setProvider} serviceCallback={setService} />
                    </div>
                </header>
                <main className='flex flex-col h-screen justify-between bg-slate-200'>
                    <div className=''>
                        {/* Fix the Width of the bg-slate-200 its basically too wide */}
                        <div className='flex flex-col items-center justify-center pt-5'>
                            <Table providerDataCallback={setProviderTemp} providerModalState={providerTemp} toggleProviderModal={setProviderEdit} serviceDataCallback={setServiceTemp} serviceModalState={serviceTemp} toggleServiceModal={setServiceEdit} customerDataCallback={setCustomerTemp} customerModalState={customerTemp} toggleCustomerModal={setCustomerEdit} services={services} customers={customers} providers={providers} InvoiceDataCallBack={setInvoiceTemp} InvoiceDataState={invoiceTemp} toggleInvoiceModal={setInvoiceModal} InvoiceModalState={invoiceModal} datepickerFromState={dateFrom} datepickerToState={dateTo} datepickerFrom={setDateFrom} datepickerTo={setDateTo} invoiceState={invoice} customerState={customer} providerState={provider} serviceState={service} />
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        {invoiceModal ? (
                            <div>
                                <InvoiceEditModal InvoiceModalData={invoiceTemp} isModalOpen={invoiceModal} toggleModal={setInvoiceModal} />
                            </div>
                        ) : null}
                        {customerEdit ? (<div>
                            <EditCustomerModal customerDataCallback={setCustomerTemp} customerModalData={customerTemp} isModalOpen={customerEdit} toggleModal={setCustomerEdit} />
                        </div>) : null}
                        {serviceEdit ? (<div>
                            <EditServiceModal serviceDataCallback={setServiceTemp} serviceModalData={serviceTemp} isModalOpen={serviceEdit} toggleModal={setServiceEdit} />
                        </div>) : null}
                        {providerEdit ? (<div>
                            <EditProviderModal providerDataCallback={setProviderTemp} providerModalState={providerTemp} isModalOpen={providerEdit} toggleModal={setProviderEdit} />
                        </div>) : null}

                        {invoiceCreateModal ? <InvoiceCreateModal isModalOpen={invoiceCreateModal} toggleModal={setInvoiceCreateModal} /> : null}
                        {createProvider ? <CreateProviderModal userId={userId} isModalOpen={createProvider} toggleModal={setCreateProvider} /> : null}
                        {createCustomer ? <CreateCustomerModal userId={userId} isModalOpen={createCustomer} toggleModal={setCreateCustomer} /> : null}
                        {createService ? <CreateServiceModal userId={userId} isModalOpen={createService} toggleModal={setCreateService} /> : null}
                        {/* Make something here for the button make it so u can have options to create services, customers , invoices, providers */}
                        <div className='flex space-x-5 fixed bottom-3 right-14'>
                            <div>
                                <div
                                    className={`absolute pb-3 right-0 flex flex-col space-y-2 ${showButtons ? "visible" : "invisible"
                                        } transition-transform duration-300 transform ${showButtons ? "-translate-y-full" : "translate-y-0"
                                        }`}
                                >
                                    <div>
                                        <Tooltip title="Create Invoice" placement="left" >
                                            <Fab onClick={handleCreateInvoice} className="bg-red-500" color="primary" aria-label="option 2">
                                                <ReceiptIcon />
                                            </Fab>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Create Provider" placement="left">
                                            <Fab onClick={handleCreateProvider} className="bg-slate-500" color="primary" aria-label="option 2">
                                                <ApartmentIcon />
                                            </Fab>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Create Service" placement="left">
                                            <Fab onClick={handleCreateService} className="bg-slate-500" color="primary" aria-label="option 2">
                                                <CleaningServicesIcon />
                                            </Fab>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title="Create Customer" placement="left">
                                            <Fab onClick={handleCreateCustomer} className="bg-slate-800" color="primary" aria-label="option 2">
                                                <PersonIcon />
                                            </Fab>
                                        </Tooltip>
                                    </div>

                                </div>
                                <Fab onClick={handleOpenFab} className={`bg-orange-600 ${showButtons ? "transition rotate-90 duration-150" : "transition  rotate-0 duration-150"
                                    }`} color='primary' aria-label='add'>
                                    <ArrowBackIcon />
                                </Fab>
                            </div>
                        </div>

                    </div>
                    <footer>
                        <div className=''>
                            <Footer />
                        </div>
                    </footer>
                </main>
            </div>

        );
    } else {
        return (
            <div>
                <h1>Something went wrong</h1>
            </div>)
    }
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context: GetSessionParams | undefined) => {
    const session = await getSession(context);
    const { data, error } = await supabase.from('users').select('*').eq('email', session?.user?.email);
    //Maybe fetch the user data here idk
    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        };
    }
    return {
        props: { session, data },
    };
}