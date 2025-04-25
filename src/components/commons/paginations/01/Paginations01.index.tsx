import { Page } from "./Paginations01.styles";
import type { IPaginations01Props } from "./Paginations01.types";

export default function Paginations01(props: IPaginations01Props): JSX.Element {
  return (
    <div>
      <Page onClick={props.onClickPrevPage}>{`<`}</Page>
      {new Array(10)
        .fill(1)
        .map((_, index) => props.startPage + index)
        .filter((page) => page <= props.lastPage)
        .map((page) => (
          <Page
            key={page}
            onClick={props.onClickPage}
            id={String(page)}
            isActive={page === props.activedPage}
          >
            {page}
          </Page>
        ))}
      <Page onClick={props.onClickNextPage}>{`>`}</Page>
    </div>
  );
}

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
