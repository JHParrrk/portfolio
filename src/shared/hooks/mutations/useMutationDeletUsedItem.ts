import {
  IMutation,
  IMutationDeleteUseditemArgs,
} from "@/shared/types/generated/types";
import { gql, useMutation } from "@apollo/client";
import { FETCH_USED_ITEMS } from "../queries/useQueryFetchUsedItems";

export const DELETE_USED_ITEM = gql`
  mutation deleteUseditem($useditemId: ID!) {
    deleteUseditem(useditemId: $useditemId)
  }
`;

export const useMutationDeleteUseditem = () => {
  const [deleteUseditem] = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_USED_ITEM, {
    // 🚨 게시글 삭제 후 목록과 개수를 다시 가져옵니다.
    refetchQueries: [
      {
        query: FETCH_USED_ITEMS,
      },
    ],
  });

  return { deleteUseditem };
};
