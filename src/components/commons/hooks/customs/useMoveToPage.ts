// useMoveToPage.ts 파일
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "@/src/commons/stores";

export const useMoveToPage = () => {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path: string) => () => {
    // localStorage.setItem("visitedPage", path); // 로컬스토리지에 저장방법
    setVisitedPage(path);
    void router.push(path);
  };

  return {
    visitedPage,
    onClickMoveToPage,
  };
};
