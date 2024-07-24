/**
 * @param {object} data
 * @returns {object}
 */
//function to render item's deatils with specified id

function itemsDetails(item) {
  const { image, title, description, price, ratings } = item;
  return /*html*/ `



<div class="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
  <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
    <a href="#" class="flex flex-wrap no-underline hover:no-underline">
      <div class="w-full p-6 flex flex-row flex-wrap">
        <div class="w-full md:w-2/5">
          <img
            class="h-full w-full rounded-t object-cover object-center mb-6 md:mb-0"
            src="${image}"
            alt=""
          />
        </div>  
        <div class="w-full md:w-3/5 flex flex-col flex-wrap">
          <h1 class="text-3xl text-gray-900 font-bold leading-none mb-3">${title}</h1>    
          <p class="text-gray-600 text-sm"> ${description}</p>
          <p class="text-gray-900 text-xl"> ${price}</p>
          <p class="text-gray-600 text-sm"> ${ratings}</p>
        </div>
      </div>
    </a>
  </div>
</div>

`;
}

export default itemsDetails;
