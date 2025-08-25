import { P02S } from "./Paginations02.styles";
import { IPaginations02Props } from "./Paginations02.types";

export default function Paginations02(props: IPaginations02Props) {
  // 마지막 페이지가 없거나, '다음' 버튼 로직에 lastPage가 필요하므로 추가합니다.
  // (useSmartPagination 훅에서 lastPage를 계산하지 않으므로, '다음' 버튼 로직은 기존 유지)
  
  // '다음' 버튼 비활성화 로직을 위해 lastPage를 가정해야 하지만,
  // 현재 훅에서는 API 호출로 처리하므로 UI 단에서는 항상 활성화된 것처럼 둡니다.
  // const isNextDisabled = props.startPage + 9 >= props.lastPage;

  return (
    <nav aria-label="페이지네이션">
      <P02S.Wrapper>
        <P02S.ArrowButton
          onClick={props.onClickPrev}
          disabled={props.startPage === 1}
          aria-label="이전 페이지 블록"
        >
          이전
        </P02S.ArrowButton>

        {new Array(10).fill(1).map((_, index) => {
          const page = props.startPage + index;
          const isActive = page === props.currentPage;

          // 만약 lastPage prop을 받는다면, 이 로직으로 불필요한 페이지 번호를 숨길 수 있습니다.
          // if (props.lastPage && page > props.lastPage) return <div key={page} style={{ width: '40px' }} />;

          return (
            <P02S.PageNumber
              key={page}
              onClick={() => props.onClickPage(page)}
              isActive={isActive}
              disabled={isActive} // 현재 페이지는 클릭 비활성화
              aria-current={isActive ? "page" : undefined}
              aria-label={`페이지 ${page}${isActive ? " (현재 페이지)" : ""}`}
            >
              {page}
            </P02S.PageNumber>
          );
        })}

        <P02S.ArrowButton 
          onClick={props.onClickNext} 
          aria-label="다음 페이지 블록"
          // disabled={isNextDisabled} // '다음' 버튼 로직은 useSmartPagination에서 API 호출로 처리
        >
          다음
        </P02S.ArrowButton>
      </P02S.Wrapper>
    </nav>
  );
}