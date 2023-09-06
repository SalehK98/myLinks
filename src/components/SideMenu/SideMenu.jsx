import categories from "../../data/links.json";
import UserCard from "../UserCard/UserCard.jsx";

console.log(Object.values(categories));

export default function SideMenu() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <UserCard />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.keys(categories).map((category) => {
          return <button key={category}>{category}</button>;
        })}
      </div>
      <div>myLinks Web app 0.0</div>
    </div>
  );
}
