import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const preload = (categoryId) => {
    getCategory(categoryId).then(data => {

    })
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired here
    updateCategory(
      match.params.categoryId,
      user._id,
      token,
    ).then((data) => {
      setName("");
      console.log(event.target.value)
      console.log(data)
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create Category</h4>;
    }
  };

  const updateCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            text="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For Eg: Summer"
            onChange={handleChange}
            value={name}
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new Tshirts"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Back to Admin dashboard
      </Link>
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
