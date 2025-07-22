import { useEffect, useRef } from "react"; // useRef 임포트 추가
import { useRouter } from "next/router";
import { Modal } from "antd";
import { ComponentType, ComponentProps } from "react";

export const LoginCheckHoc = <
  P extends JSX.IntrinsicAttributes & Record<string, unknown>
>(
  Component: ComponentType<P>
) => {
  //   LoginCheckHoc의 P extends ComponentProps<ComponentType<P>> 오류는 타입스크립트가
  // P 타입을 정의할 때 자기 자신을 참조하며 발생하는 '순환 참조' 때문에 발생했습니다.
  //  마치 '메인 재료'가 뭔지 알아야 요리를 시작하는데, '메인 재료'가 뭔지 알려면 그 재료로 만든
  // 요리 레시피를 봐야 한다는 식의 끝없는 꼬리 물기 상황인 거죠.
  // 이 문제는 P의 정의를 P extends JSX.IntrinsicAttributes & Record<string, unknown>으로
  // 변경하여 해결했습니다. 이 변경은 P가 최소한 React의 기본 props를 만족하고, 추가적인
  // 모든 props를 유연하게 받을 수 있음을 명시적으로 알려줌으로써 타입스크립트가 헤매지 않고
  // 타입을 추론할 수 있도록 명확한 기준점을 제시해 주었습니다.

  const LoginChecker = (props: P) => {
    const router = useRouter();
    // 모달이 이미 표시되었는지 추적하기 위한 ref (Strict Mode에서도 안정적)
    const modalShownRef = useRef(false);

    useEffect(() => {
      // 라우터가 준비되지 않았다면 (예: 초기 로드 시점) 바로 리턴
      // 이렇게 하면 router.asPath 등이 완전히 준비되지 않은 상태에서의 불필요한 실행을 막습니다.
      if (!router.isReady) {
        return;
      }

      // accessToken이 없고, 아직 모달을 보여주지 않았다면
      if (
        localStorage.getItem("accessToken") === null &&
        !modalShownRef.current
      ) {
        modalShownRef.current = true; // 모달을 띄울 것임을 표시

        Modal.warning({
          title: "로그인 필요",
          content: "로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.",
          onOk() {
            void router.push("/login");
            modalShownRef.current = false; // 모달이 닫힌 후 상태 초기화 (필요하다면)
          },
          onCancel() {
            // 사용자가 모달을 닫았을 때 (예: ESC 키 또는 X 버튼)
            void router.push("/login"); // 로그인 페이지로 이동하거나, 다른 대체 동작 수행
            modalShownRef.current = false;
          },
          // footer: null, // '확인' 버튼만 필요하고 '취소' 버튼을 없애고 싶다면 주석 해제
          maskClosable: false, // 모달 바깥 클릭으로 닫히지 않게 함
          closable: false, // X 버튼으로 닫히지 않게 함
        });
      }
    }, [router.isReady, router]); // router.isReady를 의존성 배열에 추가
    // router 객체 자체가 아니라 router.isReady의 변경을 주시하는 것이 더 정확합니다.

    return <Component {...props} />;
  };

  LoginChecker.displayName = `withLoginCheck(${
    Component.displayName || Component.name || "Component"
  })`;

  return LoginChecker;
};
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
