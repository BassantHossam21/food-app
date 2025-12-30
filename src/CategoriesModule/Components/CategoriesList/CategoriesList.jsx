import React, { useEffect, useState } from "react";
import HeaderImg2 from "../../../assets/images/Header2.png";
import Header from "../../../Shared/Components/Header/Header";
import axios from "axios";
import NoData from "../../../Shared/Components/NoData/NoData";
import { useForm } from "react-hook-form";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { Dropdown } from "react-bootstrap";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [show, setShow] = useState(false);

  //Add Category
  const [showAdd, setShowAdd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = (category) => {
    setShow(true);
    setCategoryId(category.id);
    setCategoryName(category.name);
  };

  //Add Category(functions)
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);

  const getAllCategories = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategories = async () => {
    console.log(categoryId);
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      getAllCategories();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      reset();
      getAllCategories();
      handleAddClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem="Category" itemName={categoryName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={deleteCategories}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Category Modal */}
      <Modal show={showAdd} onHide={handleAddClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(addCategory)}>
            <div className="mb-4">
              <input
                type="text"
                className={`form-control bg-light border-0 py-3 rounded-3 ${
                  errors.name ? "is-invalid" : ""
                }`}
                placeholder="Category Name"
                {...register("name", { required: "Category name is required" })}
              />
              {errors.name && (
                <span className="text-danger mt-1 d-block small">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="d-flex justify-content-end border-top pt-3">
              <button className="btn btn-success px-5 py-2 fw-bold text-white rounded-3 shadow-sm">
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Header
        title={"Categories Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgURL={HeaderImg2}
      ></Header>

      <div className="title p-3 d-flex justify-content-between">
        <h5>Categories Table Details</h5>
        <button onClick={handleAddShow} className="btn btn-success">
          Add New Category
        </button>
      </div>

      <div className="table-container m-3 shadow-sm">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Creation Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length > 0 ? (
              categoriesList.map((cateogry) => (
                <tr key={cateogry.id}>
                  <th scope="row">{cateogry.id}</th>
                  <td>{cateogry.name}</td>
                  <td>{cateogry.creationDate}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="dropdown-basic"
                        className="text-dark bg-transparent border-0 p-0 shadow-none outline-none"
                      >
                        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="shadow-sm border-0 rounded-4">
                        <Dropdown.Item
                          onClick={() => console.log("View", cateogry)}
                        >
                          <i className="fa fa-eye text-success me-2"></i> View
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="fa fa-edit text-success me-2"></i> Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShow(cateogry)}>
                          <i className="fa fa-trash text-success me-2"></i>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
