import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import { useEffect, useState } from "react";

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function FavouriteTeams() {
  const [favoriteTeams, setFavoriteTeams] = useState([]);

  useEffect(() => {
    // Get teams from localStorage
    const savedTeams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
    
    // Transform the data to match required format
    const formattedTeams = savedTeams.map(team => ({
      name: team.team.name,
      logo: team.team.logo,
      matchTime: "Upcoming", // You can add actual match time if available in your data
      plays: team.venue?.name ? `Home at ${team.venue.name}` : 'Venue not available',
      id: team.team.id
    }));

    setFavoriteTeams(formattedTeams);
  }, []);

  const unfavourBodyTemplate = (rowData) => (
    <button onClick={() => handleRemoveTeam(rowData.id)}>
      <i className="bi bi-hand-thumbs-down text-lg text-dbPrimary transition hover:text-dbSecondary"></i>
    </button>
  );

  const handleRemoveTeam = (teamId) => {
    // Remove from localStorage
    const savedTeams = JSON.parse(localStorage.getItem('savedTeams') || '[]');
    const updatedTeams = savedTeams.filter(team => team.team.id !== teamId);
    localStorage.setItem('savedTeams', JSON.stringify(updatedTeams));

    // Update state
    const updatedFavoriteTeams = favoriteTeams.filter(team => team.id !== teamId);
    setFavoriteTeams(updatedFavoriteTeams);
  };

  const LogoBodyTemplate = (rowData) => (
    <div className="py-2">
      <img src={rowData.logo} alt={rowData.name} className="max-h-20 mx-auto" />
    </div>
  );

  const detailsBodyTemplate = (rowData) => (
    <Link to={`/dashboard/player-stats?team=${rowData.id}`}>
      <i className="text-dbPrimary hover:text-dbSecondary bi bi-newspaper text-base transition"></i>
    </Link>
  );

  return (
    <>
      <h4 className="text-center font-medium">Favourite Teams</h4>
      {favoriteTeams.length === 0 ? (
        <div className="text-center p-4">
          <p>No favourite teams added yet</p>
        </div>
      ) : (
        <CustomDataTable
          value={favoriteTeams}
          stripedRows
          pt={{
            headerRow: {
              className:
                "text-white bg-DbRowHeaderGradient text-center justify-center",
            },
            column: { headerCell: "px-4 text-center" },
            bodyRow: "text-center",
          }}
        >
          <Column
            className="px-4 text-xs"
            field="name"
            header="Logo"
            body={LogoBodyTemplate}
          ></Column>
          <Column 
            className="px-4 text-xs" 
            field="name" 
            header="Team"
          ></Column>
          <Column
            className="px-4 text-xs"
            header="Unfavour"
            body={unfavourBodyTemplate}
          ></Column>
          <Column
            className="px-4 text-xs"
            field="matchTime"
            header="Next Match Time"
          ></Column>
          <Column 
            className="px-4 text-xs" 
            field="plays" 
            header="Plays"
          ></Column>
          <Column
            className="px-4 text-xs"
            field="plays"
            header="Details"
            body={detailsBodyTemplate}
          ></Column>
        </CustomDataTable>
      )}
    </>
  );
}

export default FavouriteTeams;