import { useState } from "react";
import Strategy from "./Strategy";
import Container from "../../../ui/Container";

function CalculatorV1() {
  const [componentList, setComponentList] = useState([<Strategy key={0} />]);

  const handleAddComponent = () => {
    setComponentList([
      ...componentList,
      <Strategy key={componentList.length} />,
    ]);
  };

  const handleDeleteComponent = (index) => {
    const updatedList = [...componentList];
    updatedList.splice(index, 1);
    setComponentList(updatedList);
  };

  return (
    <main className="min-h-screen bg-white px-4 pt-48">
      {/* <Container> */}
      <h1 className="mb-10 text-2xl font-bold text-gray-500">Calculator</h1>
      <div className="mb-4 flex gap-2">
        <button
          className="rounded-lg bg-[#FF9900] px-5 py-2 text-base text-white transition  hover:bg-[#666]"
          onClick={handleAddComponent}
        >
          Add Strategy
        </button>
        <button className="rounded-lg bg-[#898989] px-5 py-2 text-base text-white transition hover:bg-[#666]">
          Save
        </button>
      </div>

      {componentList.map((component, index) => (
        <div
          key={index}
          className="mb-10 flex border border-gray-100 bg-gray-300 p-4"
        >
          <div className="flex-1">{component}</div>
          <button
            className="ml-2 flex h-4
                w-4 items-center justify-center rounded-full bg-[#FF9900] p-1 text-xs text-white transition hover:bg-[#993300]"
            onClick={() => handleDeleteComponent(index)}
            title="Delete Strategy"
          >
            <i className="pi pi-times"></i>
          </button>
        </div>
      ))}
      {/* </Container> */}
    </main>
  );
}

export default CalculatorV1;
