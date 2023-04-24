import PropTypes from 'prop-types';
import { Bar, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

const Searchbar = ({ getImages }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.input.value.trim();
    getImages(searchQuery);
  };

  return (
    <Bar>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Bar>
  );
};

Searchbar.propTypes = {
  getImages: PropTypes.func.isRequired,
};

export default Searchbar;
