import React, {useContext, useEffect, useReducer} from "react";
import cartReducer from "./cartReducer";

const MyCustomCartContext = React.createContext(null)

let initialCartState;
try {
  initialCartState = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCartState = [];
}

export function MyCustomCartContextProvider(props) {

  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(
    () => localStorage.setItem("cart", JSON.stringify(cart)),
    [cart]
  );


  return (
    <MyCustomCartContext.Provider value={{cart, dispatch}}>
      {props.children}
    </MyCustomCartContext.Provider>
  )
}

export function useMyCustomCartContextHook() {
  const context = useContext(MyCustomCartContext);
  if (!context) {
    throw new Error("useMyCustomCartContextHook must be used within a MyCustomCartContextProvider");
  }
  return context;
}