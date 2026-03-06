import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteBoardArgs,
} from "@/shared/types/generated/types";
import { FETCH_BOARDS } from "@/shared/hooks/queries/useQueryFetchBoards";
import { FETCH_BOARDS_COUNT } from "@/shared/hooks/queries/useQueryFetchBoardsCount";

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const useMutationDeleteBoard = () => {
  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD, {
    // 🚨 게시글 삭제 후 목록과 개수를 다시 가져옵니다.
    refetchQueries: [
      {
        query: FETCH_BOARDS,
      },
      {
        query: FETCH_BOARDS_COUNT,
      },
    ],
  });

  return { deleteBoard };
};