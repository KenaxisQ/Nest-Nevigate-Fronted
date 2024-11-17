import './App.css';
import Landing from './Components/Landing/Landing';
import { useState,useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { LoginPage } from './Components/Login/LoginPage';
function App() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [<Landing/>]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="App">
      {/* <GoogleOAuthProvider clientId="ClientId">
        <GoogleLogin
            onSuccess={credentialResponse => {
              setIsAuthenticated(true);
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          {!isAuthenticated && <LoginPage />}
            {isAuthenticated && <Landing/>}
      </GoogleOAuthProvider> */}
      <Landing/>
    </div>
  )
}

export default App;
