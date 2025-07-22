// src/commons/validations/boardSchema.ts
import * as yup from "yup";

export const boardSchema = yup.object({
  // .shape() 제거
  writer: yup
    .string()
    .required("작성자를 입력해주세요")
    .min(2, "이름은 최소 2글자 이상입니다"),

  password: yup
    .string()
    .required("비밀번호를 입력해주세요")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "비밀번호는 8자 이상, 영문+숫자 조합이어야 합니다"
    ),

  title: yup.string().required("제목을 입력해주세요"),
  contents: yup
    .string()
    .required("내용을 입력해주세요")
    .test("is-not-empty-html", "내용을 입력해주세요.", (value) => {
      // HTML 태그를 제거하고 공백을 trim 했을 때 비어있지 않아야 합니다.
      return (value?.replace(/<[^>]+>/g, "").trim() || "") !== "";
    }),

  zipcode: yup.string().required("우편번호를 입력해주세요"),
  address: yup.string().required("주소를 입력해주세요"),

  // addressDetail은 string 또는 undefined가 가능하며, 기본값은 빈 문자열입니다.
  addressDetail: yup.string().default("").nullable(), // Yup에서 optional은 nullable로 표현 가능

  // youtubeUrl은 string 또는 undefined가 가능하며, 빈 문자열은 undefined로 변환합니다.
  youtubeUrl: yup
    .string()
    .url("유효한 URL을 입력해주세요")
    .transform((value) => (value === "" ? undefined : value))
    .nullable(), // Yup에서 optional은 nullable로 표현 가능

  // images 배열은 항상 존재하며, 3개의 요소를 가집니다.
  // 각 요소는 string이 될 수 있습니다.
  images: yup
    .array()
    .of(
      yup.string().url("이미지 URL이 잘못되었습니다").default("") // 각 요소는 항상 string이며, 기본값은 빈 문자열
    )
    .min(3, "이미지는 3장까지 등록 가능합니다") // 최소 3개
    .max(3, "이미지는 3장까지 등록 가능합니다") // 최대 3개
    .defined() // 배열 자체는 undefined가 될 수 없음을 보장
    .default(["", "", ""]), // 배열 자체의 기본값, 3개의 빈 문자열로 초기화
});

export type IFormData = yup.InferType<typeof boardSchema>;
