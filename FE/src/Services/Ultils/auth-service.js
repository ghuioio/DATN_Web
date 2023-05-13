import axios from "axios";
import {HEROKU_API} from '../Constants/index'
import { axiosPost } from "./axiosUtils";

const login = async (username, password) => {
  const response = await axios.post(
    `${HEROKU_API}/auth/login`,
    {
      username,
      password,
    }
  );
  console.log(response)
  if (response.data.data.token) {
    localStorage.setItem("access_token", response.data.data.token);
  }
  return response.data;
};

const signup = async (username, password) => {
  const response = await axiosPost()
}
const authService = {
  login,
};

export default authService;
