import { useEffect, useMemo, useState } from "react";
import { getBooks } from "../api/bookApi";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState("");
  const [submittedQ, setSubmittedQ] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await getBooks(submittedQ);
        setBooks(res.data);
      } catch {
        setErr("Failed to load books.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [submittedQ]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmittedQ(q);
  };

  const visible = useMemo(() => {
    const list = [...books];
    list.sort((a, b) =>
      sortAsc
        ? (a.title || "").localeCompare(b.title || "")
        : (b.title || "").localeCompare(a.title || "")
    );
    return list;
  }, [books, sortAsc]);

  return (
    <div>
      <div className="p-4 p-md-5 mb-4 rounded-3 sb-hero">
        <div className="py-2">
          <h1 className="display-6 fw-bold mb-2">Find your next book</h1>
          <p className="fs-6 text-secondary mb-4" style={{ maxWidth: 720 }}>
            Search by title, author, category, or ISBN.
          </p>
          <SearchBar value={q} onChange={setQ} onSubmit={onSubmit} />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-secondary">
          {loading ? "Loading…" : `Showing ${visible.length} book(s)`}
          {submittedQ ? ` for "${submittedQ}"` : ""}
        </div>
        <button className="btn btn-outline-secondary" onClick={() => setSortAsc((s) => !s)}>
          Sort {sortAsc ? "A→Z" : "Z→A"}
        </button>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      {loading ? (
        <div className="alert alert-info">Loading books…</div>
      ) : visible.length === 0 ? (
        <div className="alert alert-warning">No books found.</div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {visible.map((b) => (
            <BookCard
              key={b._id}
              book={{
                id: b._id,
                title: b.title,
                author: b.author,
                category: b.category,
                status: b.status,
                location: "See details",
                coverImage: b.cover_image,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;