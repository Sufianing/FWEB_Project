import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex gap-3 align-items-start">
        <div className="sb-thumb rounded border overflow-hidden">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-100 h-100 object-fit-cover"
            />
          ) : (
            <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center text-secondary small">
              No Image
            </div>
          )}
        </div>

        <div className="flex-grow-1">
          <h5 className="mb-1">{book.title}</h5>
          <div className="text-secondary">{book.author}</div>

          <div className="mt-2 d-flex flex-wrap gap-2">
            {book.category && <span className="badge text-bg-secondary">{book.category}</span>}
            {book.status && (<span className={`badge ${book.status === "Available"? "text-bg-success": book.status === "Reserved"? "text-bg-warning": "text-bg-info"}`}>{book.status}</span>)}
          </div>

          {book.location && (
            <div className="text-secondary small mt-2">
              <i className="bi bi-geo-alt me-1"></i>
              {book.location}
            </div>
          )}
        </div>

        <div className="d-flex flex-column gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate(`/books/${book.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;