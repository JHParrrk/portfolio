import type { ChangeEvent } from "react";

export interface ISearchbars01Props {
  onChangeSearchbar: (event: ChangeEvent<HTMLInputElement>) => void;
  keyword: string; // ⭐️ 수정: keyword prop을 추가합니다.
}
