import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";  // Import PropTypes

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// ✅ Add PropTypes Validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,  // Ensure children is provided
};

export default ProtectedRoute;
