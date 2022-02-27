import '../styles/globals.css'
import Layout from '../components/layouts/Layout'
import {UserContext} from '../lib/context';
import {useUsername} from '../lib/hooks';

function MyApp({ Component, pageProps }) {

  const userData = useUsername();

  return (
    <UserContext.Provider value={userData}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserContext.Provider>
  )
}

export default MyApp
