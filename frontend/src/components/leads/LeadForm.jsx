import './LeadForm.css';

const STATUSES = [
    { label: 'New', value: 'new' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Proposal', value: 'proposal' },
    { label: 'Closed', value: 'closed' },
    { label: 'Lost', value: 'lost' }
]

function LeadForm({onSubmit, onCancel, initialData}) {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const leadData = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            status: formData.get('status'),
            notes: formData.get('notes'),
        };
        onSubmit(leadData);
    }

    return (
        <form className='lead-form' onSubmit={handleSubmit}>
            <div className='lead-form-field'>
                <input type="text" name="name" placeholder="Name" defaultValue={initialData?.name || ''} />
            </div>
            <div className='lead-form-field'>
                <input type="email" name="email" placeholder="Email" defaultValue={initialData?.email} />
            </div>
            <div className='lead-form-field'>
                <input type="text" name="company" placeholder="Company" defaultValue={initialData?.company} />
            </div>
            <div className='lead-form-field'>
                <select name="status" defaultValue={initialData?.status}>
                    {STATUSES.map((status) => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                </select>
            </div>
            <div className='lead-form-field'>
                <textarea name="notes" placeholder="Notes" defaultValue={initialData?.notes} />
            </div>
            <div className='lead-form-actions'>
                <button className='btn-submit' type="submit">
                    {initialData ? 'Update Lead' : 'Create Lead'}
                </button>
                <button className='btn-cancel' type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default LeadForm