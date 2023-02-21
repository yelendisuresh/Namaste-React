import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../../utils/store";

import Header from "../Header";

import { StaticRouter, staticRouter } from "react-router-dom/server";
test("logo should load on render header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const logo = header.getByTestId("logo");
  // console.log("header", logo.src);
  expect(logo.src).toBe(
    "https://yt3.ggpht.com/ytc/AMLnZu_EC-ECXAxRAixWGEfMsE1rdSoetBHyxmLNdtCB=s900-c-k-c0x00ffffff-no-rj"
  );
});

test("online status  should be green  on render header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const onlineStatus = header.getByTestId("online-status");
  // console.log("header", onlineStatus.innerHTML);
  expect(onlineStatus.innerHTML).toBe("✅");
});

test("online status  should be green  on render header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </StaticRouter>
  );

  const onlineStatus = header.getByTestId("cart");
  // console.log("header", onlineStatus.innerHTML);
  expect(onlineStatus.innerHTML).toBe("cart 0 items");
});
