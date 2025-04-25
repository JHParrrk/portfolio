import { Component } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const LoginCheckHoc = (Component: any) => (props: any) => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인이 필요한 페이지입니다.");
      void router.push("/");
    }
  }, []);
  // 이곳이 먼저 실행되고 그 다음에 프롭스가 실행된다.
  // 이곳에서 로그인이 되어있는지 확인하고, 아니면 로그인페이지로 이동
  return <Component {...props} />;
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
