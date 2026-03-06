import { Modal, Rate } from "antd";
import { CBV } from "./CommentsBoardView.css";
import { useToggle } from "@/shared/hooks/customs/useToggle";
import { ICommentsBoardViewProps } from "./CommentsBoardView.types";
import { useBoardComment } from "@/shared/hooks/customs/useBoardComment";       
import { useQueryIdChecker } from "@/shared/hooks/customs/useQueryIdChecker";   
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
          className={CBV.PasswordModal}
        >
          <div>비밀번호 입력: </div>
          <input
            className={CBV.PasswordInput}
            type="password"
            onChange={onChangeDeletePassword}
          />
        </Modal>
      )}
      {!isEdit && (
        <div className={CBV.ItemWrapper}>
          <div className={CBV.FlexWrapper}>
            <img className={CBV.Avatar} src="/images/avatar.png" />
            <div className={CBV.MainWrapper}>
              <div className={CBV.WriterWrapper}>
                <div className={CBV.Writer}>{props.el?.writer}</div>
                <Rate className={CBV.Star} value={props.el?.rating} disabled />
              </div>
              <div className={CBV.Contents}>{props.el?.contents}</div>
            </div>
            <div className={CBV.OptionWrapper}>
              <img
                className={CBV.UpdateIcon}
                src="/images/boardComment/list/option_update_icon.png/"
                onClick={onToggleEdit}
              />
              <img
                className={CBV.DeleteIcon}
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={onToggleModal}
              />
            </div>
          </div>
          <div className={CBV.DateString}>{props.el?.createdAt}</div>
        </div>
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
