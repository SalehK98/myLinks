import { useUserDataContext } from "../../contexts/userDataContext";
import CategoryBlock from "../CategoryBlock/CategoryBlock";

export default function MainContent() {
  const { userDataState } = useUserDataContext();
  const activeCategory = userDataState.activeCategory;
  const categoriesWithLinks = userDataState.categoriesWithLinks;

  return (
    <>
      {activeCategory === "all" ? (
        Object.values(categoriesWithLinks).map((category, idx) => {
          {
            return (
              <CategoryBlock
                categoryTitle={category.id}
                links={category.urls}
                key={idx}
              />
            );
          }
        })
      ) : (
        <CategoryBlock
          categoryTitle={categoriesWithLinks[activeCategory].id}
          links={categoriesWithLinks[activeCategory].urls}
        />
      )}
    </>
  );
}
