import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import { FETCH_MENU_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  // how to read a dynamic URL params
  const { resId } = useParams();
  const dispatch = useDispatch();
  console.log("resId", resId);
  // Use proper names
  const restaurant = useRestaurant(FETCH_MENU_URL + resId);

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  if (!restaurant) {
    return null;
  }

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="flex">
      <div>
        <h1>Restraunt id: {resId}</h1>
        <h2>{restaurant?.name}</h2>
        <img src={IMG_CDN_URL + restaurant?.cloudinaryImageId} />
        <h3>{restaurant?.area}</h3>
        <h3>{restaurant?.city}</h3>
        <h3>{restaurant?.avgRating} stars</h3>
        <h3>{restaurant?.costForTwoMsg}</h3>
      </div>
      <div className="p-5">
        <h1>Menu</h1>
        <ul data-testid="menu">
          {Object.values(restaurant?.menu?.items).map((item) => (
            <li key={item.id}>
              {item.name}-{" "}
              <button
                data-testid="add-item"
                className="p-1 bg-green-50"
                onClick={() => addFoodItem(item)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
