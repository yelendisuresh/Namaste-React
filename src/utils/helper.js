export function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) => {
    return restaurant.data.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });
  return filterData;
}

export function sortByField(searchText, restaurants) {
  return function (a, b) {
    return (a[field] > b[field]) - (a[field] < b[field]);
  };
}
