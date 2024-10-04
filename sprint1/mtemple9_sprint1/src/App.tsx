import React, { useState, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "./assets/Animation - 1727932395608.json";

function App() {
  const [speed, setSpeed] = useState(1); // animation speed
  const [size, setSize] = useState(1); // animation size
  const [isSignup, setIsSignup] = useState(false); // state for toggle
  const [username, setUsername] = useState(""); // username 
  const [password, setPassword] = useState(""); // Password 
  const [users, setUsers] = useState<{ username: string; password: string }[]>([]); // users
  const [error, setError] = useState(""); // error check
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login stat
  const [currentUser, setCurrentUser] = useState<string | null>(null); // username
  const lottieRef = React.useRef<LottieRefCurrentProps | null>(null);

  // Function to change animation speed
  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(event.target.value)); // speed from slider 
  };

  // animation speed
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  // easter egg
  const handleAnimationClick = () => {
    setSize((prevSize) => prevSize + 0.1);
  };

  // signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.find((user) => user.username === username)) {
      setError("Username already exists!");
      return;
    }
    setUsers((prev) => [...prev, { username, password }]);
    setUsername("");
    setPassword("");
    setError(""); 
    setIsSignup(false);
  };

  // login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      setError("Invalid login!");
      return;
    }
    setCurrentUser(username);
    setIsLoggedIn(true);
    setError(""); 
    alert(`Welcome back, ${username}!`);
    setUsername("");
    setPassword("");
  };

  // logout
  const handleLogout = () => {
    setIsLoggedIn(false); 
    setCurrentUser(null); 
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center mx-0 text-white bg-gray-400 p-6">
      {/* status Message */}
      <div className="absolute top-4 text-center w-full">
        {isLoggedIn ? (
          <div>
            <span className="text-green-500">Logged in as {currentUser}</span>
            <button 
              onClick={handleLogout} 
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <span className="text-red-500">Not logged in</span>
        )}
      </div>

      {/* header Buttons */}
      <div className="absolute top-12 right-4">
        <button 
          onClick={() => setIsSignup(true)}
          className="bg-gray-700 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600 transition"
        >
          Sign Up
        </button>
        <button 
          onClick={() => setIsSignup(false)}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Login
        </button>
      </div>

      {/* error message */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {/* sign up, login */}
      <form onSubmit={isSignup ? handleSignup : handleLogin} className="mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="px-4 py-2 rounded mr-2 text-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-2 rounded mr-2 text-gray-900"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <h1 className="text-4xl font-bold text-gray-900 italic underline mt-8">Animations for 340</h1>
      <h2 className="text-2xl text-gray-900 mt-2">by Matt</h2>
      <div 
        onClick={handleAnimationClick} 
        style={{ transform: `scale(${size})`, transition: 'transform 0.2s ease' }}
      >
        <Lottie 
          lottieRef={lottieRef} 
          animationData={animationData} 
          className="mt-6" 
        />
      </div>
      <div className="mt-4">
        <label htmlFor="speedSlider" className="text-gray-900">Animation Speed: {speed.toFixed(2)}x</label>
        <input
          id="speedSlider"
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={speed}
          onChange={handleSpeedChange}
          className="mx-2 accent-gray-700"
        />
      </div>
      <a 
        href="https://lottiefiles.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-4 px-6 py-3 bg-gray-700 text-white rounded shadow-md hover:bg-gray-600 transition"
      >
        Source
      </a>
    </div>
  );
}

export default App;
