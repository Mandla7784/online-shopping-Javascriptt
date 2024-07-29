import "./style.css";
import fetchData from "./util/Helper";
import URLS from "./util/urlCongiguration";

//delclaring and assigning vlues to dom elements
const productContainer = document.getElementById("product-list");
const { endpoints } = URLS; // excracting the endpoints using object desctructuring
const searchInput = document.getElementById("search");
const mainTitle = document.getElementById("title");
const categoryLabelEl = document.getElementById("label-category");
const goBackLink = document.getElementById("go-back");

//function to fetchItems from API / sever side
async function fetchAllItems() {
  const data = await fetchData(`${URLS.baseURL}${endpoints.getAllProducts}`); //fetching all items from server
  //invoking the display function
  displayAllItems(data);
  return data; // return data to use it later for search
}

/// function  to render items in the DOM
async function displayAllItems(data) {
  //maping through the data list and render as a card
  const itemList = await data.map((item) => {
    const { image, title } = item;
    return /*html*/ `
 <!-- TESTING  -->
<button onClick="showingDetails(${item.id})" >
  <div class="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
  <img class="w-full h-48 object-cover" src="${image}" alt="${title}" />
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-lg font-semibold text-gray-800">${title.slice(
        0,
        6
      )}...</h1>
      <div class="flex space-x-2">
        <ion-icon  class="text-gray-600 text-xl font-bold hover:text-green-600 transition-colors duration-300" name="cart-outline" class="text-gray-600 hover:text-blue-600 transition-colors duration-300"></ion-icon>
        <ion-icon  class="text-gray-600 hover:text-red-600 transition-colors duration-300" name="heart-outline" class="text-gray-600 hover:text-red-600 transition-colors duration-300"></ion-icon>
      </div>
    </div>
    <a class="text-blue-600 hover:underline transition duration-300" href="#">Read More</a>
  </div>
</div>
</button>
 
        `;
  });
  productContainer.innerHTML = itemList.join(""); // rendering the items in the DOM
}
function displaySearchedItems(data) {
  const searched = searchInput.value; // getting the value of search input

  const searchedItems = data.filter((item) => {
    return item.title.toLowerCase().includes(searched.toLowerCase()); // filtering the searched items based on their title
  });

  productContainer.innerHTML = searchedItems // rendering the searched items in the DOM
    .map((item) => {
      const { image, title } = item; // extracting image and title from the item

      return /*html*/ `
    
       <div class="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
         <img class="w-full h-48 object-cover" src="${image}" alt="${title}" />
         <div class="p-4">
           <div class="flex justify-between items-center mb-4">
             <h1 class="text-lg font-semibold text-gray-800">
               ${title.slice(0, 6)}...
             </h1>
             <div class="flex space-x-2">
               <ion-icon
                 class="text-gray-600 text-xl font-bold hover:text-green-600 transition-colors duration-300"
                 name="cart-outline"
                 class="text-gray-600 hover:text-blue-600 transition-colors duration-300"
               ></ion-icon>
               <ion-icon
                 class="text-gray-600 hover:text-red-600 transition-colors duration-300"
                 name="heart-outline"
                 class="text-gray-600 hover:text-red-600 transition-colors duration-300"
               ></ion-icon>
             </div>
           </div>
           <a
             class="text-blue-600 hover:underline transition duration-300"
             href="#"
           >
             Read More
           </a>
   
         </div>
       </div>
     </a>;
     `;
    })
    .join("");
}
searchInput.addEventListener("input", async () => {
  const data = await fetchAllItems();
  displaySearchedItems(data); // display searched items in the dom
});

//function to show details of item on click
async function showingDetails(id) {
  //this function will be called on click of the card and change html content loading a new content dynamically
  const spanEl = document.getElementById("category-all");
  spanEl.hidden = true;
  const item = await fetchData(`https://fakestoreapi.com/products/${id}`);
  categoryLabelEl.innerText += `${item.category}`;
  categoryLabelEl.classList.add("font-bold");
  mainTitle.innerHTML = "Product Details";

  productContainer.innerHTML = /*html*/ `
  <div class="product-container flex gap-8 p-4 border rounded-lg shadow-lg bg-white">
    <img src="${item.image}" alt="${item.title}" class="w-32 h-32 object-cover rounded-md" />
    
    <div class="description flex flex-col justify-between w-full">
      <h2 class="text-lg font-semibold mb-2">${item.title}</h2>
      <div class="price text-xl font-bold text-green-600 mb-2">$${item.price}</div>
      <button class="add-to-cart bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Add to Cart
      </button>
    </div>
  </div>
`;
}
window.showingDetails = showingDetails; // attaching the function to the window object to be accessible from the browser

document.addEventListener("DOMContentLoaded", () => {
  fetchAllItems(); // when the page loads it will fetch all items
});
