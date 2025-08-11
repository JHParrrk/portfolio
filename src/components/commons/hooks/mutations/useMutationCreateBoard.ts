import {
  IMutation,
  IMutationCreateBoardArgs,
} from "@/src/commons/types/generated/types";
import { gql, useMutation } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export const useMutationCreateBoard = () => {
  const mutation = useMutation<
    Pick<IMutation, "createBoard">, // ✅ 제네릭 타입 명시
    IMutationCreateBoardArgs // ✅ 제네릭 타입 명시
  >(CREATE_BOARD, {
    update(cache, { data }) {
      const newBoard = data?.createBoard;
      if (!newBoard) return;

      // 1. fetchBoards 쿼리의 모든 캐시에 새로운 게시글을 추가합니다.
      // fetchBoards 필드에 대한 캐시를 수정합니다.
      cache.modify({
        fields: {
          fetchBoards(existingBoards = []) {
            // 캐시에 새 게시글을 맨 앞에 추가하고 반환합니다.
            return [newBoard, ...existingBoards];
          },
          fetchBoardsCount(existingCount = 0) {
            // 게시글 개수를 1 증가시킵니다.
            return existingCount + 1;
          },
        },
      });
    },
  });

  return mutation;
};

/*
export const useMutationCreateBoard = () => {
  const mutation = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  return mutation;
};
