import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import CreatePost from "./pages/CreatePost";


function Layout({ children }) {
  const { loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
  path="/create"
  element={
    <ProtectedRoute>
      <CreatePost />
    </ProtectedRoute>
  }
/>

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
