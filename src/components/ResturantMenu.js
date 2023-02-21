import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import { FETCH_MENU_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  // how to read a dynamic URL params
  const { resId } = useParams();
  const dispatch = useDispatch();
  console.log("resId", resId);
  const cartItems = useSelector((state) => state.cart.items);
  // Use proper names
  const restaurant = useRestaurant(FETCH_MENU_URL + resId);

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };
  const removeFoodItem = (item) => {
    dispatch(removeItem(item));
  };

  if (!restaurant) {
    return null;
  }

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="mt-40">
      <div className="flex justify-evenly  text-white  items-center bg-gray-900">
        <img
          className="w-96 m-2"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
        />
        <div>
          {/* <h1>Restraunt id: {resId}</h1> */}
          <h2>{restaurant?.name}</h2>

          <h3>{restaurant?.area}</h3>
          <h3>{restaurant?.city}</h3>
          <h3>{restaurant?.avgRating} stars</h3>
          <h3>{restaurant?.costForTwoMsg}</h3>
        </div>
        <div>
          <p> Offer</p>
          <p> 50% off up to ₹90 | Use code WELCOME50</p>
          <p>Free Delivery</p>
        </div>
      </div>
      <div className="p-5 flex center-items justify-center">
        <ul data-testid="menu" className="flex flex-col">
          {Object.values(restaurant?.menu?.items).map((item) => (
            <li key={item.id} className="flex border-b py-3">
              <div>
                <p className="my-2"> {item.name}</p>
                <p> {`₹${item.price / 100}`}</p>
                <p className="w-96  overflow-wrap-break-word mt-2">
                  {item.description}
                </p>
              </div>
              <div>
                <img
                  className="w-28 h-24 m-2 relative"
                  src={IMG_CDN_URL + item?.cloudinaryImageId}
                />
                <div
                  className="flex justify-between bg-slate-200 border border-gray-300  absolute w-20 
                translate-x-[38%] translate-y-[-100%] "
                >
                  <button
                    data-testid="add-item space-x-4"
                    className="p-1 "
                    onClick={() => removeFoodItem(item)}
                  >
                    {cartItems.filter((x) => x.id == item.id).length
                      ? "-"
                      : null}
                  </button>
                  <p>
                    {cartItems.filter((x) => x.id == item.id).length === 0
                      ? null
                      : cartItems.filter((x) => x.id == item.id).length}
                  </p>

                  <button
                    data-testid="add-item"
                    className="p-1"
                    onClick={() => addFoodItem(item)}
                  >
                    {cartItems.filter((x) => x.id == item.id).length
                      ? "+"
                      : "add"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
