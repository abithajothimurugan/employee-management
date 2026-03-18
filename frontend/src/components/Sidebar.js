import React from 'react'

const Sidebar = () => {
    return (
        <>
            <aside>
                <div className='logo'><h2>RS-TECH</h2></div>
                <nav>
                    <ul className='nav-links'>
                        <li> <i className="fa-solid fa-house"></i> Dashboard</li>
                        <li className="active"><i className="fa-solid fa-users"></i> Employee</li>
                        <li><i className="fa-solid fa-calendar"></i> Calendar</li>
                        <li><i className="fa-solid fa-message"></i> Messages</li>
                    </ul>
                </nav>
            </aside>
            
        </>
    )
}

export default Sidebar
