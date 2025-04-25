// BoardWrite.styles.tsx

import styled from "@emotion/styled";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";

interface ISubmitButtonProps {
  isActive: boolean;
}

export const PF = {
  // 전체 레이아웃을 담당하는 컨테이너
  CustomBody: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  // 메인 콘텐츠를 감싸는 Wrapper
  Wrapper: styled.div`
    width: 1200px;
    border: 1px solid black;
    margin: 100px;
    padding: 80px 102px 100px 102px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    box-shadow: 0px 0px 10px gray;
  `,
  // 페이지 제목 스타일
  Title: styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    font-weight: bold;
  `,
  // 작성자와 비밀번호 입력 랩퍼
  WriterWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 40px;
  `,
  // 작성자 입력 필드 스타일
  Writer: styled.input`
    width: 486px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  // 비밀번호 입력 필드 스타일
  Password: styled.input`
    width: 486px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  // 각 입력 필드의 라벨 스타일
  Label: styled.div`
    padding-bottom: 16px;
    font-size: 16px;
    font-weight: 500;
  `,
  // 입력 필드를 감싸는 랩퍼
  InputWrapper: styled.div`
    padding-top: 40px;
  `,
  // 제목 입력 필드 스타일
  Subject: styled.input`
    width: 996px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  // 내용 입력 필드 스타일
  Contents: styled.textarea`
    width: 996px;
    height: 480px;
    padding: 14px 16px;
    border: 1px solid #bdbdbd;
  `,
  // 우편번호 및 주소 검색 랩퍼
  ZipcodeWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,
  // 우편번호 입력 필드 스타일
  Zipcode: styled.input`
    width: 77px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  // 우편번호 검색 버튼 스타일
  SearchButton: styled.button`
    width: 124px;
    height: 52px;
    margin-left: 16px;
    background-color: black;
    cursor: pointer;
    color: white;
    border: none;
  `,
  // 주소 입력 필드 스타일
  Address: styled.input`
    width: 996px;
    height: 52px;
    margin-top: 16px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  // 유튜브 URL 입력 필드 스타일
  Youtube: styled.input`
    width: 996px;
    height: 52px;
    padding-left: 16px;
    border: 1px solid #bdbdbd;
  `,
  // 이미지 업로드 섹션 랩퍼
  ImageWrapper: styled.div`
    width: 996px;
    padding-top: 40px;
  `,
  // 이미지 박스 스타일 (좌측 정렬)
  ImageBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  `,
  // 단일 이미지 컨테이너 스타일
  ImageItem: styled.div`
    margin-right: 24px;
    margin-bottom: 24px;
  `,
  // 이미지 미리보기 스타일
  ImagePreview: styled.img`
    width: 78px;
    height: 78px;
    object-fit: cover;
    cursor: pointer;
    border: 1px solid #bdbdbd;
  `,
  // 이미지 업로드 버튼 스타일
  UploadButton: styled.button`
    width: 78px;
    height: 78px;
    background-color: #bdbdbd;
    outline: none;
    border: none;
    cursor: pointer;
  `,
  // 옵션 설정 섹션 랩퍼
  OptionWrapper: styled.div`
    width: 996px;
    padding-top: 40px;
  `,
  // 라디오 버튼 스타일
  RadioButton: styled.input`
    cursor: pointer;
  `,
  // 라디오 버튼 라벨 스타일
  RadioLabel: styled.label`
    margin-left: 8px;
    margin-right: 20px;
    font-weight: 500;
    cursor: pointer;
  `,
  // 버튼 섹션 랩퍼
  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 80px;
  `,
  // 취소 버튼 스타일
  CancelButton: styled.button`
    width: 179px;
    height: 52px;
    background-color: #bdbdbd;
    border: none;
    font-size: 16px;
    font-weight: 500;
    margin-left: 12px;
    margin-right: 12px;
    cursor: pointer;
  `,
  // 제출 버튼 스타일
  SubmitButton: styled.button<{ isActive: boolean }>`
    width: 179px;
    height: 52px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    font-size: 16px;
    font-weight: 500;
    margin-left: 12px;
    margin-right: 12px;
    cursor: pointer;
    background-color: ${(props: ISubmitButtonProps) =>
      props.isActive ? "yellow" : "grey"};
    &:active {
      background-color: white;
      color: black;
    }
  `,
  // 에러 메시지 스타일
  Error: styled.div`
    padding-top: 10px;
    font-size: 14px;
    color: red;
  `,
  // 주소 검색 모달 스타일
  AddressModal: styled(Modal)``,
  // 다음 우편번호 검색 입력 스타일
  AddressSearchInput: styled(DaumPostcode)``,
};
