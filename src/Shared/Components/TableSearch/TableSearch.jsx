import React from "react";

export default function TableSearch({ onChange }) {
  return (
    <div className="search-container mx-3 mb-4">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group shadow-sm border border-light-subtle rounded-3">
            <span
              className="input-group-text bg-white border-0 rounded-start-3"
              id="search-addon"
            >
              <i className="fa-solid fa-magnifying-glass text-muted"></i>
            </span>
            <input
              type="text"
              onChange={onChange}
              className="form-control border-0 rounded-end-3 py-2"
              placeholder="Search By Name ..."
              aria-label="Search"
              aria-describedby="search-addon"
              style={{ boxShadow: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
