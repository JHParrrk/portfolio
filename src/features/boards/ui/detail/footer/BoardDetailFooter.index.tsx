import { useQueryIdChecker } from '@/shared/hooks/customs/useQueryIdChecker';
import { useQueryFetchBoardComment } from '@/shared/hooks/queries/useQueryFetchBoardComments';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentsBoardView from '@/shared/ui/comments/board/view/CommentsBoardView.index';
import CommentsBoardWrite from '@/shared/ui/comments/board/write/CommentsBoardWrite.index';

export default function BoardDetailFooter() {
  const { id } = useQueryIdChecker('boardId');
  const { data, fetchMore, refetch } = useQueryFetchBoardComment({
    boardId: id,
  });

  const onLoadMore = () => {
    if (!data) return;

    void fetchMore({
      variables: {
        page: Math.ceil(data?.fetchBoardComments.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoardComments) {
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
    <div
      style={{
        width: '100%',
        maxWidth: '1024px',
        margin: '0 auto',
      }}
    >
      <CommentsBoardWrite />
      {data?.fetchBoardComments?.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>
          <b>마지막 댓글 입니다..</b>
        </p>
      ) : (
        <div style={{ width: '100%' }}>
          <InfiniteScroll
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            dataLength={data?.fetchBoardComments?.length || 0}
            next={onLoadMore}
            hasMore={Boolean(
              (data?.fetchBoardComments?.length ?? 0) % 10 === 0
            )}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '40px',
                  marginBottom: '80px',
                }}
              >
                <b>마지막 댓글 입니다..</b>
              </p>
            }
          >
            {data?.fetchBoardComments?.map((el) => (
              <CommentsBoardView key={el._id} el={el} refetch={refetch} />
            )) || <></>}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
