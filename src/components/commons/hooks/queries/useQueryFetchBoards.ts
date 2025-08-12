// src/commons/hooks/queries/useQueryFetchBoards.ts

import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "@/src/commons/types/generated/types";

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export const useQueryFetchBoards = (variables: IQueryFetchBoardsArgs) => {
  // <== variables를 인자로 받도록 수정
  const query = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
    {
      variables, // <== 받은 variables를 useQuery에 전달
    }
  );
  return query;
};
