export const filterProducts = (products, filters) => {
  let filteredProducts = [...products];

  if (filters.searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }

  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.categoryName === filters.category;
    });
  }

  if (filters.rating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= filters.rating
    );
  }

  if (filters.price) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        Number(product.discountPrice ?? product.price) <= Number(filters.price)
    );
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'low-to-high':
        filteredProducts = filteredProducts.sort(
          (a, b) =>
            Number(a.discountPrice ?? a.price) -
            Number(b.discountPrice ?? b.price)
        );
        break;
      case 'high-to-low':
        filteredProducts = filteredProducts.sort(
          (a, b) =>
            Number(b.discountPrice ?? b.price) -
            Number(a.discountPrice ?? a.price)
        );
        break;
      default:
        break;
    }
  }

  return filteredProducts;
};
