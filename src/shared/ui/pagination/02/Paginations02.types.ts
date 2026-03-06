export interface IPaginations02Props {
  startPage: number;
  // lastPage는 이제 UI 계산용으로만 사용되므로 필수는 아님
  currentPage: number;
  onClickPage: (page: number) => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}
