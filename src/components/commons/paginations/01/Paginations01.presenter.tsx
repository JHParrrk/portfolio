import { Page } from "./Paginations01.styles";
import type { IPaginations01UIProps } from "./Paginations01.types";

export default function Paginations01UI(
  props: IPaginations01UIProps
): JSX.Element {
  const {
    startPage,
    lastPage,
    activedPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  } = props;

  return (
    <div>
      <Page onClick={onClickPrevPage}>{`<`}</Page>
      {new Array(10)
        .fill(1)
        .map((_, index) => startPage + index)
        .filter((page) => page <= lastPage)
        .map((page) => (
          <Page
            key={page}
            onClick={onClickPage}
            id={String(page)}
            isActive={page === activedPage}
          >
            {page}
          </Page>
        ))}
      <Page onClick={onClickNextPage}>{`>`}</Page>
    </div>

    // <div>
    //   <Page onClick={onClickPrevPage}>{`<`}</Page>
    //   {new Array(10).fill(1).map(
    //     (_, index) =>
    //       startPage + index <= lastPage && (
    //         <Page
    //           key={startPage + index}
    //           onClick={onClickPage}
    //           id={String(startPage + index)}
    //           isActive={startPage + index === activedPage}
    //         >
    //           {startPage + index}
    //         </Page>
    //       )
    //   )}
    //   <Page onClick={onClickNextPage}>{`>`}</Page>
    // </div>
  );
}
