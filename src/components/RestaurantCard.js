import { IMG_CDN_URL } from "../constants";

import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestrauntCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  area,
  deliveryTime,
  costForTwoString,
  avgRating,
}) => {
  // const {
  //   user: { name: userName, email },
  // } = useContext(UserContext);
  return (
    <div
      className="w-64 h-full m-5 shadow-lg rounded-md p-4 transition-shadow 
      shadow-slate-200 hover:shadow-md hover:cursor-pointer hover:ease-in "
    >
      <img src={IMG_CDN_URL + cloudinaryImageId} className="width-[100%]" />
      <h2 className=" font-serif font-medium text-xl">{name}</h2>
      <h3>{cuisines.join(", ")}</h3>
      <h4>{area}</h4>
      <div className="flex  items-center text-xs  justify-between">
        <h4
          className="items-center mt-1 p-1 flex"
          style={
            avgRating < 4
              ? { backgroundColor: "red" }
              : avgRating === "--"
              ? { backgroundColor: "white", color: "black" }
              : { color: "white", backgroundColor: "green" }
          }
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="star"
            className="w-4 text-black mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
            ></path>
          </svg>
          {avgRating}
        </h4>
        <div>•</div>
        <div>{deliveryTime} MIN</div>
        <div>•</div>
        <div>{costForTwoString}</div>
      </div>
    </div>
  );
};

export default RestrauntCard;
