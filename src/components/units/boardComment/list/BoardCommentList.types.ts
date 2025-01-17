import type {
  IBoardComment,
  IQuery,
} from "../../../../commons/types/generated/types";

export interface IBoardCommentListUIProps {
  data?: Pick<IQuery, "fetchBoardComments">;
  onLoadMore: () => void;
  hasMore: boolean;
}

export interface IBoardCommentListUIItemProps {
  el: IBoardComment;
}
