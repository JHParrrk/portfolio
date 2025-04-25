import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationDislikeBoardArgs,
} from "../../../../commons/types/generated/types";

export const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;
export const useMutationDisLikeBoard = () => {
  const mutation = useMutation<
    Pick<IMutation, "dislikeBoard">,
    IMutationDislikeBoardArgs
  >(DISLIKE_BOARD);

  return mutation;
};
