import { CBW } from "./CommentsBoardWrite.css";
import { useForm, Controller } from "react-hook-form";
import { useBoardComment } from "@/shared/hooks/customs/useBoardComment";
import { useQueryIdChecker } from "@/shared/hooks/customs/useQueryIdChecker";
import {
  IBoardComment,
  IQuery,
} from "@/shared/types/generated/types";
import { ApolloQueryResult } from "@apollo/client";
import { Rate } from "antd";

interface ICommentsBoardWriteProps {
  isEdit?: boolean;
  onToggleEdit?: () => void;
  el?: IBoardComment;
  refetch?: () => Promise<ApolloQueryResult<Pick<IQuery, any>>>;
}

export default function CommentsBoardWrite(props: ICommentsBoardWriteProps) {
  const { id } = useQueryIdChecker("boardId");
  const { onClickWrite, onClickUpdate } = useBoardComment({
    boardId: id,
    boardCommentId: props.el?._id,
    onToggleEdit: props.onToggleEdit,
    refetch:
      props.refetch ??
      (() =>
        Promise.resolve({ data: {} } as ApolloQueryResult<Pick<IQuery, any>>)),
  });

  const { register, handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      writer: props.el?.writer ?? "",
      password: "",
      contents: props.isEdit ? props.el?.contents : "",
      star: props.el?.rating ?? 0,
    },
  });

  const contents = watch("contents");

  return (
    <div className={CBW.Wrapper}>
      {!props.isEdit && (
        <>
          <img className={CBW.PencilIcon} src="/images/boardComment/write/pencil.png" />
          <span>등록</span>
        </>
      )}
      <div className={CBW.InputWrapper}>
        <input
          className={CBW.Input}
          placeholder="작성자"
          {...register("writer")}
          disabled={props.isEdit}
        />
        <input
          className={CBW.Input}
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
        <Controller
          name="star"
          control={control}
          render={({ field }) => (
            <Rate
              className={CBW.Star}
              {...field}
              value={field.value || 0}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        {props.isEdit === true && (
          <>
            <img
              className={CBW.CancelIcon}
              src="/images/boardComment/list/option_delete_icon.png"
              onClick={props.onToggleEdit}
            />
          </>
        )}
      </div>
      <div className={CBW.ContentsWrapper}>
        <textarea
          className={CBW.Contents}
          maxLength={100}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          {...register("contents")}
        />
        <div className={CBW.BottomWrapper}>
          <div className={CBW.ContentsLength}>{contents?.length}/100</div>
          <button
            className={CBW.Button}
            onClick={handleSubmit((data) =>
              props.isEdit
                ? onClickUpdate(
                    data,
                    props.refetch ??
                      (() =>
                        Promise.resolve({ data: {} } as ApolloQueryResult<
                          Pick<IQuery, any>
                        >))
                  )
                : onClickWrite(data, reset)
            )}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
