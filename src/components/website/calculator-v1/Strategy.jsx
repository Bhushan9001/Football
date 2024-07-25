import { useRef, useState } from "react";
import KOPriceFilter from "./KOPriceFilter";
import PriceFilter from "./PriceFilter";
import LiquidityFilter from "./LiquidityFilter";
import StatsFilter from "./StatsFilter";
import { Slider } from "primereact/slider";
import { Panel } from "primereact/panel";
import StrategyTable from "./StrategyTable";

function Strategy() {
  const ref = useRef(null);

  const [timeValue, setTimeValue] = useState([20, 80]);

  const [strategyName, setStrategyName] = useState("");

  const [KOPriceComponentsList, setKOPriceComponentsList] = useState([
    <KOPriceFilter key={0} />,
  ]);
  const [PriceFilterComponentsList, setPriceFilterComponentsList] = useState([
    <PriceFilter key={0} />,
  ]);
  const [LiquidityFilterComponentsList, setLiquidityFilterComponentsList] =
    useState([<LiquidityFilter key={0} />]);

  const [StatsFilterComponentsList, setStatsFilterComponentsList] = useState([
    <StatsFilter key={0} />,
  ]);

  const handleSliderChange = (e) => {
    const newValues = e.value;
    if (newValues[0] <= newValues[1]) {
      setTimeValue(newValues);
    }
  };

  // ==============
  // Add Components
  // ==============
  const AddNewKOPriceComponent = () => {
    setKOPriceComponentsList([
      ...KOPriceComponentsList,
      <KOPriceFilter key={KOPriceComponentsList.length} />,
    ]);
  };

  const AddNewPriceFilterComponent = () => {
    setPriceFilterComponentsList([
      ...PriceFilterComponentsList,
      <PriceFilter key={PriceFilterComponentsList.length} />,
    ]);
  };

  const AddNewLiquidityFilterComponent = () => {
    setLiquidityFilterComponentsList([
      ...LiquidityFilterComponentsList,
      <LiquidityFilter key={PriceFilterComponentsList.length} />,
    ]);
  };

  const AddNewStatsFilterComponent = () => {
    setStatsFilterComponentsList([
      ...StatsFilterComponentsList,
      <StatsFilter key={StatsFilterComponentsList.length} />,
    ]);
  };

  // =================
  // Delete Components
  // =================
  const DeletePriceFilterComponent = (index) => {
    const updatedList = [...KOPriceComponentsList];
    updatedList.splice(index, 1);
    setPriceFilterComponentsList(updatedList);
  };

  const DeleteKOPriceFilterComponent = (index) => {
    const updatedList = [...KOPriceComponentsList];
    updatedList.splice(index, 1);
    setKOPriceComponentsList(updatedList);
  };

  const DeleteLiquidityFilterComponent = (index) => {
    const updatedList = [...LiquidityFilterComponentsList];
    updatedList.splice(index, 1);
    setLiquidityFilterComponentsList(updatedList);
  };

  const DeleteStatsFilterComponent = (index) => {
    const updatedList = [...StatsFilterComponentsList];
    updatedList.splice(index, 1);
    setStatsFilterComponentsList(updatedList);
  };

  return (
    <div>
      <input
        type="text"
        className="mb-4 bg-transparent placeholder:text-black"
        value={strategyName}
        onChange={(e) => setStrategyName(e.target.value)}
        placeholder="Enter strategy name"
      />

      <Panel
        ref={ref}
        toggleable
        expandIcon={null}
        pt={{ togglerIcon: "hidden" }}
      >
        <div className="mb-8 grid grid-cols-4 gap-10">
          {/* 01 */}
          <div>
            {KOPriceComponentsList.map((component, index) => (
              <div key={index} className="mb-4 flex items-center">
                {component}
                <button
                  className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF9900]
                p-1 text-xs text-white transition hover:bg-[#993300]"
                  onClick={() => DeleteKOPriceFilterComponent(index)}
                  title="Delete Filter"
                >
                  <i className="pi pi-times"></i>
                </button>
              </div>
            ))}
            <button
              className="block rounded-lg bg-[#FF9900] px-5 py-2 text-sm text-white transition hover:bg-[#666]"
              onClick={AddNewKOPriceComponent}
            >
              Add KO Price Filter
            </button>
          </div>
          {/* 02 */}
          <div>
            {PriceFilterComponentsList.map((component, index) => (
              <div key={index} className="mb-4 flex items-center">
                {component}
                <button
                  className="ml-2 flex h-4
                w-4 items-center justify-center rounded-full bg-[#FF9900] p-1 text-xs text-white transition hover:bg-[#993300]"
                  onClick={() => DeletePriceFilterComponent(index)}
                  title="Delete Filter"
                >
                  <i className="pi pi-times"></i>
                </button>
              </div>
            ))}
            <button
              className="block rounded-lg bg-[#FF9900] px-5 py-2 text-sm text-white  transition hover:bg-[#666]"
              onClick={AddNewPriceFilterComponent}
            >
              Add Price Filter
            </button>
          </div>
          {/* 03 */}
          <div>
            {LiquidityFilterComponentsList.map((component, index) => (
              <div key={index} className="mb-4 flex items-center">
                {component}
                <button
                  className="ml-2 flex h-4
                w-4 items-center justify-center rounded-full bg-[#FF9900] p-1 text-xs text-white transition hover:bg-[#993300]"
                  onClick={() => DeleteLiquidityFilterComponent(index)}
                  title="Delete Filter"
                >
                  <i className="pi pi-times"></i>
                </button>
              </div>
            ))}
            <button
              className="block rounded-lg bg-[#FF9900] px-5 py-2 text-sm text-white  transition hover:bg-[#666]"
              onClick={AddNewLiquidityFilterComponent}
            >
              Add Liquidity Filter
            </button>
          </div>
          {/* 04 */}
          <div>
            {StatsFilterComponentsList.map((component, index) => (
              <div key={index} className="mb-4 flex items-center">
                {component}
                <button
                  className="ml-2 flex h-4
                w-4 items-center justify-center rounded-full bg-[#FF9900] p-1 text-xs text-white transition hover:bg-[#993300]"
                  onClick={() => DeleteStatsFilterComponent(index)}
                  title="Delete Filter"
                >
                  <i className="pi pi-times"></i>
                </button>
              </div>
            ))}
            <button
              className="block rounded-lg bg-[#FF9900] px-5 py-2 text-sm text-white  transition hover:bg-[#666]"
              onClick={AddNewStatsFilterComponent}
            >
              Add Stats Filter
            </button>
          </div>
        </div>
        <div className="mb-4 flex max-w-96 items-center gap-4">
          <span>{timeValue[0]}</span>
          <Slider
            value={timeValue}
            onChange={handleSliderChange}
            min={0}
            max={90}
            range
            pt={{
              root: "bg-[#fefefe] h-2 w-full",
              handle: "bg-[#898989] w-4 h-4 rounded-full -top-1 -left-1",
              range: "bg-[#FF9900]",
            }}
          />
          <span>{timeValue[1]}</span>
        </div>
      </Panel>
      <div className="text-center">
        <button
          className="relative top-5 z-10 bg-[#ebebeb] p-2"
          onClick={() => ref.current.toggle()}
        >
          Show/Hide
        </button>
      </div>
      <StrategyTable />
    </div>
  );
}

export default Strategy;
