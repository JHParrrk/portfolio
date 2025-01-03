import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { IQuery } from "../../../../commons/types/generated/types";

export interface IFormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
  register: UseFormRegister<IFormData>;
  handleSubmit: UseFormHandleSubmit<IFormData>;
  errors: FieldErrors<IFormData>;
  isValid: boolean;
  setValue: UseFormSetValue<IFormData>;
  onClickSubmit: () => void;
  onClickUpdate: () => void;
}

export interface IBoardWriteUIProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
  register: any;
  handleSubmit: any;
  errors: any;
  isValid: boolean;
  setValue: any;
  onClickSubmit: () => void;
  onClickUpdate: () => void;
}

export interface ISubmitButtonProps {
  isActive: boolean;
}
