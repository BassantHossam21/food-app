import React, { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-sidebar.png";
import { AuthContext } from "../../../Context/AuthContext";
export default function SideBar({ isToggled, setIsToggled }) {
  let { logindData } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  let { logout } = useContext(AuthContext);

  const toogleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="sidebar-container">
      <Sidebar
        collapsed={isCollapsed}
        toggled={isToggled}
        onBackdropClick={() => setIsToggled(false)}
        breakPoint="md"
      >
        <Menu>
          <div className="img  text-center py-4">
            <img
              className="w-100"
              style={{ cursor: "pointer" }}
              src={logo}
              alt=""
              onClick={toogleCollapse}
            />
          </div>
          <MenuItem
            onClick={() => setIsToggled(false)}
            component={<Link to="/dashboard" />}
            icon={<i className="fa-solid fa-house"></i>}
          >
            Home
          </MenuItem>
          {logindData?.userGroup !== "SystemUser" && (
            <MenuItem
              onClick={() => setIsToggled(false)}
              component={<Link to="/dashboard/users" />}
              icon={<i className="fa-solid fa-users"></i>}
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            onClick={() => setIsToggled(false)}
            component={<Link to="/dashboard/recipes" />}
            icon={<i className="fa-solid fa-table-list"></i>}
          >
            Recipes
          </MenuItem>

          {logindData?.userGroup !== "SystemUser" && (
            <MenuItem
              onClick={() => setIsToggled(false)}
              component={<Link to="/dashboard/categories" />}
              icon={<i className="fa-solid fa-calendar-days"></i>}
            >
              Categories
            </MenuItem>
          )}

          {logindData?.userGroup == "SystemUser" && (
            <MenuItem
              onClick={() => setIsToggled(false)}
              component={<Link to="/dashboard/favorites" />}
              icon={<i className="fa-solid fa-calendar-days"></i>}
            >
              Favorites
            </MenuItem>
          )}
          <MenuItem
            onClick={() => setIsToggled(false)}
            component={<Link to="/dashboard/change-password" />}
            icon={<i className="fa-solid fa-unlock-keyhole"></i>}
          >
            Change Password
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsToggled(false);
              logout();
            }}
            component={<Link to="/login" />}
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
