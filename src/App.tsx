import Layout from './layout';
import MainRoutes from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { LoginOpt } from './components/login';

const App = () => {
  return (
    <>
      <Layout>
        <LoginOpt />
        <Header />
          <MainRoutes />
        <Footer />
      </Layout>
    </>
  )
}

export default App
