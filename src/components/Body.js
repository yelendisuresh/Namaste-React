import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer"
import { restaurantList } from "../constants";


function filterData(searchText, restaurants){
  const filterData= restaurants.filter((restaurant)=>{
     return  restaurant.data.name.toLowerCase().includes(searchText.toLowerCase());
  });
return filterData;
}
const Body = () => {
  const [searchText,setSearchText]=useState("");
  const [restaurants,setResturants]=useState(restaurantList);
   
  return(
    <>
      <input type="text" placeholder="search"
      value={searchText}  onChange={(e)=> setSearchText(e.target.value)}/>
      <button  onClick={() =>{
                const data= filterData(searchText, restaurants);
                setResturants(data);
      }
      }>search</button>
      <div className="restaurant-list">
        {  restaurants.map((restaurant)=>{
          return ( <RestaurantCard  key={restaurant.id} {...restaurant.data}/>)
        })

        }
      </div>
    </>
  )
};

export default Body;
