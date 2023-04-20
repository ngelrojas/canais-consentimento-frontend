import { Fragment } from 'react';
import MainRoutes from './routes';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
  return (
    <Fragment>
      <Header />
      <MainRoutes />
      <Footer />
    </Fragment>
  )
}

export default App
