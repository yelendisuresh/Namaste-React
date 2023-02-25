const FoodItem = ({
  name,
  price,
  id,
  cartItems,
  addFoodItem,
  item,
  removeFoodItem,
}) => {
  return (
    <div className=" p-2 m-2  flex justify-center items-center gap-3">
      <p className="text-sm w-36 font-normal  text-gray-900">{name}</p>
      <div
        className="flex justify-between  items-center  gap-2 border border-gray-300  w-16 h-7 
       text-green-500"
      >
        <button
          data-testid="add-item space-x-4"
          className="p-1 "
          onClick={() => removeFoodItem(item)}
        >
          {cartItems?.filter((x) => x.id == id).length ? "-" : null}
        </button>
        <p>
          {cartItems?.filter((x) => x.id == id).length === 0
            ? null
            : cartItems?.filter((x) => x.id == id).length}
        </p>

        <button
          data-testid="add-item"
          className="p-1"
          onClick={() => addFoodItem(item)}
        >
          {cartItems?.filter((x) => x.id == id).length ? "+" : "add"}
        </button>
      </div>
      <h5>
        {`₹${(price / 100) * cartItems?.filter((x) => x.id == id).length} `}
      </h5>
    </div>
  );
};

export default FoodItem;
