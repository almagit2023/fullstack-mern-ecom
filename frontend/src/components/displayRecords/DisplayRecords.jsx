import React from "react";
import "./DisplayRecords.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { rest_api_url } from "../../../data";
import { FaTrash } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { GiEmptyChessboard } from "react-icons/gi";

export default function DisplayRecords() {
  const [productData, setProductData] = useState([]);

  const displayRecords = () => {
    axios
      .get(rest_api_url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setProductData(res.data.products);
        console.log(productData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    displayRecords();
  }, []);

  const handleProductDelete = (id) => {
    console.log(id);
    axios
      .delete(`${rest_api_url}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log("Deleted Product with ID : ", id);
        window.location.reload(true);
      })
      .catch((error) => {
        console.error(error);
        console.log("Record cant be deleted...");
      });
  };

  return (
    <div>
      {productData && productData.length > 0 ? (
        <table className="product-table">
          <thead className="product-header-table">
            <tr>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Product Price</th>
              <th>EDIT</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="product-data-table">
            {productData.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`/${item._id}`}>
                    <MdModeEdit className="product-edit-icon" />
                  </Link>
                </td>
                <td>
                  <FaTrash
                    className="product-delete-icon"
                    onClick={() => handleProductDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-product-basket">
          <GiEmptyChessboard className="empty-product-basket-icon" />
          <h3>
            Your Basket is Empty!!{" "}
            <Link to="/create"> Click Here </Link> To Add Products
          </h3>
        </div>
      )}
    </div>
  );
}