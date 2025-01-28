import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { imagesCardTemplate } from "./js/render-functions";
import { fetchSearch } from "./js/pixabay-api";

const form = document.querySelector("#search-form");
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const pagination = document.querySelector("#pagination");
const prevPageButton = document.querySelector("#prev-page");
const nextPageButton = document.querySelector("#next-page");
const pageInfo = document.querySelector("#page-info");

let currentPage = 1;
let query = "";
let totalPages = 0;
let isLoading = false;

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

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
  gallery.innerHTML = "";
  pagination.classList.add("hidden");
  await fetchAndRenderImages(query, currentPage);
});

async function fetchAndRenderImages(query, page) {
  if (isLoading) return;
  isLoading = true;
  showLoader();

  try {
    const data = await fetchSearch(query, page);

    if (data.hits.length === 0 && page === 1) {
      iziToast.warning({
        title: "No Results",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    totalPages = Math.ceil(data.totalHits / 15);
    renderGallery(data.hits);

    if (page > 1) {
      smoothScrollToNewContent(); 
    }

    updatePagination();
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
  gallery.innerHTML += markup; 
  lightbox.refresh();
}

function smoothScrollToNewContent() {
  const cardHeight = document.querySelector(".gallery a").getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

function updatePagination() {
  pagination.classList.remove("hidden");

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

prevPageButton.addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    await fetchAndRenderImages(query, currentPage);
  }
});

nextPageButton.addEventListener("click", async () => {
  if (currentPage < totalPages) {
    currentPage++;
    await fetchAndRenderImages(query, currentPage);
  }
});

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}
