import React from 'react';
import LeadForm from '../components/LeadForm';
import LeadList from '../components/LeadList';

const Home: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lead Management</h1>
            <LeadForm />
            <LeadList />
        </div>
    );
};

export default Home;