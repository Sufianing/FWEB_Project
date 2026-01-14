import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/userApi";

function SignupPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Student");

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!name || !email || !password) {
      return setErr("Name, email and password are required.");
    }

    if (role === "Student" && !studentId) {
      return setErr("Student ID is required for students.");
    }

    try {
      await createUser({
        name,
        email,
        password,
        user_type: role,
        student_id: role === "Student" ? studentId : null,
      });

      setMsg("Account created successfully! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1000);
    } catch (e) {
      setErr(
        e?.response?.data?.message || "Failed to create account."
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h2 className="mb-1">Sign Up</h2>
            <p className="text-secondary mb-4">
              Create a SunnyBooks account
            </p>

            <form onSubmit={signup}>
              <label className="form-label">Role</label>
              <select
                className="form-select form-select-lg mb-3"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setStudentId("");
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
                placeholder="Full name"
              />

              {role === "Student" && (
                <>
                  <label className="form-label">Student ID</label>
                  <input
                    className="form-control form-control-lg mb-3"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. 2404722H"
                  />
                </>
              )}

              <label className="form-label">Email</label>
              <input
                className="form-control form-control-lg mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  role === "Student"
                    ? "student@student.tp.edu.sg"
                    : "staff@sunnybooks.edu.sg"
                }
              />

              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control form-control-lg mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              {err && <div className="alert alert-danger">{err}</div>}
              {msg && <div className="alert alert-success">{msg}</div>}

              <div className="d-grid">
                <button className="btn btn-primary btn-lg">
                  Create Account
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
