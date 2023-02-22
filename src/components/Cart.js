import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import FoodItem from "./FoodItem";
import { addItem, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
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
    <div className="mt-80 flex flex-wrap flex-col justify-center items-center">
      {cartItems.length > 0 ? (
        <>
          <h1 className="font-bold text-3xl">
            {" "}
            cart Items - {cartItems.length}
          </h1>
          <button className="bg-green-100 p-2 m-5" onClick={() => clearItems()}>
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
          <div className="font-bold">Item Total {`₹${total}`}</div>
          <div className="font-bold">Govt and other taxes `₹200</div>
          <div className="font-bold text-xl">TO PAY {total + 200}</div>
        </>
      ) : (
        <h4>Your Cart is empty, please add some items</h4>
      )}
    </div>
  );
};

export default Cart;
