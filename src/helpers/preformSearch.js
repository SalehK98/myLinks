function preformLinkSearch(searchData, searchTerm, searchCategory) {
  console.log("preforming Link Search:", searchTerm);
  const results = {};
  const categoriesWithLinks = searchData;

  const getMatchingLinksForCategory = (category) => {
    // Use Array.filter to get only the links that match the search term
    return Object.values(category.urls).filter(
      (link) =>
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const setResultsForCategory = (matchingLinks, category) => {
    if (matchingLinks.length > 0) {
      results[category.id] = {
        id: category.id,
        urls: matchingLinks,
      };
    }
  };
  if (searchCategory === "all") {
    // Iterate through categoriesWithLinks and create categories in the result object only if there are matching links
    Object.keys(categoriesWithLinks).forEach((categoryKey) => {
      const category = categoriesWithLinks[categoryKey];
      const matchingLinks = getMatchingLinksForCategory(category);
      setResultsForCategory(matchingLinks, category);
    });
  } else {
    const category = categoriesWithLinks[searchCategory];
    const matchingLinks = getMatchingLinksForCategory(category);
    setResultsForCategory(matchingLinks, category);
  }

  return results;
}
export default preformLinkSearch;
