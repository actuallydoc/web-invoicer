import React from 'react';
import Navbar from "@/components/dashboard/Navbar";
import Table from "@/components/dashboard/Table";

const Index = () => {
    return (
        <div>
            <header>
                <title>Nadzorna plošča</title>
                <Navbar />
            </header>
            <main>
                <h1>Tabla</h1>
                <Table />
            </main>

        </div>
    );
};

export default Index;