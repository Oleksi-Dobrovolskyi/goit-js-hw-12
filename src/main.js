import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { imagesCardTemplate } from "./js/render-functions";
import { fetchSearch } from "./js/pixabay-api";

const form = document.querySelector("#search-form");
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const loadMoreButton = document.querySelector("#load-more");

let currentPage = 1;
let query = "";
let totalPages = 0;
let totalHits = 0;
let isLoading = false;

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

loadMoreButton.classList.add("hidden");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = event.target.searchQuery.value.trim();

  if (!query) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query!",
    });
    return;
  }

  currentPage = 1;
  totalPages = 0;
  totalHits = 0;
  gallery.innerHTML = "";
  loadMoreButton.classList.add("hidden"); 

  await fetchAndRenderImages(query, currentPage);
});

async function fetchAndRenderImages(query, page) {
  if (isLoading) return;
  isLoading = true;
  showLoader();

  try {
    const data = await fetchSearch(query, page, 15);

    if (data.hits.length === 0 && page === 1) {
      iziToast.warning({
        title: "No Results",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    totalHits = data.totalHits; 
    totalPages = Math.ceil(totalHits / 15);
    renderGallery(data.hits);

    if (currentPage >= totalPages) {
      loadMoreButton.classList.add("hidden");
      iziToast.info({
        title: "End of Results",
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreButton.classList.remove("hidden");
    }

  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Failed to fetch images. Please try again later.",
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
}

function renderGallery(images) {
  const markup = imagesCardTemplate(images);
  gallery.insertAdjacentHTML("beforeend", markup); 
  lightbox.refresh();
}

function smoothScrollToNewContent() {
  const cardHeight = document.querySelector(".gallery a").getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

loadMoreButton.addEventListener("click", async () => {
  if (currentPage < totalPages) {
    currentPage++;
    await fetchAndRenderImages(query, currentPage);
    smoothScrollToNewContent();
  }
});

function showLoader() {
  loader.classList.remove("hidden");
  loadMoreButton.insertAdjacentElement("afterend", loader);
}

function hideLoader() {
  loader.classList.add("hidden");
}


