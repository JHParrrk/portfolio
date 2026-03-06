import { ToastContainer } from '@/features/toast/ui/ToastContainer';
import ApolloSettings from '@/app/providers/apollo';
import Layout from '@/shared/ui/layout';

import { Global } from '@emotion/react';
import { globalStyles } from '@/shared/ui/styles/globalStyles';
import '@/styles/globals.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloSettings>
      <>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </>
    </ApolloSettings>
  );
}
