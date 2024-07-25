import { useEffect, useState } from "react";
import DBHeader from "../components/dashboard/db-header/DBHeader";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [minimizeSidebar, setMinimizeSidebar] = useState(false);

  function closeSidebarOnMobile() {
    if (window.innerWidth < 786) {
      setMinimizeSidebar(true);
    }
  }

  useEffect(() => {
    document.body.style.background = "transparent";
    return () => {
      document.body.style.background = "transparent";
    };
  }, []);
  return (
    <div className="font-roboto">
      <DBHeader />
      <main className="relative">
        {/* CLOSE SIDEBAR */}
        <button
          onClick={() => setMinimizeSidebar(true)}
          className={`fixed top-44 z-[60] transition-all duration-500 ${
            minimizeSidebar ? "-left-52" : "left-52"
          }`}
        >
          <i className="bi bi-chevron-double-left  text-2xl text-[#808080] hover:text-white"></i>
        </button>
        <aside
          className={`fixed top-40 z-[55] max-h-max w-64 overflow-auto rounded-br-[40px] rounded-tr-[40px] bg-[#434242] transition-all  duration-500 ${
            minimizeSidebar
              ? "invisible -left-72 !p-0 opacity-0"
              : "visible left-0 opacity-100"
          }`}
        >
          <Sidebar setMinimizeSidebar={closeSidebarOnMobile} />
        </aside>
        <div
          className={`px-4 pt-44 transition-all duration-500 ${
            minimizeSidebar ? "lg:pl-10" : "lg:pl-72"
          }`}
        >
          {/* OPEN SIDEBAR */}
          <button
            onClick={() => setMinimizeSidebar(false)}
            className={`fixed top-28 z-[60]  transition-all ${
              minimizeSidebar ? "left-4" : "-left-10"
            }`}
          >
            <i className="bi bi-chevron-double-right text-2xl  text-[#808080] transition"></i>
          </button>

          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
