function transformAllUserData(data) {
  const [categoriesData, urlsData] = data;
  const reformedCategories = [];
  const categoryUrls = {};

  // Process categories data
  categoriesData.forEach((categoryDoc) => {
    const categoryId = categoryDoc.id;
    reformedCategories.push(categoryId);
    const categoryData = categoryDoc.urls;
    categoryUrls[categoryId] = {
      id: categoryId,
      // ...categoryData,
      urls: [], // Initialize an empty array for URLs in this category
    };
  });

  // Process URLs data
  urlsData.forEach((urlDoc) => {
    const categoryName = urlDoc.categoryName; // Assuming each URL has a categoryId field
    if (reformedCategories.includes(categoryName)) {
      categoryUrls[categoryName].urls.push({
        // id: urlDoc.id,
        // ...urlData,
        ...urlDoc,
      });
    } else {
      console.log("no");
    }
    // If the category exists, add this URL to its 'urls' array
    // }
    // } else {
    // If the category doesn't exist, create it and add the URL
    // categories[categoryId] = {
    // id: categoryId,
    // urls: [
    // {
    // id: urlDoc.id,
    // ...urlData,
    // },
    // ],
    // };
    // }
  });

  return [reformedCategories, categoryUrls];
}

export default transformAllUserData;
