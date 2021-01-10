import axios from "axios";
import url from "../constants/URL";

const Axios = axios.create({
  baseURL: url,
});
export default Axios;
