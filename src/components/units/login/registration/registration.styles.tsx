import styled from "@emotion/styled";
import { IRegisButtonProps } from "./registration.types";

export const RGI = {
  Container: styled.div`
    display: flex;
    width: 100vw; // ✅ 화면 전체 너비
    height: 100vh; // ✅ 화면 전체 높이
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url("/images/background/BG.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.6;
      z-index: 1;
    }
  `,
  RegistrationForm: styled.div`
    background-color: transparent;
    padding: 40px;
    border-radius: 8px;
    width: 400px;
    color: #fff;
    position: relative;
    z-index: 2;
    text-align: center;
  `,
  Logo: styled.img`
    width: 300px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      width: 200px; // ✅ 모바일에서 로고 크기 축소
      margin-bottom: 24px;
    }
  `,
  TitleText: styled.div`
    font-size: 28px;
    font-weight: 700;

    color: white;
  `,
  LabelText: styled.div`
    font-size: 14px;
    color: white;
    text-align: left;
  `,
  InputWrapper: styled.div`
    position: relative; /* 에러 메시지를 절대 위치로 배치하기 위해 필요 */
    margin-bottom: 30px; /* 에러 메시지가 나타나도 입력창 아래 여백 유지 */
  `,
  Input: styled.input`
    width: 100%;
    height: 48px;
    font-size: 14px;
    color: #fff;
    border: 1px solid white;
    border-radius: 10px;
    padding: 12px;
    background: none;
    outline: none;

    &:focus {
      border-color: #ff2929; /* 포커스 시 경계선 색상 변경 */
      outline: none;
    }
  `,

  ErrorMassageRed: styled.div`
    position: absolute; /* 입력창 아래 고정 위치 */
    top: 52px; /* 입력창 높이와 패딩 기준으로 에러 메시지 위치 설정 */
    left: 0;
    color: red;
    font-size: 14px;
    width: 100%; /* 에러 메시지를 입력창 너비에 맞게 정렬 */
    text-align: left; /* 에러 메시지 좌측 정렬 */
  `,
  Button: styled.button`
    width: 100%;
    padding: 12px;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    /* cursor: ${(props: IRegisButtonProps) =>
      props.isActive ? "pointer" : "not-allowed"}; */
    background-color: ${(props: IRegisButtonProps) =>
      props.isActive ? "yellow" : "grey"};
    color: ${(props: IRegisButtonProps) => (props.isActive ? "black" : "#fff")};
    transition: color 0.2s ease; /* 부드러운 전환 효과 추가 */

    &:disabled {
      cursor: not-allowed;
      background-color: #aaa;
    }
  `,
};
