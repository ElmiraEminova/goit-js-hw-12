const API_KEY = '44000737-c23aa9eb5fa4f7b392d266f4c';
const BASE_URL = 'https://pixabay.com/api/';

export const PER_PAGE = 15;

import axios from 'axios';
axios.defaults.baseURL = BASE_URL;

export const fetchImg = async (searchImage, newCurrentPage = 1) => {
  const response = await axios.get('', {
    params: {
      key: API_KEY,
      q: searchImage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: newCurrentPage,
      per_page: PER_PAGE,
    },
  });

  return response.data;
};
