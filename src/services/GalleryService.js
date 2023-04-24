import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '34154257-bf748b84cc835cf9e78cea2f7';

export default class GalleryService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  async fetchImages() {
    const config = {
      params: {
        key: API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.pageNumber,
        per_page: 12,
      },
    };

    const fetchedData = await axios(config);
    this.incrementPage();
    return fetchedData.data;
  }

  incrementPage() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
