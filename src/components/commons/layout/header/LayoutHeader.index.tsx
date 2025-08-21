import { LH } from "./LayoutHeader.styles";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";
import { useQueryFetchUserLoggedIn } from "@/src/components/commons/hooks/queries/useQueryFetchUserLoggedIn";
import { useLogout } from "@/src/components/commons/hooks/customs/useLogout";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";

export default function LayoutHeader(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  const { onLogout } = useLogout();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); // Recoil state로 accessToken 관리

  // useQueryFetchUserLoggedIn 훅을 사용하여 데이터 가져오기
  const { data } = useQueryFetchUserLoggedIn();

  return (
    <LH.Wrapper>
      <LH.InnerWrapper>
        <LH.InnerLogo onClick={onClickMoveToPage("/boards")}>
          💎 LIVE
        </LH.InnerLogo>
        <div>
          {accessToken ? (
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
