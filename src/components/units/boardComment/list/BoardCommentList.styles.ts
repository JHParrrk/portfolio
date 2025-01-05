import styled from "@emotion/styled";
// import { Rate } from "antd";

export const BCL = {
  Custombody: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
  SaveIcon: styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,
  CancelIcon: styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
  `,
  DateString: styled.div`
    color: lightgray;
    padding-top: 15px;
    padding-left: 60px;
  `,
  // StyledRate: styled(Rate)`
  //   font-size: 24px; // 별점 크기 변경
  //   color: #ffd700; // 별점 색상 변경
  //   margin-left: 15px;
  // `,
};
