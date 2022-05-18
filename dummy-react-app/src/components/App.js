import React, { useState, useEffect } from "react";
import "./App.css";
import user from "../images/user.png";

function App() {
  const LOCAL_STORAGE_PRODUCT_KEY = "products_react";
  const LOCAL_STORAGE_CART_KEY = "cart";
  
  const [products, setProducts] = useState([]);
  const [carts, setCart] = useState([]);
  
  const addContactHandler = (product) => {
    setCart([...carts, product]);

    const newProductList = products.filter((productSelected) => {
      return product !== productSelected;
    });
  
    setProducts(newProductList);
  };

  const removeCartHandler = (cart) => {
    const newContactList = carts.filter((cartSelected) => {
      return cart !== cartSelected;
    });
  
    setCart(newContactList);

    setProducts([...products, cart]);
  };
  
  useEffect(() => {
    const retriveProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PRODUCT_KEY));
    if (retriveProducts) setProducts(retriveProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PRODUCT_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const retriveCartProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY));
    if (retriveCartProducts) setCart(retriveCartProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(carts));
  }, [carts]);


  const renderProductsList = products.map((product) => {
    return (
      <div className="item">
        <img className="ui avatar image" src={user} alt="user" />
        <div className="content">
          <div className="header">{product}</div>
        </div>
        <i
        className="plus circle icon"
        style={{ color: "green", marginTop: "7px" }}
        onClick={() => addContactHandler(product)}
      ></i>
      </div>
    );
  });
  const renderCartList = carts.map((cart) => {
    return (
      <div className="item">
        <img className="ui avatar image" src={user} alt="user" />
        <div className="content">
          <div className="header">{cart}</div>
        </div>
        <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => removeCartHandler(cart)}
      ></i>
      </div>
    );
  });
  return (
    <div className="ui main">
      <div className="welcome"> 
        <h3>Welcome to the Products Page</h3>
      
        <div className="ui celled list">
          {renderProductsList}
        </div>
      </div>

      <div className="welcome"> 
        <h3>Welcome to the Cart Page</h3>
      
        <div className="ui celled list">
          {renderCartList}
        </div>
      </div>
    </div>
  );
}

export default App;
