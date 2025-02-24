import { useEffect, useState, Fragment } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { getAllFixtures } from "../services/apiFixtures";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FixedSizeList as List } from 'react-window';
import axios from "axios";
import './LandingPage.css';

function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("2024");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({ league: { id: "140", name: "La Liga" } });
  const [isOpen, setIsOpen] = useState(false);

  const matchOnDate = (date) => {
    return matches.find(match =>
      match.date.getDate() === date.getDate() &&
      match.date.getMonth() === date.getMonth() &&
      match.date.getFullYear() === date.getFullYear()
    );
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const match = matchOnDate(date);
      if (match) {
        return (
          <div className="lp-match-tile p-1 bg-indigo-600 text-white text-xs rounded">
            {match.match}
          </div>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllFixtures(selectedTeam.league.id, selectedSeason);
        console.log("fixtures", response.data);
        setMatches(response.data.response.map((data) => ({
          date: new Date(data.fixture.date),
          match: `${data.teams.home.name} vs ${data.teams.away.name}`
        })));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedTeam, selectedSeason]);

  useEffect(() => {

    const token =localStorage.getItem("token")
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NWIxODMzMGY3NjI4OGM2M2FkNGE2ZWUiLCJpYXQiOjE3MDY0NTg1ODkzODR9.69Zt6CPDWgcRR4CW5zzXqst8DcFbQwoN_Md4BgQWVvk";

    fetch('https://apis.sports-trading-ai-predictions.com/league-seasons', {
      headers: { 'Authorization': `${token}` }
    })
      .then(response => response.json())
      .then(data => {
        setSeasons(data.data.response.reverse());
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

    axios.get('https://apis.sports-trading-ai-predictions.com/leagues', {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setTeams(response.data.data.response);
        console.log("response.data.data.response", response.data.data.response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams data:', error);
        setLoading(false);
      });
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const DropDownForTeam = () => {
    const handleSelection = (team) => {
      setSelectedTeam(team);
      setIsOpen(false);
      console.log('Selected team:', team.league);
    };

    const Row = ({ index, style }) => (
      <Menu.Item key={index}>
        {({ active }) => (
          <button
            style={style}
            className={classNames(
              active ? 'bg-indigo-100 text-indigo-900' : 'text-indigo-200',
              'lp-dropdown-item block px-4 py-2 text-sm w-full text-left'
            )}
            onClick={() => handleSelection(teams[index])}
          >
            {teams[index].league.name}
          </button>
        )}
      </Menu.Item>
    );

    return (
      <Menu as="div" className="lp-dropdown relative inline-block text-left">
        <div>
          <Menu.Button
            className="lp-dropdown-button inline-flex w-full justify-center gap-x-1.5 rounded-md bg-indigo-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indigo-500 hover:bg-indigo-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {loading ? 'Loading...' : selectedTeam.league.name}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-indigo-200" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="lp-dropdown-menu absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-indigo-700 rounded-md bg-indigo-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <List
                height={300}
                itemCount={teams.length}
                itemSize={35}
                width="100%"
              >
                {Row}
              </List>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  return (
    <main className="lp-main min-h-screen bg-gray-900">
      <div className="lp-container pt-40 flex flex-col items-center">
        <div className="lp-dropdown-container flex justify-end w-full max-w-4xl">
          <DropDownForTeam />
        </div>
        <div className="lp-calendar-container w-full max-w-4xl mt-4">
          <h1 className="lp-title text-3xl font-bold mb-6 text-center text-indigo-300">Match Calendar</h1>
          <Calendar
            tileContent={tileContent}
            className="lp-calendar border-0 rounded-lg shadow-xl w-full bg-indigo-900 text-indigo-100"
          />
        </div>
      </div>
    </main>
  );
}

export default LandingPage;