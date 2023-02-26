import React from 'react';

const SidebarSection = () => {

    return (
        <div className='sidebar-section bg-dark'>
            <p style={{ display: 'inline', color: 'white' }}>OP Price: </p><br />
            <p style={{ display: 'inline', color: 'white' }}>24-Hr % Chg: </p>
            <p style={{ color: 'white' }}>Gas Price: </p>
        </div>
    )

}

export default SidebarSection;