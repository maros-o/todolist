import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import proxy from "../global/proxy";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [renderChild, setRenderChild] = useState(false);

  const loading = useRef(true);

  const navigate = useNavigate();

  const loginUser = async (e, setOpen) => {
    e.preventDefault();
    console.log("loginUser - called");

    let response = await fetch(proxy + "/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log("data:", data);

    if (response.status === 200) {
      console.log("loginUser - success");
      setAuthTokens(data);
      console.log("loginUser - decoded", jwt_decode(data.access));
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      console.log("loginUser - failed");
      e.target.password.value = "";
      setOpen(true);
    }
  };

  const registerUser = async (e, setOpen) => {
    e.preventDefault();
    console.log("registerUser - called");

    let response = await fetch(proxy + "/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log("data:", data);

    if (response.status === 201) {
      console.log("registerUser - success");
      console.log("registerUser - userData: ", jwt_decode(data.access));
      setUser(jwt_decode(data.access));
      setAuthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      console.log("registerUser - failed");
      e.target.password.value = "";
      if (response.status === 409) setOpen(true);
      else alert("Error");
    }
  };

  const automaticLogoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const logoutUser = () => {
    console.log("logout");
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/signin");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,

    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    const updateToken = async () => {
      console.log("updateToken - called");

      if (authTokens === null) {
        console.log("updateToken - No tokens");
        automaticLogoutUser();
        return;
      }

      let response = await fetch(proxy + "/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      });
      let data = await response.json();

      if (response.status === 200) {
        console.log("loginUser - decoded", jwt_decode(data.access));
        setAuthTokens(data);
        let userData = jwt_decode(data.access);
        userData["username"] = user.username;
        setUser(userData);
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log("updateToken - success", data);
      } else {
        console.log("updateToken - failed", response.status);
        automaticLogoutUser();
      }

      console.log("user:", user.username);
    };

    if (loading.current) {
      loading.current = false;
      console.log('loading:', loading.current);
      setRenderChild(true)
      updateToken();
    }

    let delay = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [authTokens, user]);

  return (
    <AuthContext.Provider value={contextData}>
      {renderChild ? children : null}
    </AuthContext.Provider>
  );
};
