import { CBW } from "./CommentsBoardWrite.styles";
import { useForm, Controller } from "react-hook-form";
import { useBoardComment } from "../../../hooks/customs/useBoardComment";
import { useQueryIdChecker } from "../../../hooks/customs/useQueryIdChecker";
import {
  IBoardComment,
  IQuery,
} from "../../../../../commons/types/generated/types";
import { ApolloQueryResult } from "@apollo/client";

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
      star: props.el?.rating ?? 0, // 별점 기본값 추가
    },
  });

  // 작성된 내용의 길이 추적
  const contents = watch("contents"); // 'contents' 필드의 값을 실시간으로 추적

  // console.log("CommentsBoardWrite - refetch 확인:", props.refetch);

  return (
    <CBW.Wrapper>
      {!props.isEdit && (
        <>
          <CBW.PencilIcon src="/images/boardComment/write/pencil.png" />
          <span>댓글</span>
        </>
      )}
      <CBW.InputWrapper>
        <CBW.Input
          placeholder="작성자"
          {...register("writer")}
          disabled={props.isEdit} // 수정 모드일 경우 비활성화
        />
        <CBW.Input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
        <Controller
          name="star"
          control={control}
          render={({ field }) => (
            <CBW.Star
              {...field}
              value={field.value || 0}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        {props.isEdit === true && (
          <>
            <CBW.CancelIcon
              src="/images/boardComment/list/option_delete_icon.png"
              onClick={props.onToggleEdit}
            />
          </>
        )}
      </CBW.InputWrapper>
      <CBW.ContentsWrapper>
        <CBW.Contents
          maxLength={100}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          {...register("contents")}
        />
        <CBW.BottomWrapper>
          {/* 작성된 내용의 길이를 동적으로 표시 */}
          <CBW.ContentsLength>{contents?.length}/100</CBW.ContentsLength>
          <CBW.Button
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
          </CBW.Button>
        </CBW.BottomWrapper>
      </CBW.ContentsWrapper>
    </CBW.Wrapper>
  );
}
