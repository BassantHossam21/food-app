import React from "react";

export default function LoadingOverlay() {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex: 9999 }}
    >
      <i
        className="fa-solid fa-spinner fa-spin text-success"
        style={{ fontSize: "5rem" }}
      ></i>
    </div>
  );
}
