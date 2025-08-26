import {
  IQuery,
  IQueryFetchBoardArgs,
  IQueryFetchUseditemArgs,
} from "@/src/commons/types/generated/types";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        zipcode
        address
        addressDetail
      }
      buyer {
        name
        picture
      }
      seller {
        name
        picture
      }
      soldAt
      createdAt
      updatedAt
    }
  }
`;

export const useQueryFetchUsedItem = (useditemIdParam?: string) => {
  const router = useRouter();
  const useditemId =
    useditemIdParam ||
    (typeof router.query.useditemId === "string"
      ? router.query.useditemId
      : undefined);

  const { data, loading, error } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: useditemId || "" },
    skip: !useditemId, // useditemId가 없으면 쿼리 실행 생략
  });

  return { data, loading, error };
};
