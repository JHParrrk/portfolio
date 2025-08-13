// usePagination.ts

// 필요한 라이브러리와 훅들을 import 합니다.
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { ApolloQueryResult } from "@apollo/client";
// 직접 만든 유틸리티 함수와 페이지 크기 상수를 가져옵니다.
import { asPage, clamp } from "@/src/commons/libraries/utils/router";
import { PAGE_SIZE } from "@/src/commons/constants/pagination";

// usePagination 훅에 전달해야 할 인자(arguments)들의 타입을 정의합니다.
// 제네릭(<TQuery, TVars>)을 사용해서 어떤 GQL 쿼리에도 유연하게 대응할 수 있습니다.
interface UsePaginationArgs<
  TQuery,
  TVars extends { page?: number; search?: string }
> {
  count: number | undefined; // 전체 아이템의 개수
  refetch: (variables?: Partial<TVars>) => Promise<ApolloQueryResult<TQuery>>; // 데이터를 다시 불러오는 함수 (Apollo Client의 refetch)
  search: string; // URL에서 읽어온 검색어
  shallow?: boolean; // 페이지 이동 시 데이터를 새로 받지 않고 URL만 변경할지 여부
}

// usePagination 커스텀 훅 본체입니다.
export const usePagination = <
  TQuery,
  TVars extends { page?: number; search?: string }
>(
  args: UsePaginationArgs<TQuery, TVars>
) => {
  // Next.js의 라우터 훅을 사용해 URL을 제어합니다.
  const router = useRouter();

  // 마지막 페이지 번호를 계산합니다.
  // useMemo를 사용해 `args.count`가 변경될 때만 재계산하므로 효율적입니다.
  const lastPage = useMemo(() => {
    if (!args?.count || args.count <= 0) return 1; // 아이템이 없어도 최소 1페이지는 표시합니다.
    return Math.ceil(args.count / PAGE_SIZE); // (전체 개수 / 페이지당 개수)를 올림하여 계산합니다.
  }, [args.count]);

  // 페이지네이션 UI의 시작 페이지와 현재 활성화된 페이지를 state로 관리합니다.
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);

  // 컴포넌트가 렌더링되거나 URL이 변경될 때 페이지 상태를 동기화합니다.
  useEffect(() => {
    if (!router.isReady) return; // 라우터가 준비될 때까지 기다립니다.
    const requested = asPage(router.query.page, 1); // URL 쿼리에서 페이지 번호를 안전하게 읽어옵니다.
    const safePage = clamp(requested, 1, lastPage); // 페이지 번호가 유효한 범위(1 ~ lastPage) 내에 있도록 보정합니다.
    setActivedPage(safePage); // 현재 페이지를 설정합니다.
    // 현재 페이지를 기준으로 페이지네이션 UI의 시작 페이지를 계산합니다.
    setStartPage(Math.floor((safePage - 1) / PAGE_SIZE) * PAGE_SIZE + 1);
  }, [router.isReady, router.query.page, lastPage]);

  // URL의 page 쿼리 파라미터를 변경하는 함수입니다.
  const pushPage = (page: number) => {
    // router.push를 사용해 페이지를 이동시킵니다.
    void router.push(
      {
        pathname: router.pathname, // 현재 경로를 그대로 사용하고
        query: { ...router.query, page }, // 기존 쿼리에 page만 덮어씁니다.
      },
      undefined,
      // shallow: true는 서버사이드 렌더링(SSR)이나 getStaticProps를 다시 실행하지 않고 URL만 업데이트합니다.
      // 클라이언트 사이드에서 데이터를 refetch하므로 효율적입니다.
      { scroll: false, shallow: args.shallow ?? true }
    );
  };

  // 특정 페이지 번호를 클릭했을 때 실행되는 핸들러입니다.
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    const next = Number(event.currentTarget.id); // 클릭된 요소의 id(페이지 번호)를 가져옵니다.
    if (!Number.isFinite(next) || next === activedPage) return; // 유효하지 않거나 현재 페이지와 같으면 무시합니다.

    const safe = clamp(next, 1, lastPage); // 페이지 번호를 안전한 범위로 보정합니다.
    setActivedPage(safe); // 활성 페이지 상태를 업데이트합니다.
    // 해당 페이지의 데이터를 새로 요청(refetch)합니다.
    void args.refetch({ page: safe, search: args.search } as Partial<TVars>);
    pushPage(safe); // URL을 업데이트합니다.
  };

  // '이전' 버튼 클릭 핸들러입니다.
  const onClickPrevPage = () => {
    if (startPage === 1) return; // 첫 페이지 블록이면 아무것도 하지 않습니다.
    const prev = clamp(startPage - PAGE_SIZE, 1, lastPage); // 이전 블록의 시작 페이지로 이동합니다.
    setStartPage(prev);
    setActivedPage(prev);
    void args.refetch({ page: prev, search: args.search } as Partial<TVars>);
    pushPage(prev);
  };

  // '다음' 버튼 클릭 핸들러입니다.
  const onClickNextPage = () => {
    const candidate = startPage + PAGE_SIZE; // 다음 블록의 시작 페이지 후보
    if (candidate > lastPage) return; // 후보 페이지가 마지막 페이지보다 크면 무시합니다.
    const next = clamp(candidate, 1, lastPage);
    setStartPage(next);
    setActivedPage(next);
    void args.refetch({ page: next, search: args.search } as Partial<TVars>);
    pushPage(next);
  };

  // 훅이 외부로 제공할 값과 함수들을 반환합니다.
  return {
    startPage,
    activedPage,
    lastPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
