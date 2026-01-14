import { useState } from "react";

function ReservationModal({
  show,
  onClose,
  onConfirm,
  book,
  user,
}) {
  const [reserveDate, setReserveDate] = useState("");
  const [pickupDeadline, setPickupDeadline] = useState("");

  if (!show) return null;

  const submit = () => {
    if (!reserveDate || !pickupDeadline) {
      alert("Please select both reservation date and pickup deadline.");
      return;
    }

    onConfirm({
      reserveDate,
      pickupDeadline,
    });
  };

  return (
    <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 1050,
        }}
    >
        <div
        className="bg-white rounded shadow p-4"
        style={{ width: "100%", maxWidth: 480 }}
        >
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Confirm Reservation</h5>
            <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={user.name} readOnly />
        </div>

        <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input className="form-control" value={book.title} readOnly />
        </div>

        <div className="mb-3">
            <label className="form-label">Reservation Date</label>
            <input
            type="date"
            className="form-control"
            value={reserveDate}
            onChange={(e) => setReserveDate(e.target.value)}
            />
        </div>

        <div className="mb-4">
            <label className="form-label">Pickup Deadline</label>
            <input
            type="date"
            className="form-control"
            value={pickupDeadline}
            onChange={(e) => setPickupDeadline(e.target.value)}
            />
        </div>

        <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
            </button>
            <button className="btn btn-primary" onClick={submit}>
            Confirm Reservation
            </button>
        </div>
        </div>
    </div>
    );
}

export default ReservationModal;
