// Adding Sidebar
import SidebarSection from "../SidebarSection/sidebarsection";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
                <SidebarSection />
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" />
                <div className="sidebar-sticky">
                    <table className="table table-striped table-dark">
                        <tbody>
                            <tr>
                                <td><a style={{ color: 'white' }} href="/about">About</a></td>
                            </tr>
                            <tr>
                                <td><a style={{ color: 'white' }} href="/arb-price-lookup">Optimism Price Lookup</a></td>
                            </tr>
                            <tr>
                                <td><a style={{ color: 'white' }} href="/erc721-token-holdings">ERC721 Token Holdings</a></td>
                            </tr>
                            <tr>
                                <td><a style={{ color: 'white' }} href="/erc721-token-lookup">ERC721 Token Lookup</a></td>
                            </tr>
                            <tr>
                                <td><a style={{ color: 'white' }} href="/gas">Gas</a></td>
                            </tr>
                            <tr>
                                <td><a style={{ color: 'white' }} href="/">Home</a></td>
                            </tr>
                            <tr>
                                <td><a style={{ color: 'white' }} href="/wallet-token-analytics-selection">Wallet/Token Analytics</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;