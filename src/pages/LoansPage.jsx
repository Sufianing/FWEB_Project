import { useEffect, useState } from "react";
import { getLoans } from "../api/loanApi";
import { deleteReservation, getReservations } from "../api/reservationApi";

function LoansPage() {
  const user = JSON.parse(localStorage.getItem("sb_user") || "null");

  const [loans, setLoans] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const loadAll = async () => {
    try {
      setLoading(true);
      setErr("");

      if (!user?._id) {
        setLoans([]);
        setReservations([]);
        return;
      }

      const [loanRes, resRes] = await Promise.all([
        getLoans(user._id),
        getReservations(user._id),
      ]);

      setLoans(loanRes.data);
      setReservations(resRes.data);
    } catch {
      setErr("Failed to load loans/reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const cancelReservation = async (id) => {
    try {
      await deleteReservation(id);
      await loadAll();
    } catch {
      setErr("Failed to cancel reservation.");
    }
  };

  if (!user) {
    return <div className="alert alert-warning">Please login first.</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap gap-2 align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">My Loans</h1>
          <div className="text-secondary small">{user.name} · {user.user_type}</div>
        </div>
        <span className="badge text-bg-secondary">
          {loans.length} Loan(s) · {reservations.length} Reservation(s)
        </span>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}
      {loading && <div className="alert alert-info">Loading…</div>}

      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-bold">Current Loans</div>
            <div className="card-body">
              {loans.length === 0 ? (
                <div className="text-secondary">No loans found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Book</th>
                        <th>Due</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((l) => (
                        <tr key={l._id}>
                          <td>{l.bookCopy?.book?.title || "Book"}</td>
                          <td>{l.due_date ? new Date(l.due_date).toLocaleDateString() : "—"}</td>
                          <td className="text-end">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => alert("MVP: Renew")}
                            >
                              Renew
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-bold">Reservations</div>
            <div className="card-body">
              {reservations.length === 0 ? (
                <div className="text-secondary">No reservations found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Book</th>
                        <th>Status</th>
                        <th>Queue</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r._id}>
                          <td>{r.book?.title || "Book"}</td>
                          <td><span className="badge text-bg-info">{r.status}</span></td>
                          <td>{r.queue_position}</td>
                          <td className="text-end">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => cancelReservation(r._id)}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoansPage;