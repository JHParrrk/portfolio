import { IQuery } from "@/shared/types/generated/types";

export interface IBoardDetailBodyProps {
  data?: Pick<IQuery, "fetchBoard">;
}
