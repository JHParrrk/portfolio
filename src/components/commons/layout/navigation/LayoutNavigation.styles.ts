import styled from "@emotion/styled";

export const LN = {
  Wrapper: styled.div`
    box-sizing: border-box; /* 패딩과 보더가 너비에 포함되도록 설정 */
    max-width: 100%;
    height: 64px;
    background-color: #5729ff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: white;
  `,

  MenuItem: styled.div`
    margin: 0px 60px;
    cursor: pointer;

    :hover {
      color: orange;
    }
  `,
};
