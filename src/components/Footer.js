import Usercontext from "../utils/UserContext";
import { useContext } from "react";

const Footer = () => {
  const {
    user: { name, email },
  } = useContext(Usercontext);
  return (
    <h4 className="p-10  m-10 bg-light text-black">
      This site is developed by {email} - {name}
      @2023 FOODWALE : Created by{" "}
      {/* <a target="_blank" href="https://github.com/yelendisuresh/Namaste-React">
        github
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/yelendi-suresh-babu-bab691aa/"
      >
        Linked
      </a> */}
      @2023
    </h4>
  );
};

export default Footer;
