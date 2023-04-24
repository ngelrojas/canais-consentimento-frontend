import Layout from './layout';
import MainRoutes from './routes';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
  return (
    <>
      <Layout>
        <Header />
          <MainRoutes />
        <Footer />
      </Layout>
    </>
  )
}

export default App
