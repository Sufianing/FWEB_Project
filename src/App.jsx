import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import LoansPage from "./pages/LoansPage";
import StaffPage from "./pages/StaffPage";
import { getAuthUser } from "./useAuth";
import NotFoundPage from "./pages/NotFoundPage";

function RequireAuth({ children }) {
  const user = getAuthUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RequireLibrarian({ children }) {
  const user = getAuthUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.user_type !== "Librarian")
    return <Navigate to="/home" replace />;
  return children;
}

function RequireStudent({ children }) {
  const user = JSON.parse(localStorage.getItem("sb_user") || "null");

  if (!user) return <Navigate to="/login" replace />;

  if (user.user_type !== "Student") {
    return <Navigate to="/staff" replace />;
  }

  return children;
}


function App() {
  return (
    <>
      <Navbar />

      <main className="sb-main">
        <div className="sb-shell">
          <div className="sb-page px-4">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Public */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Student routes */}
              <Route
                path="/home"
                element={
                  <RequireStudent>
                    <HomePage />
                  </RequireStudent>
                }
              />

              <Route
                path="/books/:id"
                element={
                  <RequireAuth>
                    <BooksPage />
                  </RequireAuth>
                }
              />

              <Route
                path="/loans"
                element={
                  <RequireAuth>
                    <LoansPage />
                  </RequireAuth>
                }
              />

              {/* Staff (Librarian) route */}
              <Route
                path="/staff"
                element={
                  <RequireLibrarian>
                    <StaffPage />
                  </RequireLibrarian>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-secondary small border-top">
        SunnyBooks
      </footer>
    </>
  );
}

export default App;