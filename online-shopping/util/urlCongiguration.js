const URLS = {
  baseURL: "https://fakestoreapi.com",
  endpoints: {
    getAllProducts: "/products",
    getProductById: "/products/{id}",
    getCategories: "/products/categories",
    getProductsInCategory: "/products/category/{category}",
    addToCart: "/carts",
    getCartById: "/carts/{id}",
    updateCartById: "/carts/{id}",
    deleteCartById: "/carts/{id}",
  },
};

export default URLS;
