import React from "react";
import "./App.css";
import Login from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const user = null;

  return (
    <div className="App">
      <Router>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/test" element={<h1>This is yash</h1>} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
