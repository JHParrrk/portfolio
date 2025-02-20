import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { MouseEvent } from "react";
import Paginations01UI from "./Paginations01.presenter";
import type { IPaginations01Props } from "./Paginations01.types";

export default function Paginations01(props: IPaginations01Props): JSX.Element {
  const router = useRouter();
  const { refetch, count } = props;

  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = Math.ceil((count ?? 10) / 10);

  useEffect(() => {
    const page = Number(router.query.page) || 1;
    setActivedPage(page); // 현재 쿼리스트링에서 가져온 페이지 번호를 activedPage 상태로 설정
    setStartPage(Math.floor((page - 1) / 10) * 10 + 1); // 페이지 번호를 기준으로 시작 페이지 설정 (1, 11, 21 등)
  }, [router.query.page]); // router.query.page 값이 변경될 때마다 이 훅이 실행

  useEffect(() => {
    void refetch({ page: activedPage }); // activedPage 값을 사용하여 데이터를 다시 가져옴
  }, [activedPage, refetch]); // activedPage 또는 refetch가 변경될 때마다 이 훅이 실행

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const page = Number(event.currentTarget.id);
    setActivedPage(page);
    void router.push(`?page=${page}`, undefined, { shallow: true });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    const newStartPage = startPage - 10;
    setStartPage(newStartPage);
    setActivedPage(newStartPage);
    void router.push(`?page=${newStartPage}`, undefined, { shallow: true });
  };

  const onClickNextPage = (): void => {
    const newStartPage = startPage + 10;
    if (newStartPage <= lastPage) {
      setStartPage(newStartPage);
      setActivedPage(newStartPage);
      void router.push(`?page=${newStartPage}`, undefined, { shallow: true });
    }
  };

  const extendProps = {
    ...props,
    startPage,
    lastPage,
    activedPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };

  return <Paginations01UI {...extendProps} />;
}
