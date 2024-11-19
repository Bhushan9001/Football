import { useState } from "react";
import Strategy from "./Strategy";
import Container from "../../../ui/Container";
import { Component } from "react";

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-red-500 mb-4">Please try refreshing the page or contact support if the problem persists.</p>
          <details className="text-sm text-gray-600">
            <summary>Error details</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded">
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

function CalculatorV1() {
  const [componentList, setComponentList] = useState([<Strategy key={0} />]);
  const [error, setError] = useState(null);

  const handleAddComponent = () => {
    try {
      setComponentList([
        ...componentList,
        <Strategy key={componentList.length} />,
      ]);
    } catch (err) {
      setError("Failed to add new strategy. Please try again.");
    }
  };

  const handleDeleteComponent = (index) => {
    try {
      const updatedList = [...componentList];
      updatedList.splice(index, 1);
      setComponentList(updatedList);
    } catch (err) {
      setError("Failed to delete strategy. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-2 text-blue-500 underline"
          onClick={() => setError(null)}
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white px-4 pt-48">
        <h1 className="mb-10 text-2xl font-bold text-gray-500">Calculator</h1>
        <div className="mb-4 flex gap-2">
          <button
            className="rounded-lg bg-[#FF9900] px-5 py-2 text-base text-white transition hover:bg-[#666]"
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
              className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF9900] p-1 text-xs text-white transition hover:bg-[#993300]"
              onClick={() => handleDeleteComponent(index)}
              title="Delete Strategy"
            >
              <i className="pi pi-times"></i>
            </button>
          </div>
        ))}
      </main>
    </ErrorBoundary>
  );
}

export default CalculatorV1;