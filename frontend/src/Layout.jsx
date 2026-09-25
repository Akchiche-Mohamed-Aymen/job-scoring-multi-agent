import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="min-h-screen bg-[#F5F9FF] text-slate-900">
      <Sidebar />

      <main className="min-h-screen pt-16 md:ml-64 md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;