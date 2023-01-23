import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer"


function filterData(searchText, restaurants){
  const filterData= restaurants.filter((restaurant)=>{
     return  restaurant.data.name.toLowerCase().includes(searchText.toLowerCase());
  });
return filterData;
}
const Body = () => {
  const [searchText,setSearchText]=useState("");
  const [allResturants,setAllResturants]=useState([]);
  const [filteredRestaurants,setFilteredRstaurants]=useState([]);

  

  useEffect(()=>{
    console.log("useeffect")
    getResturants();
  },[])
  async function  getResturants(){
    try {

      const data =  await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING")
      const res = await data.json();
      console.log("data",res?.data?.cards[2]?.data?.data?.cards);
      // optinal chaining
      setAllResturants(res?.data?.cards[2]?.data?.data?.cards);
      setFilteredRstaurants(res?.data?.cards[2]?.data?.data?.cards)
      
    } catch (error) {
      console.log("error",error)
    }

  } 
  console.log("render")
  if(!allResturants){
    return null
  }

  return  allResturants.length === 0 ? <Shimmer/>:(
    <>
      <input type="text" placeholder="search"
      value={searchText}  onChange={(e)=> setSearchText(e.target.value)}/>
      <button  onClick={() =>{
                const data= filterData(searchText, allResturants);
                setFilteredRstaurants(data);
      }
      }>search</button>
      <div className="restaurant-list">
        {filteredRestaurants.length === 0 ? <p> No Resturant Found</p>: null}
        {  filteredRestaurants.map((restaurant)=>{
          return ( <RestaurantCard  key={restaurant.id} {...restaurant.data}/>)
        })

        }
      </div>
    </>
  )
};

export default Body;
