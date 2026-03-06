import { FormEvent } from "react";

export const wrapAsyncFunc =
  <E>(asyncFunction: (event: E) => Promise<void>) =>
  // 비동기 함수를 감싸는 부분
  // E는 이벤트 타입을 제네릭으로 받아서, 다양한 이벤트 타입에 대응할 수 있도록 함
  // 예를 들어, ChangeEvent<HTMLInputElement>나 <FormEvent<HTMLFormElement> 등
  (event: E) => {
    // wrapAsyncFunc(onChangeFile(event: ChangeEvent<HTMLInputElement>)) 대응

    void asyncFunction(event);

    // 이렇게하면 비동기함수를 동기함수로 감싸서 사용 가능 왜??
  };

export const wrapFormAsyncFunc =
  (asyncFunction: (event: FormEvent<HTMLFormElement>) => Promise<void>) =>
  async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 새로고침 방지
    try {
      await asyncFunction(event); // 비동기 함수 실행
    } catch (error) {
      console.error("Error occurred:", error); // 에러 처리
    }
  };

// wrapAsyncFunc는 제네릭 이벤트 타입을 받아 어떤 이벤트 핸들러에서도
// 사용할 수 있도록 비동기 함수를 동기 호출 형태로 감싸주어, React가
// 반환하는 Promise를 무시하고 즉시 실행하게 해주는 최소 템플릿입니다.
// 반면 wrapFormAsyncFunc는 HTML 폼 전용으로 설계되어 onSubmit
// 이벤트에서 event.preventDefault()로 새로고침을 막고,
// await를 사용해 비동기 함수의 완료를 기다리며, try/catch로 에러를 처리하는
//  완전한 폼 핸들러를 반환합니다.
