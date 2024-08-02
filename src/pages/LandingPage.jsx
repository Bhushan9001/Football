import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { getAllFixtures } from "../services/apiFixtures";

function LandingPage() {
  const [loading, setLoading] = useState(true); // Initialize with true to show loading state
  const [matches, setMatches] = useState([]); // Initialize as an empty array
  const [selectedDate, setSelectedDate] = useState(new Date()); // To manage selected date

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
        const response = await getAllFixtures("140", "2024");
        
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
  }, []);

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
     <main className="min-h-screen ">
      <div className="pt-20">
      <div className=" h-screen flex justify-center items-center ">
        <h1>Match Calendar</h1>
        <Calendar 
        
        tileContent={tileContent}
        className="border rounded-lg shadow-lg w-full max-w-4xl mx-auto bg-white"
      />
      </div>
      </div>
    </main>
  );
}

export default LandingPage;
