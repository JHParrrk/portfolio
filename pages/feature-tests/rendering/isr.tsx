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

export default function ISRPage({ generatedTime }: { generatedTime: string }) {
  return (
    <>
      <Head>
        <title>ISR Test (Incremental Static Regeneration)</title>
      </Head>
      <Wrapper>
        <h1>Incremental Static Regeneration (ISR)</h1>
        <p>
          이 페이지는 처음에 정적으로 생성되지만, <b>10초</b> 단위로
          백그라운드에서 주기적으로 재생성됩니다.
        </p>
        <p>
          자주 변하지만 즉각적인 실시간이 필요하지 않은 데이터(예: 커머스 상세,
          블로그글)에 최적화된 렌더링 전략입니다.
        </p>
        <TimeBlock>생성 및 갱신된 시간: {generatedTime}</TimeBlock>
      </Wrapper>
    </>
  );
}

// 📌 핵심: getStaticProps 호출 시 `revalidate` 옵션을 추가하여 ISR을 활성화합니다.
export async function getStaticProps() {
  return {
    props: {
      generatedTime: new Date().toISOString(),
    },
    // 10초마다 들어오는 새로운 요청이 있을 경우, 백그라운드에서 페이지를 정적으로 재생성 (ISR)
    revalidate: 10,
  };
}
