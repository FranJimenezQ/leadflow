import LeadCard from '../leads/LeadCard';
import './KanbanColumn.css';

const COLUMN_TITLES = {
    new: 'New',
    contacted: 'Contacted',
    proposal: 'Proposal',
    closed: 'Closed',
    lost: 'Lost'
}

function KanbanColumn({status, leads, onEdit, onDelete}) {
    const filteredLeads = leads.filter((lead) => lead.status === status);
    return(
        <div className="kanban-column">
            <div className="kanban-column-header">
                <span className="kanban-column-title">{COLUMN_TITLES[status]}</span>
                <span className="kanban-column-count">{filteredLeads.length}</span>
            </div>

            <div className="kanban-column-body">
                {filteredLeads.length === 0 ? (
                    <span className="kanban-column-empty">No leads in this column</span>
                ) : (
                    filteredLeads.map((lead) => (
                        <LeadCard key={lead._id} lead={lead} onEdit={onEdit} onDelete={onDelete} />
                    ))
                )}
            </div>
        </div>
    )
}

export default KanbanColumn