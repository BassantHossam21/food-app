import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeCard({
  title,
  highlightWord,
  description,
  to,
  buttonText,
}) {
  const navigate = useNavigate();
  return (
    <div className="home-details m-3 d-flex flex-column flex-md-row justify-content-between align-items-center p-4 shadow-sm">
      <div className="caption text-center text-md-start mb-4 mb-md-0">
        <h3 className="fw-bold mb-3">
          {title} <span className="text-green">{highlightWord}</span> !
        </h3>
        <p className="text-dark-blue mb-0">
          {description ||
            "you can now fill the meals easily using the table and form , click here and sill it with the table !"}
        </p>
      </div>
      <div>
        <button
          onClick={() => to && navigate(to)}
          className="btn btn-green d-flex align-items-center gap-2"
        >
          {buttonText} <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
