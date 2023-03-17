import { FC } from 'react';

const OpPriceLookupPage: FC = () => {
    return (
        <main role="main" className="ml-sm-auto p-3" style={{ textAlign: 'center' }}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-2 pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Optimism Price Lookup</h1>
            </div>
            <b><p>Link Here to view <a href="https://ethwdashboard.xyz/prices/optimism" target="_blank" rel="noreferrer">Historical Optimism Price</a></p></b>
        </main>
    )
}

export default OpPriceLookupPage;