// App.jsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import WebsiteLayout from "./pages/WebsiteLayout";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

import { ParallaxProvider } from "react-scroll-parallax"; //A component that ensures certain routes are only accessible to logged-in users.

import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Memberships from "./pages/Memberships";
import ScrollToAnchor from "./pages/ScrollToAnchor";
import DashboardLayout from "./pages/DashboardLayout";
import MatchList from "./components/dashboard/match-list/MatchList";
import FavouriteTeams from "./components/dashboard/favourite-teams/FavouriteTeams";
import FavouritePlayers from "./components/dashboard/favourite-players/FavouritePlayers";
import FavouriteLeageus from "./components/dashboard/favourite-leagues/FavouriteLeagues";
import FavouriteWatchList from "./components/dashboard/favourite-watchlist/FavouriteWatchList";
import PlayerStats from "./components/dashboard/player-stats/PlayerStats";
import Diary from "./components/dashboard/diary/Diary";
import AcasTip from "./components/dashboard/acas-tip/AcasTip";
import BetBuilderTip from "./components/dashboard/bet-builder-tip/BetBuilderTip";
import UserProfile from "./components/dashboard/user-profile/UserProfile";
import ChangePlan from "./components/dashboard/user-profile/ChangePlan";
import PanelBoard from "./components/dashboard/panel-board/PanelBoard";
import HalfTime from "./components/dashboard/half-time/HalfTime";
import Corners from "./components/dashboard/corners/Corners";
import HomePlayerStats from "./components/dashboard/home-player-stats/HomePlayerStats";
import AwayPlayerStats from "./components/dashboard/away-player-stats/AwayPlayerStats";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext"; //It keeps track of whether a user is logged in and shares this information with all the parts of your app 

import Verify from "./pages/Verify";
import ScrollToTop from "./components/website/scrollToTop/ScrollToTop";
import Calculator from "./components/website/calculator/Calculator";
import CalculatorV1 from "./components/website/calculator-v1/CalculatorV1";
import PoissonCalculator from "./components/website/PoissonCalculator";
import KellyCalculator from "./components/website/KellyCalculator";
import CombinedCalculator from "./components/website/CombinedCalculator"

import GameStatistics from "./components/dashboard/game-statistics/GameStatistics"; 
import OddsVisualizer from "./components/dashboard/odds/OddsData";
import Odds from "./components/dashboard/odds/Odds";
import PredictionsSection from "./components/dashboard/predictions-section/PredictionsSection";
import GameStrategies from "./components/dashboard/game-strategies/GameStrategies";
import BettingCalculator from "./components/website/BettingCalculator";
import SportsBettingCalculator from "./components/website/SportsTradingBettingCalculator";
import ProbabilityCalculator from "./components/website/ProbabilityCalculator";
import CalculatorV2 from "./components/website/CalculatorV2";
import GreenBookCalculator from "./components/website/GreenBookCalculator";

function App() {
  return (
    <BrowserRouter>
      <ParallaxProvider>
        <AuthProvider>
          <ScrollToAnchor />
          <ScrollToTop />
          <ToastContainer autoClose={3000} bodyClassName="font-poppins" />
          <Routes>
            <Route element={<WebsiteLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/memberships" element={<Memberships />} />
              {/* <Route path="/calculator" element={<Calculator />} /> */}
              <Route path="/calculator" element={<CalculatorV1 />} />
              
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/odds" element={<OddsVisualizer/>} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="match-list" />} />
              <Route path="match-list" element={<MatchList />} />
              <Route path="favourite-teams" element={<FavouriteTeams />} />
              <Route path="game-statistics" element={<GameStatistics/>} />
              <Route path="favourite-players" element={<FavouritePlayers />} />
              <Route path="favourite-leagues" element={<FavouriteLeageus />} />
              <Route
                path="favourite-watchlist"
                element={<FavouriteWatchList />}
              />
              <Route path="predictions-section" element={<PredictionsSection/>} />
              <Route path="calculator" element={<CalculatorV1 />} />
              {/* New Routes */}
              <Route path="combined-calculator" element={<CombinedCalculator />} />
              <Route path="betting-calculator" element={<BettingCalculator />} />
              <Route path="sports-trading-betting-calculator" element={<SportsBettingCalculator />} />
              <Route path="probability-calculator" element={<ProbabilityCalculator/>} />
              <Route path="calculator-v2" element={<CalculatorV2/>} />
              <Route path="green-calculator" element={<GreenBookCalculator/>} />
              
              <Route path="game-strategies" element={<GameStrategies/>} />
              {/* <Route
                path="player-stats/:Country?/:ls?/:tid?"
                element={<PlayerStats />}
              /> */}
              <Route path="player-stats" element={<PlayerStats />} />
              <Route path="diary" element={<Diary />} />
              <Route path="acas-tip" element={<AcasTip />} />
              <Route path="bet-builder-tip" element={<BetBuilderTip />} />
              <Route path="user-profile" element={<UserProfile />} />
              <Route path="change-plan" element={<ChangePlan />} />
              <Route path="panel-board" element={<PanelBoard />} />
              <Route path="odds" element={<Odds />} />
              <Route path="half-time" element={<HalfTime />} />
              <Route path="corners" element={<Corners />} />
              <Route path="home-player-stats" element={<HomePlayerStats />} />
              <Route path="away-player-stats" element={<AwayPlayerStats />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ParallaxProvider>
    </BrowserRouter>
  );
}

export default App;
