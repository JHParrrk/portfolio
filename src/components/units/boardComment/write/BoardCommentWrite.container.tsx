import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "./BoardCommentWrite.queries";
import type {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
  IUpdateBoardCommentInput,
} from "../../../../commons/types/generated/types";
import type {
  IBoardCommentWriteProps,
  IFormValues,
} from "./BoardCommentWrite.types";

export default function BoardCommentWrite({
  isEdit,
  el,
  setIsEdit,
}: IBoardCommentWriteProps): JSX.Element {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<IFormValues>({ mode: "onChange", defaultValues: { rating: 3 } });

  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT);

  const onClickWrite: SubmitHandler<IFormValues> = async (data) => {
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
            rating: data.rating,
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

  const onClickUpdate: SubmitHandler<IFormValues> = async (data) => {
    try {
      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (data.contents !== "")
        updateBoardCommentInput.contents = data.contents;
      if (data.rating !== el?.rating)
        updateBoardCommentInput.rating = data.rating;

      if (typeof el?._id !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }
      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password: data.password,
          boardCommentId: el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      setIsEdit?.(false);
      reset(); // 입력란 비우기
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const handleRateChange = (value: number) => {
    setValue("rating", value);
  };

  const onClickCancel = (): void => {
    if (setIsEdit) {
      setIsEdit(false);
    }
  };

  const extendProps = {
    register,
    watch,
    errors,
    isValid,
    writer: watch("writer"),
    password: watch("password"),
    contents: watch("contents"),
    onClickWrite: handleSubmit(onClickWrite),
    onClickUpdate: handleSubmit(onClickUpdate),
    handleRateChange,
    onClickCancel,
    isEdit,
    el,
  };

  return <BoardCommentWriteUI {...extendProps} />;
}
