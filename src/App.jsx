import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import UserLikesPage from "./pages/UserLikesPage";
import AboutMe from "./pages/AboutMe";
import Error404 from "./pages/Error404"; // ✅

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 container mx-auto py-4">
          <Routes>
            <Route path="/about" element={<AboutMe />} />
            <Route path="/no-existe" element={<Error404 />} />

            {currentUser ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/favoritos" element={<Favorites />} />
                {currentUser.role === "admin" && (
                  <>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/likes" element={<UserLikesPage />} />
                  </>
                )}
                <Route path="*" element={<Error404 />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error404 />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
