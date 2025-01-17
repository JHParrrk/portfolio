import { useMutation } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import type {
  IMutation,
  IMutationDeleteBoardCommentArgs,
} from "../../../../commons/types/generated/types";
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "./BoardCommentList.queries";
import { BCL } from "./BoardCommentList.styles";
import type { IBoardCommentListUIItemProps } from "./BoardCommentList.types";
import { useRouter } from "next/router";
import { getDate } from "../../../../commons/libraries/utils";
import BoardCommentWrite from "../write/BoardCommentWrite.container";

export default function BoardCommentListUIItem({
  el,
}: IBoardCommentListUIItemProps): JSX.Element {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [password, setPassword] = useState("");

  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT);

  const onClickUpdate = (): void => {
    setIsEdit(true);
  };

  const onClickDelete = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    // const password = prompt("비밀번호를 입력하세요.");
    try {
      await deleteBoardComment({
        variables: {
          password,
          boardCommentId: el._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      setIsOpenDeleteModal(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickOpenDeleteModal = (
    event: MouseEvent<HTMLImageElement>
  ): void => {
    setIsOpenDeleteModal(true);
  };

  const onChangeDeletePassword = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  return (
    <>
      {isOpenDeleteModal && (
        <BCL.PasswordModal visible={true} onOk={onClickDelete}>
          <div>비밀번호 입력: </div>
          <BCL.PasswordInput
            type="password"
            onChange={onChangeDeletePassword}
          />
        </BCL.PasswordModal>
      )}
      {!isEdit ? (
        <BCL.CustomBody>
          <BCL.ItemWrapper key={el._id}>
            <BCL.FlexWrapper>
              <BCL.Avatar src="/images/avatar.png" />
              <BCL.MainWrapper>
                <BCL.WriterWrapper>
                  <BCL.Writer>{el.writer}</BCL.Writer>
                  <BCL.Star value={el.rating} disabled />
                </BCL.WriterWrapper>
                <BCL.Contents>{el.contents}</BCL.Contents>
              </BCL.MainWrapper>
              <BCL.OptionWrapper>
                <BCL.UpdateIcon
                  src="/images/boardComment/list/option_update_icon.png/"
                  onClick={onClickUpdate}
                />
                <BCL.DeleteIcon
                  src="/images/boardComment/list/option_delete_icon.png/"
                  onClick={onClickOpenDeleteModal}
                />
              </BCL.OptionWrapper>
            </BCL.FlexWrapper>
            <BCL.DateString>{getDate(el.createdAt)}</BCL.DateString>
          </BCL.ItemWrapper>
        </BCL.CustomBody>
      ) : (
        <BCL.CustomBody>
          <BoardCommentWrite
            isEdit={true}
            setIsEdit={setIsEdit}
            el={el}
          />
        </BCL.CustomBody>
      )}
    </>
  );
}
