import styled from "@emotion/styled";

export const BBC = {
  Wrapper: styled.div`
    width: 100%;
    margin-bottom: 50px;
  `,

  Title: styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
  `,

  List: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 0 20px;
  `,

  BoardCard: styled.div`
    width: 33%;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-top: 30px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    }
  `,

  CardTitle: styled.p`
    font-size: 18px;
    font-weight: 600;
    color: #555;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  CardWriter: styled.p`
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
  `,

  CardLikeCount: styled.p`
    font-size: 16px;
    font-weight: 500;
    color: #ff6347;
  `,
};