// C:\portfolio\firstapp\src\components\commons\hooks\mutations\useMutationUpdateBoard.ts

import {
  IMutation,
  IMutationUpdateBoardArgs,
} from "@/src/commons/types/generated/types";
import { gql, useMutation } from "@apollo/client";
import { FETCH_BOARD } from "@/src/components/commons/hooks/queries/useQueryFetchBoard"; // FETCH_BOARD 쿼리 불러오기

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
      updatedAt
    }
  }
`;

export const useMutationUpdateBoard = () => {
  const mutation = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD, {
    update(cache, { data }) {
      // 1. 수정된 게시글의 데이터를 캐시에서 찾아옵니다.
      const existingBoard = cache.readQuery({
        query: FETCH_BOARD,
        variables: { boardId: data?.updateBoard._id },
      });

      // 2. 캐시에 데이터가 있으면, 새로운 데이터로 덮어씁니다.
      if (existingBoard) {
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId: data?.updateBoard._id },
          data: {
            fetchBoard: data?.updateBoard,
          },
        });
      }
    },
  });

  return mutation;
};

/*
export const formerUPDATE_BOARD = gql`
  mutation updateBoard(
      updateBoardInput: $updateBoardInput
    ) {
      _id
    }
  }
`;

export const formeruseMutationUpdateBoard = () => {
  const mutation = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  return mutation;
};
*/
