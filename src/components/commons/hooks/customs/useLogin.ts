import { useForm, SubmitHandler } from "react-hook-form";
import { useMutationLoginUser } from "@/src/components/commons/hooks/mutations/useMutationLoginUser";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";
import { Modal } from "antd";
import { useMoveToPage } from "@/src/components/commons/hooks/customs/useMoveToPage";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";

// 폼 입력값 타입 정의
interface IFormInput {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

// 로그인 로직을 담당하는 커스텀 훅
export const useLogin = () => {
  const [loginUser, { client }] = useMutationLoginUser();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const { onClickMoveToPage } = useMoveToPage();

  useEffect(() => {
    console.log("Recoil accessToken 상태 변경:", accessToken);
  }, [accessToken]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: "onChange" });

  const handleLoginSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log("--- 로그인 시작 ---");

      const result = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      const token = result.data?.loginUser.accessToken;

      // Apollo Client의 캐시를 초기화하고 모든 쿼리를 다시 실행합니다.
      void client.resetStore();

      setAccessToken(token || "");

      // ⭐ 이 줄을 삭제합니다. ⭐
      // localStorage.setItem("accessToken", token || "");

      // console.log("accessToken 저장 완료:", token);

      Modal.success({
        content: "환영합니다!",
        onOk: () => {
          // console.log("페이지 이동 함수 실행");
          onClickMoveToPage("/")();
        },
      });
    } catch (error) {
      console.error("로그인 실패:", error);
      if (error instanceof Error) {
        Modal.error({ content: error.message });
      }
    }
  };

  return {
    register,
    onSubmit: handleSubmit(handleLoginSubmit),
    handleSignUpClick: onClickMoveToPage("/login/registration"),
    errors,
    isValid,
  };
};
