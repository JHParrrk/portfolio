import { MFBW } from "./MyfirebaseWrite.styles";
import type { IMyfirebaseWriteUIProps } from "./MyfirebaseWrite.types";

export default function MyfirebaseWriteUI(
  props: IMyfirebaseWriteUIProps
): JSX.Element {
  return (
    <MFBW.CustomBody>
      <MFBW.Wrapper>
        <MFBW.InputWrapper>
          작성자:
          <MFBW.MyInput
            type="text"
            onChange={props.onChangeWriter}
            placeholder="작성자를 입력하세요."
          />
        </MFBW.InputWrapper>
        <MFBW.InputWrapper>
          제 목:
          <MFBW.MyInput
            type="text"
            onChange={props.onChangeTitle}
            placeholder="제목을 입력하세요."
          />
        </MFBW.InputWrapper>
        <MFBW.InputWrapper>
          내 용:
          <MFBW.MyInput
            type="text"
            onChange={props.onChangeContents}
            placeholder="내용을 입력하세요."
          />
        </MFBW.InputWrapper>
        <MFBW.ButtonWrapper>
          <MFBW.MyButton onClick={props.onClickSubmit}>
            <MFBW.InnerLogo>💎 LIVE</MFBW.InnerLogo> 등록하기
          </MFBW.MyButton>
        </MFBW.ButtonWrapper>
      </MFBW.Wrapper>
    </MFBW.CustomBody>
  );
}
