import styled from "@emotion/styled";
import { useQueryIdChecker } from "../../../../commons/hooks/customs/useQueryIdChecker";
import { useQueryFetchBoard } from "../../../../commons/hooks/queries/useQueryFetchBoard";
import BoardDetailBodyBottom from "./bottom/BoardDetailBodyBottom.index";
import BoardDetailBodyMiddle from "./middle/BoardDetailBodyMiddle.index";
import BoardDetailBodyTop from "./top/BoardDetailBodyTop.index";

const CardWrapper = styled.div`
  border: 1px solid black;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;

export default function BoardDetailBody() {
  const { id } = useQueryIdChecker("boardId");
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
