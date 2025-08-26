import styled from "@emotion/styled";

export const MDBT = {
  Header: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bdbdbd;
    padding-bottom: 20px;
  `,
  AvatarWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,
  Avatar: styled.img`
    margin-right: 10px;
  `,
  Info: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  Seller: styled.div``,
  CreatedAt: styled.div``,
  IconWrapper: styled.div`
    text-align: center;
  `,
  LocationIcon: styled.img``,
  LinkIcon: styled.img``,
};
