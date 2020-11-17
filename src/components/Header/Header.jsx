
import className from '../Header/Header.scss';
import { Link } from 'react-router-dom';

function Header({ logo, title }) {

    const hasLogo = logo ? (
        <img src={logo} alt="logo" className="app-logo" />
    ) : ("");

    return (
        <>
            <header className="site-page-header">
      
                <Link to="/">     
                    {hasLogo}
                </Link>
                
                <div className="app-title">
                    <Link to="/">   
                        <span>{title}</span>
                    </Link>
                </div>


                <div className="profile-container">
                    <div className="profile-name">
                        <span>John Doe</span>
                    </div>

                    <div className="profile-icon">
                        <span className="profile-initials">JD</span>
                    </div>
                    
                </div>
         
            </header>
        </>
    );
}

export default Header;