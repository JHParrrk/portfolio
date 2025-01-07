import styled from "@emotion/styled";
import { Rate } from "antd";

export const BCL = {
  Custombody: styled.div`
    display: flex;
    flex-direction: column; // 수정: row -> column
    justify-content: center;
    align-items: center;
    width: 100%; // 추가: 부모 요소에 맞춰서 너비를 지정
  `,
  ItemWrapper: styled.div`
    width: 1200px;
    margin: 20px 0; // 수정: margin-bottom만 적용
    padding-top: 20px;
    border-bottom: 1px solid lightgray;
    display: block; // 추가: block 요소로 설정
  `,
  FlexWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; // 추가: 아이템을 중앙 정렬
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
  Contents: styled.div`
    padding: 10px 0; // 추가: 상하 padding 적용
  `,
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
  StyledRate: styled(Rate)`
    font-size: 24px; // 별점 크기 변경
    color: #ffd700; // 별점 색상 변경
    margin-left: 55px;
  `,
};
