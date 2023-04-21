import { Container } from './App.styled';
import Searchbar from 'components/Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';

const App = () => {
  return (
    <Container>
      <Searchbar />
      <Loader />
    </Container>
  );
};

export default App;
