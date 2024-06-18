import { useDispatch, useSelector } from 'react-redux';
import { setName, setAge, setAddress, setBirthday, setSex } from '../Redux/UserInfoSlice';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function LandingPage() {
    const navigate = useNavigate();



    useEffect(() => {
        const idToken = localStorage.getItem('idToken');

        // Check if idToken exists in localStorage
        if (idToken) {


            // Set interval to check expiry
            const interval = setInterval(() => {
                const currentTime = new Date();
                const storedExpiryTime = new Date(localStorage.getItem('expiryTime'));
                // const storedExpiryTime = new Date(10);

                if (currentTime >= storedExpiryTime) {
                    // Clear localStorage items and interval
                    localStorage.removeItem('expiresIn');
                    localStorage.removeItem('idToken');
                    localStorage.removeItem('localId');
                    localStorage.removeItem('expiryTime');
                    clearInterval(interval);

                    // Alert user and navigate to login page
                    alert("Session Expired. Please Login Again");

                    navigate('/');
                }
            }, 1000);

            // Clean up interval on component unmount
            return () => clearInterval(interval);
        } else {
            // navigate('/Dashboard');

        }
    }, []);
   
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    {/* <button className="btn btn-primary"
                        onClick={() => { navigate('/login')}}
                    >Get Started</button> */}
                </div>
            </div>
        </div>
    )
}
