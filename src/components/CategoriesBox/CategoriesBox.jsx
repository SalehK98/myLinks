import categories from "../../data/links.json";

console.log(Object.values(categories));

export default function CategoriesBox() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.keys(categories).map((category) => {
        return <button key={category}>{category}</button>;
      })}
    </div>
  );
}
