import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';

function App() {
  const basename = process.env.PUBLIC_URL;
  return (
    <>
      <BrowserRouter basename={basename}>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
