import React, { createContext, useContext, useReducer } from "react";
import {
  signIn as signInApi,
  signUp as signUpApi,
  verify as verifyApi,
} from "../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isVerified: false,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        loading: false,
      };
    case "signup":
      return {
        ...state,
        user: action.payload.user,
      };
    case "verify":
      return {
        ...state,
        isVerified: action.payload.isVerified,
      };
    case "logout":
      return initialState;
    case "start_loading":
      return { ...state, loading: true };
    case "stop_loading":
      return { ...state, loading: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const storedVerficationStatus = localStorage.getItem("isVerified");

  const navigate = useNavigate();

  const [{ user, isAuthenticated, loading }, dispatch] = useReducer(reducer, {
    user: storedUser || null,
    isAuthenticated: storedUser && storedToken,
    isVerified: storedVerficationStatus || false,
    loading: false,
  });

  async function login(data) {
    try {
      dispatch({ type: "start_loading" });

      const response = await signInApi(data);

      const user = response.user;

      const token = response.user.token;

      localStorage.setItem("user", JSON.stringify(user));

      localStorage.setItem("token", token);

      dispatch({ type: "login", payload: { user, isAuthenticated: true } });
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch({ type: "stop_loading" });
    }
  }

  async function signup(userData) {
    try {
      dispatch({ type: "start_loading" });

      const response = await signUpApi(userData);

      const { user } = response;

      const { token } = user;

      localStorage.setItem("user", JSON.stringify(user));

      localStorage.setItem("token", token);

      navigate("/verify");
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    } finally {
      dispatch({ type: "stop_loading" });
    }
  }

  async function verify(data) {
    try {
      dispatch({ type: "start_loading" });

      const response = await verifyApi(data);

      const { message } = response;

      localStorage.setItem("isVerified", true);

      dispatch({ type: "verify", payload: { isVerified: true } });

      toast.success(message);

      navigate("/dashboard");
      // const {
      //   data: { user, token },
      // } = response;
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    } finally {
      dispatch({ type: "stop_loading" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        verify,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
