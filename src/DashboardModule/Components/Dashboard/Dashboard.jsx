import React, { useContext } from "react";
import Header from "../../../Shared/Components/Header/Header";
import HeaderImg from "../../../assets/images/Header.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

export default function Dashboard() {
  let { logindData } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Header
        title={`Hello ${logindData?.userName}`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgURL={HeaderImg}
      />

      <div className="home-details m-3 d-flex justify-content-between align-items-center p-4">
        <div className="caption">
          <h4>Fill the Recipes !</h4>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/recipes")}
          className="btn btn-green"
        >
          Fill Recipes <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
}
