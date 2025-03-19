import { LH } from "./LayoutHeader.styles";
import type { ILayoutHeaderProps } from "./LayoutHeader.types";

export default function LayoutHeaderUI(props: ILayoutHeaderProps): JSX.Element {
  return (
    <LH.Wrapper>
      <LH.InnerWrapper>
        <LH.InnerLogo onClick={props.onClickLogo}>💎 LIVE</LH.InnerLogo>
        <div>
          {props.token ? (
            <>
              <LH.InnerButton onClick={props.onClickMoveToMyPage}>
                {props.data?.fetchUserLoggedIn?.name ?? "사용자"}님 환영합니다.
              </LH.InnerButton>
              <LH.InnerButton onClick={props.onClickLogout}>
                로그아웃
              </LH.InnerButton>
            </>
          ) : (
            <>
              <LH.InnerButton onClick={props.onClickMoveToLogin}>
                로그인
              </LH.InnerButton>
              <LH.InnerButton>회원가입</LH.InnerButton>
            </>
          )}
        </div>
      </LH.InnerWrapper>
    </LH.Wrapper>
  );
}
