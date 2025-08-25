import { IQuery } from "@/src/commons/types/generated/types";

export interface IMarketListBodyProps {
  data?: Pick<IQuery, "fetchUseditems">;
  keyword: string;
  isSoldout: boolean; // isSoldout prop 추가
}

// 검색어 하이라이팅을 위한 타입
export interface ITextTokenProps {
  isMatched: boolean;
}
