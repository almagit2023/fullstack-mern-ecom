import React from "react";
import "./UpdateRecords.css";
import { rest_api_url } from "../../../data";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateRecords() {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [productToUpdate, setProductToUpdate] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getProductData = async () => {
    try {
      axios
        .get(`${rest_api_url}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setProductToUpdate(res.data.product);
          setUpdatedName(res.data.product.name);
          setUpdatedCategory(res.data.product.category);
          setUpdatedPrice(res.data.product.price);
          console.log(res.data.product);
          console.log("Product To Update : ", productToUpdate);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const updateProduct = (e) => {
    e.preventDefault();
    const updatedProductData = {
      name: updatedName,
      category: updatedCategory,
      price: updatedPrice,
    };
    console.log(updatedProductData);
    axios
      .put(`${rest_api_url}/${id}`, updatedProductData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log("Record has been updated...");
        console.log("New Record is : ", res.data);
        navigate('/home');
      })
      .catch((error) => {
        console.log("Error updating Product...", error);
        console.log(updatedProductData);
      });
  };

  console.log("Coming or Not : ", productToUpdate.name);
  return (
    <div>
      <h2 className="create-product-heading">Update Product</h2>
      <form action="" className="create-product-form" onSubmit={updateProduct}>
        <div className="form-group">
          <label htmlFor="">Update Product Name</label> <br />
          <input
            type="text"
            placeholder="Enter Product Name"
            onChange={(e) => setUpdatedName(e.target.value)}
            value={updatedName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Change Product Category </label> <br />
          <select
            onChange={(e) => setUpdatedCategory(e.target.value)}
            value={updatedCategory}
          >
            <option value="">Select Category</option>
            <option value="Female Dress">Female Dress</option>
            <option value="Male Dress">Male Dress</option>
            <option value="Female Shoe">Female Shoe</option>
            <option value="Male Shoe">Male Shoe</option>
            <option value="Female Perfume">Female Perfume</option>
            <option value="Male Perfume">Male Perfume</option>
            <option value="Female Sunglass">Female Sunglass</option>
            <option value="Male Sunglass">Male Sunglass</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Update Price</label> <br />
          <input
            type="text"
            name="price"
            id="product_price"
            placeholder="Enter Price..."
            onChange={(e) => setUpdatedPrice(e.target.value)}
            value={updatedPrice}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-create-product">
            Update Product Information
          </button>
        </div>
      </form>
    </div>
  );
}