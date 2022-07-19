import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/login";
import { useSelector } from "react-redux";

function App() {
  const loginUser = useSelector((state) => state.user.currentUser);
  let admin;
  if (loginUser) {
    admin = useSelector((state) => state.user.currentUser.isAdmin);
  }
  let location = useLocation();
  // const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      {location.pathname === "/login" ? null : <Topbar />}
      <div className={location.pathname === "/login" ? null :"container"}>
        {location.pathname === "/login" ? null : <Sidebar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<UserList />} />
          <Route exact path="/user/:userId" element={<User />} />
          <Route exact path="/newUser" element={<NewUser />} />
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/product/:productId" element={<Product />} />
          <Route exact path="/newproduct" element={<NewProduct />} />
          <Route
            path="/login"
            element={admin ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
