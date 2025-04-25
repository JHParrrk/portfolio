import styled from "@emotion/styled";

export const BLF = {
  Footer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 50px;
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
    cursor: pointer;

    :hover {
      background-color: #f5f2fc;
    }
  `,
};
