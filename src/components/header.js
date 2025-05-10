import React from 'react';


function Header() {
    const logoUrl = new URL('../assets/logo.png', import.meta.url).href;

    return (
        <header>
            <nav>
                <ul>
                    <li><img src={logoUrl} alt="logo" className="logo" /></li>
                    <li className="site-title">Travel Doc</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;