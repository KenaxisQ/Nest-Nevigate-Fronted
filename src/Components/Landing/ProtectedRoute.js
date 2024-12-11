import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { Login } from "../SignIn/Login";
import { useAuth } from "../SignIn/AuthContext";
import HttpService from "../../Services/http";
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

  const fetchUserData = async (setUserData, identifier) =>{
    var https = new HttpService();
    var userInfo = await https.get(`user/emailOrPhone/${identifier}`)
    // if(userInfo.success)
    // {
    //     setIsAuthenticated(true);
    //     // navigate('/');
    // }
    
    console.log('Ui' ,userInfo)
    setUserData(userInfo?.data);
  }
const ProtectedRoute = ({ children }) => {
  const {setUserData} = useAuth();
    const navigate = useNavigate();
    const isAuthenticated = isTokenValid();
    useEffect(() => {
      debugger;
      fetchUserData(setUserData, sessionStorage.getItem('identifier') || localStorage.getItem('identifier'))
    }, [setUserData])
    if(!isAuthenticated)
    {
      sessionStorage.clear();
      //localStorage.clear();
    } else{
      // fetchUserData(setUserData, sessionStorage.getItem('identifier') || localStorage.getItem('identifier'))
    }
    useEffect(() => {
        if (!isAuthenticated) {
          navigate("/", { replace: true });
        }
      }, [isAuthenticated, navigate]);
 
  return isAuthenticated ? children : <Login />;
};

export default ProtectedRoute;
