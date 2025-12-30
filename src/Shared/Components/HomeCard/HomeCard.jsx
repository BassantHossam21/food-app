import React from "react";
import { useNavigate } from "react-router-dom";
export default function HomeCard({ title, to, buttonText }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-details m-3 d-flex justify-content-between align-items-center p-4">
        <div className="caption">
          <h4>{title}</h4>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <button onClick={() => to && navigate(to)} className="btn btn-green">
          {buttonText} <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
}
