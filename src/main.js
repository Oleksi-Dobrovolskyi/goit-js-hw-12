import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = "48313222-9e5699caa5ef89de4c12bc71b"; 
const BASE_URL = "https://pixabay.com/api/";

const form = document.querySelector("#search-form");
const gallery = document.querySelector("#gallery");
const loader = document.querySelector("#loader");

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = event.target.searchQuery.value.trim();

  if (!query) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query!",
    });
    return;
  }

  fetchImages(query);
});

async function fetchImages(query) {
  showLoader(); 

  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    const data = await response.json();

    if (data.hits.length === 0) {
      iziToast.warning({
        title: "No Results",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      gallery.innerHTML = "";
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();
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


function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}


