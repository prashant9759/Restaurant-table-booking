import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/navbar";
import Home from "./pages/home"; // Import Home Page
import Login from "./pages/login";
import Register from "./pages/register";
import NewRegistration from "./pages/newRegistration"; 
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home Page as Default */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-registration" element={<NewRegistration />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;


