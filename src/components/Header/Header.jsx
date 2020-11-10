
import '../Header/Header.css'

function Header({ logo, title }) {

    const hasLogo = logo ? (
        <img src={logo} alt="logo" className="app-logo" />
    ) : ("");

    return (
        <>
            <header className="site-page-header">

                {hasLogo}

                <div className="app-title">
                    <span>{title}</span>
                </div>
            </header>
        </>
    );
}

export default Header;