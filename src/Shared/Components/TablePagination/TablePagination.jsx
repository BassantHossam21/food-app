import React from "react";
import Pagination from "react-bootstrap/Pagination";

export default function TablePagination({ pagesCount, currentPage, onChange }) {
  return (
    <div className="d-flex justify-content-center justify-content-md-end m-3">
      <div className="table-pagination-container">
        <Pagination className="mb-0">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
        >
          Previous
        </Pagination.Prev>

        {pagesCount.map((pageNo) => (
          <Pagination.Item
            key={pageNo}
            active={pageNo === currentPage}
            onClick={() => onChange(pageNo)}
          >
            {pageNo}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={
            currentPage === pagesCount.length || pagesCount.length === 0
          }
          onClick={() => onChange(currentPage + 1)}
        >
          Next
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
}
