import axios from "axios";
import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

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