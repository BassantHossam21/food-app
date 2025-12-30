import React, { useEffect, useState } from "react";
import HeaderImg2 from "../../../assets/images/Header2.png";
import Header from "../../../Shared/Components/Header/Header";
import axios from "axios";
import NoData from "../../../Shared/Components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { Dropdown } from "react-bootstrap";

export default function Userslist() {
  const [usersList, setUsersList] = useState([]);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setShow(true);
    setUserId(user.id);
    setUserName(user.userName);
  };

  const getAllUsers = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsers = async () => {
    console.log(userId);
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      getAllUsers();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem="User" itemName={userName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={deleteUsers}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgURL={HeaderImg2}
      ></Header>

      <div className="table-container m-3 shadow-sm">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"> User Name</th>
              <th scope="col">Creation Date</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
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

                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        id="dropdown-basic"
                        className="text-dark bg-transparent border-0 p-0 shadow-none outline-none"
                      >
                        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="shadow-sm border-0 rounded-4">
                        <Dropdown.Item
                          onClick={() => console.log("View", user)}
                        >
                          <i className="fa fa-eye text-success me-2"></i> View
                        </Dropdown.Item>
                        
                        <Dropdown.Item onClick={() => handleShow(user)}>
                          <i className="fa fa-trash text-success me-2"></i>
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
  );
}
