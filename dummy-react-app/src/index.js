import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Header from "./components/Header";
import NoMatch from "./components/NoMatch";
import {BrowserRouter,Routes,Route} from "react-router-dom"; 

if(!localStorage.getItem('cart') && !localStorage.getItem('products_react')){
  const products = [
  '["Item 1","Item 2","Item 3","Item 4"]'
  ]
  localStorage.setItem("products_react", products);
}

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/react" exact element={<App />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById("root")
  
);
