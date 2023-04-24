import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  largeImageURL,
  webformatURL,
  tags,
  onImageClick,
}) => {
  return (
    <GalleryItem>
      <Image
        onClick={() => onImageClick(largeImageURL, tags)}
        src={webformatURL}
        alt={tags}
        loading="lazy"
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
