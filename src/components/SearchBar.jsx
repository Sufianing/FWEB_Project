function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form className="row g-2 align-items-center" onSubmit={onSubmit}>
      <div className="col-12 col-md-9">
        <input
          className="form-control form-control-lg"
          placeholder="Search by title, author, category..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-3 d-grid">
        <button className="btn btn-primary btn-lg" type="submit">
          <i className="bi bi-search me-2"></i>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;