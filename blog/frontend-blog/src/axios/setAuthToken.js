import Axios from "./axios";

const setAuthToken = (token) => {
  if (token) {
    //applying token
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
};

export default setAuthToken;
