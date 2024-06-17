import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TitleNav from './Components/TitleNav';
import LandingPage from './Components/Pages/LandingPage';
import DashBoard from './Components/RecipeDashboard/DashBoard';
import RecipeSingleView from './Components/RecipeDashboard/RecipeSingleView';
import SearchRecipe from './Components/RecipeDashboard/SearchRecipe';
import Login from './Components/Pages/Login';
import React, { useState } from 'react';

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login') === 'true');

  const login = () => {
    localStorage.setItem('login', 'true');
    setIsLoggedIn(true);
    
  };

  const logout = () => {
    localStorage.removeItem('login');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div className="flex justify-evenly">

        <button onClick={() => { login() }}>login</button>
        <button onClick={() => { logout() }}>logout</button>
      </div>
      <Router>
        {isLoggedIn && <TitleNav logout={logout} />} {/* Render TitleNav only if isLoggedIn is true */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={isLoggedIn ? <DashBoard /> : <Navigate to="/login" />} />
          <Route path="/RecipeSingleView" element={<RecipeSingleView />} />
          <Route path="/SearchRecipe" element={<SearchRecipe />} />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
