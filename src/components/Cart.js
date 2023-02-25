import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import FoodItem from "./FoodItem";
import { addItem, removeItem } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };
  const removeFoodItem = (item) => {
    dispatch(removeItem(item));
  };

  const clearItems = () => {
    dispatch(clearCart());
  };
  const uniqueCart = [...new Set(cartItems)];
  const total =
    cartItems.length > 0
      ? cartItems
          .map((x) => (x.price > 0 ? x.price / 100 : x.defaultPrice / 100))
          .reduce((sum, a) => sum + a, 0)
      : 0;

  return (
    <div className="flex flex-wrap flex-col items-center ">
      {cartItems.length > 0 ? (
        <>
          <h1 className="font-bold text-3xl">
            cart Items - {cartItems.length}
          </h1>
          <button className="bg-green-200 p-2 m-5" onClick={() => clearItems()}>
            clearcart
          </button>
        </>
      ) : null}
      <div>
        {uniqueCart.map((item) => {
          return (
            <FoodItem
              key={item.id}
              {...item}
              cartItems={cartItems}
              addFoodItem={addFoodItem}
              removeFoodItem={removeFoodItem}
              item={item}
            />
          );
        })}
      </div>
      {cartItems.length > 0 ? (
        <>
          <div className="flex flex-col items-end gap-x-8">
            <div className="font-bold">
              <label>Item Total </label>
              {`₹${total}`}
            </div>
            {/* <div className="font-bold">Govt and other taxes `₹200</div> */}
            <div className="font-bold text-md">
              <label>TO PAY </label>
              {total}
            </div>
          </div>
          <button
            className="bg-green-500 p-2 m-5 text-white font-serif"
            onClick={() => navigate("/cart")}
          >
            CHECKOUT
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-gray-600 mb-2">Cart Empty</h1>
          <img
            className="w-80 "
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_480/Cart_empty_-_menu_2x_ejjkf2"
          ></img>
        </>
      )}
    </div>
  );
};

export default Cart;
