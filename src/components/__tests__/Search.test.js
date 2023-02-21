import "@testing-library/jest-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import Body from "../Body";
import { Provider } from "react-redux";
import store from "../../utils/store.js";
import { StaticRouter } from "react-router-dom/server";
import { RESTAURANT_DATA } from "../../mocks/data";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(RESTAURANT_DATA);
    },
  });
});

test("Shimmer should load on Homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );

  const shimmer = body.getByTestId("shimmer");

  await waitFor(() => expect(shimmer.children.length).toBe(40));

  // console.log(shimmer);
});

test("Resturant should load on Homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );

  await waitFor(() => {
    const resList = body.getByTestId("resturant-list");
    expect(resList.children.length).toBe(15);
  });
});

test("Search for  food  on Homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );

  await waitFor(() => {
    body.getByTestId("search-btn");
  });
  const input = body.getByTestId("search-input");
  const searchBtn = body.getByTestId("search-btn");
  fireEvent.change(input, {
    target: {
      value: "food",
    },
  });
  fireEvent.click(searchBtn);
  const resList = body.getByTestId("resturant-list");
  expect(resList.children.length).toBe(4);
});

test("Search for  no resturant found  on Homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );

  await waitFor(() => {
    body.getByTestId("search-btn");
  });
  const input = body.getByTestId("search-input");
  const searchBtn = body.getByTestId("search-btn");
  fireEvent.change(input, {
    target: {
      value: "testt",
    },
  });
  fireEvent.click(searchBtn);
  const resList = body.getByTestId("resturant-list");
  // console.log(resList.children[0].innerHTML);

  expect(resList.children[0].innerHTML).toBe(" NO restruant found");
});
