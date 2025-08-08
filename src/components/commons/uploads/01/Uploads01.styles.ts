// Uploads01.styles.ts

import styled from "@emotion/styled";

export const UploadImage = styled.img`
  width: 78px;
  height: 78px;
  margin-right: 24px;
  cursor: pointer;
  object-fit: cover; // 이미지가 비율을 유지하며 컨테이너를 채우도록 설정
`;

export const UploadButton = styled.button`
  width: 78px;
  height: 78px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const UploadFileHidden = styled.input`
  display: none;
`;

// ✅ 삭제 버튼 스타일 추가
export const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 28px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
