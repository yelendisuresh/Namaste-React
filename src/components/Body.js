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
      const data = await fetch(RESTAURANT_LIST);
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
    <div className="bg-slate-50 ">
      <div className="search-container  p-5 my-5 flex justify-center">
        <input
          type="text"
          className="border-solid border-black p-2 m-2  w-2/5 rounded-lg "
          placeholder="Search for resturant"
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
        {/* <input
          tye="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          tye="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        /> */}
      </div>
      <div className="flex flex-wrap justify-center align-center width- [auto] ">
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
    </div>
  );
};

export default Body;
