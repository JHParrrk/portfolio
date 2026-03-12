import { useQueryIdChecker } from '@/shared/hooks/customs/useQueryIdChecker';
import { useQueryFetchUsedItemQuestions } from '@/shared/hooks/queries/useQueryFetchUseditemQuestions';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentsMarketWrite from '@/shared/ui/comments/market/write/CommentsMarketWrite.index';
import CommentsMarketView from '@/shared/ui/comments/market/view/CommentsMarketView.index';

export default function MarketDetailFooter() {
  const { id } = useQueryIdChecker('marketId');
  const { data, fetchMore, refetch } = useQueryFetchUsedItemQuestions({
    useditemId: id,
  });

  const onLoadMore = () => {
    if (!data) return;

    void fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestions.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestions) {
          return {
            fetchUseditemQuestions: [...prev.fetchUseditemQuestions],
          };
        }
        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        };
      },
    });
  };

  return (
    <div
      style={{
        width: '100%',
        marginTop: '80px',
        maxWidth: '1024px',
        margin: '80px auto 0 auto',
      }}
    >
      <CommentsMarketWrite refetch={refetch} />
      <InfiniteScroll
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        dataLength={data?.fetchUseditemQuestions?.length || 0}
        next={onLoadMore}
        hasMore={Boolean(
          (data?.fetchUseditemQuestions?.length ?? 0) % 10 === 0
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
            <b>마지막 문의입니다</b>
          </p>
        }
      >
        {data?.fetchUseditemQuestions?.map((el) => (
          <CommentsMarketView key={el._id} el={el} refetch={refetch} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
