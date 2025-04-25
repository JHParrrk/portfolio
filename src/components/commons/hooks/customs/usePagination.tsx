import { ApolloQueryResult } from "@apollo/client";
import { MouseEvent, useEffect, useState } from "react";
import { IQuery } from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";

interface IUsePaginationArgs {
  count: number | undefined;
  refetch: (
    variables?: Partial<any> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, any>>>;
}

export const usePagination = (args: IUsePaginationArgs) => {
  const router = useRouter();

  // URL에서 초기 페이지를 읽어오거나 기본값(1)을 설정
  const initialPage = Number(router.query.page) || 1;
  const [startPage, setStartPage] = useState(
    Math.floor((initialPage - 1) / 10) * 10 + 1
  );
  const [activedPage, setActivedPage] = useState(initialPage);
  const lastPage = args.count != null ? Math.ceil(args.count / 10) : 0;

  useEffect(() => {
    // 새로고침이나 URL 변경 시, URL 쿼리의 페이지 값을 읽어와 상태를 초기화
    const currentPage = Number(router.query.page) || 1;
    setActivedPage(currentPage);
    setStartPage(Math.floor((currentPage - 1) / 10) * 10 + 1);
  }, [router.query.page]);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    const clickedPage = Number(event.currentTarget.id);
    setActivedPage(clickedPage);
    void args.refetch({ page: clickedPage });

    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, page: clickedPage },
      },
      undefined,
      { shallow: true }
    );
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return; // 이전 페이지 그룹이 없을 경우
    const newStartPage = startPage - 10;
    setStartPage(newStartPage);
    setActivedPage(newStartPage);
    void args.refetch({ page: newStartPage });
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, page: newStartPage },
      },
      undefined,
      { shallow: true }
    );
  };

  const onClickNextPage = () => {
    if (startPage + 10 > lastPage) return; // 다음 페이지 그룹이 없으면 중단
    const newStartPage = startPage + 10;
    setStartPage(newStartPage);
    setActivedPage(newStartPage);
    void args.refetch({ page: newStartPage });
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, page: newStartPage },
      },
      undefined,
      { shallow: true }
    );
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
