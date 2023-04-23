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
      <a onClick={() => onImageClick(largeImageURL, tags)}>
        <Image src={webformatURL} alt={tags} />
      </a>
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
