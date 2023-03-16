import React from 'react';
import { useNavigate } from 'react-router';

const AboutPage: React.FC = () => {
    const navigate = useNavigate();
    
    // Adding About page
    return (
        <div className='about p-3' style={{ textAlign: 'center' }}>
                <main role="main">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2 p-2">About</h1>
                            <hr />
                    </div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-3 border-bottom">
                            <p className="p-1">
                                The Optimism Wallet Dashboard is a lightweight implementation of this 
                                <a href="https://ethwdashboard.xyz" style={{ color: 'black', fontWeight: 'bold' }} target="_blank" rel="noreferrer"> Dashboard</a>. 
                                Features available here include token lookups, wallet analysis, and gas prices.
                            </p>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h4 className="p-2">Credits</h4>
                            <hr />
                    </div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <p className="p-1">
                                The APIs used in this project were free of charge, with some limited restrictions [calls/(second/minute/hour), etc.].
                                A list of these can be found in the footer section of this app.
                            </p>
                            <hr />
                    </div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h4 className="p-2">Author/Developer Information</h4>
                            <hr />
                    </div>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <p className="p-1">
                                If you are interested in learning more about the developer behind this project, you can visit their bio here:
                                <a style={{ color: 'black' }} href="https://kingabdul.eth.xyz/" target="_blank" rel="noreferrer"> <b>About The Developer</b></a>
                            </p>
                    </div>
                    <div>
                        <button className="btn btn-success" style={{ marginTop: '1.5rem' }} onClick={() => navigate("/")}>Go Home</button>
                    </div>
                </main>
        </div>
    )
}

export default AboutPage;