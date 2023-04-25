import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ImageContainer } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClosing);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClosing);
  }

  handleClosing = e => {
    if (e.target === e.currentTarget || e.code === 'Escape')
      this.props.onClose();
  };

  render() {
    const { imageUrl, imageAlt } = this.props.image;

    return (
      <Overlay onClick={this.handleClosing}>
        <ImageContainer>
          <img src={imageUrl} alt={imageAlt} />
        </ImageContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.exact({
    isOpen: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
  }),
};

export default Modal;
