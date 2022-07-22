import { publicRequest,userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { getProductFailure, getProductStart, getProductSuccess ,deleteProductFailure, deleteProductStart, deleteProductSuccess} from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart(user));

  try {
    const res = await publicRequest.post("/auth/login", user);

    dispatch(loginSuccess("hiiiii",res.data));
  } catch (err) {
    dispatch(loginFailure(user));
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await publicRequest.get("/products");
    // const res = await axios.post("http://localhost:5000/api/auth/login", user);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (dispatch,id) => {
  dispatch(deleteProductStart());

  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// export const logout = () => {
//   localStorage.removeItem("user");
// };

