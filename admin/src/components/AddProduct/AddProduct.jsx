import React, { useState } from "react";
import './AddProduct.css';
import upload_area from './../../assets/upload_area.svg';
import { toast } from "react-toastify";

const AddProduct = () => {
  const backend_url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const changeHandler = (e) => {
    setProductDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addProduct = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    if (!productDetails.name || !productDetails.new_price || !productDetails.old_price) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("product", image); // must match multer upload.single("product")
    formData.append("category", productDetails.category);
    formData.append("new_price", productDetails.new_price);
    formData.append("old_price", productDetails.old_price);

    try {
      const response = await fetch(`${backend_url}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // only Authorization, do NOT set Content-Type manually
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✅ Product added");
        setProductDetails({
          name: "",
          category: "women",
          new_price: "",
          old_price: ""
        });
        setImage(null);
      } else {
        toast.error(data?.error || "Failed to add product");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      toast.error("Network error or server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          disabled={loading}
        />

        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input
              value={productDetails.old_price}
              onChange={changeHandler}
              type="text"
              name="old_price"
              placeholder="Type here"
              disabled={loading}
            />
          </div>
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={changeHandler}
              type="text"
              name="new_price"
              placeholder="Type here"
              disabled={loading}
            />
          </div>
        </div>

        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="add-product-selector"
            disabled={loading}
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="addproduct-itemfield">
          <label htmlFor="file-input" style={{ cursor: loading ? "not-allowed" : "pointer" }}>
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Upload preview"
              className="addproduct-thumbnail-img"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            id="file-input"
            name="product"
            hidden
            disabled={loading}
            accept="image/*"
          />
        </div>

        <button
          onClick={addProduct}
          className="addproduct-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "ADD"}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
