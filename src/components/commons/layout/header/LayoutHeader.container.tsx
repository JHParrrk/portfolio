import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "@/src/components/units/mypages/mypage/mypage.queries";
import { IQuery } from "@/src/commons/types/generated/types";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();

  // Recoil state로 accessToken 관리
  const [token, setToken] = useRecoilState(accessTokenState);

  // 클라이언트 사이드에서만 localStorage 접근
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const onClickLogo = (): void => {
    void router.push("/boards");
  };

  const onClickMoveToLogin = (): void => {
    void router.push("/login");
  };

  const onClickMoveToMyPage = (): void => {
    void router.push("/mypages");
  };

  // 로그아웃 핸들러: localStorage와 Recoil 상태 초기화 후 로그인 페이지로 이동
  const onClickLogout = (): void => {
    localStorage.removeItem("accessToken");
    setToken("");
    alert("로그아웃되었습니다.");
    void router.push("/login");
  };

  // 모든 데이터와 핸들러를 props에 담아 프리젠터로 전달
  const props = {
    token, // Recoil 상태로 관리된 token
    onClickLogo,
    onClickMoveToLogin,
    onClickMoveToMyPage,
    onClickLogout,
    data,
  };

  return <LayoutHeaderUI {...props} />;
}
