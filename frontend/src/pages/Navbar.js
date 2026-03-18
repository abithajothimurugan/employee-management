import React from 'react'
import admin from '../asset/image/admin.jpg'

const Navbar = () => {
    return (
        <>
            <header>
                <div className="navbar">
                    <i className="fa-solid fa-gear"></i>
                    <i className="fa-regular fa-bell"></i>
                    <img src={admin} alt="Admin" />
                </div>
            </header>
        </>
    )
}

export default Navbar