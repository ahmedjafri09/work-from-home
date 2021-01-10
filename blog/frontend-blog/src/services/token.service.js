import setAuthToken from "../axios/setAuthToken";

const tokenService = (token) => {
  localStorage.setItem("token", token);
  setAuthToken(token);
};

export default tokenService;
