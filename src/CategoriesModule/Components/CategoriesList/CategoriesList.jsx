import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Dropdown } from "react-bootstrap";
import Header from "../../../Shared/Components/Header/Header";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../../Shared/Components/NoData/NoData";
import HeaderImg2 from "../../../assets/images/Header2.png";
import TablePagination from "../../../Shared/Components/TablePagination/TablePagination";
import TableSearch from "../../../Shared/Components/TableSearch/TableSearch";
import LoadingOverlay from "../../../Shared/Components/LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";

export default function CategoriesList() {
  //==============================States==============================
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //==============================Pagination State==============================
  const [pagesCount, setPagesCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [nameValue, setNameValue] = useState("");

  //==============================Form==============================
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  //==============================Delete Modal Handlers==============================
  const handleClose = () => setShow(false);
  const handleShow = (category) => {
    setCategoryId(category.id);
    setCategoryName(category.name);
    setShow(true);
  };

  //==============================Add/Edit Modal Handlers==============================
  const handleAddClose = () => {
    setShowAdd(false);
    setCategoryId(0);
    setCategoryName("");
    reset();
  };

  const handleAddShow = () => {
    setCategoryId(0);
    setCategoryName("");
    reset();
    setShowAdd(true);
  };

  const handleEditShow = (category) => {
    setCategoryId(category.id);
    setCategoryName(category.name);
    setValue("name", category.name);
    setShowAdd(true);
  };

  const onSubmit = (data) => {
    if (categoryId === 0) {
      addCategory(data);
    } else {
      updateCategory(data);
    }
  };

  //==============================Get All Categories==============================
  const getAllCategories = async (pageNumber = 1, pageSize = 10, nameValue) => {
    setIsLoading(true);
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            name: nameValue,
          },
        },
      );

      setCategoriesList(response.data.data);
      setPagesCount(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, index) => index + 1),
      );
      setCurrentPage(pageNumber);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //==============================Delete Category==============================
  const deleteCategories = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      await getAllCategories(currentPage, 10, nameValue);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  //==============================Add Category==============================
  const addCategory = async (data) => {
    setIsLoading(true);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      reset();
      await getAllCategories(1, 10, "");
      handleAddClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //==============================Update Category==============================
  const updateCategory = async (data) => {
    setIsLoading(true);
    try {
      let response = await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      reset();
      await getAllCategories(currentPage, 10, nameValue);
      handleAddClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories(1, 10, "", true);
  }, []);

  //==============================Get Name Values==============================
  const getNameValues = (e) => {
    setNameValue(e.target.value);
    getAllCategories(1, 10, e.target.value);
  };

  return (
    <div className="position-relative">
      {/*========================== Page Loading Overlay ==========================*/}
      {isLoading && categoriesList.length === 0 && <LoadingOverlay />}

      {/*========================== 1. Header Section ==========================*/}
      <Header
        title={"Categories Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgURL={HeaderImg2}
      ></Header>

      {/*========================== 2. Category Title Section ==========================*/}
      <div className="title px-3 py-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start gap-3">
        <div>
          <h4 className="fw-bold mb-0">Categories Table Details</h4>
          <p className="text-muted mb-0">You can check all details</p>
        </div>
        <button
          onClick={handleAddShow}
          className="btn btn-success px-5 py-2 btn-responsive"
        >
          Add New Item
        </button>
      </div>

      {/*========================== 3. Search Section ==========================*/}
      <TableSearch onChange={getNameValues} />

      {/*========================== 4. Categories Table Section ==========================*/}
      <div className="table-container m-3 shadow-sm">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Category Data</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.length > 0 ? (
                categoriesList.map((cateogry) => (
                  <tr key={cateogry.id}>
                    <th scope="row">#{cateogry.id}</th>
                    <td>{cateogry.name}</td>
                    <td>
                      {new Date(cateogry.creationDate).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          id="dropdown-basic"
                          className="text-dark bg-transparent border-0 p-0 shadow-none outline-none"
                        >
                          <i
                            className="fa-solid fa-ellipsis-vertical fs-5"
                            aria-hidden="true"
                          ></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow-sm border-0 rounded-3">
                          <Dropdown.Item
                            onClick={() => console.log("View", cateogry)}
                          >
                            <i className="fa-solid fa-eye text-success me-2"></i>{" "}
                            View
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleEditShow(cateogry)}
                          >
                            <i className="fa-solid fa-pen-to-square text-success me-2"></i>{" "}
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleShow(cateogry)}>
                            <i className="fa-solid fa-trash-can text-success me-2"></i>
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

      {/*========================== 5. Pagination Section ==========================*/}
      <TablePagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onChange={(pageNo) => getAllCategories(pageNo, 10)}
      />

      {/*========================== 6. Modals Section ==========================*/}

      {/* --- Delete Modal --- */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        contentClassName="delete-modal"
      >
        <Modal.Header className="border-0 d-flex justify-content-end p-2 pt-3 pe-3 pb-0">
          <i
            className="fa-solid fa-circle-xmark text-danger fs-3 cursor-pointer"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          ></i>
        </Modal.Header>
        <Modal.Body className="px-lg-5 px-4 pt-0">
          <DeleteConfirmation deleteItem="Category" itemName={categoryName} />
        </Modal.Body>
        <div className="px-lg-5 px-4 pb-4">
          <hr className="my-3 opacity-25" />
          <div className="text-end">
            <button
              className="btn btn-delete px-5 py-2"
              onClick={deleteCategories}
            >
              Delete this item
            </button>
          </div>
        </div>
      </Modal>

      {/* --- Add/Edit Category Modal --- */}
      <Modal show={showAdd} onHide={handleAddClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">
            {categoryId === 0 ? "Add" : "Edit"} Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <button
                disabled={isLoading}
                className="btn btn-success px-5 py-2 fw-bold text-white rounded-3 shadow-sm d-flex align-items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  <>{categoryId === 0 ? "Save" : "Update"}</>
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
