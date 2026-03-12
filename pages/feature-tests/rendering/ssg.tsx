import Head from 'next/head';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--card-border, #ddd);
  border-radius: 12px;
`;

const TimeBlock = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: #f4f4f4;
  color: #333;
  border-radius: 8px;
  font-family: monospace;
  font-size: 1.2rem;
`;

export default function SSGPage({ generatedTime }: { generatedTime: string }) {
  return (
    <>
      <Head>
        <title>SSG Test (Static Site Generation)</title>
      </Head>
      <Wrapper>
        <h1>Static Site Generation (SSG)</h1>
        <p>이 페이지는 빌드(Build) 타임에 단 한 번 생성되었습니다.</p>
        <p>
          새로고침을 하거나 다른 사용자가 접속해도 항상 동일한 시간이
          표시됩니다. (Edge CDN 캐시)
        </p>
        <TimeBlock>생성된 시간: {generatedTime}</TimeBlock>
      </Wrapper>
    </>
  );
}

// 📌 핵심: getStaticProps를 사용하여 빌드 타임에 데이터를 가져옵니다.
export async function getStaticProps() {
  return {
    props: {
      generatedTime: new Date().toISOString(),
    },
  };
}
