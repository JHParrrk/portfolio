import { NL } from "./NewLogin.styles";
import { useLogin } from "@/src/components/commons/hooks/customs/useLogin";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";

export default function NewLogin(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();

  const { register, onSubmit, handleSignUpClick, errors, isValid } = useLogin();
  return (
    <NL.Container>
      <NL.LoginForm>
        {/* 폼 태그로 감싸서 onSubmit 핸들러 연결 Memo에 자세한 설명*/}
        <form onSubmit={onSubmit}>
          <NL.Logo
            src="/images/logo/logo.png"
            alt="Logo"
            onClick={onClickMoveToPage("/")} // 메인 화면 경로 ('/')로 이동하도록 설정
            style={{ cursor: "pointer" }} // 클릭 가능한 요소임을 시각적으로 나타내기 위해 추가
          />
          <NL.InputWrapper>
            {/* register을 사용하여 이메일 입력 필드 등록 및 validation rules 지정 */}
            <NL.Input
              type="text"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: "이메일은 필수입력입니다.",
                validate: (value) =>
                  value.includes("@") || "이메일 형식이 올바르지 않습니다.",
              })}
            />
            {errors.email && (
              <NL.ErrorMassageRed>{errors.email.message}</NL.ErrorMassageRed>
            )}
          </NL.InputWrapper>
          <NL.InputWrapper>
            {/* register을 사용하여 비밀번호 입력 필드 등록 및 validation rules 지정 */}
            <NL.Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: "비밀번호는 필수입력입니다.",
                minLength: { value: 3, message: "3자리 이상 입력해주세요." },
                maxLength: {
                  value: 16,
                  message: "16자리 이하로 입력해주세요.",
                },
              })}
            />
            {errors.password && (
              <NL.ErrorMassageRed>{errors.password.message}</NL.ErrorMassageRed>
            )}
          </NL.InputWrapper>
          <NL.CheckboxWrapper>
            {/* 체크박스 등록 (검증이 필요없으면 rules 생략) */}
            <NL.Checkbox
              type="checkbox"
              {...register("keepLoggedIn")}
              id="keepLoggedIn"
            />
            <label htmlFor="keepLoggedIn">로그인 상태 유지</label>
          </NL.CheckboxWrapper>
          {/* 버튼은 폼 전체 유효성에 따라 색상이 달라집니다 */}
          <NL.Button type="submit" isActive={isValid}>
            로그인하기
          </NL.Button>
          <NL.Divider /> {/* 구분선 */}
          <NL.SignUpOptionWrapper>
            <NL.EtcButton>
              <NL.EtcItem>이메일 찾기</NL.EtcItem>
              <NL.EtcItem>|</NL.EtcItem>
              <NL.EtcItem>비밀번호 찾기</NL.EtcItem>
              <NL.EtcItem>|</NL.EtcItem>
              <NL.EtcItem onClick={handleSignUpClick}>회원가입</NL.EtcItem>
            </NL.EtcButton>
          </NL.SignUpOptionWrapper>
        </form>
      </NL.LoginForm>
    </NL.Container>
  );
}
