import { useState } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0051bb;
  }
`;

const ResultArea = styled.pre`
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  min-height: 200px;
`;

export default function AggregationTest() {
  const [useditemId, setUseditemId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onTestAggregation = async () => {
    if (!useditemId) {
      alert('useditemId를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/market/aggregation-example?useditemId=${useditemId}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: '데이터를 가져오는데 실패했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <h1>BFF Aggregation Test</h1>
      <p>
        상품 ID를 입력하여 BFF 계층에서 '상품+판매자+내정보'가 결합된 데이터를
        호출하는 예제입니다.<br />
        예시: <code>69b24440fdc49f00299f70db</code>
      </p>

      <InputGroup>
        <Input
          type="text"
          placeholder="useditemId (예: 69b24440fdc49f00299f70db)"
          value={useditemId}
          onChange={(e) => setUseditemId(e.target.value)}
        />
        <Button onClick={onTestAggregation} disabled={loading}>
          {loading ? '호출 중...' : 'BFF 호출하기'}
        </Button>
      </InputGroup>

      <h3>결과:</h3>
      <ResultArea>
        {result ? JSON.stringify(result, null, 2) : '결과가 여기에 표시됩니다.'}
      </ResultArea>
    </Wrapper>
  );
}
