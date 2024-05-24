import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createMarkup } from './js/render-functions';
import { fetchImg, PER_PAGE } from './js/pixabay-api';

const imgEl = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.js-load-more');

let newCurrentPage = 1;
let searchQuery = '';
let totalPages = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

const onSearch = async (event) => {
  event.preventDefault();

  searchQuery = event.target.elements.searchKeyword.value.trim();
  if (searchQuery === '') {
    imgEl.innerHTML = '';
    event.target.reset();
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  imgEl.innerHTML = '';
  loadMoreBtn.classList.add('d-none');
  loaderEl.classList.remove('is-hidden');

  try {
    newCurrentPage = 1;
    const imagesData = await fetchImg(searchQuery, newCurrentPage);
    if (imagesData.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loaderEl.classList.add('is-hidden');
      return;
    }

    imgEl.innerHTML = createMarkup(imagesData.hits);
    totalPages = Math.ceil(imagesData.totalHits / PER_PAGE);
    if (newCurrentPage < totalPages) {
      loadMoreBtn.classList.remove('d-none');
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    lightbox.refresh();

  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'An error occurred while fetching the images. Please try again later!',
    });
  } finally {
    loaderEl.classList.add('is-hidden');
  }
};

const clickLoadMore = async () => {
  newCurrentPage += 1;
  loaderEl.classList.remove('is-hidden');

  try {
    const imagesData = await fetchImg(searchQuery, newCurrentPage);
    imgEl.insertAdjacentHTML('beforeend', createMarkup(imagesData.hits));
    lightbox.refresh();


    const { height: cardHeight } = imgEl.firstElementChild.getBoundingClientRect();
    window.scrollBy({
       top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (newCurrentPage >= totalPages) {
      loadMoreBtn.classList.add('d-none');
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'An error occurred while fetching the images. Please try again later!',
    });
  } finally {
    loaderEl.classList.add('is-hidden');
  }
};

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', clickLoadMore);