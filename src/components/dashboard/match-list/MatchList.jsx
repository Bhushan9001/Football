import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { getAllFixtures } from "../../../services/apiFixtures";
import Loader from "../../../ui/Loader";
import { Fragment } from 'react'
import { Button, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FixedSizeList as List } from 'react-window';



function MatchList() {
  const [fixtures, setFixtures] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason]= useState("2024")
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam]= useState({ league: { id: "140", name: "La Liga" } })
  const [isOpen, setIsOpen] = useState(false);




  const [loading, setLoading] = useState(true);

  const leagueNameBodyTemplate = (rowData) => (
    <div className="flex items-center gap-1">
      <img
        className="max-h-[30px] max-w-[30px]"
        src={rowData.league.logo}
        alt=""
      />
      <span className="text-xs">{rowData.league.name}</span>
    </div>
  );

  const analyzeBodyTemplate = (rowData) => {
    
    const urlPrefix = `fixture=${rowData.fixture.id}&home=${rowData.teams.home.id}&away=${rowData.teams.away.id}&season=${rowData.league.season==2024?(rowData.league.season)-1:rowData.league.season}&league=${rowData.league.id}`;

    return (
      <div className="flex gap-1">
        {/* 01) Panel Board */}
        <Link to={`/dashboard/panel-board?${urlPrefix}`}>
          <i className="bi bi-newspaper text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </Link>
        {/* 02 Half Time */}
        <Link to={`/dashboard/half-time?${urlPrefix}`}>
          <i className="bi bi-stopwatch text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </Link>
        {/* 03 Corners */}
        <Link to={`/dashboard/corners?${urlPrefix}`}>
          <i className="bi bi-flag text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </Link>
        {/* 04 Home Team Stats */}
        <Link to={`/dashboard/home-player-stats?${urlPrefix}`}>
          <i className="bi bi-person-badge-fill text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </Link>
        {/* 05 Away Team Stats */}

        <Link to={`/dashboard/away-player-stats?${urlPrefix}`}>
          <i className="bi bi-person-badge-fill text-base text-dbPrimary transition hover:text-dbSecondary"></i>
        </Link>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllFixtures(selectedTeam.league.id, selectedSeason);
        setFixtures(response.data.response);
        console.log("fixtures", response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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

  if (loading) return <Loader />;

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
    <>
      <h4 className="bg-[#fff3cd] p-4 text-center">
        You are using freemium. To unlock all features visit your
        <Link className="pl-1 text-dbPrimary underline transition hover:text-dbSecondary">
          profile.
        </Link>
      </h4>
      <div className="flex justify-end space-x-4 rounded-md bg-gray-100 p-4 shadow-md">
        <DropDownForSeason />

        <DropDownForTeam />
      </div>
      <DataTable
        value={fixtures}
        stripedRows
        pt={{
          headerRow: "text-white bg-DbRowHeaderGradient",
          column: { headerCell: "px-4" },
        }}
      >
        <Column
          className="px-4 text-xs"
          header="League"
          body={leagueNameBodyTemplate}
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Match Time"
          body={(rowData) =>
            format(parseISO(rowData.fixture.date), "dd MMM HH:mm", {
              timeZone: "UTC",
            })
          }
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Home Team"
          body={(rowData) => rowData.teams.home.name}
        ></Column>
        <Column
          className="px-4 text-xs"
          header="Away Team"
          body={(rowData) => rowData.teams.away.name}
        ></Column>
        <Column
          className="px-4 text-xs"
          field="awayTeam"
          header="Analyze"
          body={analyzeBodyTemplate}
        ></Column>
      </DataTable>
    </>
  );
}

export default MatchList;
