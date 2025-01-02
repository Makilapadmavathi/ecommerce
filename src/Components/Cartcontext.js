// CartContext.js
import React, { createContext, useReducer, useContext } from "react";

// Action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";

// Initial state
const initialState = {
  cartItems: [],
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = { ...action.payload, quantity: 1 };
      return {
        ...state,
        cartItems:  [...state.cartItems, newItem],
      };
    case REMOVE_FROM_CART:
      return {
       ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      case "CHANGE_CART_QTY":
        return {
          ...state,
          cartItems: state.cartItems.filter((c) =>
            c.id === action.payload.id ? ((c.quantity = action.payload.quantity) ,c.price=(c.quantity * c.price)): c.quantity
          ),
         cartItems:[...state.cartItems]
        };
    case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1}
            : item
        ),
      };
    case DECREASE_QUANTITY:
      return {
       
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};
// Custom hook to use the cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
// Create context
const CartContext = createContext();

// Create provider component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState: state, cartDispatch:dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
export {CartProvider,useCart};
