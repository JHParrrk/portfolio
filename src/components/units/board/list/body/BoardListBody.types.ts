import { IQuery } from "@/src/commons/types/generated/types";

export interface IBoardListBodyProps {
  keyword: string;
  data?: Pick<IQuery, "fetchBoards">;
}

export interface ITextTokenProps {
  isMatched: boolean;
}
