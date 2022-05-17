import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="ui main">
      <div className="welcome"> 
        <h2>Welcome to the contact Page</h2>
        <Link to="/contacts">Click Here to create and see your contact list</Link>
      </div>
    </div>
  );
}

export default App;
