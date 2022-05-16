import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Main from "./components/Main";
import Header from "./components/Header";
import {BrowserRouter,Routes,Route} from "react-router-dom"; 

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contacts" element={<Main />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById("root")
);
