import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD } from "./BoardWrite.queries";

export default function BoardWrite() {
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({ mode: "onChange" }); // mode: "onChange"로 설정

  const onSubmit = async (data) => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            title: data.title,
            contents: data.contents,
          },
        },
      });
      console.log(result);
      router.push(`/boards/${result.data.createBoard._id}`);
      alert("게시글이 등록되었습니다.");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const props = { register, handleSubmit, errors, isValid, onSubmit };
  return <BoardWriteUI {...props} />;
}
