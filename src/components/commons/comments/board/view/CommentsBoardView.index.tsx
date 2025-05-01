import { Modal } from "antd";
import { CBV } from "./CommentsBoardView.styles";
import { useToggle } from "../../../hooks/customs/useToggle";
import { ICommentsBoardViewProps } from "./CommentsBoardView.types";
import { useBoardComment } from "../../../hooks/customs/useBoardComment";
import { useQueryIdChecker } from "../../../hooks/customs/useQueryIdChecker";
import CommentsBoardWrite from "../write/CommentsBoardWrite.index";

export default function CommentsBoardView(props: ICommentsBoardViewProps) {
  const { id } = useQueryIdChecker("boardId");
  const [isEdit, onToggleEdit] = useToggle();
  const [isOpen, onToggleModal] = useToggle();
  const { onClickDelete, onChangeDeletePassword } = useBoardComment({
    boardId: id,
    boardCommentId: props.el._id,
    refetch: props.refetch,
  });

  return (
    <>
      {isOpen && (
        <Modal
          visible={true}
          onOk={onClickDelete}
          onCancel={onToggleModal}
          destroyOnClose={true}
        >
          <div>비밀번호 입력: </div>
          <CBV.PasswordInput
            type="password"
            onChange={onChangeDeletePassword}
          />
        </Modal>
      )}
      {!isEdit && (
        <CBV.ItemWrapper>
          <CBV.FlexWrapper>
            <CBV.Avatar src="/images/avatar.png" />
            <CBV.MainWrapper>
              <CBV.WriterWrapper>
                <CBV.Writer>{props.el?.writer}</CBV.Writer>
                <CBV.Star value={props.el?.rating} disabled />
              </CBV.WriterWrapper>
              <CBV.Contents>{props.el?.contents}</CBV.Contents>
            </CBV.MainWrapper>
            <CBV.OptionWrapper>
              <CBV.UpdateIcon
                src="/images/boardComment/list/option_update_icon.png/"
                onClick={onToggleEdit}
              />
              <CBV.DeleteIcon
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={onToggleModal}
              />
            </CBV.OptionWrapper>
          </CBV.FlexWrapper>
          <CBV.DateString>{props.el?.createdAt}</CBV.DateString>
        </CBV.ItemWrapper>
      )}
      {isEdit && (
        <CommentsBoardWrite
          isEdit={true}
          onToggleEdit={onToggleEdit}
          el={props.el}
          refetch={props.refetch}
        />
      )}
    </>
  );
}
