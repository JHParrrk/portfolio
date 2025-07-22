import { useRef } from "react";
import type { ChangeEvent } from "react";
import { Modal } from "antd";
import { checkValidationImage } from "@/src/components/commons/uploads/01/Uploads01.validation";

interface IUseUploadImage {
  onChangeFileUrls: (url: string, index: number) => void;
  index: number;
}

export const useUploadImage = ({
  onChangeFileUrls,
  index,
}: IUseUploadImage) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValid = checkValidationImage(file);
    if (!isValid) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const url = reader.result as string;
      onChangeFileUrls(url, index); // 미리보기용 data URL 전달
    };
    reader.onerror = () => {
      Modal.error({ content: "이미지 미리보기에 실패했습니다." });
    };

    event.target.value = ""; // 같은 파일 다시 선택 가능하도록 초기화
  };

  return {
    fileRef,
    onClickUpload,
    onChangeFile,
  };
};
