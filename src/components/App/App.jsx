import { Component } from 'react';
import { Container } from './App.styled';
import GalleryService from 'services/GalleryService';
import Searchbar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import NoImagesWarning from 'components/NoImagesWarning/NoImagesWarning';
import Modal from 'components/Modal/Modal';

const galleryService = new GalleryService();

class App extends Component {
  state = {
    images: [],
    modalImage: {},
    status: '',
    message: 'No images to show yet',
  };

  getImages = async e => {
    e.preventDefault();
    const searchQuery = e.target.input.value.trim();
    galleryService.query = searchQuery;
    galleryService.resetPage();

    try {
      const fetchedData = await galleryService.fetchImages();
      console.log(fetchedData);
      if (!fetchedData.totalHits) {
        this.setState({ message: 'No images found' });
        return;
      }
      const imageArray = fetchedData.hits.map(
        ({ id, largeImageURL, webformatURL, tags }) => ({
          id,
          largeImageURL,
          webformatURL,
          tags,
        })
      );
      console.log(imageArray);
      this.setState({ images: imageArray });
    } catch (error) {
      console.log(error);
    }
  };

  loadMore = async () => {
    console.log('click');

    try {
      const fetchedData = await galleryService.fetchImages();
      const imageArray = fetchedData.hits.map(
        ({ id, largeImageURL, webformatURL, tags }) => ({
          id,
          largeImageURL,
          webformatURL,
          tags,
        })
      );
      this.setState({ images: [...this.state.images, ...imageArray] });
    } catch (error) {
      console.log(error);
    }
  };

  openModal = (url, alt) => {
    this.setState({ modalImage: { url, alt } });
  };

  closeModal = () => {
    this.setState({ modalImage: {} });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.getImages} />
        {this.state.images.length ? (
          <>
            <ImageGallery
              images={this.state.images}
              onImageClick={this.openModal}
            />
            <Button onClick={this.loadMore} />
          </>
        ) : (
          <NoImagesWarning message={this.state.message} />
        )}
        {this.state.modalImage.url && (
          <Modal image={this.state.modalImage} onClose={this.closeModal} />
        )}
        {/* <Loader /> */}
      </Container>
    );
  }
}

export default App;
