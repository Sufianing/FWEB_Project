import { useEffect, useState } from "react";
import { getReservations } from "../api/reservationApi";

const MOCK_OVERDUE = [
  { id: "1", title: "Clean Code", user: "David Tan", days: 5, fine: 5.0 },
  { id: "2", title: "Database System Concepts", user: "Aisyah Rahman", days: 8, fine: 8.0 },
];

function StaffPage() {
  const user = JSON.parse(localStorage.getItem("sb_user") || "null");
  const [tab, setTab] = useState("overdue");
  const [reservations, setReservations] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getReservations();
        setReservations(res.data);
      } catch {
        setErr("Failed to load reservations from server.");
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap gap-2 align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">Staff Management</h1>
          <div className="text-secondary small">
            Staff Console · Reservations · Overdue Books 
          </div>
        </div>
        {user?.user_type === "Librarian" ? (
          <span className="badge text-bg-success">Librarian</span>
        ) : (
          <span className="badge text-bg-secondary">Student</span>
        )}
      </div>

      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <button className={`nav-link ${tab === "overdue" ? "active" : ""}`}
                  onClick={() => setTab("overdue")}>
            Overdue List
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "reservations" ? "active" : ""}`}
                  onClick={() => setTab("reservations")}>
            Reservations
          </button>
        </li>
      </ul>

      {tab === "overdue" && (
        <div className="card shadow-sm">
          <div className="card-header fw-bold">Overdue Books</div>
          <div className="card-body table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>User</th>
                  <th>Days Overdue</th>
                  <th>Fine</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_OVERDUE.map((x) => (
                  <tr key={x.id}>
                    <td>{x.title}</td>
                    <td>{x.user}</td>
                    <td>{x.days}</td>
                    <td>${x.fine.toFixed(2)}</td>
                    <td className="text-end">
                      <button className="btn btn-outline-warning btn-sm"
                              onClick={() => alert("MVP: Final notice sent")}>
                        Send Notice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "reservations" && (
        <div className="card shadow-sm">
          <div className="card-header fw-bold">Reservations</div>
          <div className="card-body table-responsive">
            {err && <div className="alert alert-danger">{err}</div>}
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Queue</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r._id}>
                    <td>{r.book?.title || "Book"}</td>
                    <td>{r.user?.name || "User"}</td>
                    <td><span className="badge text-bg-info">{r.status}</span></td>
                    <td>{r.queue_position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffPage;