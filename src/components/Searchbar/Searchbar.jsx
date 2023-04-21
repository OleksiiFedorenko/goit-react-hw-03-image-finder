import { Bar, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

const Searchbar = () => {
  return (
    <Bar>
      <Form>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </Form>
    </Bar>
  );
};

export default Searchbar;
