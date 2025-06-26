import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteBoardArgs,
} from "@/src/commons/types/generated/types";

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const useMutationDeleteBoard = () => {
  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  return { deleteBoard };
};
