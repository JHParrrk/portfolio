import { useForm } from "react-hook-form";
import { IFormData } from "../components/units/board/write/BoardWrite.types";

const useBoardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<IFormData>({ mode: "onChange" });

  const props = {
    register,
    handleSubmit,
    errors,
    isValid,
    setValue,
    onClickSubmit: handleSubmit(() => {}),
    onClickUpdate: handleSubmit(() => {}),
  };

  return props;
};

export default useBoardForm;
