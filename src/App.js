import './App.css';
import Landing from './Components/Landing/Landing';
import { useState,useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { LoginPage } from './Components/Login/LoginPage';
import Signin from './Components/SignIn/SignIn';
import { Login } from './Components/SignIn/Login';
import { useAuth, AuthProvider } from './Components/SignIn/AuthContext';
function App() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [<Landing/>]);
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="358263423974-6gm1pcu71j1g4o5jr2bqi5398pssbk61.apps.googleusercontent.com">
        <Main />
      </GoogleOAuthProvider>
    </AuthProvider>
  )
}
function Main(){
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  return(
<div className="App">
          {!isAuthenticated && <Login setIsAuthenticated={setIsAuthenticated}/>}
            {isAuthenticated && <Landing/>}
      {/* <Landing/> */}
    </div>)
}

export default App;
