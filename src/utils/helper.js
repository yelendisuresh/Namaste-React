export function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) => {
    return restaurant.data.data.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });
  return filterData;
}
