import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SideBar() {
    const closeDrawer = () => {
        document.getElementById('my-drawer').checked = false;
    };

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!localStorage.getItem('idToken'));

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('idToken');
            setIsUserLoggedIn(!!token);
        }, 1000); 

    }, []);

    return (
        <div className="text-white">
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="btn-primary drawer-button text-normal cursor-pointer">
                        <span className="material-symbols-outlined px-2 text-white text-4xl">
                            menu
                        </span>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="p-4 w-60 min-h-full bg-base-200 text-base-content space-y-5">
                        <div id="title" className='py-3 text-center font-semibold'>
                            <h1>
                                Recipe web app
                            </h1>
                        </div>

                        <li className="flex items-center">
                            <Link to="/" onClick={closeDrawer}>Home</Link>
                        </li>
                        {!isUserLoggedIn ? (
                            <>
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
        </div>
    );
}
