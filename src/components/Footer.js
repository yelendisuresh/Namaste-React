import Usercontext from "../utils/UserContext";
import { useContext } from "react";

const Footer = () => {
  const {
    user: { name, email },
  } = useContext(Usercontext);
  return (
    <h4 className="p-10  m-10">
      This site is developed by {email} - {name}
    </h4>
  );
};

export default Footer;
