import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../api/bookApi";
import { createReservation } from "../api/reservationApi";
import ReservationForm from "../components/ReservationForm";

function BooksPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("sb_user") || "null");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await getBookById(id);
        setBook(res.data);
      } catch {
        setErr("Book not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const availableCopies =
    book?.copies?.filter((c) => c.status === "Available") || [];

  const primaryLocation =
    availableCopies[0]?.shelf_location ||
    book?.copies?.[0]?.shelf_location ||
    "—";

  const reserve = async ({ reserveDate, pickupDeadline }) => {
    setMsg("");
    setErr("");

    try {
      await createReservation({
        book: book._id,
        user: user._id,
        reserve_date: new Date(reserveDate).toISOString(),
        pickup_deadline: new Date(pickupDeadline).toISOString(),
        queue_position: 1,
        status: "Pending",
      });

      setMsg("Reservation created successfully! Redirecting to My Loans…");
      setTimeout(() => navigate("/loans"), 800);
    } catch {
      setErr("Failed to create reservation. Please try again.");
    }
  };


  if (loading) return <div className="alert alert-info">Loading…</div>;
  if (err) return <div className="alert alert-danger">{err}</div>;

  return (
    <div>
      <button className="btn btn-link px-0 mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between flex-wrap gap-2">
            <div>
              <h2 className="mb-1">{book.title}</h2>
              <div className="text-secondary">{book.author}</div>
            </div>
            <div className="d-flex gap-2 align-items-start">
              <span className="badge text-bg-secondary">{book.category}</span>
              <span className="badge text-bg-light text-dark">
                ISBN: {book.ISBN}
              </span>
            </div>
          </div>

          <hr />

          <div className="row g-4">
            <div className="col-12 col-md-8">
              <h5>Status</h5>
              <p>
                <span className={`badge text-bg-success`}>
                  {book.status}
                </span>{" "}
                · {availableCopies.length} copy/copies available
              </p>

              <p className="text-secondary">
                Shelf location: <strong>{primaryLocation}</strong>
              </p>

              <hr />

              <h5>Description</h5>
              <p className="text-secondary">
                {book.description}
              </p>
            </div>

            <div className="col-12 col-md-4 d-flex flex-column">
              <div className="mt-auto d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-bookmark-plus me-2"></i>
                  Reserve
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/loans")}
                >
                  View My Loans
                </button>
              </div>

              {msg && <div className="alert alert-success mt-3">{msg}</div>}
              {err && <div className="alert alert-danger mt-3">{err}</div>}
            </div>
          </div>
        </div>
      </div>

      <ReservationForm
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={reserve}
        book={book}
        availableCopies={availableCopies}
        user={user}
      />
    </div>
  );
}

export default BooksPage;
