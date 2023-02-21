import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";

// SPA - Single Page Application???
// Client Side Routing

const Title = () => (
  <a href="/">
    <img
      className="logo w-24  place-items-center hidden md:block"
      width={"30px"}
      data-testid="logo"
      alt="logo"
      src="https://yt3.ggpht.com/ytc/AMLnZu_EC-ECXAxRAixWGEfMsE1rdSoetBHyxmLNdtCB=s900-c-k-c0x00ffffff-no-rj"
    />
  </a>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isOnline = useOnline();
  const cartItems = useSelector((state) => state.cart.items);
  const {
    user: { name, email },
  } = useContext(UserContext);

  return (
    <div
      className="flex  flex-col justify-between items-center bg-pink-50 shadow-lg
     sm:bg-blue-50 md:bg-yellow-50  top-0 left-0 right-0 p-3 z-10 
     sm:flex-row "
    >
      <Title />
      <div className="nav-items">
        <ul className="flex  flex-col  md:py-10  sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row ">
          <li className="px-2">
            <Link to="/">Home</Link>
          </li>

          <Link to="/about">
            <li className="px-2">About</li>
          </Link>
          <Link to="/contact">
            <li className="px-2">Contact</li>
          </Link>
          <li className="px-2">Cart</li>
          <Link to="/instamart">
            <li className="px-2">Instamart</li>
          </Link>
          <Link to="/cart">
            <li className="px-2" data-testid="cart">
              cart {cartItems.length} items
            </li>
          </Link>
        </ul>
      </div>
      <h1 data-testid="online-status">{isOnline ? "✅" : "🔴"}</h1>
      <span className="p-2  sm:py-4 md:py-10 font-bold text-red-900">
        {email} -{name}
      </span>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};

export default Header;
