import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState([]);

  //   useEffect(() => {
  //     const data = localStorage.getItem("auth");
  //     if (data) {
  //       const parsData = JSON.parse(data);
  //       setAuth({ ...auth, user: parsData.user, token: parsData.token });
  //     }
  //   }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
