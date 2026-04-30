import { useEffect, useState } from 'react';
import { getLeads, getLeadById, createLead, updateLead, deleteLead } from '../api/leads.api';

const useLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLeads();
    }, []);
    const fetchLeads = async () => {
        try {
            const leads = await getLeads();
            setLeads(leads);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const createNewLead = async (lead) => {
        try {
            const newLead = await createLead(lead);
            setLeads([...leads, newLead]);
        } catch (error) {
            setError(error);
        }
    };

    const updateLeadById = async (id, lead) => {
        try {
            const updatedLead = await updateLead(id, lead);
            setLeads(leads.map((lead) => (lead.id === id ? updatedLead : lead)));
        } catch (error) {
            setError(error);
        }
    };

    const deleteLeadById = async (id) => {
        try {
            await deleteLead(id);
            setLeads(leads.filter((lead) => lead.id !== id));
        } catch (error) {
            setError(error);
        }
    };

    return { leads, loading, error, createNewLead, updateLeadById, deleteLeadById };
};

export default useLeads;