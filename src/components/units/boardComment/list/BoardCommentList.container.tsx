import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import type {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";
import BoardCommentListUI from "./BoardCommentList.presenter";
import { FETCH_BOARD_COMMENTS } from "./BoardCommentList.queries";

export default function BoardCommentList(): JSX.Element {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") return <></>;

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: router.query.boardId },
  });

  const onLoadMore = (): void => {
    if (!data) return;
    // if (data === undefined) return; undefined때만 참

    void fetchMore({
      // `variables`는 GraphQL 쿼리에 필요한 변수입니다.
      // 여기서는 현재 코멘트의 길이를 10으로 나눈 후 올림하여 페이지 수를 계산하고 +
      // // 1을 더합니다.
      variables: { page: Math.ceil(data?.fetchBoardComments.length / 10) + 1 },
      // Math.ceil 소수점 이하 올림처리하는 함수
      // `updateQuery`는 새로운 데이터가 들어왔을 때 기존 데이터를 업데이트하는 
      // 방법을 정의합니다.
      updateQuery: (prev, { fetchMoreResult }) => {
        // `fetchMoreResult`가 없으면 (즉, 더 이상 가져올 데이터가 없으면) 
        // 이전 데이터를 그대로 반환합니다.
        if (!fetchMoreResult?.fetchBoardComments)
          return { fetchBoardComments: [...prev.fetchBoardComments] };

        // `fetchMoreResult`가 있으면 기존 데이터와 새로운 데이터를 합쳐서 반환합니다.
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments, // 기존 데이터
            ...fetchMoreResult.fetchBoardComments, // 새로운 데이터
          ],
        };
      },
    });
  };

  const hasMore = (data?.fetchBoardComments.length ?? 0) % 10 === 0;
  // 데이터가 10의 배수인지 확인

  const props = {
    data,
    onLoadMore,
    hasMore,
  };

  return <BoardCommentListUI {...props} />;
}
