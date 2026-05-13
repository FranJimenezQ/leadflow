import './LeadModal.css';
import LeadForm from './LeadForm';

function LeadModal({isOpen, initialData, onSubmit, onClose}) {
    if(!isOpen){return null}
    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        {initialData ? 'Edit Lead' : 'Add Lead'}
                    </h2>
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className='modal-body'>
                    <div className='lead-modal-content'>
                        <LeadForm onSubmit={onSubmit} onCancel={onClose} initialData={initialData}/>
                    </div>
                </div>
            </div>
            
        </div>

    )
}

export default LeadModal