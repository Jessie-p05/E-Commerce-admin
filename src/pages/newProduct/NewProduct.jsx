import "./newProduct.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function NewProduct() {
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pPrice, setPPrice] = useState(0);
  const [pStock, setPStock] = useState(true);
  const [pImg, setPImg] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    const productToAdd= { title:pName, desc:pDesc,price:pPrice,instock:pStock, img:pImg}
    addProduct(dispatch, productToAdd);
  };
  const handleImgSubmit = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPImg(downloadURL)
        });
      }
    );
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={handleImgSubmit}
          />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setPName(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            placeholder=""
            onChange={(e) => setPPrice(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder=""
            onChange={(e) => setPDesc(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>in Stock</label>
          <select
            name="instock"
            id="instock"
            onChange={(e) => setPStock(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
