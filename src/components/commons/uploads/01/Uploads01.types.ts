import { IFormData } from "@/src/commons/validations/boardSchema";
import { UseFormSetValue } from "react-hook-form";

export interface IUploads01Props {
  fileUrl: string;
  index: number;
  onFileSelect: (file: File | undefined, index: number) => void;
}
