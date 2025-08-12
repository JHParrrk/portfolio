import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsCountArgs,
} from "@/src/commons/types/generated/types";

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

// ⭐️ 수정된 부분: variables를 인자로 받도록 변경
export const useQueryFetchBoardsCount = (variables: IQueryFetchBoardsCountArgs) => {
  const query = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT, {
    variables, // ⭐️ 수정된 부분: 받은 variables를 useQuery에 전달
  });

  return query;
};