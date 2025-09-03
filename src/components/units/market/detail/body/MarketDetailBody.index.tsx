import styled from "@emotion/styled";
import { useQueryIdChecker } from "@/src/components/commons/hooks/customs/useQueryIdChecker";
import { useQueryFetchUsedItem } from "@/src/components/commons/hooks/queries/ustQueryFetchUsedItem";
import MarketDetailBodyBottom from "./bottom/MarketDetailBodyBottom.index";
import MarketDetailBodyMiddle from "./middle/MarketDetailBodyMiddle.index";
import MarketDetailBodyTop from "./top/MarketDetailBodyTop.index";

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

export default function MarketDetailBody() {
  const { id } = useQueryIdChecker("marketId");
  const { data, loading, error } = useQueryFetchUsedItem(id); // marketId를 직접 전달

  if (loading) return <p>Loading...</p>; // 로딩 중 표시
  if (error) return <p>Error: {error.message}</p>; // 에러 발생 시 메시지 표시
  if (!data) return <p>No data available</p>; // 데이터가 없을 때 메시지 표시

  return (
    <CardWrapper>
      <MarketDetailBodyTop data={data} />
      <MarketDetailBodyMiddle data={data} />
      <MarketDetailBodyBottom />
    </CardWrapper>
  );
}
