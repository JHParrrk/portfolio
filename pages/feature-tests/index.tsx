import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 300px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: #1890ff;
  }

  h3 {
    margin-bottom: 15px;
    color: #333;
  }

  p {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export default function FeatureTestsHub() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <Wrapper>
      <Title>Feature Tests Hub</Title>
      <CardContainer>
        <Card onClick={() => navigateTo('/feature-tests/architecture')}>
          <h3>Enterprise Architecture</h3>
          <p>
            Radix UI + Zod + React Hook Form + Zustand 기반의 다이얼로그 폼
            테스트
          </p>
        </Card>
        <Card onClick={() => navigateTo('/market/bff')}>
          <h3>BFF Pattern</h3>
          <p>
            Next.js API Routes를 활용한 Backend For Frontend 데이터 최적화
            테스트
          </p>
        </Card>
        <Card onClick={() => navigateTo('/myfirebase')}>
          <h3>Firebase 연동</h3>
          <p>
            Firebase Firestore를 이용한 데이터 읽기/쓰기 및 상태 동기화 테스트
          </p>
        </Card>
        <Card onClick={() => navigateTo('/feature-tests/aggregation')}>
          <h3>BFF Aggregation</h3>
          <p>
            BFF 계층에서 여러 API 데이터를 결합(Aggregation)하여 응답하는 성능
            최적화 모델 테스트
          </p>
        </Card>
        <Card onClick={() => navigateTo('/feature-tests/rendering/ssg')}>
          <h3>SSG Rendering</h3>
          <p>빌드 타임 정적 HTML 생성 (공지사항/약관 페이지 최적화 예시)</p>
        </Card>
        <Card onClick={() => navigateTo('/feature-tests/rendering/isr')}>
          <h3>ISR Rendering</h3>
          <p>
            주기적 백그라운드 재생성 (SSG 속도 + SSR 최신성 하이브리드 예제)
          </p>
        </Card>
      </CardContainer>
    </Wrapper>
  );
}
