// src/commons/hooks/queries/useQueryFetchUsedItems.ts

import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "@/src/commons/types/generated/types";

export const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int, $search: String, $isSoldout: Boolean) {
    fetchUseditems(page: $page, search: $search, isSoldout: $isSoldout) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        _id
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

export const useQueryFetchUsedItems = (variables: IQueryFetchUseditemsArgs) => {
  const query = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS, {
    variables, // <== 받은 variables를 useQuery에 전달
  });
  return query;
};
