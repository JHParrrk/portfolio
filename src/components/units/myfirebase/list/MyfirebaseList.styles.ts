import styled from "@emotion/styled";

export const MFBL = {
  CustomBody: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  Wrapper: styled.div`
    width: 1200px;
    margin: 100px;
  `,
  TableTop: styled.div`
    border-top: 2px solid gray;
    margin-top: 20px;
  `,
  TableBottom: styled.div`
    border-bottom: 2px solid gray;
  `,
  Row: styled.div`
    display: flex;
    flex-direction: row;
    height: 52px;
    line-height: 52px;
    border-bottom: 1px solid gray;
  `,
  ColumnHeaderBasic: styled.div`
    width: 10%;
    text-align: center;
  `,
  ColumnHeaderTitle: styled.div`
    width: 70%;
    text-align: center;
  `,
  ColumnBasic: styled.div`
    width: 10%;
    text-align: center;
  `,
  ColumnTitle: styled.div`
    width: 70%;
    text-align: center;
  `,
  Footer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 50px;
  `,
  PencilIcon: styled.img`
    width: 24px;
    height: 24px;
  `,
  Button: styled.button`
    margin-top: 40px;
    width: 171px;
    height: 52px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;

    :hover {
      background-color: #f5f2fc;
    }
  `,
};
