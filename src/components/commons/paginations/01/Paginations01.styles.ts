import styled from "@emotion/styled";

interface IPageProps {
  isActive?: boolean;
}

export const PAG = {
  PagesWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* 10개의 페이지 번호(각 40px)와 간격(총 9 * 10px)을 고려한 너비
      (40px * 10) + (10px * 9) = 490px
      12개의 구성요소 전체를 감싸는 Wrapper는 Paginations01.index.tsx 파일의 최상단 div입니다.
      여기서 PagesWrapper는 숫자들만 감싸고 있습니다.
    */
    width: 490px;
    gap: 10px; /* 각 페이지 번호 사이의 간격 */
  `,
  Column: styled.span`
    /* 기존 스타일 유지 */
    margin: 0px 50px;
  `,
  Page: styled.button<IPageProps>`
    width: 40px;
    height: 40px;
    text-align: center;

    font-size: 1.2rem;
    line-height: 40px;
    color: ${({ isActive }) => (isActive ? "blue" : "black")};
    font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};

    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

    /* 호버/포커스 피드백 */
    &:hover:not(:disabled) {
      background: rgba(0, 0, 0, 0.05);
    }
    &:focus-visible {
      outline: 2px solid #3b82f6; /* 파란 포커스 링 */
      outline-offset: 2px;
    }

    /* 비활성화 상태 */
    &:disabled {
      opacity: 0.4;
    }
  `,
};