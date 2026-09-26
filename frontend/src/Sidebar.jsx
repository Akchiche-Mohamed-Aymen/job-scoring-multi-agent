import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "API Key",
    path: "/api-key",
  },
  {
    name: "Ingest CV",
    path: "/ingest-cv",
  },
  
  {
    name: "Structure Job",
    path: "/structure-job",
  },
  {
    name: "Match CV",
    path: "/match-cv",
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          AI
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            CV Match
          </h1>

          <p className="text-xs text-slate-400">
            AI Job Scoring
          </p>
        </div>
      </div>

      <div className="mx-5 border-t border-slate-100" />

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workflow
        </p>

        <div className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-100 p-4">
        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-xs font-semibold text-blue-700">
            AI Matching
          </p>

          <p className="mt-1 text-xs leading-relaxed text-blue-600/70">
            Analyze candidates and match their CVs with job requirements.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;