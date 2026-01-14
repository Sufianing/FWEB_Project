import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("sb_user") || "null");

  if (location.pathname === "/login" || !user) return null;

  const isStudent = user.user_type === "Student";
  const isLibrarian = user.user_type === "Librarian";

  const logout = () => {
    localStorage.removeItem("sb_user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-dark">
      <div className="container-fluid px-4">
        <button
          className="navbar-brand btn btn-link text-decoration-none text-white p-0 fw-bold"
          onClick={() => {
            if (isLibrarian) navigate("/staff");
            else navigate("/home");
          }}
        >
          SunnyBooks
        </button>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isStudent && (
              <>
                <li className="nav-item">
                  <NavLink to="/home" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/loans" className="nav-link">
                    My Loans
                  </NavLink>
                </li>
              </>
            )}

            {isLibrarian && (
              <li className="nav-item">
                <NavLink to="/staff" className="nav-link">
                  Staff
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill text-bg-secondary">
              {user.name} · {user.user_type}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
