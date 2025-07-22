import styled from "@emotion/styled";
import { ILoginButtonProps } from "./NewLogin.types";

export const NL = {
  Container: styled.div`
    position: relative;
    width: 100vw; // ✅ 화면 전체 너비
    height: 100vh; // ✅ 화면 전체 높이
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url("/images/background/BG.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;

    z-index: 0;

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

    @media (max-width: 768px) {
      background-position: top; // ✅ 모바일에서 배경 이미지 위치 조정
    }
  `,

  LoginForm: styled.div`
    position: relative;
    z-index: 2;
    width: 400px;
    padding: 40px;
    border-radius: 8px;
    background-color: transparent;
    color: #fff;
    text-align: center;

    @media (max-width: 768px) {
      width: 90%; // ✅ 모바일에서 너비 축소
      padding: 24px; // ✅ 모바일에서 패딩 축소
    }
  `,

  Logo: styled.img`
    width: 300px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      width: 200px; // ✅ 모바일에서 로고 크기 축소
      margin-bottom: 24px;
    }
  `,

  InputWrapper: styled.div`
    position: relative;
    margin-bottom: 30px;
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
      border-color: #ff2929;
    }

    @media (prefers-color-scheme: dark) {
      border-color: #888; // ✅ 다크모드에서 테두리 색상 조정
      color: #eee; // ✅ 다크모드에서 텍스트 밝게
    }
  `,

  ErrorMassageRed: styled.div`
    position: absolute;
    top: 52px;
    left: 0;
    color: red;
    font-size: 14px;
    width: 100%;
    text-align: left;
  `,

  CheckboxWrapper: styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;

    label {
      font-size: 14px;
      color: #fff;
      margin-left: 8px;

      @media (prefers-color-scheme: dark) {
        color: #eee; // ✅ 다크모드에서 라벨 색상 조정
      }
    }
  `,

  Checkbox: styled.input`
    width: 16px;
    height: 16px;
    accent-color: #5729ff;
  `,

  Button: styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    transition: color 0.2s ease;

    background-color: ${(props: ILoginButtonProps) =>
      props.isActive ? "yellow" : "grey"};
    color: ${(props: ILoginButtonProps) => (props.isActive ? "black" : "#fff")};

    &:disabled {
      cursor: not-allowed;
      background-color: #aaa;
    }

    @media (max-width: 768px) {
      font-size: 14px; // ✅ 모바일에서 폰트 크기 축소
      padding: 10px;
    }

    @media (prefers-color-scheme: dark) {
      background-color: ${(props: ILoginButtonProps) =>
        props.isActive ? "#ffd700" : "#555"}; // ✅ 다크모드에서 배경 색상 조정
      color: ${(props: ILoginButtonProps) =>
        props.isActive ? "#000" : "#ccc"}; // ✅ 다크모드에서 텍스트 색상 조정
    }
  `,

  Divider: styled.div`
    margin: 20px 0;
    height: 1px;
    background-color: #ccc;
    width: 100%;

    @media (prefers-color-scheme: dark) {
      background-color: #444; // ✅ 다크모드에서 구분선 색상 조정
    }
  `,

  SignUpOptionWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    @media (max-width: 768px) {
      flex-direction: column; // ✅ 모바일에서 세로 정렬
      align-items: center;
      gap: 8px;
    }
  `,

  EtcButton: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 768px) {
      flex-direction: column; // ✅ 모바일에서 세로 정렬
      align-items: center;
      gap: 8px;
    }
  `,

  EtcItem: styled.div`
    font-size: 14px;
    color: #fff;
    cursor: pointer;

    @media (prefers-color-scheme: dark) {
      color: #ddd; // ✅ 다크모드에서 텍스트 색상 조정
    }
  `,
};
