import { CMV } from './CommentsMarketView.css';
import { useToggle } from '@/shared/hooks/customs/useToggle';
import { IUseditemQuestion, IQuery } from '@/shared/types/generated/types';
import { useMarketComment } from '@/shared/hooks/customs/useMarketComment';
import { useQueryIdChecker } from '@/shared/hooks/customs/useQueryIdChecker';
import CommentsMarketWrite from '../write/CommentsMarketWrite.index';
import { ApolloQueryResult } from '@apollo/client';

interface ICommentsMarketViewProps {
  el: IUseditemQuestion;
  refetch: (
    variables?: Partial<any>
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchUseditemQuestions'>>>;
}

export default function CommentsMarketView(props: ICommentsMarketViewProps) {
  const { id } = useQueryIdChecker('marketId');
  const [isEdit, onToggleEdit] = useToggle();
  const { onClickDelete } = useMarketComment({
    useditemId: id,
    useditemQuestionId: props.el._id,
    refetch: props.refetch,
  });

  return (
    <>
      {!isEdit && (
        <div className={CMV.ItemWrapper}>
          <div className={CMV.FlexWrapper}>
            <img className={CMV.Avatar} src="/images/avatar.png" />
            <div className={CMV.MainWrapper}>
              <div className={CMV.WriterWrapper}>
                <div className={CMV.Writer}>{props.el.user.name}</div>
              </div>
              <div className={CMV.Contents}>{props.el.contents}</div>
            </div>
            <div className={CMV.OptionWrapper}>
              <img
                className={CMV.UpdateIcon}
                src="/images/boardComment/list/option_update_icon.png"
                onClick={onToggleEdit}
              />
              <img
                className={CMV.DeleteIcon}
                src="/images/boardComment/list/option_delete_icon.png"
                onClick={onClickDelete}
              />
            </div>
          </div>
          <div className={CMV.DateString}>
            {props.el.createdAt?.slice(0, 10)}
          </div>
        </div>
      )}
      {isEdit && (
        <CommentsMarketWrite
          isEdit={true}
          onToggleEdit={onToggleEdit}
          el={props.el}
          refetch={props.refetch}
        />
      )}
    </>
  );
}
