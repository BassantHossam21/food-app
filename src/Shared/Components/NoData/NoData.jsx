import React from "react";
import nodataImg from "../../../assets/images/nodata.png"
export default function NoData() {
  return (
    <div className="text-center py-5">
      <img src={nodataImg} alt="No Data" className="img-fluid mb-4" />
      <h5 className="fw-bold text-dark-blue">No Data !</h5>
      <p className="text-muted mx-auto" style={{ maxWidth: "400px" }}>
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
}
