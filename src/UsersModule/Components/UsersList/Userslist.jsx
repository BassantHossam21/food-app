import React, { useEffect, useState } from "react";
import HeaderImg2 from "../../../assets/images/Header2.png";
import Header from "../../../Shared/Components/Header/Header";
import axios from "axios";
import NoData from "../../../Shared/Components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { Dropdown } from "react-bootstrap";
import TablePagination from "../../../Shared/Components/TablePagination/TablePagination";
import TableSearch from "../../../Shared/Components/TableSearch/TableSearch";
import LoadingOverlay from "../../../Shared/Components/LoadingOverlay/LoadingOverlay";
import { toast } from "react-toastify";

export default function Userslist() {
  const [usersList, setUsersList] = useState([]);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [pagesCount, setPagesCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [nameValue, setNameValue] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setShow(true);
    setUserId(user.id);
    setUserName(user.userName);
  };

  const getAllUsers = async (pageNumber = 1, pageSize = 10, userNameValue) => {
    setIsLoading(true);
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            userName: userNameValue,
          },
        },
      );
      setUsersList(response.data.data);
      setPagesCount(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, index) => index + 1),
      );
      setCurrentPage(pageNumber);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUsers = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      toast.success("User deleted successfully!");
      await getAllUsers(currentPage, 10, nameValue);
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user!");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers(1, 10, "");
  }, []);

  const getNameValues = (e) => {
    setNameValue(e.target.value);
    getAllUsers(1, 10, e.target.value);
  };

  return (
    <div className="position-relative">
      {/*========================== Page Loading Overlay ==========================*/}
      {isLoading && usersList.length === 0 && <LoadingOverlay />}

      {/*========================== Delete Modal ==========================*/}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        contentClassName="delete-modal"
      >
        <Modal.Header className="border-0 d-flex justify-content-end p-2 pt-3 pe-3 pb-0">
          <i
            className="fa-solid fa-circle-xmark text-danger fs-3 cursor-pointer"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          ></i>
        </Modal.Header>
        <Modal.Body className="px-lg-5 px-4 pt-0">
          <DeleteConfirmation deleteItem="User" itemName={userName} />
        </Modal.Body>
        <div className="px-lg-5 px-4 pb-4">
          <hr className="my-3 opacity-25" />
          <div className="text-end">
            <button className="btn btn-delete px-5 py-2" onClick={deleteUsers}>
              Delete this item
            </button>
          </div>
        </div>
      </Modal>

      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgURL={HeaderImg2}
      ></Header>

      {/*========================== Users Title Section ==========================*/}
      <div className="title px-3 py-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start gap-3">
        <div>
          <h4 className="fw-bold mb-0">Users Table Details</h4>
          <p className="text-muted mb-0">You can check all details</p>
        </div>
      </div>

      {/*========================== Search Section ==========================*/}
      <TableSearch onChange={getNameValues} />

      {/*========================== Users Table Section ==========================*/}
      <div className="table-container m-3 shadow-sm">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {usersList.length > 0 ? (
                usersList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.userName}</td>
                    <td>{new Date(user.creationDate).toLocaleDateString()}</td>
                    <td>{user.email}</td>
                    <td>{user.group.name}</td>

                    <td className="text-center">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          id="dropdown-basic"
                          className="text-dark bg-transparent border-0 p-0 shadow-none outline-none"
                        >
                          <i
                            className="fa-solid fa-ellipsis-vertical fs-5"
                            aria-hidden="true"
                          ></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow-sm border-0 rounded-3">
                          <Dropdown.Item
                            onClick={() => console.log("View", user)}
                          >
                            <i className="fa-solid fa-eye text-success me-2"></i>{" "}
                            View
                          </Dropdown.Item>

                          <Dropdown.Item onClick={() => handleShow(user)}>
                            <i className="fa-solid fa-trash-can text-success me-2"></i>{" "}
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onChange={(pageNo) => getAllUsers(pageNo, 10)}
      />
    </div>
  );
}
