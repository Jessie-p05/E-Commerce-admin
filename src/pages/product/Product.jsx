import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const [stats, setStats] = useState([]);
  const products = useSelector((state) => state.product.products);
  const location = useLocation();
  const product = products.find(
    (product) => product._id === location.pathname.slice(9)
    );

    const [pName, setpName] = useState(product.name);
    const [pDesc, setPDesc] = useState(product.desc);
    const [pPrice, setPPrice] = useState(product.price);
    const [pStock, setPStock] = useState(product.stock);
    const [pImg, setPImg] = useState(product.img);

  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?pid="+ product._id);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, []);

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    const productToUpdate= {...product, title:pName, desc:pDesc,price:pPrice,instock:pStock, img:pImg}
    updateProduct(dispatch, productToUpdate);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={stats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.instock ? "yes" : "no"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product.title} onChange={(e) => setpName(e.target.value)}/>
            <label>Product Description</label>
            <input type="text" placeholder={product.desc} onChange={(e) => setPDesc(e.target.value)}/>
            <label>Product Price</label>
            <input type="text" placeholder={product.price} onChange={(e) => setPPrice(e.target.value)}/>
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={(e) => setPStock(e.target.value)}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setPImg(e.target.value)}/>
            </div>
            <button className="productButton" onClick={handleClick}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
