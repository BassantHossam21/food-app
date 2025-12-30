import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderImg2 from "../../../assets/images/Header2.png";
import Header from "../../../Shared/Components/Header/Header";
import NoData from "../../../Shared/Components/NoData/NoData";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export default function FavoritesList() {
  const [favoritesList, setFavoritesList] = useState([]);
  const [show, setShow] = useState(false);
  const [favoriteId, setFavoriteId] = useState(0);
  

  const handleClose = () => setShow(false);
  const handleShow = (fav) => {
    setFavoriteId(fav.id);
    setShow(true);
  };

  const getAllFavorites = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFavoritesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/${favoriteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Removed from favorites");
      getAllFavorites();
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove");
    }
  };

  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>Confirm Delete</Modal.Header>
        <Modal.Body>Are you sure you want to delete this favorite?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={removeFromFavorites}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Header
        title={"Favorite Items!"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgURL={HeaderImg2}
      ></Header>

      <div className="row m-3 g-4">
        {favoritesList.length > 0 ? (
          favoritesList.map((favorite) => (
            <div key={favorite.id} className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 position-relative">
                {/* Heart Icon */}
                <div className="position-absolute top-0 end-0 m-3">
                  <div
                    className="bg-white rounded-2 shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: "32px", height: "32px", cursor: "pointer" }}
                    onClick={() => handleShow(favorite)}
                  >
                    <i className="fa fa-heart text-success"></i>
                  </div>
                </div>

                {/* Recipe Image */}
                {favorite.recipe?.imagePath ? (
                  <img
                    src={`https://upskilling-egypt.com:3006/${favorite.recipe.imagePath}`}
                    className="card-img-top rounded-top-4"
                    alt={favorite.recipe.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="bg-light d-flex align-items-center justify-content-center rounded-top-4"
                    style={{ height: "200px" }}
                  >
                    <i className="fa-solid fa-image text-muted fs-1"></i>
                  </div>
                )}

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="card-title fw-bold">
                    {favorite.recipe?.name}
                  </h5>
                  <p className="card-text text-muted small">
                    {favorite.recipe?.description}
                  </p>

                  {/* Price and Tag */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="badge bg-success">
                      ${favorite.recipe?.price}
                    </span>
                    <span className="text-muted small">
                      <i className="fa fa-tag me-1"></i>
                      {favorite.recipe?.tag?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <NoData />
          </div>
        )}
      </div>
    </div>
  );
}
