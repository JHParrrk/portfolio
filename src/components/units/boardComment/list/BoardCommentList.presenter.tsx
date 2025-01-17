import BoardCommentListUIItem from "./BoardCommentList.presenterItem";
import type { IBoardCommentListUIProps } from "./BoardCommentList.types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function BoardCommentListUI({
  data,
  onLoadMore,
  hasMore,
}: IBoardCommentListUIProps): JSX.Element {
  const fetchBoardComments = data?.fetchBoardComments ?? [];
  const dataLength = fetchBoardComments.length;

  return (
    <InfiniteScroll
      dataLength={dataLength} // 데이터의 길이
      next={onLoadMore} // 더 많은 데이터를 로드하는 함수
      hasMore={hasMore} // 더 로드할 데이터가 있는지 여부
      loader={<h4>Loading...</h4>} // 로더 컴포넌트
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>마지막 댓글 입니다...</b>
        </p>
      }
    >
      {fetchBoardComments.map((el) => (
        <BoardCommentListUIItem key={el._id} el={el} />
      )) ?? <></>}
    </InfiniteScroll>
  );
}
