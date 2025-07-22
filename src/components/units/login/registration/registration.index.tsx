import { useRegistration } from "@/src/components/commons/hooks/customs/useRegistration";
import { RGI } from "./registration.styles";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";
/**
 * @description 회원가입 UI를 렌더링하는 페이지 컴포넌트
 * - UI와 로직이 분리되어 있어 컴포넌트의 역할이 명확합니다. (Presentational Component)
 */
export default function RegistrationPage(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  // useRegistration 훅을 호출하여 폼에 필요한 모든 상태와 함수를 가져옵니다.
  const { register, onSubmit, errors, isValid } = useRegistration();

  return (
    <RGI.Container>
      <RGI.RegistrationForm>
        <RGI.Logo
          src="/images/logo/logo.png"
          alt="Logo"
          onClick={onClickMoveToPage("/")} // 메인 화면 경로 ('/')로 이동하도록 설정
          style={{ cursor: "pointer" }} // 클릭 가능한 요소임을 시각적으로 나타내기 위해 추가
        />
        <RGI.TitleText>회원가입</RGI.TitleText>
        {/* form 태그에 onSubmit 핸들러를 바인딩합니다. */}
        <form onSubmit={onSubmit}>
          <RGI.LabelText>이메일</RGI.LabelText>
          <RGI.InputWrapper>
            {/* [설명] {...register("email")}
              - 이 입력을 "email"이라는 이름으로 react-hook-form에 등록합니다.
              - name, onChange, onBlur, ref 속성을 자동으로 주입해줍니다.
              - Yup 스키마에 정의된 유효성 검증 규칙이 이 필드에 자동으로 적용됩니다.
            */}
            <RGI.Input
              type="text"
              placeholder="이메일을 입력해주세요"
              {...register("email")}
            />
            {/* [설명] errors.email?.message
              - "email" 필드에 유효성 검증 에러가 발생하면, errors 객체에 해당 정보가 담깁니다.
              - ?. (Optional Chaining)을 사용하여 에러가 있을 때만 메시지에 접근하도록 합니다.
              - Yup 스키마에서 정의한 에러 메시지가 여기에 표시됩니다.
            */}
            {errors.email?.message && (
              <RGI.ErrorMassageRed>{errors.email.message}</RGI.ErrorMassageRed>
            )}
          </RGI.InputWrapper>

          <RGI.LabelText>이름</RGI.LabelText>
          <RGI.InputWrapper>
            <RGI.Input
              type="text"
              placeholder="이름을 입력해주세요"
              {...register("name")}
            />
            {errors.name?.message && (
              <RGI.ErrorMassageRed>{errors.name.message}</RGI.ErrorMassageRed>
            )}
          </RGI.InputWrapper>

          <RGI.LabelText>비밀번호</RGI.LabelText>
          <RGI.InputWrapper>
            <RGI.Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
            />
            {errors.password?.message && (
              <RGI.ErrorMassageRed>
                {errors.password.message}
              </RGI.ErrorMassageRed>
            )}
          </RGI.InputWrapper>

          <RGI.LabelText>비밀번호 확인</RGI.LabelText>
          <RGI.InputWrapper>
            <RGI.Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <RGI.ErrorMassageRed>
                {errors.confirmPassword.message}
              </RGI.ErrorMassageRed>
            )}
          </RGI.InputWrapper>

          {/* [설명] isActive={isValid}
            - formState의 isValid는 모든 필드가 유효성 검증을 통과했을 때 true가 됩니다.
            - 이를 버튼의 활성화 상태에 연결하여, 폼이 유효할 때만 버튼이 활성화되도록 하여 사용자 경험을 향상시킵니다.
          */}
          <RGI.Button type="submit" isActive={isValid}>
            회원가입
          </RGI.Button>
        </form>
      </RGI.RegistrationForm>
    </RGI.Container>
  );
}
