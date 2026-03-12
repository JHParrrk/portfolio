import styled from '@emotion/styled';
import { useQueryIdChecker } from '@/shared/hooks/customs/useQueryIdChecker';
import { useQueryFetchBoard } from '@/shared/hooks/queries/useQueryFetchBoard';
import BoardDetailBodyBottom from './bottom/BoardDetailBodyBottom.index';
import BoardDetailBodyMiddle from './middle/BoardDetailBodyMiddle.index';
import BoardDetailBodyTop from './top/BoardDetailBodyTop.index';

const CardWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin-top: 80px;
  padding: 60px 80px;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2f7;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export default function BoardDetailBody() {
  const { id } = useQueryIdChecker('boardId');
  const { data, loading, error } = useQueryFetchBoard(id); // boardId를 직접 전달

  if (loading) return <p>Loading...</p>; // 로딩 중 표시
  if (error) return <p>Error: {error.message}</p>; // 에러 발생 시 메시지 표시
  if (!data) return <p>No data available</p>; // 데이터가 없을 때 메시지 표시

  return (
    <CardWrapper>
      <BoardDetailBodyTop data={data} />
      <BoardDetailBodyMiddle data={data} />
      <BoardDetailBodyBottom />
    </CardWrapper>
  );
}
