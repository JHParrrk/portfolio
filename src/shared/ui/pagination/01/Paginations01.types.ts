import { MouseEvent } from "react";

export interface IPaginations01Props {
  startPage: number;
  lastPage: number;
  activedPage: number;
  onClickPage: (event: MouseEvent<HTMLButtonElement>) => void; // span => button
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}
