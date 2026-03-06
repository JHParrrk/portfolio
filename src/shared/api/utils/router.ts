// utils/router.ts

/**
 * 배열 또는 단일 문자열, undefined 중 하나를 안전하게 "단일 문자열"로 변환합니다.
 * Next.js router.query 같은 곳에서 자주 나오는 형태(string | string[] | undefined)를 처리하기 위함입니다.
 * @param v - 변환할 값
 * @param fallback - 값이 없거나 비어있을 때 사용할 기본값
 * @returns 변환된 문자열
 */
export const asSingle = (
  v: string | string[] | undefined,
  fallback = ""
): string => (Array.isArray(v) ? v[0] ?? fallback : v ?? fallback);

/**
 * 쿼리 문자열 등을 페이지 번호(number)로 안전하게 변환합니다.
 * @param v - 변환할 값 (예: router.query.page)
 * @param fallback - 변환 실패 시 사용할 기본 페이지 번호
 * @returns 유효한 정수 페이지 번호
 */
export const asPage = (
  v: string | string[] | undefined,
  fallback = 1
): number => {
  // asSingle을 통해 먼저 안전한 문자열로 만듭니다.
  const n = Number(asSingle(v, String(fallback)));
  // 숫자로 변환 가능하고 0보다 크면 정수로, 아니면 기본값으로 반환합니다.
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
};

/**
 * 주어진 숫자를 min~max 범위 안으로 "클램프(clamp)"합니다.
 * 페이지 번호가 1보다 작아지거나 마지막 페이지보다 커지는 것을 방지합니다.
 * @param n - 원래 숫자
 * @param min - 최소값
 * @param max - 최대값
 * @returns min 이상, max 이하로 제한된 숫자
 */
export const clamp = (n: number, min: number, max: number): number =>
  Math.min(Math.max(n, min), max);
