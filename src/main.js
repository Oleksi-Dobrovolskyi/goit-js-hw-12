import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const API_KEY = "48313222-9e5699caa5ef89de4c12bc71b";
const BASE_URL = "https://pixabay.com/api/";

const form = document.querySelector("#search-form");
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");
const pagination = document.querySelector("#pagination");

let currentPage = 1; 
let query = ""; 
let totalPages = 0; 

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

form.addEventListener("submit", (event) => {
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
  fetchImages(query, currentPage);
});

async function fetchImages(query, page) {
  showLoader();

  try {
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

    const data = response.data;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: "No Results",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      gallery.innerHTML = "";
      pagination.innerHTML = ""; 
      return;
    }

    totalPages = Math.ceil(data.totalHits / 10);
    renderGallery(data.hits);
    renderPagination();
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Failed to fetch images. Please try again later.",
    });
  } finally {
    hideLoader();
  }
}

function renderGallery(images) {
  gallery.innerHTML = "";

  const markup = images
    .map(
      (image) => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="gallery-info">
          <div>
            <p><b>Likes:</b> ${image.likes}</p>
            <p><b>Views:</b> ${image.views}</p>
          </div>
          <div>
            <p><b>Comments:</b> ${image.comments}</p>
            <p><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </div>
      </a>
    `
    )
    .join("");

  gallery.innerHTML = markup;

  lightbox.refresh();
}

function renderPagination() {
  pagination.innerHTML = "";

  const prevButton = `
    <button class="btn-prev" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
  `;
  const nextButton = `
    <button class="btn-next" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
  `;

  pagination.innerHTML = `${prevButton} <span>Page ${currentPage} of ${totalPages}</span> ${nextButton}`;

  const prevBtn = document.querySelector(".btn-prev");
  const nextBtn = document.querySelector(".btn-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchImages(query, currentPage);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        fetchImages(query, currentPage);
      }
    });
  }
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}


