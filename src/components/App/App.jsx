import { Component } from 'react';
import { Container } from './App.styled';
import Searchbar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import TextWarning from 'components/TextWarning/TextWarning';
import Modal from 'components/Modal/Modal';

import GalleryService from 'services/GalleryService';
const galleryService = new GalleryService();

class App extends Component {
  state = {
    status: 'idle',
    images: [],
    imagesCapacity: 0,
    modalImage: {},
    message: 'No images to show yet',
  };

  getImages = async searchQuery => {
    if (searchQuery === galleryService.query) return;
    if (!searchQuery) {
      return this.setState({
        status: 'rejected',
        message: 'Please type what you want to find',
      });
    }

    this.setState({ status: 'pending', images: [] });

    try {
      galleryService.query = searchQuery;
      galleryService.resetPage();
      const fetchedData = await galleryService.fetchImages();

      if (!fetchedData.totalHits) {
        return this.setState({
          status: 'rejected',
          message: 'No images found',
        });
      }

      const imageArray = this.collectNeededData(fetchedData.hits);
      this.setState({
        status: 'resolved',
        images: imageArray,
        imagesCapacity: fetchedData.totalHits - 12,
        message: fetchedData.totalHits > 12 ? '' : 'You reached the limit',
      });
    } catch (error) {
      this.handleError(error);
    }
  };

  loadMore = async () => {
    this.setState({ status: 'pending' });

    try {
      const fetchedData = await galleryService.fetchImages();
      const imageArray = this.collectNeededData(fetchedData.hits);
      this.setState(({ images, imagesCapacity }) => ({
        status: 'resolved',
        images: [...images, ...imageArray],
        imagesCapacity: imagesCapacity - 12,
        message: imagesCapacity > 12 ? '' : 'You reached the limit',
      }));
    } catch (error) {
      this.handleError(error);
    }
  };

  openModal = (url, alt) => {
    this.setState({ modalImage: { url, alt } });
  };

  closeModal = () => {
    this.setState({ modalImage: {} });
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
    const { images, imagesCapacity, status, message, modalImage } = this.state;

    return (
      <Container>
        <Searchbar getImages={this.getImages} />

        {(status === 'resolved' ||
          (status === 'pending' && images.length !== 0)) && (
          <ImageGallery images={images} onImageClick={this.openModal} />
        )}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && imagesCapacity > 0 && (
          <Button onClick={this.loadMore} />
        )}

        {(status === 'idle' ||
          status === 'rejected' ||
          (status === 'resolved' && imagesCapacity <= 0)) && (
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
