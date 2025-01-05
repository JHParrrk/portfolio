import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";
import { CREATE_BOARD_COMMENT } from "./BoardCommentWrite.queries";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
} from "../../../../commons/types/generated/types";
import { IFormValues } from "./BoardCommentWrite.types";

export default function BoardCommentWrite() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setValue, // setValue 함수 추가
  } = useForm<IFormValues>({ mode: "onChange" });

  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      if (typeof router.query.boardId !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }

      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: data.writer,
            password: data.password,
            contents: data.contents,
            rating: data.rating, // rating 추가
          },
          boardId: router.query.boardId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });

      reset(); // 입력란 비우기
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const contents = watch("contents", ""); // contents 값을 가져오기 위해 추가

  const extendedProps = {
    register,
    handleSubmit,
    errors,
    isValid,
    contents, // 추가
    setValue, // 추가
    onClickWrite: handleSubmit(onSubmit),
  };

  return <BoardCommentWriteUI {...extendedProps} />;
}
