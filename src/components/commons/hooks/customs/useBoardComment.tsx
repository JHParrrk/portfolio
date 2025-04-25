import { Modal } from "antd";
import { ChangeEvent, useState } from "react";
import { useMutationCreateBoardComment } from "../mutations/useMutationCreateBoardComment";
import { useMutationDeleteBoardComment } from "../mutations/useMutationDeleteBoardComment";
import { useMutationUpdateBoardComment } from "../mutations/useMutationUpdateBoardComment";
import { FETCH_BOARD_COMMENTS } from "../queries/useQueryFetchBoardComments";

interface IUpdateBoardCommentInput {
  contents?: string;
  rating?: number;
}

interface IUseBoardCommentArgs {
  boardId: string;
  boardCommentId?: string;
  onToggleEdit?: () => void;
}

export const useBoardComment = (args: IUseBoardCommentArgs) => {
  const [myPassword, setMyPassword] = useState("");
  const [createBoardComment] = useMutationCreateBoardComment();
  const [updateBoardComment] = useMutationUpdateBoardComment();
  const [deleteBoardComment] = useMutationDeleteBoardComment();

  // 비밀번호 변경 핸들러
  const onChangeDeletePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setMyPassword(event.target.value);
  };

  // 댓글 삭제 핸들러
  const onClickDelete = async () => {
    if (!args.boardCommentId) return;
    try {
      await deleteBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: args.boardCommentId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: args.boardId },
          },
        ],
      });
      Modal.success({ content: "댓글이 삭제되었습니다." });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  // 댓글 등록 핸들러
  const onClickWrite = async (data: any, reset: () => void) => {
    if (
      !data.writer ||
      !data.password ||
      !data.contents ||
      data.star === undefined
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer: data.writer,
            password: data.password,
            contents: data.contents,
            rating: data.star,
          },
          boardId: args.boardId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: args.boardId },
          },
        ],
      });
      Modal.success({ content: "댓글이 등록되었습니다." });
      reset();
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  // 댓글 수정 핸들러
  const onClickUpdate = async (data: any) => {
    if (!data.contents) {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    if (!data.password) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }
    if (data.star === undefined) {
      alert("별점이 입력되지 않았습니다.");
      return;
    }

    try {
      const updateBoardCommentInput: IUpdateBoardCommentInput = {
        contents: data.contents,
        rating: data.star,
      };

      if (!args.boardCommentId) return;
      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password: data.password,
          boardCommentId: args.boardCommentId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: args.boardId },
          },
        ],
      });
      Modal.success({ content: "댓글이 수정되었습니다." });
      if (args.onToggleEdit) args.onToggleEdit();
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return {
    onClickWrite,
    onClickUpdate,
    onClickDelete,
    onChangeDeletePassword,
  };
};
