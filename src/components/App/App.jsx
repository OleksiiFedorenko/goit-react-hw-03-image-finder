import { Component } from 'react';
import { Container } from './App.styled';
import fetchImages from 'services/GalleryService';
import Searchbar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import TextWarning from 'components/TextWarning/TextWarning';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    status: 'idle',
    query: '',
    page: 0,
    totalPages: 0,
    images: [],
    modalImage: {},
    message: 'Please let us know what you want to find',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      return this.renderNewImages(query, page);
    }

    if (prevState.page !== page) {
      this.renderMoreImages(query, page);
    }
  }

  getImages = query => {
    if (!query) {
      return this.setState({
        status: 'rejected',
        message: 'You searched nothing, please specify your query',
      });
    }
    if (query === this.state.query) return;

    this.setState({
      status: 'pending',
      query,
      page: 1,
      images: [],
    });
  };

  loadMore = async () => {
    this.setState(({ page, totalPages }) => ({
      status: 'pending',
      page: page + 1,
      message: page + 1 === totalPages ? `That's it. Keep searching!` : '',
    }));
  };

  openModal = (url, alt) => {
    this.setState({ modalImage: { url, alt } });
  };

  closeModal = () => {
    this.setState({ modalImage: {} });
  };

  renderNewImages = async (query, page) => {
    try {
      const { totalHits, hits } = await fetchImages(query, page);

      if (!totalHits) {
        return this.setState({
          status: 'rejected',
          message: 'No images found, please try different query',
        });
      }

      const imageArray = this.collectNeededData(hits);

      this.setState({
        status: 'resolved',
        images: imageArray,
        totalPages: Math.ceil(totalHits / 12),
        message: totalHits > 12 ? '' : `That's it. Keep searching!`,
      });
    } catch (error) {
      this.handleError(error);
    }
  };

  renderMoreImages = async (query, page) => {
    try {
      const { hits } = await fetchImages(query, page);
      const imageArray = this.collectNeededData(hits);

      this.setState(({ images }) => ({
        status: 'resolved',
        images: [...images, ...imageArray],
      }));
    } catch (error) {
      this.handleError(error);
    }
  };

  collectNeededData = fetchedArray => {
    return fetchedArray.map(({ id, largeImageURL, webformatURL, tags }) => ({
      id,
      largeImageURL,
      webformatURL,
      tags,
    }));
  };

  handleError = error => {
    console.log(error);
    this.setState({
      status: 'rejected',
      message: 'Something went wrong. Please try again.',
    });
  };

  render() {
    const { images, page, totalPages, status, message, modalImage } =
      this.state;

    return (
      <Container>
        <Searchbar getImages={this.getImages} />

        {(status === 'resolved' ||
          (status === 'pending' && images.length !== 0)) && (
          <ImageGallery images={images} onImageClick={this.openModal} />
        )}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && page !== totalPages && (
          <Button onClick={this.loadMore} />
        )}

        {(status === 'idle' ||
          status === 'rejected' ||
          (status === 'resolved' && page === totalPages)) && (
          <TextWarning message={message} />
        )}

        {modalImage.url && (
          <Modal image={modalImage} onClose={this.closeModal} />
        )}
      </Container>
    );
  }
}

export default App;
