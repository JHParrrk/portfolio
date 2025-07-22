import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // yup 임포트 추가

export interface IRegisButtonProps {
  isActive: boolean; // 버튼 활성화 상태
}

export interface IFormInput {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export const registrationSchema = yup.object({
  email: yup
    .string()
    .email("유효한 이메일 형식이 아닙니다.")
    .required("이메일은 필수 입력 사항입니다."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."
    )
    .required("비밀번호는 필수 입력 사항입니다."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수 입력 사항입니다."),
  name: yup
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .max(10, "이름은 최대 10자까지 가능합니다.")
    .required("이름은 필수 입력 사항입니다."),
});
