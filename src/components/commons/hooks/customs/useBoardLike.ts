import { useRouter } from "next/router";
import { useMutationDisLikeBoard } from "../mutations/useMutationDislikeBoard";
import { useMutationLikeBoard } from "../mutations/useMutationLikeBoard";
import { FETCH_BOARD } from "../queries/useQueryFetchBoard";

interface IUseBoardLikeArgs {
  boardId: string;
}

export const useBoardLike = (args: IUseBoardLikeArgs) => {
  const router = useRouter();
  const [likeBoard] = useMutationLikeBoard();
  const [dislikeBoard] = useMutationDisLikeBoard();

  const onClickLike = async () => {
    await likeBoard({
      variables: { boardId: args.boardId },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: args.boardId },
        },
      ],
    });
  };

  const onClickDislike = async () => {
    await dislikeBoard({
      variables: { boardId: args.boardId },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: args.boardId },
        },
      ],
    });
  };

  return {
    onClickLike,
    onClickDislike,
  };
};
