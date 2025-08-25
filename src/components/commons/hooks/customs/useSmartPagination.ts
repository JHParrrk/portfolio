import { useApolloClient } from "@apollo/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Modal } from "antd"; // 1. antd에서 Modal을 임포트합니다.
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "@/src/commons/types/generated/types";
import { FETCH_USED_ITEMS } from "../queries/useQueryFetchUsedItems";
import { asSingle } from "@/src/commons/libraries/utils/router";

export const useSmartPagination = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const pageFromQuery = parseInt(asSingle(router.query.page, "1"), 10);
    if (!isNaN(pageFromQuery)) {
      setCurrentPage(pageFromQuery);
      setStartPage(Math.floor((pageFromQuery - 1) / 10) * 10 + 1);
    }
  }, [router.query.page]);

  const movePage = (page: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { scroll: false }
    );
  };

  const onClickPage = (page: number) => {
    movePage(page);
  };

  const onClickPrev = () => {
    if (startPage === 1) return;
    movePage(startPage - 10);
  };

  const onClickNext = async () => {
    const nextPageBlockStart = startPage + 10;
    try {
      const result = await client.query<
        Pick<IQuery, "fetchUseditems">,
        IQueryFetchUseditemsArgs
      >({
        query: FETCH_USED_ITEMS,
        variables: {
          page: nextPageBlockStart,
          search: asSingle(router.query.search, ""),
          isSoldout: router.query.isSoldout === "true",
        },
        fetchPolicy: "network-only",
      });

      if (result.data.fetchUseditems.length > 0) {
        movePage(nextPageBlockStart);
      } else {
        // 2. alert 대신 Modal.info() 또는 Modal.warning()을 사용합니다.
        Modal.info({ content: "마지막 페이지입니다." });
      }
    } catch (error) {
      // 3. 에러 발생 시 Modal.error()를 사용합니다.
      Modal.error({ content: "페이지를 불러오는 중 오류가 발생했습니다." });
    }
  };

  return {
    startPage,
    currentPage,
    onClickPage,
    onClickPrev,
    onClickNext,
  };
};
