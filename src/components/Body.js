import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import { filterData } from "../utils/helper";

import useOnline from "../utils/useOnline";
import Loader from "./Loader";
const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allResturants, setAllResturants] = useState([]);
  const [filteredRestaurants, setFilteredRstaurants] = useState([]);
  const [offSet, setOffset] = useState(15);
  const [loading, setLoading] = useState(false);

  async function getResturants() {
    try {
      const data = await fetch(
        `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&offset=${offSet}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`
      );
      const res = await data.json();
      // console.log("data", res?.data?.cards[2]?.data?.data?.cards);
      // optinal chaining
      // setAllResturants(res?.data?.cards[2]?.data?.data?.cards);
      // setFilteredRstaurants(res?.data?.cards[2]?.data?.data?.cards);
      setLoading(true);
      setAllResturants([...allResturants, ...res?.data?.cards]);
      setFilteredRstaurants([...allResturants, ...res?.data?.cards]);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    // getCardData();
    getResturants();
  }, [offSet]);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setOffset((prev) => prev + 15);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  // console.log("render");
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
          data-testid="search-input"
          type="text"
          className="border-solid  border border-gray-400 p-2 m-2  w-2/5 rounded-lg placeholder-slate-400 contrast-more:border-slate-400 focus:border-blue-500 focus:outline-none focus:shadow-outline-blue transition duration-300 "
          placeholder="Search for resturant"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <button
          data-testid="search-btn"
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
      </div>
      <div
        className="container mx-auto py-4 grid grid-cols-auto gap-2  md:grid-cols-2 
        lg:grid-cols-4 sm:grid-col-2"
        data-testid="resturant-list"
      >
        {filteredRestaurants.length === 0 ? (
          <p> NO restruant found</p>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant.data.data.id}
                key={restaurant.data.data.id}
              >
                <RestaurantCard {...restaurant.data.data} />
              </Link>
            );
          })
        )}
      </div>
      {loading ? <Loader /> : null}
    </div>
  );
};

export default Body;
