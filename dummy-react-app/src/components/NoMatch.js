import React from "react";
import { Link } from "react-router-dom";

const NoMatch= () => {
    return (
        <div className="ui main">
            <div className="welcome"> 
                <h2>Nothing to see here!</h2>
                <p>
                <Link to="/react">Go to the home page</Link>
                </p>
            </div>
      </div>
    );
}

export default NoMatch;