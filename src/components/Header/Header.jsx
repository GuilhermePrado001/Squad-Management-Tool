
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
         
            </header>
        </>
    );
}

export default Header;