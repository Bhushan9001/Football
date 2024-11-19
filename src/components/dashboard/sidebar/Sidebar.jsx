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
        <li>
          <NavLink
            onClick={setMinimizeSidebar}
            to="calculator"
            className="inline-block py-3 text-sm text-[#808080] transition hover:text-white aria-[current=page]:text-white"
          >
            Calculators
          </NavLink>
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