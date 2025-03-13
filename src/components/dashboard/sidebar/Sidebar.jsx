import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ setMinimizeSidebar }) {
  const [toggleLinksVisibility, setToggleLinksVisibility] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryString = queryParams.toString();

  useEffect(() => {
    const urlParts = location.pathname.split("/");
    const hasSpecialStrings = [
      "panel-board",
      "corners",
      "half-time",
      "home-player-stats",
      "away-player-stats",
    ].some((specialString) => urlParts.includes(specialString));

    setToggleLinksVisibility(hasSpecialStrings);
  }, [location.pathname]);

  return (
    <nav className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent py-16 pl-4">
      <ul className="pr-4">
        {/* Rest of your navigation links remain the same */}
        <li>
          <NavLink
            onClick={setMinimizeSidebar}
            to="match-list"
            className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
          >
            Match List
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={setMinimizeSidebar}
            to="Predictions-section"
            className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
          >
            Predictions
          </NavLink>
        </li>
        <li className="relative group">
          <button
            className="inline-flex items-center justify-between w-full py-3 text-sm text-[#808080] transition hover:text-white"
          >
            Calculators
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <ul className="absolute left-0 hidden pt-2 space-y-2 bg-gray-600 group-hover:block">
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="combined-calculator"
                className="block px-4 py-2 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Betting Calculators
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="poisson-calculator"
                className="block px-4 py-2 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Poisson Calculator
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="kelly-calculator"
                className="block px-4 py-2 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Kelly Calculator
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="betting-calculator"
                className="block px-4 py-2 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Betting Correct Score Calculator
              </NavLink>
            </li> */}
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="sports-trading-betting-calculator"
                className="block px-4 py-2 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Sports Trading Betting Calculator
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="probability-calculator"
                className="block px-4 py-2 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Calculate Probability
              </NavLink>
            </li> */}
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="calculator-v2"
                className="block px-4 py-2 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Probability Calculator
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="green-calculator"
                className="block px-4 py-2 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Betting odds Calculator
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            onClick={setMinimizeSidebar}
            to="game-strategies"
            className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
          >
            Game Strategies
          </NavLink>
        </li>

        {toggleLinksVisibility ? (
          <>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to={`panel-board?${queryString}`}
                className="inline-flex items-center gap-2 py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                <span>Panel</span>
                <i className="bi bi-newspaper"></i>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to={`half-time?${queryString}`}
                className="inline-flex items-center gap-2 py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                <span>Half Time</span>
                <i className="bi bi-stopwatch"></i>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to={`corners?${queryString}`}
                className="inline-flex items-center gap-2 py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                <span>Corners</span>
                <i className="bi bi-flag"></i>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to={`home-player-stats?${queryString}`}
                className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Home Player Statistics
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to={`away-player-stats?${queryString}`}
                className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Away Player Statistics
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="favourite-teams"
                className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Favourite Teams
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="favourite-players"
                className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Favourite Players
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="favourite-leagues"
                className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Favourite Leagues
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={setMinimizeSidebar}
                to="favourite-watchlist"
                className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
              >
                Favourite Watchlist
              </NavLink>
            </li>
          </>
        )}

        {!toggleLinksVisibility && (
          <li>
            <NavLink
              onClick={setMinimizeSidebar}
              to="player-stats"
              className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
            >
              Player Statistics
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            onClick={setMinimizeSidebar}
            to="game-statistics"
            className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
          >
            Game Statistics
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={setMinimizeSidebar}
            to="diary"
            className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
          >
            Diary
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={setMinimizeSidebar}
            to="acas-tip"
            className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
          >
            Accas Daily Tip
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={setMinimizeSidebar}
            to="bet-builder-tip"
            className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
          >
            Bet Builder Daily Tip
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;