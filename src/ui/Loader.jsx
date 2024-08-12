import { useEffect, useState } from "react";

function Loader() {
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(true);
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeout); // Cleanup on component unmount
  }, []);

  if (error) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div>
          <p className="text-xl">Could not fetch data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div>
        <i className="pi pi-spin pi-spinner text-4xl"></i>
      </div>
    </div>
  );
}

export default Loader;

  