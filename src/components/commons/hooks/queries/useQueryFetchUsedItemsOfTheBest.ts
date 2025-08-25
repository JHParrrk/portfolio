import { IQuery } from "@/src/commons/types/generated/types";
import { gql, useQuery } from "@apollo/client";

export const FETCH_USED_ITEMS_OF_THE_BEST = gql`
  query fetchUseditemsOfTheBest {
    fetchUseditemsOfTheBest {
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

export const useQueryFetchUsedItemsOfTheBest = () => {
  const query = useQuery<Pick<IQuery, "fetchUseditemsOfTheBest">>(
    FETCH_USED_ITEMS_OF_THE_BEST
  );

  return query;
};
