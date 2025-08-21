// useMoveToPage.ts 파일
import { useRouter } from "next/router";
// ... (다른 import)

export const useMoveToPage = () => {
  const router = useRouter();
  const onClickMoveToPage = (path: string) => () => {
    // 이 부분을 추가해주세요 ➡️
    console.log("라우터 이동 요청:", path);
    void router.push(path);
  };

  return { onClickMoveToPage };
};
