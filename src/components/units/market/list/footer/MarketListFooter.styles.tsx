import styled from "@emotion/styled";

export const MLF = {
  Footer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 1px;
  `,

  PencilIcon: styled.img``,

  Button: styled.button`
    width: 171px;
    height: 52px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 30px;
    cursor: pointer;

    :hover {
      background-color: #f5f2fc;
    }
  `,
};
