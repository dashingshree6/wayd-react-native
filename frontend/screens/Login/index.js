import axios from 'axios';
import { API } from '../backend';
import SyncStorage from 'sync-storage';

export const signup = (user) =>
  axios.post(`${API}/signup`, user);

export const updateUser = (id,user) =>
  axios.put(`${API}/user/${id}`, user);

export const setAuthToken = (token) => {
    if (token) {
      // Apply to every request
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
};

export const signin = (userData) =>
  axios.post(`${API}/signin`, userData);


//updated
export const authenticate = (data, next) => {
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("jwt", JSON.stringify(data));
    //   setAuthToken(data.token);
    //   next();
    // }

    if (global.window !== undefined) {
        SyncStorage.set("jwt", JSON.stringify(data));
        setAuthToken(data.token);
        next();
    }
};

//

export const signout = (next) => {
    // if (typeof window !== "undefined") {
    if (global.window !== undefined) {
    //   localStorage.removeItem("jwt");
      SyncStorage.remove("jwt");
      next();
  
      return fetch(`${API}/signout`, {
        method: "GET",
      })
        .then((response) => console.log("signout success"))
        .catch((err) => console.log(err));
    }
  };

  export const isAuthenticated = () => {
    // if (typeof window == "undefined") {
    if (global.window !== undefined) {
      return false;
    }
    if (SyncStorage.get("jwt")) {
      return JSON.parse(SyncStorage.get("jwt"));
    } else {
      return false;
    }
  };
  




