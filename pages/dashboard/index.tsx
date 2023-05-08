import React, { useEffect, useState } from 'react';
import Navbar from "@/components/dashboard/navbar/Navbar";
import Footer from '@/components/footer/Footer';
import ProfileModal from '@/components/dashboard/navbar/profile/ProfileModal';
import Table from '@/components/dashboard/table/Table';

const Index = () => {
    const [profile, setProfile] = useState(false);
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
                    <Navbar callback={setProfile} />
                </div>
            </header>
            <main className='flex flex-col h-screen justify-between'>
                <div>
                    <div className='flex flex-col items-center justify-center pt-5 bg-slate-200'>
                        <Table />
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    {profile ? <ProfileModal callback={setProfile} /> : null}
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