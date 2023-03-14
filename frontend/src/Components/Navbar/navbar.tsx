// Adding Navbar
import React from 'react';

// Adding same navbar used for building the Arbitrum dashboard
const Navbar: React.FC = () => {
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{ color: 'white', fontWeight: 'bold' }}>Optimism Wallet Dashboard</a>
                    <button style={{ backgroundColor: 'white' }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span style={{ color: 'white' }} className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" style={{ color: 'white' }} href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" style={{ color: 'white' }} aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ color: 'white' }} href="/erc20-token-holdings">ERC20 Token Holdings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ color: 'white' }} href="/erc721-token-holdings">ERC721 Token Holdings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ color: 'white' }} href="/gas-tracker">Gas Station</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ color: 'white' }} href="/op-price-lookup">OP Price Lookup</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ color: 'white' }} href="/wallet-analytics">Wallet Analytics</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar;