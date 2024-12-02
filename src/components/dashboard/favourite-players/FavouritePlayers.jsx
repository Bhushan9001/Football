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

function FavouritePlayers() {
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  useEffect(() => {
    // Get players from localStorage
    const savedPlayers = JSON.parse(localStorage.getItem('favoritePlayers') || '[]');
    
    // Transform the data to match required format
    const formattedPlayers = savedPlayers.map(player => ({
      name: player.name,
      logo: player.photo,
      teamName: player.team.name,
      position: player.position,
      id: player.id
    }));

    setFavoritePlayers(formattedPlayers);
  }, []);

  const unfavourBodyTemplate = (rowData) => (
    <button onClick={() => handleRemovePlayer(rowData.id)}>
      <i className="bi bi-hand-thumbs-down text-lg text-dbPrimary transition hover:text-dbSecondary"></i>
    </button>
  );

  const handleRemovePlayer = (playerId) => {
    // Remove from localStorage
    const savedPlayers = JSON.parse(localStorage.getItem('favoritePlayers') || '[]');
    const updatedPlayers = savedPlayers.filter(player => player.id !== playerId);
    localStorage.setItem('favoritePlayers', JSON.stringify(updatedPlayers));

    // Update state
    const updatedFavoritePlayers = favoritePlayers.filter(player => player.id !== playerId);
    setFavoritePlayers(updatedFavoritePlayers);
  };

  const LogoBodyTemplate = (rowData) => (
    <div className="py-2">
      <img src={rowData.logo} alt={rowData.teamName} className="max-h-20 mx-auto" />
    </div>
  );

  const detailsBodyTemplate = (rowData) => (
    <Link to={`/dashboard/player-stats?player=${rowData.id}`}>
      <i className="text-dbPrimary hover:text-dbSecondary bi bi-newspaper text-base transition"></i>
    </Link>
  );

  return (
    <>
      <h4 className="text-center font-medium">Favourite Players</h4>
      {favoritePlayers.length === 0 ? (
        <div className="text-center p-4">
          <p>No favourite players added yet</p>
        </div>
      ) : (
        <CustomDataTable
          value={favoritePlayers}
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
            field="Photo"
            header="Photo"
            body={LogoBodyTemplate}
          ></Column>
          <Column 
            className="px-4 text-xs" 
            field="name" 
            header="Player Name"
          ></Column>
          <Column
            className="px-4 text-xs"
            header="Unfavour"
            body={unfavourBodyTemplate}
          ></Column>
          <Column
            className="px-4 text-xs"
            field="teamName"
            header="Team Name"
          ></Column>
          <Column 
            className="px-4 text-xs" 
            field="position" 
            header="Position"
          ></Column>
          <Column
            className="px-4 text-xs"
            header="Details"
            body={detailsBodyTemplate}
          ></Column>
        </CustomDataTable>
      )}
    </>
  );
}

export default FavouritePlayers;