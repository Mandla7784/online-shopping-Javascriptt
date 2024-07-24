import "./style.css";
import fetchData from "./util/Helper";
import URLS from "./util/urlCongiguration";
import itemsDetails from "./Components/ItemDetails";
console.log(itemsDetails);
//delclaring and assigning vlues to dom elements
const productContainer = document.getElementById("product-list");
const { endpoints } = URLS; // excracting the endpoints using object desctructuring
const query = `?limit=10`;

const searchInput = document.getElementById("search");

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
  const itemList = data.map((item) => {
    const { image, title } = item;
    return /*html*/ `
    <a  onClick="itemsDetails(${
      item.id
    })"  href="./Components/ItemDetails.html?id=${item.id}">
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
    </a>
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
     <a
       onClick="itemsDetails(${item.id})"
       href="./Components/ItemDetails.html?id=${item.id}"
     >
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

document.addEventListener("DOMContentLoaded", () => {
  fetchAllItems(); // when the page loads it will fetch all items
});
