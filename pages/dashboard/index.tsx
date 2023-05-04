import React, { useState } from 'react';
import Navbar from "@/components/dashboard/navbar/Navbar";
import Footer from '@/components/footer/Footer';
import ProfileModal from '@/components/dashboard/navbar/profile/ProfileModal';

const Index = () => {
    const [profile, setProfile] = useState(false);
    if(profile) {
        console.log("#Profile is true");
    }
    return (
        <div>
            <header>
                <title>Nadzorna plošča</title>
                <div className="flex">
                   <Navbar callback={setProfile}/> 
                </div>
            </header>
            <main className='flex flex-col h-screen justify-between'>
                <div>
                <div className='flex'>
                    {profile ? <ProfileModal callback={setProfile} />: null}
                </div>
                
                </div>

                <footer>
    <div className=''>
        <Footer/>
    </div>

        </footer>
            </main>
        </div>
        
    );
};

export default Index;