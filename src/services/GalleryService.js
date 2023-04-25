import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '34154257-bf748b84cc835cf9e78cea2f7';

const fetchImages = async (query, page) => {
  const config = {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  const fetchedData = await axios(config);
  return fetchedData.data;
};

export default fetchImages;
