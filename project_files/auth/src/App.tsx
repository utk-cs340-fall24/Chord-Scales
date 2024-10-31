import React, { useState } from 'react';
import './App.css';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

function App() {
  // login stat
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    setIsLoggedIn(true);
    setErrorMessage(''); // clear msgs
  };

  const handleLoginError = () => {
    console.log('Login Failed');
    setErrorMessage('Login Failed'); // set error message
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // reset state 
    setErrorMessage(''); // clear msg
  };

  return (
    <div className="App">
      <div className="login-container">
        <h1 className="welcome-message">
          {isLoggedIn ? 'ChordScales' : 'Welcome to ChordScales!'}
        </h1>
        
        {!isLoggedIn ? (
          <>
            <p className="app-description">Sign in with Google to access exclusive features and content.</p>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        )}
      </div>
    </div>
  );
}

export default App;
