import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

import "primereact/resources/primereact.min.css";

export default function StrategyTable() {
  const [matches] = useState([
    {
      Date: "2024-02-16",
      Time: "15:00",
      Score: "2-1",
      Event: "Football Match",
      match_odds: {
        home: 2.5,
        away: 3.0,
        draw: 2.2,
        matched: 1.27,
      },
      over_under: {
        under: 2.5,
        over: 1.77,
        matched: 74,
      },
      other_OU: {
        data: 1,
      },
      correct_score: {
        data: 1,
      },
      stats: {
        onShot: 1,
        offShot: 2,
        corners: 3,
        redCard: 1,
        yellowCard: 2,
        attacks: 2,
        possession: 50,
        goalsMinute: 8,
      },
      ip3: {
        data: 1,
      },
      ip2: {
        data: 2,
      },
      ip1: {
        data: 4,
      },
    },
    {
      Date: "2024-02-15",
      Time: "15:00",
      Score: "2-1",
      Event: "Football Match",
      match_odds: {
        home: 2.5,
        away: 3.0,
        draw: 2.2,
        matched: 1.27,
      },
      over_under: {
        under: 2.5,
        over: 1.77,
        matched: 74,
      },
      other_OU: {
        data: 1,
      },
      correct_score: {
        data: 1,
      },
      stats: {
        onShot: 1,
        offShot: 2,
        corners: 3,
        redCard: 1,
        yellowCard: 2,
        attacks: 2,
        possession: 50,
        goalsMinute: 8,
      },
      ip3: {
        data: 1,
      },
      ip2: {
        data: 2,
      },
      ip1: {
        data: 4,
      },
    },
    {
      Date: "2024-02-15",
      Time: "15:00",
      Score: "2-1",
      Event: "Football Match",
      match_odds: {
        home: 2.5,
        away: 3.0,
        draw: 2.2,
        matched: 1.27,
      },
      over_under: {
        under: 2.5,
        over: 1.77,
        matched: 74,
      },
      other_OU: {
        data: 1,
      },
      correct_score: {
        data: 1,
      },
      stats: {
        onShot: 1,
        offShot: 2,
        corners: 3,
        redCard: 1,
        yellowCard: 2,
        attacks: 2,
        possession: 50,
        goalsMinute: 8,
      },
      ip3: {
        data: 1,
      },
      ip2: {
        data: 2,
      },
      ip1: {
        data: 4,
      },
    },
  ]);

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column colSpan={21} />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/sound-on-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/sound-on-icon.png" />
            </button>
          )}
        />
        <Column
          colSpan={22}
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/sound-on-icon.png" />
            </button>
          )}
        />
      </Row>
      <Row>
        <Column
          headerClassName="text-[#FF9900] p-2"
          header="Date"
          rowSpan={2}
          sortable
        />
        <Column headerClassName="text-[#FF9900]" header="Time" rowSpan={3} />
        <Column headerClassName="text-[#FF9900]" header="Score" rowSpan={3} />
        <Column headerClassName="text-[#FF9900]" header="Event" rowSpan={3} />
        <Column
          headerClassName="text-[#FF9900]"
          header="Match odds"
          colSpan={4}
        />
        <Column
          headerClassName="text-[#FF9900]"
          header="Over/Under 2.5"
          colSpan={3}
        />
        <Column
          headerClassName="text-[#FF9900]"
          header="Other O/U"
          colSpan={1}
        />
        <Column
          headerClassName="text-[#FF9900]"
          header="Other Correct Score"
          colSpan={1}
        />
        <Column
          headerClassName="text-[#FF9900]"
          header="Stats"
          alignHeader={"center"}
          colSpan={8}
        />
        <Column
          header={() => (
            <button>
              <img
                src="/assets/img/website/calculator/breakdown-icon.png"
                alt=""
              />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img
                src="/assets/img/website/calculator/breakdown-icon.png"
                alt=""
              />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img
                src="/assets/img/website/calculator/breakdown-icon.png"
                alt=""
              />
            </button>
          )}
        />
      </Row>
      <Row>
        <Column header="Home" />
        <Column header="Away" />
        <Column header="Draw" />
        <Column header="Matched" />
        <Column header="Under" />
        <Column header="Over" />
        <Column header="Matched" />
        <Column header="Data" />
        <Column header="Data" />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/on-target.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/off-target.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/corners-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/redcard-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/yellowcard-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/shield-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/poss-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/goals-icon.png" />
            </button>
          )}
        />

        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/press3-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/press2-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/press-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/sound-on-icon.png" />
            </button>
          )}
        />
        <Column
          header={() => (
            <button>
              <img src="/assets/img/website/calculator/highlight-icon-yellow.png" />
            </button>
          )}
        />
      </Row>
    </ColumnGroup>
  );

  return (
    <div className="card">
      <DataTable
        value={matches}
        className="calculator bg-[#232323] pt-4 text-white"
        headerColumnGroup={headerGroup}
        rowClassName="bg-[#ebebeb] text-black"
        stripedRows
      >
        <Column className="p-2" field="Date" />
        <Column field="Time" />
        <Column field="Score" />
        <Column field="Event" />
        <Column field="match_odds.home" />
        <Column field="match_odds.away" />
        <Column field="match_odds.draw" />
        <Column field="match_odds.matched" />
        <Column field="over_under.under" />
        <Column field="over_under.over" />
        <Column field="over_under.matched" />
        <Column field="other_OU.data" />
        <Column field="correct_score.data" />
        <Column field="stats.onShot" />
        <Column field="stats.offShot" />
        <Column field="stats.corners" />
        <Column field="stats.redCard" />
        <Column field="stats.yellowCard" />
        <Column field="stats.attacks" />
        <Column field="stats.possession" />
        <Column field="stats.goalsMinute" />
        <Column field="ip3.data" />
        <Column field="ip2.data" />
        <Column field="ip1.data" />
        <Column
          body={() => (
            <>
              <button>
                <img
                  src="/assets/img/website/calculator/breakdown-icon.png"
                  alt=""
                />
              </button>
            </>
          )}
        />
        <Column
          body={() => (
            <>
              <button className="block">
                <img
                  src="/assets/img/website/calculator/highlight-icon-yellow.png"
                  alt=""
                />
              </button>
              <button>
                <img
                  src="/assets/img/website/calculator/off-target.png"
                  alt=""
                />
              </button>
            </>
          )}
        />
      </DataTable>
    </div>
  );
}
