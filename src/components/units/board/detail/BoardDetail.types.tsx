// BoardDetail.types.ts

import { IQuery } from "../../../../commons/types/generated/types";

export interface IBoardDetailUIProps {
  data?: Pick<IQuery, "fetchBoard">;
  onClickDelete: () => void;
  onClickList: () => void;
  onClickEdit: () => void;
}
