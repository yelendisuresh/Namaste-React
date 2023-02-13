import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import FoodItem from "./FoodItem";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const clearItems = () => {
    dispatch(clearCart());
  };
  return (
    <div>
      <h1 className="font-bold text-3xl"> cart Items - {cartItems.length}</h1>
      <button className="bg-green-100 p-2 m-5" onClick={() => clearItems()}>
        clearcart
      </button>
      <div className="flex flex-wrap">
        {cartItems.map((item) => {
          return <FoodItem key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Cart;
