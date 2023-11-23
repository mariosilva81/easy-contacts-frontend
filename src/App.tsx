import { GlobalStyle } from './styles/globalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RoutesMain } from './routes/RoutesMain';
import { useClientContext } from './providers/ClientContext';
import { StyledLoaderContainer } from './styles/grid';
import { GridLoader,  } from 'react-spinners';

const App = () => {
  const { globalLoading } = useClientContext();

  return (
    <>
      {globalLoading ? (
        <StyledLoaderContainer>
          <GridLoader color="#4588E6" />
        </StyledLoaderContainer>
      ) : (
        <RoutesMain />
      )}
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};

export default App;
