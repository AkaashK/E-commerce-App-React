import React from "react";

const PurchaseList = ({ purchaseList }) => {
  return (
    <div>
      {purchaseList.map((list, index) => {
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
  );
};

export default PurchaseList;
