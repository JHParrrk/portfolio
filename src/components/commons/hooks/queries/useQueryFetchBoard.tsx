import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
      createdAt
    }
  }
`;

export const useQueryFetchBoard = (boardIdParam?: string) => {
  const router = useRouter();
  const boardId =
    boardIdParam ||
    (typeof router.query.boardId === "string"
      ? router.query.boardId
      : undefined);

  const { data, loading, error } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: { boardId: boardId || "" },
    skip: !boardId, // boardId가 없으면 쿼리 실행 생략
  });

  return { data, loading, error };
};
