import "./style.css";
import fetchData from "./util/Helper";
import URLS from "./util/urlCongiguration";

//delclaring and assigning vlues to dom elements
const productContainer = document.getElementById("product-list");
const { endpoints } = URLS; // excracting the endpoints using object desctructuring

//function to fetchItems from API / sever side
async function fetchAllItems() {
  const data = await fetchData(`${URLS.baseURL}${endpoints.getAllProducts}`); //fetching all items from server
  //invoking the display function
  displayAllItems(data);
}
/// function  to render items in the DOM
async function displayAllItems(data) {
  //maping through the data list and render as a card
  const itemList = data.map((item) => {
    const { image, title } = item;
    return /*html*/ `
          <div class="card ">
            <img class="w-full h-48 object-cover"  src=${image}  alt=${title} />
            <ionic-icon name="cart-outline"></ionic-icon>
            <iconic-icon name="heart-outline"></ionic-icon>
            <h1>${title}</h1>
            <a class="text-slate-700 hover:text-slate-900 transition">Read More</a>
          </div>
        
        `;
  });
  productContainer.innerHTML = itemList.join("");
}

fetchAllItems();
