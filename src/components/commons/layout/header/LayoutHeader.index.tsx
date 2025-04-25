import { LH } from "./LayoutHeader.styles";
import { useMoveToPage } from "../../hooks/customs/useMoveToPage";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";
import { useEffect } from "react";
import { useQueryFetchUserLoggedIn } from "@/src/components/commons/hooks/queries/useQueryFetchUserLoggedIn";
import { useLogout } from "./../../hooks/customs/useLogout";

export default function LayoutHeader(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  const { onLogout } = useLogout();

  // Recoil state로 accessToken 관리
  const [token, setToken] = useRecoilState(accessTokenState);

  // 클라이언트 사이드에서만 localStorage 접근
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  // useQueryFetchUserLoggedIn 훅을 사용하여 데이터 가져오기
  const { data } = useQueryFetchUserLoggedIn();

  return (
    <LH.Wrapper>
      <LH.InnerWrapper>
        <LH.InnerLogo onClick={onClickMoveToPage("/boards")}>
          💎 LIVE
        </LH.InnerLogo>
        <div>
          {token ? (
            <>
              <LH.InnerButton onClick={onClickMoveToPage("/mypages")}>
                {data?.fetchUserLoggedIn?.name ?? "사용자"}님 환영합니다.
              </LH.InnerButton>
              <LH.InnerButton onClick={onLogout}>로그아웃</LH.InnerButton>
            </>
          ) : (
            <>
              <LH.InnerButton onClick={onClickMoveToPage("/login")}>
                로그인
              </LH.InnerButton>
              <LH.InnerButton
                onClick={onClickMoveToPage("/login/registration")}
              >
                회원가입
              </LH.InnerButton>
            </>
          )}
        </div>
      </LH.InnerWrapper>
    </LH.Wrapper>
  );
}
