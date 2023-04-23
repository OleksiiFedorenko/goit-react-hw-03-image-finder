import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <Gallery>
      {images.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
          tags={tags}
          onImageClick={onImageClick}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
