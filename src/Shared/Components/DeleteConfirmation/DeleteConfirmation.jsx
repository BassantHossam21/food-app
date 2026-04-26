import React from "react";
import noDataImg from "../../../assets/images/nodata.png";
export default function DeleteConfirmation({ deleteItem, itemName }) {
  return (
    <div className="text-center py-2">
      <img
        src={noDataImg}
        alt="delete-illustration"
        className="img-fluid mb-3"
        style={{ maxHeight: "250px" }}
      />
      <h4 className="fw-bold fs-4 text-dark mb-2">
        Delete This {deleteItem} {itemName} ?
      </h4>
      <p className="text-secondary px-lg-5 px-3 mb-0">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
}
