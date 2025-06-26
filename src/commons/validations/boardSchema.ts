// boardSchema.ts
import * as yup from "yup";

export const boardSchema = yup.object({
  writer: yup.string().required("작성자를 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
  title: yup.string().required("제목을 입력해주세요."),
  contents: yup
    .string()
    .required("내용을 입력해주세요.")
    .test(
      "is-not-empty",
      "내용을 입력해주세요.",
      (value = "") => value.replace(/<[^>]+>/g, "").trim() !== ""
    ),
  zipcode: yup.string().required("우편번호를 입력해주세요."),
  address: yup.string().required("주소를 입력해주세요."),
  addressDetail: yup.string(),
  youtubeUrl: yup
    .string()
    .url("유효한 링크를 입력해주세요.")
    .required("링크를 복사해주세요."),
  images: yup.array().of(yup.string()),
  //.min(1, "이미지는 최소 1장 이상 등록해주세요."),
});
