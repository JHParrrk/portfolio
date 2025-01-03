import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
} from "../../../../commons/types/generated/types";
import { IBoardWriteProps, IFormData } from "./BoardWrite.types";
import { useForm } from "react-hook-form";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<IFormData>({ mode: "onChange" });

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  const onSubmit = async (formData: IFormData) => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: formData.writer,
            password: formData.password,
            title: formData.title,
            contents: formData.contents,
          },
        },
      });
      if (!result.data) {
        throw new Error("게시글 생성에 실패했습니다.");
      }
      router.push(`/boards/${result.data.createBoard._id}`);
      alert("게시글이 등록되었습니다.");
    } catch (error: any) {
      console.error(error);
    }
  };

  const onUpdate = async (formData: IFormData) => {
    if (!formData.title && !formData.contents) {
      alert("수정한 내용이 없습니다.");
      return;
    }
    if (!formData.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (formData.title) updateBoardInput.title = formData.title;
    if (formData.contents) updateBoardInput.contents = formData.contents;

    const myVariables = {
      boardId: router.query.boardId as string,
      password: formData.password,
      updateBoardInput,
    };

    try {
      const result = await updateBoard({
        variables: myVariables,
      });
      if (!result.data) {
        throw new Error("게시글 업데이트에 실패했습니다.");
      }
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const extendedProps = {
    ...props,
    register,
    handleSubmit,
    errors,
    isValid,
    setValue,
    onClickSubmit: handleSubmit(onSubmit),
    onClickUpdate: handleSubmit(onUpdate),
  };

  return <BoardWriteUI {...extendedProps} />;
}
