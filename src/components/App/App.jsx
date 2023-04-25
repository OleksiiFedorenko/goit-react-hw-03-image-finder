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
    message: 'Please let us know what you want to find',
    modal: {
      isOpen: false,
      imageUrl: '',
      imageAlt: '',
    },
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }

  onSubmit = query => {
    if (!query) {
      return this.setState({
        status: 'rejected',
        message: 'You searched nothing, please specify your query',
      });
    }
    if (query === this.state.query) return;

    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = (imageUrl, imageAlt) => {
    this.setState({ modal: { isOpen: true, imageUrl, imageAlt } });
  };

  closeModal = () => {
    this.setState({ modal: { isOpen: false } });
  };

  getImages = async (query, page) => {
    this.setState({ status: 'pending' });
    try {
      const { totalHits, hits } = await fetchImages(query, page);

      if (!totalHits) {
        return this.setState({
          status: 'rejected',
          message: 'No images found, please try different query',
        });
      }

      const totalPages = Math.ceil(totalHits / 12);
      const imageArray = this.collectNeededData(hits);

      this.setState(({ images, page }) => ({
        status: 'resolved',
        images: [...images, ...imageArray],
        totalPages,
        message: page === totalPages ? `That's it. Keep searching!` : '',
      }));
    } catch (error) {
      this.setState({
        status: 'rejected',
        message: 'Something went wrong. Please try again.',
      });
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

  render() {
    const { images, page, totalPages, status, message, modal } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />

        {(status === 'resolved' ||
          (status === 'pending' && images.length !== 0)) && (
          <ImageGallery images={images} onImageClick={this.openModal} />
        )}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && page !== totalPages && (
          <Button onLoadMore={this.onLoadMore} />
        )}

        {(status === 'idle' ||
          status === 'rejected' ||
          (status === 'resolved' && page === totalPages)) && (
          <TextWarning message={message} />
        )}

        {modal.isOpen && <Modal image={modal} onClose={this.closeModal} />}
      </Container>
    );
  }
}

export default App;
