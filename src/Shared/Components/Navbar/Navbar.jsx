import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import avatar from "../../../assets/images/5a7375428c008bab0c67b666a9ccda1c84f11215.png";

export default function Navbar({ toggleSidebar }) {
  let { logindData } = useContext(AuthContext);

  return (
    <nav
      className="navbar navbar-expand-lg mt-3 mx-3 shadow-sm py-2 px-4"
      style={{
        backgroundColor: "#F8F9FB",
        borderRadius: "16px",
      }}
    >
      <div className="container-fluid p-0">
        <div className="d-flex align-items-center w-100">
          <button
            onClick={toggleSidebar}
            className="btn d-md-none border-0 p-0 me-3"
            type="button"
          >
            <i className="fa-solid fa-bars fs-3"></i>
          </button>

          <div
            className="search-wrapper position-relative d-none d-lg-block flex-grow-1"
            style={{ maxWidth: "500px" }}
          >
            <i className="fa-solid fa-magnifying-glass position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="text"
              className="form-control border-0 bg-white ps-5 rounded-3 py-2"
              placeholder="Search Here"
            />
          </div>

          <div className="ms-auto d-flex align-items-center">
            <div className="user-profile d-flex align-items-center me-4">
              <img
                src={avatar}
                alt="User Avatar"
                className="rounded-circle me-2"
                style={{ width: "35px", height: "35px", objectFit: "cover" }}
              />
              <span className="fw-medium text-dark me-2">
                {logindData?.userName || "Upskilling"}
              </span>
              <i className="fa-solid fa-chevron-down fs-xs text-muted"></i>
            </div>
            <div
              className="notification-bell position-relative"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-bell fs-5 text-dark"></i>
              <span
                className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                style={{ width: "8px", height: "8px" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
