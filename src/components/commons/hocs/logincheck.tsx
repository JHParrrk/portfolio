import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Modal } from "antd";
import { ComponentType, ComponentProps } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/src/commons/stores";

export const LoginCheckHoc = <
  P extends JSX.IntrinsicAttributes & Record<string, unknown>
>(
  Component: ComponentType<P>
) => {
  const LoginChecker = (props: P) => {
    const router = useRouter();
    const modalShownRef = useRef(false);

    // ⭐ Recoil 상태를 참조하도록 변경 ⭐
    const accessToken = useRecoilValue(accessTokenState);

    useEffect(() => {
      if (!router.isReady) {
        return;
      }

      // ⭐ `localStorage` 대신 Recoil 상태를 확인하도록 변경 ⭐
      if (!accessToken && !modalShownRef.current) {
        modalShownRef.current = true;

        Modal.warning({
          title: "로그인 필요",
          content: "로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.",
          onOk() {
            void router.push("/login");
            modalShownRef.current = false;
          },
          onCancel() {
            void router.push("/login");
            modalShownRef.current = false;
          },
          maskClosable: false,
          closable: false,
        });
      }
      // ⭐ 의존성 배열에 accessToken 추가 ⭐
    }, [router.isReady, router, accessToken]);

    return <Component {...props} />;
  };

  LoginChecker.displayName = `withLoginCheck(${
    Component.displayName || Component.name || "Component"
  })`;

  return LoginChecker;
};
//   LoginCheckHoc의 P extends ComponentProps<ComponentType<P>> 오류는 타입스크립트가
// P 타입을 정의할 때 자기 자신을 참조하며 발생하는 '순환 참조' 때문에 발생했습니다.
//  마치 '메인 재료'가 뭔지 알아야 요리를 시작하는데, '메인 재료'가 뭔지 알려면 그 재료로 만든
// 요리 레시피를 봐야 한다는 식의 끝없는 꼬리 물기 상황인 거죠.
// 이 문제는 P의 정의를 P extends JSX.IntrinsicAttributes & Record<string, unknown>으로
// 변경하여 해결했습니다. 이 변경은 P가 최소한 React의 기본 props를 만족하고, 추가적인
// 모든 props를 유연하게 받을 수 있음을 명시적으로 알려줌으로써 타입스크립트가 헤매지 않고
// 타입을 추론할 수 있도록 명확한 기준점을 제시해 주었습니다.
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
