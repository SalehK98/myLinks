import React from "react";
import categories from "../../data/links.json";

console.log(Object.values(categories));

export default function SideMenu() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>userCard</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.keys(categories).map((category) => {
          return <button key={category}>{category}</button>;
        })}
      </div>
      <div>myLinks Web app 0.0</div>
    </div>
  );
}
