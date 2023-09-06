import React from "react";
import CategoryBlock from "../../components/CategoryBlock/CategoryBlock";
import SideMenu from "../../components/SideMenu/SideMenu";

export default function HomePage() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideMenu />
        <CategoryBlock />
        <CategoryBlock />
        <CategoryBlock />
      </div>
    </>
  );
}
