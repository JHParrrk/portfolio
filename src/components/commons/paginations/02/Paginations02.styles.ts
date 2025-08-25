import styled from "@emotion/styled";

interface IPageNumberProps {
  isActive: boolean;
}

export const P02S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 40px 0;
  `,

  ArrowButton: styled.button`
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background-color: #fafafa;
    }

    &:disabled {
      color: #bdbdbd;
      cursor: not-allowed;
      background-color: #f5f5f5;
    }
  `,

  // --- ✨ 여기가 수정된 부분입니다 ✨ ---
  PageNumber: styled.button<IPageNumberProps>`
    width: 40px; /* 고정 너비 */
    height: 40px; /* 고정 높이 */
    border: none;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    cursor: pointer;

    color: ${(props) => (props.isActive ? "white" : "black")};
    background-color: ${(props) =>
      props.isActive ? "#FFD600" : "transparent"};
    font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
    transition: background-color 0.2s, color 0.2s;

    &:hover:not(:disabled) {
      background-color: ${(props) => (props.isActive ? "#f2c400" : "#f0f0f0")};
    }

    &:disabled {
      cursor: default;
    }
  `,
};
