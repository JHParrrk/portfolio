import MarketBFFExample from '@/features/market/ui/list/MarketBFFExample';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
`;

const Hero = styled.section`
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #1890ff 0%, #722ed1 100%);
  color: white;
  border-radius: 20px;
  margin-bottom: 40px;
`;

const Description = styled.div`
  margin: 40px 0;
  line-height: 1.8;
  color: #444;
  padding: 30px;
  background: white;
  border-left: 5px solid #1890ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export default function BFFExamplePage() {
  return (
    <Wrapper>
      <Hero>
        <h1>Next.js BFF (Backend For Frontend) Pattern</h1>
        <p>Implementing secure and optimized data fetching</p>
      </Hero>

      <Description>
        <h3>왜 BFF 패턴을 사용하나요?</h3>
        <ul>
          <li>
            <strong>보안:</strong> 외부 API 엔드포인트와 API 키를 브라우저에
            노출하지 않고 서버 측에서 안전하게 호출합니다.
          </li>
          <li>
            <strong>데이터 최적화:</strong> 백엔드(GraphQL)에서 받은 원본 데이터
            중 UI에 필요한 필드만 추출하고 정제(Formatting)하여 클라이언트의
            부담을 줄입니다.
          </li>
          <li>
            <strong>성능:</strong> 여러 개의 API 호출을 서버 측에서 하나로 묶어
            처리(Aggregation)할 수 있습니다.
          </li>
        </ul>
      </Description>

      <MarketBFFExample />
    </Wrapper>
  );
}
