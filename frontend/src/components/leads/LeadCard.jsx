import './LeadCard.css';

const STATUS_BADGES = {
    new: {label:'New', className: 'badge-new'},
    contacted: {label:'Contacted', className: 'badge-contacted'},
    proposal: {label:'Proposal', className: 'badge-proposal'},
    closed: {label:'Closed', className: 'badge-closed'},
    lost: {label:'Lost', className: 'badge-lost'}
}

function LeadCard({lead, onEdit, onDelete}) {
    const badge = STATUS_BADGES[lead.status];
    const initials = lead.name
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
        return(
            <div className="lead-card">
                <div className="lead-card-header">
                    <div className="lead-card-initials">{initials}</div>
                    <span className={`lead-badge ${badge.className}`}>{badge.label}</span>
            </div>
            <div className="lead-card-body">
                <div className="lead-card-name">{lead.name}</div>
                <div className="lead-card-company">{lead.company}</div>
                {lead.notes && <div className="lead-card-notes">{lead.notes}</div>}
            </div>
            <div className="lead-card-footer">
                <button className="lead-card-button" onClick={() => onEdit(lead)}>Edit</button>
                <button className="lead-card-button" onClick={() => onDelete(lead._id)}>Delete</button>
                    <span className={ `lead-badge ${badge.className}`}>{badge.label}</span>
            </div>
            </div>
        )
}

export default LeadCard