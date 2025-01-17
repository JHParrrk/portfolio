import { LH } from "./LayoutHeader.styles";
import type { ILayoutHeaderProps } from "./LayoutHeader.types";

export default function LayoutHeaderUI(props: ILayoutHeaderProps): JSX.Element {
  return (
    <LH.Wrapper>
      <LH.InnerWrapper>
        <LH.InnerLogo onClick={props.onClickLogo}>💎 LIVE</LH.InnerLogo>
        <div>
          <LH.InnerButton onClick={props.onClickMoveToLogin}>로그인</LH.InnerButton>
          <LH.InnerButton>회원가입</LH.InnerButton>
        </div>
      </LH.InnerWrapper>
    </LH.Wrapper>
  );
}
