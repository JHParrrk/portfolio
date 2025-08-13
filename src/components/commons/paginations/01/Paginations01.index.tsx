// Paginations01.index.tsx

import { PAG } from "./Paginations01.styles";
import { IPaginations01Props } from "./Paginations01.types";

// 한 번에 보여줄 페이지 번호의 개수를 상수로 정의합니다.
const PAGE_BLOCK_SIZE = 10;

export default function Paginations01(props: IPaginations01Props) {
  // props로부터 페이지네이션에 필요한 모든 상태와 핸들러 함수를 받습니다.
  const {
    startPage,
    lastPage,
    activedPage,
    onClickPrevPage,
    onClickNextPage,
    onClickPage,
  } = props;

  // 표시할 페이지 번호 목록을 계산합니다.
  // startPage부터 PAGE_BLOCK_SIZE 개수만큼 배열을 만들고, lastPage를 초과하는 번호는 걸러냅니다.
  const pageNumbers = Array.from(
    { length: PAGE_BLOCK_SIZE },
    (_, i) => startPage + i
  ).filter((num) => num <= lastPage);

  // '이전', '다음' 버튼의 비활성화 여부를 결정합니다.
  const isPrevDisabled = startPage === 1;
  const isNextDisabled = startPage + PAGE_BLOCK_SIZE > lastPage;

  // 마지막 페이지가 유효하지 않으면 아무것도 렌더링하지 않습니다.
  if (!lastPage || lastPage < 1) return null;

  return (
    // 시맨틱 HTML <nav> 태그를 사용하여 웹 접근성을 높입니다.
    <nav aria-label="페이지네이션">
      <PAG.PagesWrapper>
        {/* 이전 페이지 버튼 */}
        <PAG.Page
          type="button"
          onClick={onClickPrevPage}
          disabled={isPrevDisabled}
          aria-label="이전 페이지"
        >
          {"<"}
        </PAG.Page>

        {/* 페이지 번호 목록을 map으로 순회하며 버튼을 생성합니다. */}
        {pageNumbers.map((pageNumber) => {
          const isActive = pageNumber === activedPage;
          return (
            <PAG.Page
              key={pageNumber}
              type="button"
              id={String(pageNumber)} // 부모의 onClickPage 핸들러에서 이 id를 사용합니다.
              onClick={isActive ? undefined : onClickPage} // 현재 활성화된 페이지는 클릭되지 않도록 합니다.
              isActive={isActive} // 활성화 상태에 따라 다른 스타일을 적용합니다.
              aria-current={isActive ? "page" : undefined} // 접근성: 현재 페이지임을 스크린 리더에 알려줍니다.
              aria-label={`페이지 ${pageNumber}${
                isActive ? " (현재 페이지)" : ""
              }`}
            >
              {pageNumber}
            </PAG.Page>
          );
        })}

        {/* 다음 페이지 버튼 */}
        <PAG.Page
          type="button"
          onClick={onClickNextPage}
          disabled={isNextDisabled}
          aria-label="다음 페이지"
        >
          {">"}
        </PAG.Page>
      </PAG.PagesWrapper>
    </nav>
  );
}
