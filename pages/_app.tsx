import { ToastContainer } from '@/features/toast/ui/ToastContainer';
import ApolloSettings from '@/app/providers/apollo';
import Layout from '@/shared/ui/layout';

import { Global } from '@emotion/react';
import { globalStyles } from '@/shared/ui/styles/globalStyles';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';

// [폰트 최적화] next/font를 활용한 Noto Sans KR 폰트 적용 (CLS 방지 및 로딩 속도 최적화)
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloSettings>
      <div className={`${notoSansKr.variable} global-theme-wrapper`}>
        <Global styles={globalStyles} />
        {/* [스크립트 최적화] 메인 렌더링 블로킹을 막기 위한 Lazy Onload 전략 적용 (구글 애널리틱스 모의) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=DEMO-GA-ID"
          strategy="lazyOnload"
        />
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </div>
    </ApolloSettings>
  );
}
