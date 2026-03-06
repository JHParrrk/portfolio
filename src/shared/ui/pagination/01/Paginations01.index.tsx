// Paginations01.index.tsx

import { PAG } from './Paginations01.css';
import { IPaginations01Props } from './Paginations01.types';

const PAGE_BLOCK_SIZE = 10;

export default function Paginations01(props: IPaginations01Props) {
  const {
    startPage,
    lastPage,
    activedPage,
    onClickPrevPage,
    onClickNextPage,
    onClickPage,
  } = props;

  const pageNumbers = Array.from(
    { length: PAGE_BLOCK_SIZE },
    (_, i) => startPage + i
  ).filter((num) => num <= lastPage);

  const isPrevDisabled = startPage === 1;
  const isNextDisabled = startPage + PAGE_BLOCK_SIZE > lastPage;

  if (!lastPage || lastPage < 1) return null;

  return (
    <nav aria-label="페이지네이션">
      <div className={PAG.PagesWrapper}>
        <button
          className={PAG.Page}
          type="button"
          onClick={onClickPrevPage}
          disabled={isPrevDisabled}
          aria-label="이전 페이지"
          style={{ cursor: isPrevDisabled ? 'not-allowed' : 'pointer' }}
        >
          {'<'}
        </button>

        {pageNumbers.map((pageNumber) => {
          const isActive = pageNumber === activedPage;
          return (
            <button
              key={pageNumber}
              className={PAG.Page}
              type="button"
              id={String(pageNumber)}
              onClick={isActive ? undefined : onClickPage}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`페이지 ${pageNumber}`}
              style={{
                color: isActive ? 'blue' : 'black',
                fontWeight: isActive ? 'bold' : 'normal',
                cursor: isActive ? 'default' : 'pointer',
              }}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={PAG.Page}
          type="button"
          onClick={onClickNextPage}
          disabled={isNextDisabled}
          aria-label="다음 페이지"
          style={{ cursor: isNextDisabled ? 'not-allowed' : 'pointer' }}
        >
          {'>'}
        </button>
      </div>
    </nav>
  );
}
