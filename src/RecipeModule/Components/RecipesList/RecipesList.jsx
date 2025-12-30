import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import HeaderImg2 from "../../../assets/images/Header2.png";
import axios from "axios";
import NoData from "../../../Shared/Components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { toast } from "react-toastify";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const { logindData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const [recipeName, setRecipeName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    console.log(recipeId);
    setRecipeId(recipe.id);
    setRecipeName(recipe.name);
    setShow(true);
  };

  const getAllRecipes = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      getAllRecipes();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addToFav = async (recipeId) => {
    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,{recipeId:recipeId},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success("Recipe added to favorites");
      getAllRecipes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRecipes();
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
          <DeleteConfirmation deleteItem="Recipe" itemName={recipeName} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteRecipe} variant="outline-danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgURL={HeaderImg2}
      ></Header>

      {logindData?.userGroup !== "SystemUser" ? (
        <div className=" title m-3  d-flex justify-content-between">
          <h5>Recipes Table Details</h5>
          <button
            onClick={() => navigate("/dashboard/recipes-data")}
            className="btn btn-success"
          >
            Add New Recipe
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="table-container m-3  shadow-sm ">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">tag</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipesList.length > 0 ? (
              recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.name}</th>
                  <td>
                    <img
                      className="img-fluid recipe-img "
                      src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                      alt={recipe.name}
                    />
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag.name}</td>
                  <td>{recipe.category[0]?.name}</td>
                  <td>
                    {logindData?.userGroup !== "SystemUser" ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          id="dropdown-basic"
                          className="text-dark bg-transparent border-0 p-0 shadow-none outline-none"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow-sm border-0 rounded-4">
                          <Dropdown.Item
                            onClick={() => console.log("View", recipe)}
                          >
                            <i className="fa fa-eye text-success me-2"></i> View
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              navigate(`/dashboard/recipes-data/${recipe.id}`)
                            }
                          >
                            <i className="fa fa-edit text-success me-2"></i>{" "}
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleShow(recipe)}>
                            <i className="fa fa-trash text-success me-2"></i>{" "}
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <i
                        className="fa fa-heart text-danger fs-5"
                        style={{ cursor: "pointer" }}
                        onClick={() =>addToFav(recipe.id) }
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
  );
}
