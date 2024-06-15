import React from 'react';

export default function Card() {
    return (
        <div className="relative flex w-80 flex-col rounded-xl bg-gray-400 bg-clip-border text-gray-700 shadow-md m-4">
            <div
                className=" mx-4 mt-6 h-40 overflow-hidden bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"

            ></div>
            <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Title
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.
                </p>
            </div>
            <div className="p-6 pt-0">

            </div>
        </div>
    );
}
