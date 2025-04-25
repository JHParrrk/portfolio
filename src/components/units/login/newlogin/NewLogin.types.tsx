import { FieldErrors, UseFormRegister, FieldError } from "react-hook-form";

// 폼에 사용할 입력값 타입 정의
export interface IFormInput {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

export interface ILoginPageUIProps {
  register: UseFormRegister<IFormInput>; // IFormInput 타입과 연동
  onSubmit: React.FormEventHandler<HTMLFormElement>; // 제출 핸들러 타입
  handleSignUpClick: () => void; // 회원가입 페이지 이동 핸들러 타입
  errors: FieldErrors<IFormInput>; // 각 필드별 에러 타입
  isValid: boolean; // 전체 폼 유효성 상태
}

export interface ILoginButtonProps {
  isActive: boolean; // 버튼 활성화 상태
}
