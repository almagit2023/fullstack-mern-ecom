import React from "react";
import { useState } from "react";
import "./CreateRecord.css";
import { rest_api_url } from "../../../data";
import axios from "axios";

export default function CreateRecord() {
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const createProduct = (e) => {
    e.preventDefault();
    const createProductData = {
      name: newName,
      category: newCategory,
      price: newPrice,
    };
    console.log(createProductData);
    axios.post(rest_api_url, createProductData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log("New Record has been added...");
        console.log("New Record is : ", res.data);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Error creating Product...", error);
        console.log(createProductData);
      });
  };

  return (
    <div>
      <h2 className="create-product-heading">Create a Product</h2>
      <form action="" className="create-product-form" onSubmit={createProduct}>
        <div className="form-group">
          <label htmlFor="">Enter Product Name</label> <br />
          <input
            type="text"
            placeholder="Enter Product Name"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Enter Product Category </label> ????????<br />
          <select onChange={(e) => setNewCategory(e.target.value)}>
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
          <label htmlFor="">Enter Price</label> <br />
          <input
            type="text"
            name="price"
            id="product_price"
            placeholder="Enter Price..."
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-create-product">
            Create New Product
          </button>
        </div>
      </form>
    </div>
  );
}