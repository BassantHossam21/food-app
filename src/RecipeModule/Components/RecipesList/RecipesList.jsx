import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import HeaderImg2 from "../../../assets/images/Header2.png";
import axios from "axios";
import NoData from "../../../Shared/Components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import TablePagination from "../../../Shared/Components/TablePagination/TablePagination";
import TableSearch from "../../../Shared/Components/TableSearch/TableSearch";
import LoadingOverlay from "../../../Shared/Components/LoadingOverlay/LoadingOverlay";

export default function RecipesList() {
  //==================== Recipes Data ====================
  const [recipesList, setRecipesList] = useState([]);
  const { logindData } = useContext(AuthContext);
  const navigate = useNavigate();

  //==================== Pagination State ====================
  const [pagesCount, setPagesCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [nameValue, setNameValue] = useState("");

  //==================== Delete Modal State ====================
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const [recipeName, setRecipeName] = useState("");

  //==================== Handle Delete Modal ====================
  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    console.log(recipeId);
    setRecipeId(recipe.id);
    setRecipeName(recipe.name);
    setShow(true);
  };

  //==================== Get All Recipes ====================
  const getAllRecipes = async (pageNumber = 1, pageSize = 10, nameValue) => {
    setIsLoading(true);
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/",
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
      console.log(response.data.data);
      setRecipesList(response.data.data);
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

  //==================== Delete Recipe ====================
  const deleteRecipe = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response);
      await getAllRecipes(currentPage, 10, nameValue);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  //==================== Add to Favorites ====================
  const addToFav = async (recipeId) => {
    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,
        { recipeId: recipeId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response);
      toast.success("Recipe added to favorites");
      await getAllRecipes(currentPage, 10, nameValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRecipes(1, 10, "");
  }, []);

  const getNameValues = (e) => {
    setNameValue(e.target.value);
    getAllRecipes(1, 10, e.target.value);
  };

  return (
    <div className="position-relative">
      {/*========================== Page Loading Overlay ==========================*/}
      {isLoading && recipesList.length === 0 && <LoadingOverlay />}

      {/*========================== Delete Modal ==========================*/}
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
          <DeleteConfirmation deleteItem="Recipe" itemName={recipeName} />
        </Modal.Body>
        <div className="px-lg-5 px-4 pb-4">
          <hr className="my-3 opacity-25" />
          <div className="text-end">
            <button className="btn btn-delete px-5 py-2" onClick={deleteRecipe}>
              Delete this item
            </button>
          </div>
        </div>
      </Modal>

      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgURL={HeaderImg2}
      ></Header>

      {/*========================== Recipes Title Section ==========================*/}
      <div className="title px-3 py-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start gap-3">
        <div>
          <h4 className="fw-bold mb-0">Recipes Table Details</h4>
          <p className="text-muted mb-0">You can check all details</p>
        </div>
        {logindData?.userGroup !== "SystemUser" && (
          <button
            onClick={() => navigate("/dashboard/recipes-data")}
            className="btn btn-success px-5 py-2 btn-responsive"
          >
            Add New Recipe
          </button>
        )}
      </div>

      {/*========================== Search Section ==========================*/}
      <TableSearch onChange={getNameValues} />

      {/*========================== Recipes Table Section ==========================*/}
      <div className="table-container m-3 shadow-sm">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recipesList.length > 0 ? (
                recipesList.map((recipe) => (
                  <tr key={recipe.id}>
                    <th scope="row">{recipe.name}</th>
                    <td>
                      <img
                        className="img-fluid recipe-img"
                        src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                        alt={recipe.name}
                      />
                    </td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.tag.name}</td>
                    <td>{recipe.category[0]?.name}</td>
                    <td className="text-center">
                      {logindData?.userGroup !== "SystemUser" ? (
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
                              onClick={() => console.log("View", recipe)}
                            >
                              <i className="fa-solid fa-eye text-success me-2"></i>{" "}
                              View
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                navigate(`/dashboard/recipes-data/${recipe.id}`)
                              }
                            >
                              <i className="fa-solid fa-pen-to-square text-success me-2"></i>{" "}
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleShow(recipe)}>
                              <i className="fa-solid fa-trash-can text-success me-2"></i>
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <i
                          className="fa fa-heart text-danger fs-5"
                          style={{ cursor: "pointer" }}
                          onClick={() => addToFav(recipe.id)}
                          title="Add to Favorites"
                        ></i>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onChange={(pageNo) => getAllRecipes(pageNo, 10)}
      />
    </div>
  );
}
