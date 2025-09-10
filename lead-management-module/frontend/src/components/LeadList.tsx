import React, { useEffect, useState } from 'react';

const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch('/api/leads');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLeads(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Lead List</h2>
            <ul>
                {leads.map((lead) => (
                    <li key={lead._id} className="border p-2 mb-2">
                        <h3 className="font-semibold">{lead.name}</h3>
                        <p>Email: {lead.email}</p>
                        <p>Phone: {lead.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeadList;