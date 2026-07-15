import { Link, useLocation } from "react-router-dom";
import { ChevronRight, House } from "lucide-react";

export default function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="bg-slate-950 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <nav className="flex items-center text-sm">
          <Link
            to="/dashboard"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <House size={16} className="mr-1" />
            Home
          </Link>

          {pathnames.map((value, index) => {
            const to = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;

            return (
              <div key={to} className="flex items-center">
                <ChevronRight
                  size={16}
                  className="mx-2 text-gray-400"
                />

                {isLast ? (
                  <span className="font-semibold text-white capitalize">
                    {value.replace(/-/g, " ")}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="text-blue-600 hover:text-blue-700 capitalize"
                  >
                    {value.replace(/-/g, " ")}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}