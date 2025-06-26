import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";
import { useMoveToPage } from "../../hooks/customs/useMoveToPage";

export const useLogout = () => {
  const { onClickMoveToPage } = useMoveToPage();
  const [, setToken] = useRecoilState(accessTokenState);

  const onLogout = (): void => {
    localStorage.removeItem("accessToken");
    setToken("");
    alert("로그아웃되었습니다.");
    onClickMoveToPage("/login");
  };

  return { onLogout };
};
