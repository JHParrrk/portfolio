import { useQueryIdChecker } from "../../../../commons/hooks/customs/useQueryIdChecker";
import { useQueryFetchBoardComment } from "../../../../commons/hooks/queries/useQueryFetchBoardComments";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentsBoardView from "../../../../commons/comments/board/view/CommentsBoardView.index";
import CommentsBoardWrite from "../../../../commons/comments/board/write/CommentsBoardWrite.index";

export default function BoardDetailFooter() {
  const { id } = useQueryIdChecker("boardId");
  const { data, fetchMore } = useQueryFetchBoardComment({ boardId: id });

  const onLoadMore = () => {
    if (!data) return; // 데이터가 없으면 반환

    void fetchMore({
      variables: {
        page: Math.ceil(data?.fetchBoardComments.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoardComments) {
          // fetchMoreResult가 없을 경우 이전 데이터를 반환
          return { fetchBoardComments: [...prev.fetchBoardComments] };
        }
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return (
    <>
      <CommentsBoardWrite />
      {data?.fetchBoardComments?.length === 0 ? ( // 댓글이 없을 때
        <p style={{ textAlign: "center" }}>
          <b>마지막 댓글 입니다...</b>
        </p>
      ) : (
        <InfiniteScroll
          dataLength={data?.fetchBoardComments?.length || 0} // null 또는 undefined일 경우 0으로 처리
          next={onLoadMore} // 데이터 로드 함수
          hasMore={Boolean((data?.fetchBoardComments?.length ?? 0) % 10 === 0)} // 더 많은 데이터가 있는지 확인
          loader={<h4>Loading...</h4>} // 로딩 중 UI
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>마지막 댓글 입니다...</b>
            </p>
          }
        >
          {data?.fetchBoardComments?.map((el) => (
            <CommentsBoardView key={el._id} el={el} />
          )) || <></>}
        </InfiniteScroll>
      )}
    </>
  );
}
