import React, {useState} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {Route, Routes} from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";


export default function App() {

  const [cart, setCart] = useState([])

  function addToCart(id, sku) {
    setCart(prevState => {
      const itemInCart = prevState.find(item => item.sku === sku);
      if(itemInCart){
        //add copy of item in cart with increased quantity
        return prevState.map(
          (item) =>
            item.sku === sku ? {...item, quantity: item.quantity +1} : item
        )
      } else {
        //return new array with new itewm
        return [...prevState, {id, sku, quantity: 1}];  //can ommit id:id, sku:sku
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart(prevState => {
      return prevState.map((item) => item.sku === sku ? {...item, quantity} : item)
    })
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
              </Routes>
          </main>
        </div>
        <Footer />
      </>
  );
}
