import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { checkValidationImage } from "@/src/components/commons/uploads/01/Uploads01.validation";
import { UseFormSetValue } from "react-hook-form";
import { IFormData } from "@/src/commons/validations/boardSchema";

interface IUseUploadImage {
  onFileSelect: (file: File | undefined, index: number) => void;
  index: number;
}

export const useUploadImage = ({ onFileSelect, index }: IUseUploadImage) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [localFileUrl, setLocalFileUrl] = useState(""); // 로컬 미리보기용 상태

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValid = checkValidationImage(file);
    if (!isValid) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setLocalFileUrl(reader.result as string);

    onFileSelect(file, index); // 파일 객체만 부모로 전달
    event.target.value = "";
  };

  const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setLocalFileUrl(""); // 로컬 미리보기 상태 초기화
    onFileSelect(undefined, index); // 부모에게 파일 삭제 알림
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return {
    fileRef,
    onClickUpload,
    onChangeFile,
    onClickDelete,
    localFileUrl,
  };
};
