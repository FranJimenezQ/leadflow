import { useState } from "react";
import useLeads from "../hooks/useLeads";
import LeadModal from "../components/leads/LeadModal";
import './LeadsPage.css';

const STATUS_LABELS = {
        new: 'New',
        contacted: 'Contacted',
        proposal: 'Proposal',
        closed: 'Closed',
        lost: 'Lost',
    };
    
const STATUS_BADGES = {
    new: { label: 'New', className: 'badge-new' },
    contacted: { label: 'Contacted', className: 'badge-contacted' },
    proposal: { label: 'Proposal', className: 'badge-proposal' },
    closed: { label: 'Closed', className: 'badge-closed' },
    lost: { label: 'Lost', className: 'badge-lost' },
};      

function LeadsPage() {
    const { leads, loading, error, createNewLead, updateLeadById, deleteLeadById } = useLeads();    
    const [isModalOpen, setIsModalOpen ] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const handleOpenCreate = () => {
        setSelectedLead(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setSelectedLead(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async(data) => {
        if (selectedLead) {
            await updateLeadById(selectedLead._id, data);
        } else {
            await createNewLead(data);
        }
        handleClose();
    }

    const getInitials = (name) => {
        const initials = name
            .split(' ')
            .map((name) => name[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
        return initials;
    }

    const formateDate = (dateString) => {
        return  new Date(dateString).toLocaleDateString(
            'en-US',
            { year: 'numeric', month: 'long', day: 'numeric' }             
        )

    }

    const filteredLeads = leads
        .filter(lead =>{
            const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase())
                || lead.company.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter ? lead.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        })

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error || 'Something went wrong'}</p>
    return (
        <div className="leads-page">
            <div className="leads-header">
                <h1 className="leads-title">Leads</h1>
                <div className="leads-actions">
                    <input 
                        type="text" 
                        className="lead-search"
                        placeholder="Search leads"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <select 
                        name="" 
                        id="" 
                        className="lead-filter"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="proposal">Proposal</option>
                        <option value="closed">Closed</option>
                        <option value="lost">Lost</option>
                    </select>
                    <button className="leads-btn create-lead-btn" onClick={handleOpenCreate}>Create Lead</button>
                </div>
            </div>

            <div className="leads-table-wrap">
                <table className="leads-table">
                    <thead>
                        <tr>
                            <th>Name and email</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.length === 0 ? (
                            <tr>
                                <td colSpan="7">No leads found</td>
                            </tr>
                        )
                        : (
                            filteredLeads.map((lead) => (
                                <tr key={lead._id}>
                                    <td>
                                        <div className="lead-info">
                                            <div className="lead-avatar">{getInitials(lead.name)}</div>
                                            <div>
                                                <div className="lead-name">{lead.name}</div>
                                                <div className="lead-email">{lead.email}</div>
                                            </div>

                                        </div>  
                                    </td>
                                    <td>{lead.company}</td>
                                    <td>
                                        <span className={`lead-badge ${STATUS_BADGES[lead.status].className}`}>
                                            {STATUS_BADGES[lead.status].label}
                                        </span>
                                    </td>
                                    <td className="lead-notes-cell">{lead.notes || '-'}</td>
                                    <td className="lead-date">{formateDate(lead.createdAt)}</td>
                                    <td className="lead-date">{formateDate(lead.updatedAt)}</td>
                                    <td>
                                        <div className="lead-actions">
                                            <button className="btn-edit" onClick={() => handleOpenEdit(lead)}>Edit</button>
                                            <button className="btn-delete" onClick={() => deleteLeadById(lead._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>

                <div className="leads-footer">
                    <span>Showing {filteredLeads.length} of {leads.length} leads</span>
                </div>

            </div>

            {isModalOpen && (
                <LeadModal
                    isOpen={isModalOpen}
                    initialData={selectedLead}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

export default LeadsPage;