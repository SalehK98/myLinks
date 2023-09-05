import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";

export default function HomePage() {
  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <div>mainSection</div>
    </div>
  );
}
