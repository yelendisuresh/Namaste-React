import { createContext } from "react";

const UserContext = createContext({
  user: { name: "dummyname", email: "dummy@gmail.com" },
});
UserContext.displayName = "UserContext";

export default UserContext;
