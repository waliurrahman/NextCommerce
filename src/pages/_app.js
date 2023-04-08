import '@/styles/globals.css'
import Layout from '../components/Layout';
import AccountWithProvider from "../pages/account";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AccountWithProvider session={pageProps.session}>
        <Component {...pageProps} />
      </AccountWithProvider>
    </Layout>
  )
}

export default MyApp
