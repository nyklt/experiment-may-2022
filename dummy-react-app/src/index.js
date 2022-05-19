import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Header from "./components/Header";
import NoMatch from "./components/NoMatch";
import About from "./components/About";
import Terms from "./components/Terms";
import {BrowserRouter,Routes,Route} from "react-router-dom"; 

if(!localStorage.getItem('cart') && !localStorage.getItem('products_react')){
  const products = [
  '["Item 1","Item 2","Item 3","Item 4"]'
  ]
  localStorage.setItem("products_react", products);
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    { ReactDOM.createPortal(<Header />, document.querySelector('app-header')) }
      <Routes>
        <Route path="/react" exact element={<App />} />
        <Route path="/react/about" element={<About />} />
        <Route path="/react/terms" element={<Terms />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById("root")
  
);
