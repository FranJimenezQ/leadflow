// Import the Navbar.css file
import  './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
function Navbar() {
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <span className="navbar-brand">LeadFlow CRM</span>
                <div className="navbar-links">
                    <Link
                    to="/pipeline"
                    className={`navbar-link ${location.pathname === '/pipeline' ? 'active' : ''}`}
                    >Pipeline</Link>
                    <Link
                    to="/leads"
                    className={`navbar-link ${location.pathname === '/leads' ? 'active' : ''}`}
                    >Leads</Link>
                    <Link
                    to="/dashboard"
                className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                    >Dashboard</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar