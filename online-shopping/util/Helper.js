//function to fetch data from Server to client using RESTful API

async function fetchData(url) {
  try {
    const response = await fetch(url); // fetches the data from Api
    if (response.ok) {
      // check data if it exists and return as JSON object
      const data = response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
