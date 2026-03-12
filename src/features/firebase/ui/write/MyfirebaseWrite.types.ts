import type { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';

export interface IMyfirebaseFormData {
  writer: string;
  title: string;
  contents: string;
}

export interface IMyfirebaseWriteUIProps {
  register: UseFormRegister<IMyfirebaseFormData>;
  handleSubmit: UseFormHandleSubmit<IMyfirebaseFormData>;
  onClickSubmit: (data: IMyfirebaseFormData) => void;
}
