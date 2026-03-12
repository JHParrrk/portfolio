import { CMW } from './CommentsMarketWrite.css';
import { useForm } from 'react-hook-form';
import { useMarketComment } from '@/shared/hooks/customs/useMarketComment';
import { useQueryIdChecker } from '@/shared/hooks/customs/useQueryIdChecker';
import { useGlobalStore } from '@/shared/models/stores';
import { IUseditemQuestion, IQuery } from '@/shared/types/generated/types';
import { ApolloQueryResult } from '@apollo/client';

interface ICommentsMarketWriteProps {
  isEdit?: boolean;
  onToggleEdit?: () => void;
  el?: IUseditemQuestion;
  refetch?: (
    variables?: Partial<any>
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchUseditemQuestions'>>>;
}

export default function CommentsMarketWrite(props: ICommentsMarketWriteProps) {
  const { id } = useQueryIdChecker('marketId');
  const accessToken = useGlobalStore((state) => state.accessToken);

  const { onClickWrite, onClickUpdate } = useMarketComment({
    useditemId: id,
    useditemQuestionId: props.el?._id,
    onToggleEdit: props.onToggleEdit,
    refetch: props.refetch,
  });

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      contents: props.isEdit ? props.el?.contents : '',
    },
  });

  const contents = watch('contents');

  const onHandleSubmitWrite = async (data: {
    contents: string | undefined;
  }) => {
    if (!data.contents) return;
    await onClickWrite({ contents: data.contents });
    reset();
  };

  const onHandleSubmitUpdate = async (data: {
    contents: string | undefined;
  }) => {
    if (!data.contents) return;
    await onClickUpdate({ contents: data.contents });
  };

  return (
    <div className={CMW.Wrapper}>
      {!props.isEdit && (
        <>
          <span>문의하기</span>
        </>
      )}
      <div className={CMW.ContentsWrapper}>
        <textarea
          className={CMW.Contents}
          maxLength={100}
          placeholder={
            accessToken
              ? '문의글을 작성해 주세요.'
              : '로그인 후 문의 작성이 가능합니다.'
          }
          {...register('contents')}
          disabled={!accessToken}
        />
        <div className={CMW.BottomWrapper}>
          <div className={CMW.ContentsLength}>{contents?.length}/100</div>
          <button
            className={CMW.Button}
            onClick={handleSubmit(
              props.isEdit ? onHandleSubmitUpdate : onHandleSubmitWrite
            )}
            disabled={!accessToken}
          >
            {props.isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
