import Layout from './layout';
import MainRoutes from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { LoginOpt } from './components/login';

const App = () => {
  return (
    <>
      <Layout>
        {/* 
        verify if user is logged, if not, redirect to login page
        do that for header and footer components
         */}
        <Header />
        <MainRoutes />
        <Footer />
      </Layout>
    </>
  )
}

export default App
