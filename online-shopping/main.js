import "./style.css";
import fetchData from "./util/Helper";
import URLS from "./util/urlCongiguration.js";

// Declaring and assigning values to DOM elements
const productContainer = document.getElementById("product-list");
const { endpoints } = URLS; // Extracting the endpoints using object destructuring
const searchInput = document.getElementById("search");
const mainTitle = document.getElementById("title");
const categoryLabelEl = document.getElementById("label-category");
const goBackLink = document.getElementById("go-back");

// Function to fetch items from API/server side
async function fetchAllItems() {
  const data = await fetchData(`${URLS.baseURL}${endpoints.getAllProducts}`); // Fetching all items from server
  displayAllItems(data); // Invoking the display function
  return data; // Return data to use it later for search
}

// Function to render items in the DOM
async function displayAllItems(data) {
  const itemList = data.map((item) => {
    if (item) {
      const { image, title } = item;
      return /*html*/ `
        <button onClick="showingDetails(${item.id})">
          <div class="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img class="w-full h-48 object-cover" src="${image}" alt="${title}" />
            <div class="p-4">
              <div class="flex justify-between items-center mb-4">
                <h1 class="text-lg font-semibold text-gray-800">${title.slice(
                  0,
                  6
                )}...</h1>
                <div class="flex space-x-2">
                  <ion-icon class="text-gray-600 text-xl font-bold hover:text-green-600 transition-colors duration-300" name="cart-outline"></ion-icon>
                  <ion-icon class="text-gray-600 hover:text-red-600 transition-colors duration-300" name="heart-outline"></ion-icon>
                </div>
              </div>
              <a class="text-blue-600 hover:underline transition duration-300" href="#">Read More</a>
            </div>
          </div>
        </button>
      `;
    } else {
      return `<p class="text-center text-gray-500 p-4">No product found</p>`;
    }
  });

  productContainer.innerHTML = itemList.join(""); // Rendering the items in the DOM
}

// Function to display searched items
function displaySearchedItems(data) {
  const searched = searchInput.value; // Getting the value of search input

  const searchedItems = data.filter((item) =>
    item.title.toLowerCase().includes(searched.toLowerCase())
  );

  productContainer.innerHTML = searchedItems
    .map((item) => {
      if (item) {
        const { image, title } = item;
        return /*html*/ `
          <div class="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img class="w-full h-48 object-cover" src="${image}" alt="${title}" />
            <div class="p-4">
              <div class="flex justify-between items-center mb-4">
                <h1 class="text-lg font-semibold text-gray-800">${title.slice(
                  0,
                  6
                )}...</h1>
                <div class="flex space-x-2">
                  <ion-icon class="text-gray-600 text-xl font-bold hover:text-green-600 transition-colors duration-300" name="cart-outline"></ion-icon>
                  <ion-icon class="text-gray-600 hover:text-red-600 transition-colors duration-300" name="heart-outline"></ion-icon>
                </div>
              </div>
              <a class="text-blue-600 hover:underline transition duration-300" href="#">Read More</a>
            </div>
          </div>
        `;
      } else {
        return `<p class="text-center text-gray-500 p-4">No product found</p>`;
      }
    })
    .join(""); // Rendering the searched items in the DOM
}

searchInput.addEventListener("input", async () => {
  const data = await fetchAllItems();
  displaySearchedItems(data); // Display searched items in the DOM
});

// Function to show details of item on click
async function showingDetails(id) {
  const spanEl = document.getElementById("category-all");
  spanEl.hidden = true;
  const item = await fetchData(`https://fakestoreapi.com/products/${id}`);
  categoryLabelEl.innerText = `${item.category}`; // Fixed: Added assignment instead of concatenation
  categoryLabelEl.classList.add("font-bold");
  mainTitle.innerHTML = "Product Details";
  goBackLink.classList.remove("hidden");
  goBackLink.innerHTML = "Back to Products";

  productContainer.innerHTML = /*html*/ `
    <div class="product-container flex gap-8 p-4 border rounded-lg shadow-lg bg-white">
      <img src="${item.image}" alt="${item.title}" class="w-32 h-32 object-cover rounded-md" />
      <div class="description flex flex-col justify-between w-full">
        <h2 class="text-lg font-semibold mb-2">${item.title}</h2>
        <div class="price text-xl font-bold text-green-600 mb-2">$${item.price}</div>
        <button onClick="addingItemsToCart(${item.id})" class="add-to-cart bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

window.showingDetails = showingDetails;

document.addEventListener("DOMContentLoaded", () => {
  fetchAllItems(); // When the page loads it will fetch all items
});

// Declaring a Cart counter
let my_cart_counter = document.getElementById("cart-count");
my_cart_counter.textContent =
  JSON.parse(localStorage.getItem("cart-count")) || 0; // Initial items zero items in local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// adding items to cart
window.addingItemsToCart = function addingItemsToCart(id) {
  my_cart_counter.textContent = Number(my_cart_counter.textContent) + 1;
  cartItems.push(id); // pushing a licked item to cartList stringified to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); //setting cart items to database when add to cart button clicked
  localStorage.setItem(
    "cart-count",
    JSON.stringify(my_cart_counter.textContent)
  );
};
// displaying items from cart

const myCart = document.getElementById("my-cart");
const overlay_cart = document.querySelector(".overlay");
const closeCartButton = document.querySelector("#btn-close-cart");

function closeCart() {
  closeCartButton.addEventListener("click", function () {
    overlay_cart.classList.add("md:hidden");
  });
}
function openCart() {
  //when user clicks on mycart it will open the cart page to view cart Items
  myCart.addEventListener("click", function () {
    overlay_cart.classList.remove("md:hidden");
  });
}
openCart();
closeCart();
