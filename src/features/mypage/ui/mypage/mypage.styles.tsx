import styled from '@emotion/styled';

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
    font-size: 26px;
    font-weight: 800;
    color: #1a202c;
    margin-bottom: 40px;
    letter-spacing: -0.5px;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #5729ff;
    }
  `,

  InfoList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  `,

  InfoItem: styled.div`
    font-size: 16px;
    font-weight: 500;
    background-color: #f8fafc;
    border: 1px solid #f1f5f9;
    border-radius: 12px;
    padding: 18px 24px;
    text-align: left;
    display: flex;
    align-items: center;
    color: #4a5568;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f1f5f9;
      transform: translateX(4px);
    }

    &:before {
      content: '';
      width: 6px;
      height: 6px;
      background-color: #5729ff;
      border-radius: 50%;
      margin-right: 16px;
    }
  `,

  LoadingMessage: styled.div`
    font-size: 18px;
    color: #718096;
    font-weight: 500;
  `,

  ProfileSection: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-bottom: 45px;
    padding: 30px;
    background: linear-gradient(145deg, #ffffff, #f8fafc);
    border-radius: 20px;
    border: 1px solid #f1f5f9;
    position: relative;

    /* Hide the default file input button */
    & input[type='file'] {
      display: none !important;
    }

    /* Adjust Uploads01 component styles */
    & img {
      width: 120px !important;
      height: 120px !important;
      border-radius: 50% !important;
      border: 4px solid #fff !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
      margin: 0 auto !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;

      &:hover {
        transform: scale(1.05);
        border-color: #5729ff !important;
        box-shadow: 0 12px 28px rgba(87, 41, 255, 0.2) !important;
      }
    }
  `,

  UpdateButton: styled.button`
    padding: 12px 28px;
    background-color: #5729ff;
    color: #fff;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(87, 41, 255, 0.25);
    transition: all 0.2s ease;

    &:hover {
      background-color: #4516eb;
      box-shadow: 0 6px 16px rgba(87, 41, 255, 0.35);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  `,
};
