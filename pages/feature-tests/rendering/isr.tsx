import Head from 'next/head';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

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
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date().toLocaleString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>ISR Test (Incremental Static Regeneration)</title>
      </Head>
      <Wrapper>
        <h1>Incremental Static Regeneration (ISR) (Next.js 15)</h1>
        <p>
          이 페이지는 처음에 정적으로 생성되지만, <b>10초</b> 단위로
          백그라운드에서 주기적으로 재생성됩니다.
        </p>
        <p>
          주기적인 갱신을 확인하려면 10초 후에 페이지를 <b>새로고침</b>{' '}
          해보세요. 재생성 기준(10초)이 지나고 난 뒤의 첫 번째 접속자가 트리거가
          되어 백그라운드에서 조용히 갱신됩니다.
        </p>
        <TimeBlock>
          서버측 재생성 시간 (10초마다 갱신 대상):
          <br />
          {new Date(generatedTime).toLocaleString()}
        </TimeBlock>

        {isMounted && (
          <TimeBlock>
            현재 실시간 (클라이언트):
            <br />
            {currentTime}
          </TimeBlock>
        )}

        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          ※ 주의: `yarn dev`(개발 환경)에서는 매 요청마다 `getStaticProps`가
          새로 호출되므로 ISR의 실제 동작(10초 대기 후 갱신)을 확인하려면 `yarn
          build && yarn start`로 실행해야 합니다.
        </p>
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
