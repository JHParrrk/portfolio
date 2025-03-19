// login 폴더의 index.tsx 화면 그려주기
import type {
  IMutation,
  IMutationLoginUserArgs,
} from "@/src/commons/types/generated/types";
import { LOGIN_USER } from "@/src/components/units/login/newlogin/NewLogin.queries";
import LoginPageUI from "./NewLogin.presenter";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/src/commons/stores";
import { useRouter } from "next/router";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async (): Promise<void> => {
    try {
      // 1. 로그인 뮤테이션 날려서 accessToken 받기
      const result = await loginUser({
        variables: {
          email: email,
          password: password,
        },
      });
      // 이 코드는 사용자의 이메일과 패스워드를 담아서 loginUser mutation을 서버에 보내고,
      // 그 결과를 result 변수에 저장합니다.
      // 따라서 로그인을 시도하는 과정이라고 할 수 있습니다.
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);

      // 2. 받아온 accessToken을 globalState에 저장하기
      setAccessToken(accessToken || "");
      localStorage.setItem("accessToken", accessToken || "");
      // 임시로 사용(나중에 지울 예정)

      // 3. 로그인 성공 페이지로 이동하기
      router.push("/mypages");
    } catch (error) {
      // alert(error.message)을 사용하셔도 무방합니다.
      if (error instanceof Error) {
        // 이 조건문은 error 변수가 Error 객체의 인스턴스인지 확인합니다.
        Modal.error({ content: error.message });
      }
      // 예상치 못한 실패 방지
    }
  };

  const props = {
    onChangeEmail,
    onChangePassword,
    onClickLogin,
  };

  return <LoginPageUI {...props} />;
}

// 고차 함수(HOF)와 고차 컴포넌트(HOC)는 모두 로직의 재사용성을 높이는 개념입니다.
// 고차 함수(HOF)는 다른 함수를 인자로 받거나 반환하는 함수로,
//  주로 함수형 프로그래밍에서 사용되며 예를 들어 콜백 함수나 클로저
// 등이 이에 해당합니다. 반면에 고차 컴포넌트(HOC)는 컴포넌트를 인자로 받아
// 새로운 컴포넌트를 반환하는 함수로, 주로 리액트에서 사용되며 권한 관리,
// 데이터 페칭, 상태 관리 등의 목적으로 사용됩니다. 고차 함수는 자바스크립트
// 등의 언어에서 일반적으로 사용되며, 고차 컴포넌트는 리액트와 같은 UI
// 라이브러리에서 주로 사용됩니다. 고차 함수는 함수 로직을, 고차 컴포넌트는
// 컴포넌트 로직을 재사용하기 위해 사용된다는 점에서 차이가 있습니다.
// JSX를 리턴하면 하이 오더 컴포넌트
