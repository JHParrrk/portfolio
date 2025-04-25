import type {
  IMutation,
  IMutationLoginUserArgs,
} from "@/src/commons/types/generated/types";
import { LOGIN_USER } from "@/src/components/units/login/newlogin/NewLogin.queries";
import LoginPageUI from "./NewLogin.presenter";
import { IFormInput } from "./NewLogin.types";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

export default function LoginPage(): JSX.Element {
  const router = useRouter();

  // useForm 훅 사용 (mode: "onChange"로 실시간 validation)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: "onChange" }); // 변경: 기존 useState 방식 대신 useForm 사용

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // onSubmit 핸들러 (폼 제출 시 호출됨)
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // loginUser 뮤테이션 실행
      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      const accessToken = result.data?.loginUser.accessToken;
      setAccessToken(accessToken || "");
      localStorage.setItem("accessToken", accessToken || "");

      alert("환영합니다!");
      router.push("/mypages"); // 로그인 성공 시 페이지 이동
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({ content: error.message });
      }
    }
  };

  // 회원가입 페이지 이동 핸들러
  const handleSignUpClick = (): void => {
    router.push("login/registration");
  };

  // 프리젠터 컴포넌트에 전달할 props 구성 (useForm 관련 값 전달)
  const props = {
    register, // 입력 필드 등록 메소드
    onSubmit: handleSubmit(onSubmit), // onSubmit 핸들러, handleSubmit으로 래핑
    handleSignUpClick,
    errors, // 유효성 검사 에러 객체
    isValid, // 전체 폼 유효성 상태 (활성화 여부)
  };

  return <LoginPageUI {...props} />;
}
