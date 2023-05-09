import React, { useEffect, useRef, useState } from 'react';
import Navbar from "@/components/dashboard/navbar/Navbar";
import Footer from '@/components/footer/Footer';
import ProfileModal from '@/components/dashboard/navbar/profile/ProfileModal';
import Table from '@/components/dashboard/table/Table';
import { User, Customer, Invoice, Provider, Service } from "../dashboard/types"
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import InvoiceModal from '@/components/dashboard/invoiceModal/InvoiceModal';
import { Tooltip } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InvoiceCreateModal from '@/components/dashboard/invoiceModal/InvoiceCreateModal';
import PersonIcon from '@mui/icons-material/Person';
const Index = () => {


    //TODO - Fetch user data from database and set it to user state also for the other tables
    const [user, setUser] = useState<User>({
        address: "",
        city: "",
        country: "",
        email: "",
        customers: [],
        invoices: [],
        providers: [],
        services: [],
        name: '',
        phone: "",
        postalCode: "",
    });
    const containerRef = useRef<HTMLDivElement>(null);
    //Data for the tables will fetch from the database through api and react-query
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
    //Button state and navbar state
    const [showButtons, setShowButtons] = useState(false);
    const [profile, setProfile] = useState(false);
    const [invoice, setInvoice] = useState(true);
    const [customer, setCustomer] = useState(false);
    const [provider, setProvider] = useState(false);
    const [service, setService] = useState(false);
    //Edit for invoice
    const [invoiceEdit, setInvoiceEdit] = useState(false);
    //Temp data for the invoice
    const [invoiceTemp, setInvoiceTemp] = useState<Invoice>({} as Invoice);
    //Edit for customer
    const [customerEdit, setCustomerEdit] = useState(false);
    //Temp data for the customer
 
    
    if (profile) {
        console.log("#Profile is true");
    }
    useEffect(() => {
        //!Todo - Check if user is logged in
        //!Todo - Check for user data and fetch into a table
    }, []);
    const handleEditFab = () => {
        console.log("Edit button clicked");
    };
    //This is for Adding a new invoice
    const handleAddFab = () => {
        console.log("Add button clicked");
        setInvoiceCreateModal(true);
    };
    //This is for Editing an invoice
    const handleOpenFab = () => {
        console.log("Add button clicked");
        // setInvoiceModal(true);
        setShowButtons(!showButtons);
    };
    return (
        <div>
            <header>
                <title>Nadzorna plošča</title>
                <div className="flex">
                    <Navbar profilecallback={setProfile} invoiceCallback={setInvoice} customerCallback={setCustomer} providerCallback={setProvider} serviceCallback={setService} />
                </div>
            </header>
            <main className='flex flex-col h-screen justify-between bg-slate-200'>
                <div className=''>
                    {/* Fix the Width of the bg-slate-200 its basically too wide */}
                    <div className='flex flex-col items-center justify-center pt-5'>
                        <Table InvoiceDataCallBack={setInvoiceTemp} InvoiceDataState={invoiceTemp} toggleInvoiceModal={setInvoiceModal} InvoiceModalState={invoiceModal}  datepickerFromState={dateFrom} datepickerToState={dateTo} datepickerFrom={setDateFrom} datepickerTo={setDateTo} invoiceState={invoice} customerState={customer} providerState={provider} serviceState={service} />
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    {invoiceModal ? (
                        <div>
                         <InvoiceModal InvoiceModalData={invoiceTemp} isModalOpen={invoiceModal} toggleModal={setInvoiceModal} />   
                        </div>
                    )  : null}
                    {invoiceCreateModal ? <InvoiceCreateModal isModalOpen={invoiceCreateModal} toggleModal={setInvoiceCreateModal} /> : null}
                    {profile ? <ProfileModal callback={setProfile} /> : null}
                    {/* Make something here for the button make it so u can have options to create services, customers , invoices, providers */}
                    <div className='flex space-x-5 fixed bottom-3 right-14'>
                        <div>
                            <div
                                className={`absolute pb-3 right-0 flex flex-col space-y-2 ${showButtons ? "visible" : "invisible"
                                    } transition-transform duration-300 transform ${showButtons ? "-translate-y-full" : "translate-y-0"
                                    }`}
                            >
                                {/* <div>
                                    <Tooltip title="Create">
                                        <Fab onClick={handleAddFab} className="bg-green-800" color="primary" aria-label="option 1">
                                            <AddIcon />
                                        </Fab>
                                    </Tooltip>
                                </div> */}
                                <div>
                                    <Tooltip title="Create Invoice" placement="left" >
                                        <Fab onClick={handleEditFab} className="bg-red-500" color="primary" aria-label="option 2">
                                            <ReceiptIcon />
                                        </Fab>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip title="Create Company" placement="left">
                                        <Fab onClick={handleEditFab} className="bg-slate-500" color="primary" aria-label="option 2">
                                            <ApartmentIcon />
                                        </Fab>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip title="Create Customer" placement="left">
                                        <Fab onClick={handleEditFab} className="bg-slate-800" color="primary" aria-label="option 2">
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
};

export default Index;