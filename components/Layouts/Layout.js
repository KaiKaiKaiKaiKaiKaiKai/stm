import Head from 'next/head'
import Header from '../Header'


const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <title>Soul Traders Marketplace</title>
      </Head>
      {/* Header */}
      <Header />
        <main>
            {children}
        </main>
    </div>
  )
}

export default Layout