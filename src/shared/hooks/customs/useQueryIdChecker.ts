import { useRouter } from "next/router";

export const useQueryIdChecker = (id: string) => {
  const router = useRouter(); // Next.js의 useRouter 훅을 사용하여 라우터 객체를 가져옵니다.
  const queryId = router.query[id]; // URL의 query 파라미터에서 전달된 id 값을 가져옵니다.

  if (!queryId) return { id: "" };
  // queryId가 null, undefined 또는 빈 값인 경우 기본적으로 { id: "" }을 반환하여 안전하게 처리합니다.

  if (typeof queryId === "string") return { id: queryId };
  // queryId가 문자열일 경우 그대로 반환합니다.

  if (typeof queryId === "object") return { id: queryId[0] };
  // queryId가 객체(대개 배열)일 경우 첫 번째 요소를 반환합니다.

  return { id: "" };
  // 위 조건에 모두 해당하지 않을 경우(예외 상황) 기본값 { id: "" }을 반환합니다.
};
