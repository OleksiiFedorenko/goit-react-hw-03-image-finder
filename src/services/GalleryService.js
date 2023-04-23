import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '34154257-bf748b84cc835cf9e78cea2f7';

export default class GalleryService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
    this.imagesCapacity = 0;
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
    this.decrementCapacity();
    return fetchedData.data;
  }

  incrementPage() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  decrementCapacity() {
    this.imagesCapacity -= 40;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get capacity() {
    return this.imagesCapacity;
  }

  set capacity(newImagesCapacity) {
    this.imagesCapacity = newImagesCapacity;
  }
}
