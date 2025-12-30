import React, { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-sidebar.png";
import { AuthContext } from "../../../Context/AuthContext";
export default function SideBar() {
  let { logindData } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  let { logout } = useContext(AuthContext);

  const toogleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <div className="img  text-center py-4">
              <img
                className="w-100"
                src={logo}
                alt=""
                onClick={toogleCollapse}
              />
            </div>
            <MenuItem
              component={<Link to="/dashboard" />}
              icon={<i className="fa-solid fa-house"></i>}
            >
              Home
            </MenuItem>
            {logindData?.userGroup !== "SystemUser" && (
              <MenuItem
                component={<Link to="/dashboard/users" />}
                icon={<i className="fa-solid fa-users"></i>}
              >
                Users
              </MenuItem>
            )}

            <MenuItem
              component={<Link to="/dashboard/recipes" />}
              icon={<i className="fa-solid fa-table-list"></i>}
            >
              Recipes
            </MenuItem>

            {logindData?.userGroup !== "SystemUser" && (
              <MenuItem
                component={<Link to="/dashboard/categories" />}
                icon={<i className="fa-solid fa-calendar-days"></i>}
              >
                Categories
              </MenuItem>
            )}

            {logindData?.userGroup == "SystemUser" && (
              <MenuItem
                component={<Link to="/dashboard/favorites" />}
                icon={<i className="fa-solid fa-calendar-days"></i>}
              >
                Favorites
              </MenuItem>
            )}
            <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>}>
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logout}
              component={<Link to="/login" />}
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
      ;
    </div>
  );
}
