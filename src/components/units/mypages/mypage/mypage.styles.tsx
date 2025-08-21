import styled from "@emotion/styled";

export const MYP = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f0f2f5;
    color: #333;
  `,

  Wrapper: styled.div`
    width: 100%;
    max-width: 600px;
    padding: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  `,

  Title: styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: #4a4a4a;
    margin-bottom: 30px;
    border-bottom: 2px solid #5729ff;
    padding-bottom: 10px;
  `,

  InfoList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  InfoItem: styled.h1`
    font-size: 18px;
    font-weight: normal;
    background-color: #f7f7f7;
    border-radius: 8px;
    padding: 15px 20px;
    text-align: left;
    display: flex;
    align-items: center;

    &:before {
      content: "•";
      color: #5729ff;
      font-size: 24px;
      margin-right: 15px;
      font-weight: bold;
    }
  `,

  LoadingMessage: styled.h1`
    font-size: 24px;
    color: #888;
  `,

  // 💡 프로필 사진 영역과 버튼 스타일 추가
  ProfileSection: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // 가로축 중앙 정렬
    justify-content: center; // 세로축 중앙 정렬
    gap: 15px; // 🚨 자식 요소 간의 간격 추가
    margin-bottom: 30px;
  `,

  ProfileImage: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    border: 1px solid #ddd;
  `,

  UpdateButton: styled.button`
    padding: 10px 20px;
    background-color: #5729ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3d19a3;
    }
  `,
};
