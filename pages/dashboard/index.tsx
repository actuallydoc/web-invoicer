import React, { useEffect, useState } from 'react';
import Navbar from "@/components/dashboard/navbar/Navbar";
import Footer from '@/components/footer/Footer';
import ProfileModal from '@/components/dashboard/navbar/profile/ProfileModal';
import Table from '@/components/dashboard/table/Table';
import {User, Customer, Invoice,Provider,Service} from "../dashboard/types"
import { HiPlus } from "react-icons/hi";

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

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [services, setServices] = useState<Service[]>([]);

    const [profile, setProfile] = useState(false);
    const [invoice, setInvoice] = useState(true);
    const [customer, setCustomer] = useState(false);
    const [provider, setProvider] = useState(false);
    const [service, setService] = useState(false);
    if (profile) {
        console.log("#Profile is true");
    }
    useEffect(() => {
        //!Todo - Check if user is logged in
        //!Todo - Check for user data and fetch into a table
    }, []);
    return (
        <div>
            <header>
                <title>Nadzorna plošča</title>
                <div className="flex">
                    <Navbar profilecallback={setProfile} invoiceCallback={setInvoice} customerCallback={setCustomer} providerCallback={setProvider} serviceCallback={setService}/>
                </div>
            </header>
            <main className='flex flex-col h-screen justify-between bg-slate-200'>
                <div className=''>
                    {/* Fix the Width of the bg-slate-200 its basically too wide */}
                    <div className='flex flex-col items-center justify-center pt-5'>
                        <Table invoiceState={invoice} customerState={customer} providerState={provider} serviceState={service}/>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    {profile ? <ProfileModal callback={setProfile} /> : null}
                    {/* Make something here for the button make it so u can have options to create services, customers , invoices, providers */}
                    <HiPlus
            className='rounded-full h-14 w-14 fixed bottom-3 right-14 bg-green-400 cursor-pointer hover:animate-bounce duration-150'
          />
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