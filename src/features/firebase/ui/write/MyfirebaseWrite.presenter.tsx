import { MFBW } from "./MyfirebaseWrite.css";
import type { IMyfirebaseWriteUIProps } from "./MyfirebaseWrite.types";

export default function MyfirebaseWriteUI(
  props: IMyfirebaseWriteUIProps
): JSX.Element {
  return (
    <div className={MFBW.CustomBody}>
      <form className={MFBW.Wrapper} onSubmit={props.handleSubmit(props.onClickSubmit)}>
        <div className={MFBW.InputWrapper}>
          작성자:
          <input
            className={MFBW.MyInput}
            type="text"
            {...props.register("writer", { required: true })}
            placeholder="작성자를 입력하세요."
          />
        </div>
        <div className={MFBW.InputWrapper}>
          제 목:
          <input
            className={MFBW.MyInput}
            type="text"
            {...props.register("title", { required: true })}
            placeholder="제목을 입력하세요."
          />
        </div>
        <div className={MFBW.InputWrapper}>
          내 용:
          <input
            className={MFBW.MyInput}
            type="text"
            {...props.register("contents", { required: true })}
            placeholder="내용을 입력하세요."
          />
        </div>
        <div className={MFBW.ButtonWrapper}>
          <button className={MFBW.MyButton} type="submit">      
            <span className={MFBW.InnerLogo}>💎 LIVE</span> 등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
