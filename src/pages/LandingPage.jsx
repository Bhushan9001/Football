import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { getAllFixtures } from "../services/apiFixtures";
import { Button, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { FixedSizeList as List } from 'react-window';
import axios from "axios";

function LandingPage() {
  const [loading, setLoading] = useState(true); // Initialize with true to show loading state
  const [matches, setMatches] = useState([]); // Initialize as an empty array
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason]= useState("2024")
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam]= useState({ league: { id: "140", name: "La Liga" } })
  const [isOpen, setIsOpen] = useState(false);

  // Function to find a match on a specific date
  const matchOnDate = (date) => {
    return matches.find(match =>
      match.date.getDate() === date.getDate() &&
      match.date.getMonth() === date.getMonth() &&
      match.date.getFullYear() === date.getFullYear()
    );
  };

  // Function to render content on calendar tiles
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const match = matchOnDate(date);
      if (match) {
        return (
          <div className="p-1 bg-blue-500 text-white text-xs rounded">
            {match.match}
          </div>
        );
      }
    }
    return null;
  };

  // Fetch fixtures data on component mount
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
        setLoading(false); // Set loading to false after fetching data
      }
    })();
  }, [selectedTeam, selectedSeason]);

  useEffect(() => {
    // Fetch data from the API endpoint
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NWIxODMzMGY3NjI4OGM2M2FkNGE2ZWUiLCJpYXQiOjE3MDY0NTg1ODkzODR9.69Zt6CPDWgcRR4CW5zzXqst8DcFbQwoN_Md4BgQWVvk";

    fetch('https://apis.sports-trading-ai-predictions.com/league-seasons',{
      headers: {
        'Authorization': `${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setSeasons(data.data.response.reverse()); // Reverse the array to show the latest season first
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
        console.log("response.data.data.response",response.data.data.response)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams data:', error);
        setLoading(false);
      });
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  const DropDownForSeason =()=>{
    return (
      <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
           {loading ? 'Loading...' : selectedSeason}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {seasons.map((season, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm w-full text-left'
                    )}
                    onClick={() => {
                      // Handle selection of season here
                      setSelectedSeason(season)
                      console.log('Selected season:', season);
                    }}
                  >
                    {season}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    )
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
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm w-full text-left'
            )}
            onClick={() => handleSelection(teams[index])}
          >
            {teams[index].league.name}
          </button>
        )}
      </Menu.Item>
    );
  
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {loading ? 'Loading...' : selectedTeam.league.name}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
     <main className="min-h-screen ">
     
      <div className="pt-20 flex flex-col">
      <div className="flex justify-center space-x-4 rounded-md bg-gray-100 p-4 shadow-md mt-20">
        <DropDownForSeason />

        <DropDownForTeam />
      </div>
      
        <h1>Match Calendar</h1>
        <Calendar 
        
        tileContent={tileContent}
        className="border rounded-lg shadow-lg w-full max-w-4xl mx-auto bg-white"
      />
      </div>
      
    </main>
  );
}

export default LandingPage;
