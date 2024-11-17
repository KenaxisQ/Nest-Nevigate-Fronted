import './App.css';
import Landing from './Components/Landing/Landing';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { LoginPage } from './Components/Login/LoginPage';
function App() {
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
