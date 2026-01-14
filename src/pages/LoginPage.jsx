import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers } from "../api/userApi";

function LoginPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("Student");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch {
        setErr("Failed to load users from database.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredUsers = useMemo(
    () => users.filter((u) => u.user_type === role),
    [users, role]
  );

  const login = (e) => {
    e.preventDefault();
    setErr("");

    if (!name.trim() || !password.trim()) {
      return setErr("Please enter name and password.");
    }


    const u = filteredUsers.find(
      (x) =>
        x.name.toLowerCase() === name.trim().toLowerCase() &&
        x.password === password
    );

    if (!u) {
      return setErr("Invalid name or password.");
    }

    localStorage.setItem(
      "sb_user",
      JSON.stringify({
        _id: u._id,
        name: u.name,
        user_type: u.user_type,
        email: u.email,
      })
    );

    navigate(u.user_type === "Librarian" ? "/staff" : "/home");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="mb-1">Login</h2>
            <p className="text-secondary mb-4">
              Login to the SunnyBooks system
            </p>

            {loading ? (
              <div className="alert alert-info mb-0">Loading…</div>
            ) : (
              <form onSubmit={login}>
                <label className="form-label">Login as</label>
                <select
                  className="form-select form-select-lg mb-3"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setErr("");
                  }}
                >
                  <option value="Student">Student</option>
                  <option value="Librarian">Staff (Librarian)</option>
                </select>

                <label className="form-label">Name</label>
                <input
                  className="form-control form-control-lg mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />

                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />

                {err && <div className="alert alert-danger">{err}</div>}

                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Continue
                  </button>

                  <Link to="/signup" className="btn btn-outline-secondary">
                    Create an account
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
