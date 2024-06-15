import React from 'react';
import Card from './Card';

export default function DashBoard() {
    return (
        <div >
            <div className="font-bold text-xl py-3 text-white">
            <h2>Find Recipe</h2>
            </div>
            <div id="search">
                <input type="search" 
                className=' px-3 py-1 w-full'
                placeholder='Reciepe Keyword'
                />
            </div>
            <div className="flex flex-wrap">
                <Card />
                <Card />
                
            </div>
        </div>
    );
}
