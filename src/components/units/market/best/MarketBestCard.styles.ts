import styled from "@emotion/styled";

export const MBC = {
  Wrapper: styled.div`
    width: 100%;
    margin: 80px 0;
  `,

  Title: styled.h2`
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
  `,

  List: styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap; /* 화면이 작아지면 줄바꿈 처리 */
  `,

  ItemCard: styled.div`
    width: 280px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    }
  `,

  ImageWrapper: styled.div`
    width: 100%;
    height: 280px;
    background-color: #f5f5f5;
  `,

  ItemImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  InfoWrapper: styled.div`
    padding: 20px 16px;
  `,

  Name: styled.p`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Remarks: styled.p`
    font-size: 14px;
    color: #888;
    margin-bottom: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  BottomWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Price: styled.p`
    font-size: 20px;
    font-weight: 700;
  `,

  LikesWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
  `,
};
