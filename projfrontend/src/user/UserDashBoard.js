import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getUserPurchaseList } from "./helper/userPurchaseListHelper";

const UserDashBoard = () => {
  const [purchaseList, setPurchaseList] = useState([]);
  const {
    user: { name, email },
  } = isAuthenticated();

  useEffect(() => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    getPurchaseList(userId, token);
  }, [purchaseList]);

  const getPurchaseList = (userId, token) => {
    getUserPurchaseList(userId, token)
      .then((response) => {
        console.log(response);
        setPurchaseList(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Base
      title="User DashBoard"
      description="User Information and Purchase list is displayed here"
    >
      <div className="row">
        <div className="col-4">
          <div className="card mb-4">
            <h4 className="card-header bg-success">User Information</h4>
            <ul className="list-group bg-info">
              <li className="list-group-item">
                <span className="badge badge-success mr-2">Name:</span>
                <h6 className="text-info">{name}</h6>
              </li>
              <li className="list-group-item">
                <span className="badge badge-success mr-2">Email:</span>
                <h6 className="text-info">{email}</h6>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-8">
          <h3 className="card-header bg-success">User Purchase List</h3>
          {isAuthenticated() &&
            purchaseList.map((list, index) => {
              return (
                <li className="list-group-item text-success" key={index}>
                  {list.products.map((product, index) => {
                    return (
                      <li className="list-group-item" key={index}>
                        <span className="text-info">Product Name:</span>
                        {product.name}
                        <br />
                        <span className="text-info">Product Price:</span>
                        {product.price}
                        <br />
                      </li>
                    );
                  })}
                  <span className="text-info">Ordered Date: </span>
                  {list.createdAt.split("T")[0]}
                  <br />
                  <span className="text-info">Order Time: </span>
                  {list.createdAt.split("T")[1].split(".")[0]}
                  <br />
                  <span className="text-info">Order Status: </span>
                  {list.status}
                </li>
              );
            })}
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
