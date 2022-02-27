import '../styles/globals.css'
import Layout from '../components/Layouts/Layout'
import {UserContext} from '../lib/context';
import {useUserData} from '../lib/hooks';
import {useSouls} from '../lib/hooks';

function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserContext.Provider>
  )
}

export default MyApp
