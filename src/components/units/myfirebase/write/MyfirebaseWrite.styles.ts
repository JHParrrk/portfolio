import styled from "@emotion/styled";

export const MFBW = {
  CustomBody: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    height: 200px;
    width: 500px;
  `,
  InputWrapper: styled.div`
    padding-top: 50px;
  `,
  MyInput: styled.input`
    margin: 5px;
    width: 350px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid blue;

    :focus {
      outline: none;
    }
  `,
  ButtonWrapper: styled.div`
    padding-top: 60px;
  `,
  MyButton: styled.button`
    width: 400px;
    height: 50px;
    background-color: beige;
    border-color: yellow;

    cursor: pointer;
    :hover {
      font-weight: bold;
      background-color: yellow;
      border-color: yellowgreen;
    }
  `,
  InnerLogo: styled.span`
    font-size: 13px;
    font-weight: bold;
    font-family: "live";
    font-style: italic;
    color: #5729ff;
  `,
};
