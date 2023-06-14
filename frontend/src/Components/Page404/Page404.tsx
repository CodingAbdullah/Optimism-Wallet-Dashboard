import { FC } from 'react';
import { useNavigate } from 'react-router';

const Page404: FC = () => {
    const navigate = useNavigate(); // Using react-router

    return (
        <div className='container' style={{ textAlign: 'center' }}>
            <main role="main">
                <h1 style={{ marginTop: '1rem' }}>Page Not Found</h1>
                <div>
                    <button style={{ marginTop: '1.5rem' }} className="btn btn-success" onClick={() => navigate("/")}>Go Home</button>
                </div>
            </main>
        </div>
    )
}

export default Page404;