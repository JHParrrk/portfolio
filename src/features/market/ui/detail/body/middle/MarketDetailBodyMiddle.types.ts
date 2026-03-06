import { IQuery } from "@/shared/types/generated/types";

export interface IMarketDetailBodyProps {
  data?: Pick<IQuery, "fetchUseditem">;
}
