import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!localStorage.getItem('idToken'));
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('idToken');
            setIsUserLoggedIn(!!token);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (isSidebarOpen && !e.target.closest('.sidebar-content')) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isSidebarOpen]);

    const closeDrawer = () => setIsSidebarOpen(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="text-white flex z-30">
            <div className={`flex text-center fixed top-0 left-0 h-full bg-base-200 text-base-content w-60 transition-transform ${isSidebarOpen ? 'transform-none' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-4 space-y-5 sidebar-content">
                    <div id="title" className="py-3 text-center font-semibold">
                        <h1>Recipe web app</h1>
                    </div>
                    <ul className='space-y-5 justify-center'>
                        {!isUserLoggedIn ? (
                            <>
                                <li className="flex items-center">
                                    <Link to="/" onClick={closeDrawer}>Home</Link>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/login" onClick={closeDrawer}>Login</Link>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/Signup" onClick={closeDrawer}>Signup</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-center">
                                    <Link to="/DashBoard" onClick={closeDrawer}>DashBoard</Link>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/SearchRecipe" onClick={closeDrawer}>Search Recipe</Link>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/SearchLetter" onClick={closeDrawer}>By Letter</Link>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/SearchIngredient" onClick={closeDrawer}>By Ingredients</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>


            <div className="md:hidden p-4">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="btn-primary text-normal cursor-pointer">
                    <span className="material-symbols-outlined text-white text-4xl">
                        {isSidebarOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

        </div>
    );
}
