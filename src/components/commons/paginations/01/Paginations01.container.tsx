import { useState } from "react";
import type { MouseEvent } from "react";
import Paginations01UI from "./Paginations01.presenter";
import type { IPaginations01Props } from "./Paginations01.types";

export default function Paginations01(props: IPaginations01Props): JSX.Element {
  const { refetch, count } = props;

  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = Math.ceil((count ?? 10) / 10);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const activedPage = Number(event.currentTarget.id);
    setActivedPage(activedPage);
    void refetch({ page: activedPage });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    const newStartPage = startPage - 10;
    setStartPage(newStartPage);
    setActivedPage(newStartPage);
    void refetch({ page: newStartPage });
  };

  const onClickNextPage = (): void => {
    const newStartPage = startPage + 10;
    if (newStartPage <= lastPage) {
      setStartPage(newStartPage);
      setActivedPage(newStartPage);
      void refetch({ page: newStartPage });
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
