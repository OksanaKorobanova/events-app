import Head from 'next/head';
import Layout from '@/components/layout/layout';
import '@/styles/globals.css';
import { NotificationContextProvider } from '@/store/notification-context';

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Events app</title>
          <meta name='description' content='A list of  events' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
