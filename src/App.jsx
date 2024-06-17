import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TitleNav from './Components/TitleNav';
import LandingPage from './Components/Pages/LandingPage';
import DashBoard from './Components/RecipeDashboard/DashBoard';
import RecipeSingleView from './Components/RecipeDashboard/RecipeSingleView';
import SearchRecipe from './Components/RecipeDashboard/SearchRecipe';

function App() {
  return (
    <div>
      <Router>
        <TitleNav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/RecipeSingleView" element={<RecipeSingleView />} />
          <Route path="/SearchRecipe" element={<SearchRecipe/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
