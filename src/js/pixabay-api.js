import axios from "axios";

const API_KEY = "48313222-9e5699caa5ef89de4c12bc71b";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchSearch(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
  return response.data;
}
