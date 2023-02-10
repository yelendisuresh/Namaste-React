import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import { filterData } from "../utils/helper";
import useRestaurant from "../utils/useRestaurant";
import { RESTAURANT_LIST } from "../constants";

import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allResturants, setAllResturants] = useState([]);
  const [filteredRestaurants, setFilteredRstaurants] = useState([]);
  const { user, setUser } = useContext(UserContext);
  // const res = useRestaurant(RESTAURANT_LIST);
  // setAllResturants(res?.data?.cards[2]?.data?.data?.cards);
  // setFilteredRstaurants(res?.data?.cards[2]?.data?.data?.cards);
  useEffect(() => {
    console.log("useeffect");
    getResturants();
  }, []);
  async function getResturants() {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING"
      );
      const res = await data.json();
      console.log("data", res?.data?.cards[2]?.data?.data?.cards);
      // optinal chaining
      setAllResturants(res?.data?.cards[2]?.data?.data?.cards);
      setFilteredRstaurants(res?.data?.cards[2]?.data?.data?.cards);
    } catch (error) {
      console.log("error", error);
    }
  }
  console.log("render");
  const offline = useOnline();
  if (!offline) {
    return <h1> offline, please check your connection!!</h1>;
  }
  if (!allResturants) {
    return null;
  }

  return allResturants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container p-5 bg-pink-50 my-5">
        <input
          type="text"
          className="focus:bg-green-200 p-2 m-2"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <button
          className="p-2 m-2 bg-purple-900 hover:bg-gray-500 text-white rounded-md"
          onClick={() => {
            //need to filter the data
            const data = filterData(searchText, allResturants);
            // update the state - restaurants
            setFilteredRstaurants(data);
          }}
        >
          Search
        </button>
        <input
          tye="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          tye="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex flex-wrap ">
        {filteredRestaurants.length === 0 ? (
          <p> NO restruant found</p>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant.data.id}
                key={restaurant.data.id}
              >
                <RestaurantCard {...restaurant.data} />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Body;
