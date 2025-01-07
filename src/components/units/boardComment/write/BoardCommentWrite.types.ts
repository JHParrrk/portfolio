import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { BaseSyntheticEvent } from "react";

export interface IBoardCommentWriteUIProps {
  onClickWrite: (e?: BaseSyntheticEvent) => Promise<void>; // onSubmit을 onClickWrite로 대체
  register: UseFormRegister<IFormValues>;
  handleRateChange: (value: number) => void;
  errors: FieldErrors<IFormValues>;
  contents: string;
}

export interface IFormValues {
  writer: string;
  password: string;
  contents: string;
  rating: number;
}
