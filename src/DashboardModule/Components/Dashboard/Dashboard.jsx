import React, { useContext } from "react";
import Header from "../../../Shared/Components/Header/Header";
import HomeCard from "../../../Shared/Components/HomeCard/HomeCard";
import HeaderImg from "../../../assets/images/Header.png";
import { AuthContext } from "../../../Context/AuthContext";

export default function Dashboard() {
  let { logindData } = useContext(AuthContext);
  return (
    <>
      <Header
        title={`Welcome ${logindData?.userName} !`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgURL={HeaderImg}
      />

      <HomeCard
        title="Fill the"
        highlightWord="Recipes"
        to="/dashboard/recipes"
        buttonText="Fill Recipes"
      />
    </>
  );
}

