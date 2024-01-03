import { useSearchContext } from "../../contexts/SearchContext";
import { useUserDataContext } from "../../contexts/userDataContext";
import CategoryBlock from "../CategoryBlock/CategoryBlock";

export default function MainContent() {
  const { userDataState } = useUserDataContext();
  const { searchState } = useSearchContext();
  const activeCategory = userDataState.activeCategory;
  const categoriesWithLinks = userDataState.categoriesWithLinks;
  const searchResult = searchState.searchResult;
  // console.log("search result", searchResult);

  switch (activeCategory) {
    case "all":
      return Object.values(categoriesWithLinks).map((category, idx) => {
        {
          return (
            <CategoryBlock
              categoryTitle={category.id}
              links={category.urls}
              key={idx}
            />
          );
        }
      });
    case "search":
      return Object.values(searchResult).map((category, idx) => {
        {
          return (
            <CategoryBlock
              categoryTitle={category.id}
              links={category.urls}
              key={idx}
            />
          );
        }
      });

    default:
      return (
        <CategoryBlock
          categoryTitle={categoriesWithLinks[activeCategory].id}
          links={categoriesWithLinks[activeCategory].urls}
        />
      );
  }
}
