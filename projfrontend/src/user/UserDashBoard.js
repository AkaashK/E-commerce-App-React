import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import PurchaseList from "./PurchaseList";
import Pagination from "./Pagination"

import { isAuthenticated } from "../auth/helper";
import { getUserPurchaseList } from "./helper/userPurchaseListHelper";

//to set select lists per page
const selectOptions = [5, 10, 20, 30];

const UserDashBoard = () => {
  const [purchaseList, setPurchaseList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listsPerPage, setListsPerPage] = useState(5);

  const totalLengthOfPosts = purchaseList.length;
  const indexOfLastPost = currentPage * listsPerPage;

  const {
    user: { name, email },
  } = isAuthenticated();

  useEffect(() => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    getPurchaseList(userId, token);
  }, []);

  const getPurchaseList = (userId, token) => {
    getUserPurchaseList(userId, token)
      .then((response) => {
        setPurchaseList(response);
      })
      .catch((error) => console.log(error));
  };

  //to get current list to display
  const currentLists = () => {
    const indexOfFirstPost = indexOfLastPost - listsPerPage;
    return purchaseList.slice(indexOfFirstPost, indexOfLastPost);
  };
  //set current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //to enable next button
  const enableButton = () => {
    return (
      indexOfLastPost > listsPerPage * (currentPage - 1) &&
      indexOfLastPost < totalLengthOfPosts
    );
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
          {isAuthenticated() && purchaseList.length > 0 && (
            <div>
              <PurchaseList purchaseList={currentLists()} />
              <button
                className="btn btn-sm btn-info"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
              <button
                className="btn btn-sm btn-info"
                disabled={!enableButton()}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
              <Pagination
                postsPerPage={listsPerPage}
                totalPosts={totalLengthOfPosts}
                paginate={paginate}
              />
              <br />
              <select className="bg-info text-white px-3" onChange={(event) => setListsPerPage(event.target.value)}>
                {selectOptions.map((value) => (
                  <option className="" key={value}>{value}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
