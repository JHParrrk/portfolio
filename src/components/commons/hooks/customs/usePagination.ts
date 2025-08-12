// usePagination.ts

import { useRouter } from "next/router";
import { ApolloQueryResult } from "@apollo/client";
import { MouseEvent, useEffect, useState } from "react";
import { IQuery } from "@/src/commons/types/generated/types";

interface IUsePaginationArgs {
  count: number | undefined; // 전체 게시물 수 (페이지네이션 인덱스 계산용)
  refetch: (
    variables?: Partial<any> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, any>>>; // API를 다시 호출하는 함수
}

export const usePagination = (args: IUsePaginationArgs) => {
  const router = useRouter();
  const [startPage, setStartPage] = useState(1); // 페이지네이션의 시작 인덱스 번호 (1, 11, 21...)
  const [activedPage, setActivedPage] = useState(1); // 현재 활성화된 페이지 번호
  const lastPage = args.count != null ? Math.ceil(args.count / 10) : 0; // 총 페이지 개수 계산 (한 페이지에 10개 게시물)

  useEffect(() => {
    // 페이지 컴포넌트가 처음 렌더링되거나 URL의 page 쿼리가 변경될 때 실행
    if (router.query.page) {
      const currentPage = Number(router.query.page); // URL의 페이지 번호를 가져와 숫자로 변환
      setActivedPage(currentPage); // 활성화된 페이지를 URL 값으로 설정
      setStartPage(Math.ceil(currentPage / 10) * 10 - 9); // 현재 페이지에 맞는 페이지네이션 시작 번호를 계산
    }
  }, [router.query.page]); // router.query.page가 변경될 때마다 실행

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    const activedPage = Number(event.currentTarget.id); // 클릭한 페이지 번호 가져오기
    setActivedPage(activedPage); // 활성화된 페이지 상태 업데이트

    // refetch 함수를 호출하여 API에 새로운 페이지와 검색어 정보를 전달
    void args.refetch({ page: activedPage, search: router.query.search });

    // router.push를 사용하여 URL을 변경하고 브라우저 기록에 남김
    void router.push(
      {
        pathname: router.pathname, // 현재 URL 경로 유지
        query: { ...router.query, page: activedPage }, // 기존 쿼리를 유지하고, page만 변경
      },
      undefined,
      { scroll: false } // 페이지 이동 시 스크롤 위치를 유지하는 옵션
    );
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return; // 첫 페이지 그룹일 경우 이동하지 않음
    const prevPage = startPage - 10; // 이전 페이지 그룹의 첫 페이지 번호
    setStartPage(prevPage); // 시작 페이지 상태 업데이트
    setActivedPage(prevPage); // 활성화된 페이지 상태 업데이트

    void args.refetch({ page: prevPage, search: router.query.search }); // API 호출
    void router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: prevPage },
      },
      undefined,
      { scroll: false } // 스크롤 위치 유지
    );
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      // 마지막 페이지 그룹이 아닐 경우에만 실행
      const nextPage = startPage + 10; // 다음 페이지 그룹의 첫 페이지 번호
      setStartPage(nextPage); // 시작 페이지 상태 업데이트
      setActivedPage(nextPage); // 활성화된 페이지 상태 업데이트

      void args.refetch({ page: nextPage, search: router.query.search }); // API 호출
      void router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: nextPage },
        },
        undefined,
        { scroll: false } // 스크롤 위치 유지
      );
    }
  };

  return {
    startPage,
    activedPage,
    lastPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
