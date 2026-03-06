import { MFBW } from "./MyfirebaseWrite.css";
import type { IMyfirebaseWriteUIProps } from "./MyfirebaseWrite.types";

export default function MyfirebaseWriteUI(
  props: IMyfirebaseWriteUIProps
): JSX.Element {
  return (
    <div className={MFBW.CustomBody}>
      <div className={MFBW.Wrapper}>
        <div className={MFBW.InputWrapper}>
          작성자:
          <input
            className={MFBW.MyInput}
            type="text"
            onChange={props.onChangeWriter}
            placeholder="작성자를 입력하세요."
          />
        </div>
        <div className={MFBW.InputWrapper}>
          제 목:
          <input
            className={MFBW.MyInput}
            type="text"
            onChange={props.onChangeTitle}
            placeholder="제목을 입력하세요."
          />
        </div>
        <div className={MFBW.InputWrapper}>
          내 용:
          <input
            className={MFBW.MyInput}
            type="text"
            onChange={props.onChangeContents}
            placeholder="내용을 입력하세요."
          />
        </div>
        <div className={MFBW.ButtonWrapper}>
          <button className={MFBW.MyButton} onClick={props.onClickSubmit}>
            <span className={MFBW.InnerLogo}>💎 LIVE</span> 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
