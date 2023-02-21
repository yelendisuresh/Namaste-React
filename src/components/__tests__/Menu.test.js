import "@testing-library/jest-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import ResturaruntMenu from "../ResturantMenu";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../utils/store.js";
import { StaticRouter } from "react-router-dom/server";
import { MENU_DATA } from "../../mocks/data";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MENU_DATA);
    },
  });
});

test("ADD items to cart items", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
        <ResturaruntMenu />
      </Provider>
    </StaticRouter>
  );

  await waitFor(() => {
    body.getByTestId("menu");
  });
  const addBtn = body.getAllByTestId("add-item");
  fireEvent.click(addBtn[0]);
  fireEvent.click(addBtn[1]);

  const cart = body.getByTestId("cart");

  expect(cart.innerHTML).toBe("cart 2 items");
});
