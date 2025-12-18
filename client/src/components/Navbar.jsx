import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LEFT */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          MediaConnect
        </Link>

        {/* CENTER */}
        {user && (
          <input
            className="hidden md:block w-[40%] px-4 py-2 rounded-full bg-gray-100 focus:ring-2 focus:ring-indigo-500"
            placeholder="Search posts or users"
          />
        )}

        {/* RIGHT */}
        {user && (
          <div className="flex items-center gap-4">

            {/* CREATE */}
            <Link
              to="/create"
              className="hidden sm:flex px-4 py-2 rounded-full bg-indigo-600 text-white font-medium"
            >
              ➕ Create
            </Link>

            {/* NOTIFICATION */}
            <button className="relative">
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                3
              </span>
            </button>

            {/* PROFILE */}
            <div className="relative">
              <button onClick={() => setOpen(!open)}>
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  {user.username[0].toUpperCase()}
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow border">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </nav>
  );
}
