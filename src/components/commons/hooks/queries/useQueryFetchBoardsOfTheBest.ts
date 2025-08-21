import { gql, useQuery } from "@apollo/client";
import { IQuery } from "@/src/commons/types/generated/types";

export const FETCH_BOARDS_OF_THE_BEST = gql`
  query {
    fetchBoardsOfTheBest {
      _id
      writer
      title
      contents
      images
      likeCount
    }
  }
`;

export const useQueryFetchBoardsOfTheBest = () => {
  const query = useQuery<Pick<IQuery, "fetchBoardsOfTheBest">>(
    FETCH_BOARDS_OF_THE_BEST
  );

  return query;
};
