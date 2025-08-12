// useSearchbar.ts

import { ChangeEvent, useMemo, useState, useEffect } from "react";
import _ from "lodash"; // lodash 라이브러리 import
import { ApolloQueryResult } from "@apollo/client";
import { IQuery } from "@/src/commons/types/generated/types";
import { useRouter } from "next/router";

interface IUseSearchbarArgs {
  refetch: (
    variables?: Partial<any> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, any>>>;
  refetchBoardsCount: (
    variables?: Partial<any> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, any>>>;
}

export const useSearchbar = (args: IUseSearchbarArgs) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(""); // 검색창의 입력값을 저장하는 상태

  // URL의 search 쿼리가 변경되면, keyword 상태도 업데이트 (뒤로가기 기능)
  useEffect(() => {
    if (router.query.search) {
      setKeyword(String(router.query.search)); // URL의 검색어를 keyword 상태에 반영
    } else {
      setKeyword(""); // URL에 검색어가 없으면 keyword를 비움
    }
  }, [router.query.search]); // router.query.search가 변경될 때마다 실행

  // debounce를 사용하여 API 호출과 URL 업데이트 지연
  const getDebounce = useMemo(
    () =>
      _.debounce((value: string) => {
        void args.refetch({ search: value, page: 1 }); // 검색어와 함께 첫 페이지 데이터 요청
        void args.refetchBoardsCount({ search: value }); // 검색어에 맞는 게시물 총 개수 요청
        void router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, search: value, page: 1 },
          },
          undefined,
          { scroll: false }
        ); // 검색 시 스크롤 위치 유지
      }, 500), // 0.5초(500ms) 동안 추가 입력이 없으면 실행
    [args.refetch, args.refetchBoardsCount, router]
  );

  // 검색창에 입력이 들어올 때마다 실행
  const onChangeSearchbar = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value); // 검색창의 입력값을 keyword 상태에 즉시 반영 (부드러운 타이핑)
    getDebounce(value); // debounce 함수를 호출하여 API 호출을 지연시킴
  };

  return {
    keyword, // keyword 상태를 외부로 노출
    onChangeSearchbar, // onChange 핸들러를 외부로 노출
  };
};
