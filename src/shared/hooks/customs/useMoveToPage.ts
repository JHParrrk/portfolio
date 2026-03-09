// useMoveToPage.ts 파일
import { useRouter } from 'next/router';
import { useGlobalStore } from '@/shared/models/stores';

export const useMoveToPage = () => {
  const router = useRouter();
  const visitedPage = useGlobalStore((state) => state.visitedPage);
  const setVisitedPage = useGlobalStore((state) => state.setVisitedPage);

  const onClickMoveToPage = (path: string) => () => {
    // localStorage.setItem("visitedPage", path); // 로컬스토리지에 저장방법
    setVisitedPage(path);
    void router.push(path);
  };

  const prefetchPath = (path: string) => () => {
    void router.prefetch(path);
  };

  return {
    visitedPage,
    onClickMoveToPage,
    prefetchPath,
  };
};
