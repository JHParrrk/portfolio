import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";

export const useLogout = () => {
  const { onClickMoveToPage } = useMoveToPage();
  const [, setToken] = useRecoilState(accessTokenState);

  const onLogout = (): void => {
    localStorage.removeItem("accessToken");
    setToken("");
    alert("로그아웃되었습니다.");
    // 메인화면으로이동
    onClickMoveToPage("/");
  };

  return { onLogout };
};
