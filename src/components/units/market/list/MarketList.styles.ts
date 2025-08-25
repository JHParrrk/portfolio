import styled from "styled-components";

export const Wrapper = styled.div`
  width: 1200px;
  margin: 80px auto; /* 상단 여백 살짝 조정 */
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px; /* 목록과의 간격을 더 줌 */
  padding-bottom: 20px; /* 헤더 영역 하단에 여백 추가 */
  border-bottom: 2px solid #000; /* 헤더와 목록을 구분하는 라인 */
`;

export const ToggleWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

interface IToggleButtonProps {
  isActive: boolean;
}

export const ToggleButton = styled.button<IToggleButtonProps>`
  padding: 10px 18px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? "600" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${(props) => (props.isActive ? "#FFD600" : "transparent")};
  color: ${(props) => (props.isActive ? "#000" : "#4F4F4F")};
  border: 1px solid ${(props) => (props.isActive ? "#FFD600" : "#E0E0E0")};

  &:hover {
    border-color: #ffd600;
    color: #000;
  }
`;

export const ListWrapper = styled.div`
  /* 
    한 아이템의 높이는 약 201px (이미지 160px + 상하패딩 40px + 테두리 1px) 입니다.
    3.5개의 아이템을 보여주기 위해 705px로 설정합니다. (201px * 3.5)
  */
  max-height: 705px;
  overflow-y: auto; /* 내용이 높이를 초과하면 세로 스크롤 자동 생성 */

  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 40px; /* 페이지네이션과의 간격 확보 */

  /* 스크롤바 디자인 (선택 사항) */
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;
