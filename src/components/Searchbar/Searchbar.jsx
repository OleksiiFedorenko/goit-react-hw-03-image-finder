import PropTypes from 'prop-types';
import { Bar, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  return (
    <Bar>
      <Form onSubmit={onSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          name="input"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Bar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
