import styled from "@emotion/styled";
import { Rate } from "antd";

export const BCW = {
  CustomBody: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  MainWrapper: styled.div`
    width: 100%;
    padding-left: 10px;
  `,
  Wrapper: styled.div`
    width: 1200px;
    margin: 0px 100px;
  `,
  PencilIcon: styled.img`
    width: 24px;
    height: 24px;
  `,
  InputWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 20px;
  `,
  ContentsWrapper: styled.div`
    border: 1px solid lightgray;
  `,
  Input: styled.input`
    width: 180px;
    height: 52px;
    padding-left: 20px;
    border: 1px solid lightgray;
    margin-right: 20px;
  `,
  Contents: styled.textarea`
    width: 100%;
    min-height: 108px;
    padding: 20px;
    border: none;
    border-bottom: 1px solid lightgray;
  `,
  BottomWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  ContentsLength: styled.div`
    width: 100%;
    height: 51px;
    line-height: 51px;
    padding-left: 20px;
    color: gray;
  `,
  Button: styled.button`
    width: 91px;
    height: 51px;
    background-color: black;
    color: white;
    cursor: pointer;
  `,
  CancelIcon: styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,
  Star: styled(Rate)`
    font-size: 24px; // 별점 크기 변경
    color: #ffd700; // 별점 색상 변경
    margin-left: 15px;
  `,
};
