import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {Route, Routes} from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {

  return (
      <>
        <div className="content">
          <Header />
          <main>
              <Routes>
                  <Route path="/" element={<h1>Welcome</h1>}/>
                  <Route path="/:category" element={<Products/>} />
                  <Route path="/:category/:id" element={<Detail/>} />
                  <Route path="/cart" element={<Cart/>} />
                  <Route path="/checkout" element={<Checkout/>} />
              </Routes>
          </main>
        </div>
        <Footer />
      </>
  );
}
