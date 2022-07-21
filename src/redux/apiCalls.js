import axios from "axios";
import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { getProductFailure, getProductStart, getProductSuccess } from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart(user));

  try {
    const res = await publicRequest.post("/auth/login", user);
    // const res = await axios.post("http://localhost:5000/api/auth/login", user);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(user));
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await publicRequest.get("/products");
    // const res = await axios.post("http://localhost:5000/api/auth/login", user);
    console.log(res.data)
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
// export const logout = () => {
//   localStorage.removeItem("user");
// };

