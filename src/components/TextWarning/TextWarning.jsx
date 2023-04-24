import PropTypes from 'prop-types';
import { Text } from './TextWarning.styled';

const TextWarning = ({ message }) => {
  return <Text>{message}</Text>;
};

TextWarning.propTypes = {
  message: PropTypes.string.isRequired,
};

export default TextWarning;
