import React, {useEffect, useState} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {Route, Routes} from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";


export default function App() {

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
  });

  useEffect(
    () => localStorage.setItem("cart", JSON.stringify(cart)),
    [cart]
  );

  function addToCart(id, sku) {
    setCart(items => {
      const itemInCart = items.find(item => item.sku === sku);
      if(itemInCart){
        //add copy of item in cart with increased quantity
        return items.map(
          (item) =>
            item.sku === sku ? {...item, quantity: item.quantity +1} : item
        )
      } else {
        //return new array with new itewm
        return [...items, {id, sku, quantity: 1}];  //can ommit id:id, sku:sku
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart(items => {
      return (quantity === 0)
        ? items.filter(item => item.sku !== sku)
        : items.map((item) => item.sku === sku ? {...item, quantity} : item)
    })
  }

  function emptyCart() {
    setCart([]);
  }
    
  return (
      <>
        <div className="content">
          <Header />
          <main>
              <Routes>
                  <Route path="/" element={<h1>Welcome</h1>}/>
                  <Route path="/:category" element={<Products />} />
                  <Route path="/:category/:id" element={<Detail addToCart={addToCart}/>} />
                  <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
                  <Route path="/checkout" element={<Checkout cart={cart} emptyCart={emptyCart} />} />
              </Routes>
          </main>
        </div>
        <Footer />
      </>
  );
}
