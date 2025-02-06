// BoardWrite.types.ts

import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ChangeEvent, BaseSyntheticEvent } from "react";
import { Address } from "react-daum-postcode";
import { IQuery } from "../../../../commons/types/generated/types";

export interface IFormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  youtubeUrl: string;
  images: string[]; // 이미지 URL 배열
}

export interface IBoardWriteUIProps {
  register: UseFormRegister<IFormData>;
  formState: {
    errors: FieldErrors<IFormData>;
    isValid: boolean;
  };
  watch: UseFormWatch<IFormData>;
  isOpen: boolean;
  onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickAddressSearch: () => void;
  onCompleteAddressSearch: (data: Address) => void;
  onClickSubmit: (e?: BaseSyntheticEvent) => Promise<void>; // 타입 수정
  onClickUpdate: (e?: BaseSyntheticEvent) => Promise<void>; // 타입 수정
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
  onChangeFileUrls: (fileUrl: string, index: number) => void; // 매개변수 이름 수정
  fileUrls: string[];
}

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
}

export interface ISubmitButtonProps {
  isActive: boolean;
}
