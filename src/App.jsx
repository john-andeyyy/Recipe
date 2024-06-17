import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TitleNav from './Components/TitleNav';
import LandingPage from './Components/Pages/LandingPage';
import DashBoard from './Components/RecipeDashboard/DashBoard';
import RecipeSingleView from './Components/RecipeDashboard/RecipeSingleView';
import SearchRecipe from './Components/RecipeDashboard/SearchRecipe';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import SearchLetter from './Components/RecipeDashboard/SearchLetter';
import SearchIngredient from './Components/RecipeDashboard/SearchIngredient';

function App() {
  return (
    <div>
      <Router>
        <TitleNav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Dashboard" element={<DashBoard />} />
          <Route path="/RecipeSingleView" element={<RecipeSingleView />} />
          <Route path="/SearchRecipe" element={<SearchRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/SearchLetter" element={<SearchLetter/>} />
          <Route path="/SearchIngredient" element={<SearchIngredient/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
