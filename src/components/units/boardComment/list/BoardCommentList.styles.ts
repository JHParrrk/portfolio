import styled from "@emotion/styled";
import { Rate, Modal } from "antd";

export const BCL = {
  CustomBody: styled.div`
    display: flex;
    flex-direction: column; // 수정: row -> column
    justify-content: center;
    align-items: center;
    width: 100%; // 추가: 부모 요소에 맞춰서 너비를 지정
  `,
  ItemWrapper: styled.div`
    width: 1200px;
    margin: 0px 100px;
    padding-top: 20px;
    height: 128px;
    border-bottom: 1px solid lightgray;
  `,
  FlexWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,
  Avatar: styled.img`
    width: 48px;
    height: 48px;
  `,
  MainWrapper: styled.div`
    width: 100%;
    padding-left: 10px;
  `,
  WriterWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  Writer: styled.div`
    font-size: 20px;
    font-weight: bold;
  `,
  Contents: styled.div``,
  OptionWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,
  UpdateIcon: styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,
  DeleteIcon: styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,
  DateString: styled.div`
    color: lightgray;
    padding-top: 15px;
    padding-left: 60px;
  `,
  Star: styled(Rate)`
    padding-left: 20px;
  `,
  PasswordModal: styled(Modal)``,
  PasswordInput: styled.input`
    width: 100%;
    margin-top: 10px;
  `,
};
