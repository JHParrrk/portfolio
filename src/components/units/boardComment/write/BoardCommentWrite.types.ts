import type { Dispatch, SetStateAction } from "react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { IBoardComment } from "../../../../commons/types/generated/types";

export interface IBoardCommentWriteProps {
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  el?: IBoardComment;
}

export interface IBoardCommentWriteUIProps {
  register: UseFormRegister<IFormValues>;
  onClickWrite: () => void;
  onClickUpdate: () => void;
  handleRateChange: (value: number) => void;
  onClickCancel: () => void;
  watch: UseFormWatch<IFormValues>;
  errors: FieldErrors<IFormValues>;
  isValid: boolean;
  isEdit?: boolean;
  el?: IBoardComment;
}

export interface IFormValues {
  writer: string;
  password: string;
  contents: string;
  rating: number;
}
