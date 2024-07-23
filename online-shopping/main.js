import "./style.css";
import fetchData from "./util/Helper";
import URLS from "./util/urlCongiguration";

//delclaring and assigning vlues to dom elements
const productContainer = document.getElementById("product-list");
const { endpoints } = URLS; // excracting the endpoints using object desctructuring
console.log(endpoints);
//function to fetchItems from API / sever side
async function fetchAllItems() {
  const data = await fetchData(`${URLS.baseURL}${endpoints.getAllProducts}`); //fetching all items from server
  console.log(data);
}

fetchAllItems();
