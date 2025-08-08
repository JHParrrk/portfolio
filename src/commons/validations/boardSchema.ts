import * as yup from "yup";

export const boardSchema = yup.object({
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

  zipcode: yup.string().default("").nullable(),
  //.required("우편번호를 입력해주세요"),
  address: yup.string().default("").nullable(),
  //.required("주소를 입력해주세요"),

  // addressDetail은 string 또는 undefined가 가능하며, 기본값은 빈 문자열입니다.
  addressDetail: yup.string().default("").nullable(), // Yup에서 optional은 nullable로 표현 가능

  // youtubeUrl은 string이며, 기본값은 빈 문자열입니다.
  youtubeUrl: yup
    .string()
    .url("유효한 URL을 입력해주세요")
    .default("")
    .nullable(),

  // images 배열은 항상 존재하며, 3개의 요소를 가집니다.
  // 각 요소는 string이 될 수 있습니다.
  images: yup
    .array()
    .of(
      yup
        .string()
        .when("$isEdit", {
          is: true,
          then: (schema) => schema.nullable(), // 수정 페이지에서는 빈 문자열/null 허용
          otherwise: (schema) =>
            schema.url("유효한 URL을 입력해주세요").nullable(), // 등록 페이지에서는 URL만 허용
        })
        .default("")
    )
    .min(0) // 이미지 삭제를 위해 최소 0개 허용
    .max(3, "이미지는 3장까지 등록 가능합니다")
    .defined()
    .default(["", "", ""])
    .nullable(),
});

export type IFormData = yup.InferType<typeof boardSchema>;
