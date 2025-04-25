import styled from "@emotion/styled";

export const BDBB = {
  BottomWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 80px;
  `,

  Button: styled.button`
    width: 179px;
    height: 45px;
    background-color: white;
    border: 1px solid gray;
    margin: 0px 12px;
    cursor: pointer;

    :hover {
      background-color: gold;
      border-color: white;
    }
  `,
};
