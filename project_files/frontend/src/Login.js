import React, { useState } from 'react';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpCredentials, setSignUpCredentials] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState(''); // State for email error message

  const handleLogin = () => {
    setShowLoginModal(true); // Show login modal when user clicks login
  };

  const handleSignUp = () => {
    setShowSignUpModal(true); // Show sign-up modal when user clicks sign up
  };

  const handleLoginSubmit = () => {
    if (username === signUpCredentials.username && password === signUpCredentials.password) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setShowLogin(false);
      setLoginError('');
    } else {
      setLoginError('Invalid login credentials');
    }
  };

  const handleSignUpSubmit = () => {
    // Email validation (must contain "@")
    if (!email.includes('@')) {
      setEmailError('Invalid email'); // Show error if email doesn't contain "@"
      return;
    }

    setEmailError(''); // Reset error if email is valid

    setSignUpCredentials({ email, username, password });
    alert(`Signed up with Email: ${email}\nUsername: ${username}\nPassword: ${password}`);
    setShowSignUpModal(false); // Close the sign-up modal after submission
  };

  const handleModalClose = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setShowSignUpModal(false);
    setShowLoginModal(false);
    setLoginError('');
    setEmailError(''); // Reset email error when closing modal
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '156px', zIndex: 1000 }}>
      {showLogin ? (
        <>
          <button
            onClick={handleLogin}
            style={{
              fontSize: '12px',
              padding: '5px 8px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            style={{
              fontSize: '12px',
              padding: '5px 8px',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Display the username to the left of the logout button */}
          <span style={{ color: 'white', marginRight: '10px' }}>
            {signUpCredentials.username}
          </span>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setShowLogin(true);
            }}
            style={{
              fontSize: '12px',
              padding: '5px 8px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#3e3e42',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 2000,
            width: '300px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#fff' }}>Login</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '0 5px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '0 5px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          <button
            onClick={handleLoginSubmit}
            style={{
              fontSize: '12px',
              padding: '5px 8px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Submit
          </button>
          <button
            onClick={handleModalClose}
            style={{
              fontSize: '12px',
              padding: '5px 8px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Sign-Up Modal */}
      {showSignUpModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#3e3e42',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 2000,
            width: '300px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#fff' }}>Sign Up</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '0 5px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>} {/* Show email error */}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '0 5px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '0 5px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            onClick={handleSignUpSubmit}
            style={{
              fontSize: '12px',
              padding: '5px 8px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Submit
          </button>
          <button
            onClick={handleModalClose}
            style={{
              fontSize: '12px',
              padding: '5px 8px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
