import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CustomDataTable = styled(DataTable)`
  .p-column-header-content {
    display: unset;
  }
`;

function FavouriteLeagues() {
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);

  useEffect(() => {
    // Get leagues from localStorage
    const savedLeagues = JSON.parse(localStorage.getItem('favoriteLeagues') || '[]');
    
    // Transform the data to match required format
    const formattedLeagues = savedLeagues.map(league => ({
      name: league.league.name,
      logo: league.league.logo,
      details: `${league.league.type} in ${league.country.name}`,
      country : league.country.name,
      id: league.league.id
    }));

    setFavoriteLeagues(formattedLeagues);
  }, []);

  const logoBodyTemplate = (rowData) => (
    <div>
      <img
        className="mx-auto max-h-[60px] max-w-[65px]"
        src={rowData.logo}
        alt={rowData.name}
      />
    </div>
  );

  const unfavourBodyTemplate = (rowData) => (
    <button onClick={() => handleRemoveLeague(rowData.id)}>
      <i className="bi bi-hand-thumbs-down text-lg text-dbPrimary transition hover:text-dbSecondary"></i>
    </button>
  );

  const handleRemoveLeague = (leagueId) => {
    // Remove from localStorage
    const savedLeagues = JSON.parse(localStorage.getItem('favoriteLeagues') || '[]');
    const updatedLeagues = savedLeagues.filter(league => league.league.id !== leagueId);
    localStorage.setItem('favoriteLeagues', JSON.stringify(updatedLeagues));

    // Update state
    const updatedFavoriteLeagues = favoriteLeagues.filter(league => league.id !== leagueId);
    setFavoriteLeagues(updatedFavoriteLeagues);
    toast.success('League removed from favorites!');
  };
  const detailsBodyTemplate = (rowData) => (
    <Link to={`/dashboard/player-stats??country=${rowData.country}`}>
      <i className="text-dbPrimary hover:text-dbSecondary bi bi-newspaper text-base transition"></i>
    </Link>
  );

  return (
    <>
      <h4 className="text-center font-medium">Favourite Leagues</h4>
      {favoriteLeagues.length === 0 ? (
        <div className="text-center p-4">
          <p>No favourite leagues added yet</p>
        </div>
      ) : (
        <CustomDataTable
          value={favoriteLeagues}
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
            field="logo"
            header="League Logo"
            body={logoBodyTemplate}
          ></Column>
          <Column
            className="px-4 text-xs"
            field="name"
            header="League Name"
          ></Column>
          <Column
            className="px-4 text-xs"
            header="Unfavour"
            body={unfavourBodyTemplate}
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

export default FavouriteLeagues;