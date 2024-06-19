import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TitleNav from './Components/TitleNav';
import LandingPage from './Components/Pages/LandingPage';
import DashBoard from './Components/Pages/DashBoard';
import RecipeSingleView from './Components/Pages/RecipeSingleView';
import SearchRecipe from './Components/Pages/SearchRecipe';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import SearchLetter from './Components/Pages/SearchLetter';
import SearchIngredient from './Components/Pages/SearchIngredient';
import ViewCategory from './Components/Pages/ViewCategory';
import RecipeFavorite from './Components/Pages/RecipeFavorite';
import SideBar from './Components/SideBar';
import { useEffect, useState } from 'react';

function App() {


  const [islogin, setislogin] = useState()

  // const navigate = useNavigate();



  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    // Check if idToken exists in localStorage
    if (idToken) {
      setislogin(true)


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

          setislogin(false)
        }
      }, 1000);

      // Clean up interval on component unmount
      return () => clearInterval(interval);
    } else {
      setislogin(true)
    }
  }, []);
  return (
    <div className="flex">
      <Router>
        <div className="flex-1 md:ml-60">
          <TitleNav />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/RecipeSingleView/:id" element={<RecipeSingleView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />

            <Route path="/Dashboard" element={ <DashBoard /> } />
            <Route path="/SearchRecipe" element={islogin ? <SearchRecipe /> : <Navigate to="/Login" />} />
            <Route path="/SearchLetter" element={islogin ? <SearchLetter /> : <Navigate to="/Login" />} />
            <Route path="/SearchIngredient" element={islogin ? <SearchIngredient /> : <Navigate to="/Login" />} />
            <Route path="/ViewCategory" element={islogin ? <ViewCategory /> : <Navigate to="/Login" />} />
            <Route path="/RecipeFavorite" element={islogin ? <RecipeFavorite /> : <Navigate to="/Login" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
