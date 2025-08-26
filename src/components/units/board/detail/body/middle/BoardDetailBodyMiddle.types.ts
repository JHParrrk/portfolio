import { IQuery } from "@/src/commons/types/generated/types";

export interface IBoardDetailBodyProps {
  data?: Pick<IQuery, "fetchBoard">;
}
