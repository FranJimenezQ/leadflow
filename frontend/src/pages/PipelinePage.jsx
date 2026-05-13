import { useState } from 'react'
import useLeads from '../hooks/useLeads'
import KanbanColumn from '../components/pipeline/KanbanColumn'
import LeadModal from '../components/leads/LeadModal'
import './PipelinePage.css'
import { deleteLead, updateLead } from '../api/leads.api';

const STATUSES = ['new', 'contacted', 'proposal', 'closed', 'lost']
function PipelinePage () {

    const { leads, loading, error, createNewLead, updateLeadById, deleteLeadById } = useLeads();
    const [isModalOpen, setIsModalOpen ] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

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

    if (loading) { return <div className='pipeline-loading'>Loading...</div>}
    if (error) { return <div className='pipeline-error'>Error: {error.message || 'Something went wrong'}</div>}
    return (
        <div className='pipeline-page'>
            <div className="pipeline-header">
                <h1 className='pipeline-title'>Pipeline</h1>
                <div className='new-lead-button'>
                    <button className='new-lead-button' onClick={handleOpenCreate}>+ New Lead</button>
                </div>
            </div>
            <div className="pipeline-kanban">
                {STATUSES.map((status) => (
                    <KanbanColumn key={status} status={status} leads={leads} onEdit={handleOpenEdit} onDelete={deleteLeadById} />
                ))}
            </div>
            <LeadModal isOpen={isModalOpen} initialData={selectedLead} onSubmit={handleSubmit} onClose={handleClose} />
        </div>
    )
}

export default PipelinePage