import styled from "styled-components";

// 토글 버튼의 활성화 상태를 위한 타입 정의
interface IToggleButtonProps {
  isActive: boolean;
}

export const MLH = {
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 2px solid #000;
  `,

  // --- ✨ MarketList.styles.ts 에서 이동해 온 스타일 ---
  ToggleWrapper: styled.div`
    display: flex;
    gap: 12px;
  `,

  ToggleButton: styled.button<IToggleButtonProps>`
    padding: 10px 18px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: ${(props) => (props.isActive ? "600" : "500")};
    cursor: pointer;
    transition: all 0.2s ease;

    background-color: ${(props) =>
      props.isActive ? "#FFD600" : "transparent"};
    color: ${(props) => (props.isActive ? "#000" : "#4F4F4F")};
    border: 1px solid ${(props) => (props.isActive ? "#FFD600" : "#E0E0E0")};

    &:hover {
      border-color: #ffd600;
      color: #000;
    }
  `,
};
