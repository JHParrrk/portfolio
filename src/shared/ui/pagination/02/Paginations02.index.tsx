import { P02S } from "./Paginations02.css";
import { IPaginations02Props } from "./Paginations02.types";

export default function Paginations02(props: IPaginations02Props) {
  return (
    <nav aria-label="페이지네이션">
      <div className={P02S.Wrapper}>
        <button
          className={P02S.ArrowButton}
          onClick={props.onClickPrev}
          disabled={props.startPage === 1}
          aria-label="이전 페이지 블록"
        >
          이전
        </button>

        {new Array(10).fill(1).map((_, index) => {
          const page = props.startPage + index;
          const isActive = page === props.currentPage;

          return (
            <button
              className={P02S.PageNumber}
              key={page}
              onClick={() => props.onClickPage(page)}
              disabled={isActive}
              aria-current={isActive ? "page" : undefined}
              aria-label={`페이지 ${page}`}
              style={{
                color: isActive ? "white" : "black",
                backgroundColor: isActive ? "#FFD600" : "transparent",
                fontWeight: isActive ? "bold" : "normal"
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          className={P02S.ArrowButton}
          onClick={props.onClickNext}
          aria-label="다음 페이지 블록"
        >
          다음
        </button>
      </div>
    </nav>
  );
}
