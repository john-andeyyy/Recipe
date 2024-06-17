import React from 'react';
import SideBar from './SideBar';

export default function TitleNav() {
    return (
        <div className='sticky top-0 z-20'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <SideBar />
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
                            {/* Button content */}
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Favorites
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div>
                <div
                    style={{  height: '64px' }}  // Define the height of the navbar
                    className=" w-full flex justify-between items-center px-10 py-2 text-xl z-10 bg-neutral"
                >
                    <SideBar />

                    <button>
                        <div>
                            <span className="material-symbols-outlined text-4xl">
                                account_circle
                            </span>
                        </div>
                    </button>
                </div>
            </div> */}
        </div>
    );
}
