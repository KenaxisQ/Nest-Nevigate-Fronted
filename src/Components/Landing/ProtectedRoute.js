import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { Login } from "../SignIn/Login";

const isTokenValid = () => {
    const token = sessionStorage.getItem("AUTH_TOKEN")|| localStorage.getItem("AUTH_TOKEN");
    if (!token) return false;
  
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return Date.now() < exp * 1000; // Compare expiration
    } catch (error) {
      console.error("Invalid token", error);
      return false;
    }
  };
  
const ProtectedRoute = ({ children }) => {
    
    const navigate = useNavigate();
    const isAuthenticated = isTokenValid();
    if(!isAuthenticated)
        {
          sessionStorage.clear();
          //localStorage.clear();
        }
    useEffect(() => {
        if (!isAuthenticated) {
          navigate("/", { replace: true });
        }
      }, [isAuthenticated, navigate]);
 
  return isAuthenticated ? children : <Login />;
};

export default ProtectedRoute;
