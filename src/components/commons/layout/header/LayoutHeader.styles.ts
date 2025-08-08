import styled from "@emotion/styled";


export const LH = {
  Wrapper: styled.div`
    box-sizing: border-box; /* 패딩과 보더가 너비에 포함되도록 설정 */
    max-width: 100%;
    height: 70px;
    background-color: #f5f2fc;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  InnerWrapper: styled.div`
    width: 1200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
  `,
  InnerLogo: styled.div`
    font-size: 30px;
    font-weight: bold;
    font-family: "live";
    font-style: italic;
    color: #5729ff;
    cursor: pointer;
  `,
  InnerButton: styled.span`
    margin: 10px;
    color: #5729ff;
    cursor: pointer;
  `,
};
