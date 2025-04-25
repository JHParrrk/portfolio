import { RGI } from "./registration.styles";
import { IRegistrationPageUIProps } from "./registration.types";

export default function RegistrationPageUI(
  props: IRegistrationPageUIProps
): JSX.Element {
  const { register, onSubmit, watch, errors, isValid } = props;

  return (
    <RGI.Container>
      <RGI.RegistrationForm>
        <RGI.TitleText>회원가입</RGI.TitleText>
        <form onSubmit={onSubmit}>
          <RGI.LabelText>이메일</RGI.LabelText>
          <RGI.InputWrapper>
            {/* register을 사용하여 이메일 입력 필드 등록 및 validation rules 지정 */}
            <RGI.Input
              type="text"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: "이메일은 필수입력입니다.",
                validate: (value) =>
                  value.includes("@") || "이메일 형식이 올바르지 않습니다.",
              })}
            />
            {errors.email && (
              <RGI.ErrorMassageRed>{errors.email.message}</RGI.ErrorMassageRed>
            )}
          </RGI.InputWrapper>
          <RGI.LabelText>이름</RGI.LabelText>
          <RGI.InputWrapper>
            <RGI.Input
              type="text"
              placeholder="이름을 입력해주세요"
              {...register("name", {
                required: "이름은 필수입력입니다.",
                minLength: { value: 2, message: "2자리 이상 입력해주세요." },
                maxLength: {
                  value: 16,
                  message: "16자리 이하로 입력해주세요.",
                },
              })}
            />
            {errors.name && (
              <RGI.ErrorMassageRed>{errors.name.message}</RGI.ErrorMassageRed>
            )}
          </RGI.InputWrapper>
          <RGI.LabelText>비밀번호</RGI.LabelText>
          <RGI.InputWrapper>
            <RGI.Input
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
              <RGI.ErrorMassageRed>
                {errors.password.message}
              </RGI.ErrorMassageRed>
            )}
          </RGI.InputWrapper>
          <RGI.LabelText>비밀번호확인</RGI.LabelText>
          <RGI.InputWrapper>
            <RGI.Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              {...register("confirmPassword", {
                required: "비밀번호 확인은 필수입니다.",
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.confirmPassword && (
              <RGI.ErrorMassageRed>
                {errors.confirmPassword.message}
              </RGI.ErrorMassageRed>
            )}
          </RGI.InputWrapper>
          <RGI.Button type="submit" isActive={isValid}>
            회원가입
          </RGI.Button>
        </form>
      </RGI.RegistrationForm>
    </RGI.Container>
  );
}
