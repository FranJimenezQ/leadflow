const BASE_URL = 'http://localhost:3000/api/leads';

// Get all leads
export const getLeads = async () => {
    const response = await fetch(BASE_URL);
    const leads = await response.json();
    return leads;
};


//GET lead by id
export const getLeadById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    const lead = await response.json();
    return lead;
};


// Post create lead
export const createLead = async (lead) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lead)
    });
    const newLead = await response.json();
    return newLead;
};


//Put update lead
export const updateLead = async (id, lead) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lead)
    });
    const updatedLead = await response.json();
    return updatedLead;
};

//DELETE delete lead
export const deleteLead = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    const deletedLead = await response.json();
    return deletedLead;
};