import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./../Navbar/Navbar";
import SideBar from "./../SideBar/SideBar";

export default function MasterLayout() {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSidebar = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <SideBar isToggled={isToggled} setIsToggled={setIsToggled} />

      <div className="w-100 overflow-auto ">
        <Navbar toggleSidebar={toggleSidebar} />

        <Outlet />
      </div>
    </div>
  );
}
