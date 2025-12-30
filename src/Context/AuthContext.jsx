import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export function AuthContextProvider(props) {
  const [logindData, setLoginData] = useState(null);

  function saveLoginData() {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setLoginData(null);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logindData, saveLoginData, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
