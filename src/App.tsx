import Layout from './layout';
import MainRoutes from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { useLogin } from './hooks';

const App = () => {
  const token = useLogin("app_usr_teste_optin", "fD=1FFyTDWx1");
    console.log("RESPONSE HERE =>> ",token);
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
