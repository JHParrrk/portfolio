import { ApolloQueryResult } from "@apollo/client";
import {
  IBoardComment,
  IQuery,
} from "../../../../../commons/types/generated/types";

export interface ICommentsBoardViewProps {
  el: IBoardComment;
  refetch: () => Promise<ApolloQueryResult<Pick<IQuery, any>>>;
}
